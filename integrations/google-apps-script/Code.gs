const REGISTRATION_SHEET = "Registrations";
const EVENTS_SHEET = "Events";
const TEAM_VIEW_SHEET = "Registration Team";

const REGISTRATION_HEADERS = [
  "Timestamp",
  "Ticket Number",
  "Event Slug",
  "Event",
  "Name",
  "Email",
  "Phone",
  "City",
  "Church / Group",
  "Skill",
  "Emergency Contact",
  "Email Status",
  "Email Response",
  "Event Date",
  "Event Time",
  "Venue",
];

const EVENTS_HEADERS = [
  "Slug",
  "Title",
  "Month",
  "Open",
  "Status",
  "Label",
  "Message",
  "Event Date",
  "Event Time",
  "Venue",
];

const TEAM_VIEW_HEADERS = [
  "Name",
  "Email",
  "Ticket Number",
  "Emergency Contact",
  "Event",
  "Phone",
  "Skill",
  "Event Date",
  "Event Time",
  "Venue",
];

const DEFAULT_EVENTS = [
  [
    "june",
    "Creator's Conf",
    "June",
    "FALSE",
    "Registration not open",
    "Registration not open",
    "Registration is not open for this programme yet.",
    "",
    "",
    "",
  ],
  [
    "august",
    "TPC 2026: Birthing",
    "August",
    "FALSE",
    "Registration not open",
    "Registration not open",
    "TPC 2026 registration has not commenced yet.",
    "",
    "",
    "",
  ],
];

function doGet(e) {
  ensureSheets_();

  const action = e && e.parameter ? e.parameter.action : "";

  if (action === "config") {
    return json_({
      ok: true,
      events: getEvents_(),
    });
  }

  return json_({
    ok: true,
    service: "TPC Registration",
  });
}

function setup() {
  ensureSheets_();
  return "TPC registration sheets are ready.";
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    ensureSheets_();

    const data = parseRequest_(e);
    const events = getEvents_();
    const event = events[data.eventSlug];

    if (!event || event.open !== true) {
      return json_({
        ok: false,
        message: event && event.message ? event.message : "Registration is not open for this programme.",
      });
    }

    validate_(data);

    const sheet = getSpreadsheet_().getSheetByName(REGISTRATION_SHEET);
    const existing = findExistingRegistration_(sheet, data.email, data.eventSlug);

    if (existing) {
      const emailWasSent = existing.emailStatus === "sent";

      return json_({
        ok: true,
        duplicate: true,
        alreadyRegistered: true,
        ticketNumber: existing.ticketNumber,
        rsvpCode: existing.ticketNumber,
        receiptSent: emailWasSent,
        message: emailWasSent
          ? "You have already registered. Please check your email for your ticket."
          : "You have already registered. The team has your details. Please message us if you need help finding your ticket.",
      });
    }

    const record = {
      ticketNumber: data.ticketNumber || data.rsvpCode || makeTicketNumber_(data.eventSlug),
      eventSlug: data.eventSlug,
      event: data.event || event.title,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city || "",
      group: data.group || "",
      skill: data.skill || "",
      emergencyContact: data.emergencyContact || "",
      eventDate: event.date || "",
      eventTime: event.time || "",
      venue: event.venue || "",
    };

    sheet.appendRow([
      new Date(),
      record.ticketNumber,
      record.eventSlug,
      record.event,
      record.name,
      record.email,
      record.phone,
      record.city,
      record.group,
      record.skill,
      record.emergencyContact,
      "pending",
      "",
      record.eventDate,
      record.eventTime,
      record.venue,
    ]);

    const row = sheet.getLastRow();
    const receipt = sendReceipt_(record);
    sheet.getRange(row, 12, 1, 2).setValues([[receipt.status, receipt.response]]);

    return json_({
      ok: true,
      ticketNumber: record.ticketNumber,
      rsvpCode: record.ticketNumber,
      receiptSent: receipt.status === "sent",
      message: "Registration confirmed. Your ticket has been sent to your email.",
    });
  } catch (error) {
    return json_({
      ok: false,
      message: error && error.message ? error.message : "Registration failed.",
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (error) {
      // Lock may already be released.
    }
  }
}

function parseRequest_(e) {
  const body = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
  return JSON.parse(body);
}

function validate_(data) {
  if (!data.name) throw new Error("Name is required.");
  if (!data.email || !/@/.test(data.email)) throw new Error("A valid email is required.");
  if (!data.phone) throw new Error("Phone or WhatsApp number is required.");
  if (!data.emergencyContact) throw new Error("Emergency contact is required.");
  if (data.eventSlug === "june" && !data.skill) {
    throw new Error("Skill track is required for Creator's Conf.");
  }
}

function findExistingRegistration_(sheet, email, eventSlug) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedEventSlug = String(eventSlug || "").trim().toLowerCase();
  const lastRow = sheet.getLastRow();

  if (!normalizedEmail || !normalizedEventSlug || lastRow < 2) {
    return null;
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, REGISTRATION_HEADERS.length).getValues();

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const rowEventSlug = String(row[2] || "").trim().toLowerCase();
    const rowEmail = String(row[5] || "").trim().toLowerCase();

    if (rowEventSlug === normalizedEventSlug && rowEmail === normalizedEmail) {
      return {
        rowNumber: index + 2,
        ticketNumber: String(row[1] || "").trim(),
        event: String(row[3] || "").trim(),
        name: String(row[4] || "").trim(),
        emailStatus: String(row[11] || "").trim().toLowerCase(),
      };
    }
  }

  return null;
}

function getSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  return id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
}

function ensureSheets_() {
  const spreadsheet = getSpreadsheet_();
  ensureSheet_(spreadsheet, REGISTRATION_SHEET, REGISTRATION_HEADERS, []);
  ensureSheet_(spreadsheet, EVENTS_SHEET, EVENTS_HEADERS, DEFAULT_EVENTS);
  ensureTeamView_(spreadsheet);
}

function ensureSheet_(spreadsheet, name, headers, defaults) {
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    defaults.forEach(function (row) {
      sheet.appendRow(row);
    });
  } else {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function ensureTeamView_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(TEAM_VIEW_SHEET);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(TEAM_VIEW_SHEET);
  }

  sheet.getRange(1, 1, 1, TEAM_VIEW_HEADERS.length).setValues([TEAM_VIEW_HEADERS]);

  const formula =
    '=QUERY({' +
    REGISTRATION_SHEET +
    '!E2:E,' +
    REGISTRATION_SHEET +
    '!F2:F,' +
    REGISTRATION_SHEET +
    '!B2:B,' +
    REGISTRATION_SHEET +
    '!K2:K,' +
    REGISTRATION_SHEET +
    '!D2:D,' +
    REGISTRATION_SHEET +
    '!G2:G,' +
    REGISTRATION_SHEET +
    '!J2:J,' +
    REGISTRATION_SHEET +
    '!N2:N,' +
    REGISTRATION_SHEET +
    '!O2:O,' +
    REGISTRATION_SHEET +
    '!P2:P' +
    '},"select Col1, Col2, Col3, Col4, Col5, Col6, Col7, Col8, Col9, Col10 where Col1 is not null",0)';

  if (sheet.getRange(2, 1).getFormula() !== formula) {
    const rowsToClear = Math.max(sheet.getMaxRows() - 1, 1);
    sheet.getRange(2, 1, rowsToClear, TEAM_VIEW_HEADERS.length).clearContent();
    sheet.getRange(2, 1).setFormula(formula);
  }
}

function getEvents_() {
  const sheet = getSpreadsheet_().getSheetByName(EVENTS_SHEET);
  const values = sheet.getDataRange().getValues();
  const events = {};

  for (let index = 1; index < values.length; index += 1) {
    const row = values[index];
    const slug = String(row[0] || "").trim();

    if (!slug) continue;

    events[slug] = {
      title: String(row[1] || "").trim(),
      month: String(row[2] || "").trim(),
      open: normalizeBoolean_(row[3]),
      status: String(row[4] || "").trim(),
      label: String(row[5] || "").trim(),
      message: String(row[6] || "").trim(),
      date: formatDateCell_(row[7]),
      time: formatTimeCell_(row[8]),
      venue: String(row[9] || "").trim(),
    };
  }

  return events;
}

function formatDateCell_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }

  return String(value || "").trim();
}

function formatTimeCell_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "HH:mm");
  }

  return String(value || "").trim();
}

function normalizeBoolean_(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^\((.*)\)$/, "$1");

  return ["true", "yes", "open", "1"].indexOf(normalized) !== -1;
}

function makeTicketNumber_(eventSlug) {
  const prefix = eventSlug === "june" ? "TPC-CC" : "TPC";
  const random = Utilities.getUuid().split("-")[0].toUpperCase();
  return prefix + "-2026-" + random;
}

function sendReceipt_(record) {
  const properties = PropertiesService.getScriptProperties();
  const apiKey = properties.getProperty("RESEND_API_KEY");

  if (!apiKey) {
    return {
      status: "not sent",
      response: "Missing RESEND_API_KEY script property.",
    };
  }

  const fromEmail = properties.getProperty("FROM_EMAIL") || "TPC <hello@tpcglobal.live>";
  const replyToEmail = properties.getProperty("REPLY_TO_EMAIL") || "hello@tpcglobal.live";
  const payload = {
    from: fromEmail,
    to: [record.email],
    reply_to: replyToEmail,
    subject: "Registration confirmed: " + record.event + " - " + record.ticketNumber,
    html: buildReceiptHtml_(record),
  };

  const response = UrlFetchApp.fetch("https://api.resend.com/emails", {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + apiKey,
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  const statusCode = response.getResponseCode();
  const body = response.getContentText();

  return {
    status: statusCode >= 200 && statusCode < 300 ? "sent" : "failed",
    response: statusCode + ": " + body,
  };
}

function buildReceiptHtml_(record) {
  const safeName = escapeHtml_(record.name);
  const safeEvent = escapeHtml_(record.event);
  const safeSkill = escapeHtml_(record.skill || "Not specified");
  const safePhone = escapeHtml_(record.phone || "Not provided");
  const safeCode = escapeHtml_(record.ticketNumber);
  const safeDate = escapeHtml_(record.eventDate || "");
  const safeTime = escapeHtml_(record.eventTime || "");
  const safeVenue = escapeHtml_(record.venue || "");
  const skillRow = record.skill ? ticketDetailRow_("Skill Track", safeSkill) : "";
  const dateRow = record.eventDate ? ticketDetailRow_("Date", safeDate) : "";
  const timeRow = record.eventTime ? ticketDetailRow_("Time", safeTime) : "";
  const venueRow = record.venue ? ticketDetailRow_("Venue", safeVenue) : "";
  const calendarUrl = buildCalendarUrl_(record);
  const calendarButton = calendarUrl
    ? '<div style="margin:28px 0 0;text-align:center;"><a href="' +
      calendarUrl +
      '" style="display:inline-block;border-radius:999px;background:#b71613;color:#ffffff;text-align:center;text-decoration:none;font-size:15px;font-weight:900;padding:15px 24px;">Add to Google Calendar</a></div>'
    : "";

  return (
    '<div style="margin:0;padding:36px 16px;background:#28231a;font-family:Montserrat,Arial,sans-serif;color:#ffffff;">' +
    '<div style="max-width:620px;margin:0 auto;">' +
    '<div style="overflow:hidden;border:1px solid rgba(255,209,102,0.16);border-radius:0;background:#171013;box-shadow:0 24px 70px rgba(0,0,0,0.34);">' +
    ticketPerforation_("#28231a", "#b71613") +
    '<div style="padding:34px 34px 32px;background:#b71613;color:#ffffff;">' +
    '<p style="margin:0 0 14px;font-size:12px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#ffd166;">Teens Prayer Conference</p>' +
    '<h1 style="margin:0;font-size:42px;line-height:1;font-weight:900;text-transform:uppercase;color:#ffffff;">Registration Confirmed</h1>' +
    '</div>' +
    '<div style="padding:38px 34px 32px;background:#171013;">' +
    '<p style="margin:0 0 28px;font-size:20px;line-height:1.75;color:#f6efe4;">Hello <strong style="color:#ffffff;">' +
    safeName +
    '</strong>, your registration for <strong style="color:#ffffff;">' +
    safeEvent +
    '</strong> has been received. Keep this ticket number close.</p>' +
    '<div style="margin:0 0 30px;padding:28px 22px;border:2px dashed #f17664;border-radius:20px;background:#241e18;text-align:center;">' +
    '<p style="margin:0 0 12px;font-size:12px;font-weight:900;letter-spacing:4px;text-transform:uppercase;color:#ffd6d0;">Ticket Number</p>' +
    '<p style="margin:0;font-size:42px;line-height:1.14;font-weight:900;letter-spacing:2px;color:#ffffff;">' +
    safeCode +
    '</p>' +
    '</div>' +
    '<table role="presentation" style="width:100%;border-collapse:collapse;margin:0;font-size:16px;">' +
    ticketDetailRow_("Name", safeName) +
    ticketDetailRow_("Programme", safeEvent) +
    dateRow +
    timeRow +
    venueRow +
    skillRow +
    ticketDetailRow_("Phone", safePhone) +
    '</table>' +
    calendarButton +
    '<p style="margin:30px 0 0;font-size:16px;line-height:1.75;color:#e7ded5;">Keep this email. The team can find your registration with your ticket number.</p>' +
    '</div>' +
    '<div style="padding:30px 34px;background:#100b0d;border-top:1px solid rgba(255,209,102,0.14);color:#ffffff;text-align:center;">' +
    '<p style="margin:0 0 10px;font-size:13px;font-weight:900;letter-spacing:2.4px;text-transform:uppercase;color:#ffd166;">Birthing: A Call to Intimacy</p>' +
    '<p style="margin:0 auto;max-width:430px;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.72);">Questions or changes? Reply to this email and the TPC team will help.</p>' +
    '<p style="margin:16px 0 0;font-size:12px;line-height:1.8;color:rgba(255,255,255,0.46);">tpcglobal.live &nbsp;|&nbsp; @teensprayerconference</p>' +
    '</div>' +
    ticketPerforation_("#28231a", "#100b0d") +
    '</div>' +
    '</div>' +
    '</div>'
  );
}

function buildCalendarUrl_(record) {
  const start = parseEventDateTime_(record.eventDate, record.eventTime);

  if (!start) {
    return "";
  }

  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const dates = formatCalendarDate_(start) + "/" + formatCalendarDate_(end);
  const details =
    "Registration confirmed. Ticket number: " +
    record.ticketNumber +
    ". Please keep your ticket email.";

  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" +
    encodeURIComponent(record.event) +
    "&dates=" +
    dates +
    "&details=" +
    encodeURIComponent(details) +
    "&location=" +
    encodeURIComponent(record.venue || "")
  );
}

function parseEventDateTime_(eventDate, eventTime) {
  const dateText = String(eventDate || "").trim();
  const timeText = String(eventTime || "").trim();
  const dateMatch = dateText.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const timeMatch = timeText.match(/^(\d{1,2}):(\d{2})/);

  if (!dateMatch || !timeMatch) {
    return null;
  }

  return new Date(
    Number(dateMatch[1]),
    Number(dateMatch[2]) - 1,
    Number(dateMatch[3]),
    Number(timeMatch[1]),
    Number(timeMatch[2])
  );
}

function formatCalendarDate_(date) {
  return Utilities.formatDate(date, "UTC", "yyyyMMdd'T'HHmmss'Z'");
}

function ticketPerforation_(holeColor, stripColor) {
  let dots = "";

  for (let index = 0; index < 32; index += 1) {
    dots +=
      '<span style="display:inline-block;width:18px;height:18px;margin:0 4px;border-radius:999px;background:' +
      holeColor +
      ';"></span>';
  }

  return (
    '<div style="height:18px;line-height:14px;text-align:center;white-space:nowrap;overflow:hidden;background:' +
    stripColor +
    ';">' +
    dots +
    '</div>'
  );
}

function ticketDetailRow_(label, value) {
  return (
    '<tr>' +
    '<td style="width:42%;border-bottom:1px solid rgba(255,209,102,0.14);padding:17px 0;color:#e6d5df;font-size:16px;font-weight:800;">' +
    label +
    '</td>' +
    '<td style="border-bottom:1px solid rgba(255,209,102,0.14);padding:17px 0;text-align:right;color:#ffffff;font-size:16px;font-weight:900;">' +
    value +
    '</td>' +
    '</tr>'
  );
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
