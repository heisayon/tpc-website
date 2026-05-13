"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Clock3, Send } from "lucide-react";
import { creatorSkills, registrationEvents, registrationOptions, site } from "@/lib/site";

type RegisterProps = {
  defaultEventSlug?: string;
};

type DropdownOption = {
  value: string;
  label: string;
  meta?: string;
};

type RegistrationPayload = {
  eventSlug: string;
  event: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  group: string;
  skill: string;
  notes: string;
};

type RegistrationNotice = RegistrationPayload & {
  title: string;
  text: string;
  code?: string;
};

const registrationEndpoint = process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT ?? "";

function asText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function buildWhatsappRegistrationUrl(payload: RegistrationPayload) {
  const lines = [
    `Hello TPC team, I want to register for ${payload.event}.`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone / WhatsApp: ${payload.phone}`,
    payload.city ? `City: ${payload.city}` : "",
    payload.group ? `Church / group: ${payload.group}` : "",
    `Skill track: ${payload.skill}`,
    payload.notes ? `Notes: ${payload.notes}` : "",
  ].filter(Boolean);
  const separator = site.whatsapp.includes("?") ? "&" : "?";

  return `${site.whatsapp}${separator}text=${encodeURIComponent(lines.join("\n"))}`;
}

function CustomDropdown({
  label,
  value,
  options,
  placeholder,
  onChange,
  error,
}: {
  label: string;
  value: string;
  options: DropdownOption[];
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <div className="relative grid gap-2 sm:col-span-2">
      <span className="text-sm font-bold text-tpc-ink">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border bg-tpc-cream px-4 py-3 text-left text-sm font-semibold outline-none transition ${
          error ? "border-tpc-red" : "border-tpc-mist focus:border-tpc-red"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>
          {selected ? selected.label : <span className="text-tpc-slate/70">{placeholder}</span>}
          {selected?.meta ? (
            <span className="mt-1 block text-[0.68rem] font-black uppercase tracking-[0.14em] text-tpc-red">
              {selected.meta}
            </span>
          ) : null}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-tpc-red transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-tpc-mist bg-white p-2 shadow-2xl"
          role="listbox"
        >
          {options.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${
                  active ? "bg-tpc-red text-white" : "text-tpc-ink hover:bg-tpc-cream"
                }`}
                role="option"
                aria-selected={active}
              >
                <span>
                  {option.label}
                  {option.meta ? (
                    <span className={`mt-1 block text-[0.66rem] uppercase tracking-[0.12em] ${active ? "text-white/70" : "text-tpc-slate"}`}>
                      {option.meta}
                    </span>
                  ) : null}
                </span>
                {active ? <Check size={16} className="shrink-0" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}

      {error ? <p className="text-sm font-bold text-tpc-red">{error}</p> : null}
    </div>
  );
}

export default function Register({ defaultEventSlug = "june" }: RegisterProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [registrationNotice, setRegistrationNotice] = useState<RegistrationNotice | null>(null);
  const [skillInterest, setSkillInterest] = useState("");
  const [skillError, setSkillError] = useState("");
  const initialEvent = registrationEvents.find((event) => event.slug === defaultEventSlug) ?? registrationEvents[0];
  const [selectedEventSlug, setSelectedEventSlug] = useState(initialEvent.slug);
  const selectedEvent = registrationEvents.find((event) => event.slug === selectedEventSlug) ?? registrationEvents[0];
  const isCreatorsConf = selectedEvent.slug === "june";
  const eventOptions = registrationEvents.map((event) => ({
    value: event.slug,
    label: event.title,
    meta: `${event.month} / ${event.status}`,
  }));
  const skillOptions = creatorSkills.map((skill) => ({ value: skill, label: skill }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const skill = String(data.get("skill") || "");

    if (!isCreatorsConf) {
      return;
    }

    if (isCreatorsConf && !skill) {
      setSkillError("Choose the skill track you want to learn.");
      return;
    }

    setSkillError("");
    setSubmitError("");
    setSubmitting(true);
    setSubmitted(false);
    setRegistrationNotice(null);

    try {
      const payload: RegistrationPayload = {
        eventSlug: selectedEvent.slug,
        event: asText(data.get("event")),
        name: asText(data.get("name")),
        email: asText(data.get("email")),
        phone: asText(data.get("phone")),
        city: asText(data.get("city")),
        group: asText(data.get("group")),
        skill,
        notes: asText(data.get("notes")),
      };

      if (registrationEndpoint) {
        const response = await fetch(registrationEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const contentType = response.headers.get("content-type") ?? "";
        const result = contentType.includes("application/json")
          ? ((await response.json()) as Record<string, unknown>)
          : {};

        if (!response.ok) {
          throw new Error(
            typeof result.message === "string"
              ? result.message
              : "We could not send this registration. Please try again."
          );
        }

        const code = [result.rsvpCode, result.code, result.id].find(
          (item): item is string => typeof item === "string"
        );

        setRegistrationNotice({
          ...payload,
          title: "Registration received",
          text: "Your Creator's Conf details have been sent. Watch your email and WhatsApp for the final confirmation from the team.",
          code,
        });
      } else {
        window.open(buildWhatsappRegistrationUrl(payload), "_blank", "noopener,noreferrer");
        setRegistrationNotice({
          ...payload,
          title: "Send this to the team",
          text: "A WhatsApp message has opened with your details. Send it to finish your registration while the full RSVP backend is being connected.",
        });
      }

      setSubmitted(true);
      setSkillInterest("");
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send this registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="register" className="tpc-section bg-tpc-paper">
      <div className="tpc-container">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="tpc-eyebrow">Registration</p>
            <h2 className="tpc-heading mt-4 max-w-xl">
              Register for Creator&apos;s Conf. TPC 2026 is coming.
            </h2>
            <p className="tpc-subheading mt-6">
              Creator&apos;s Conf is open now. Fill this once so the team can confirm your place and send the right reminders. TPC 2026 registration opens later.
            </p>

            <div className="mt-8 grid gap-3">
              {registrationOptions.map((option) => (
                <article key={option.title} className="rounded-[1.2rem] border border-tpc-mist bg-white p-5">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-tpc-red/10 text-tpc-red">
                      <option.icon size={21} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase leading-tight text-tpc-ink">{option.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-tpc-slate">{option.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="tpc-card p-5 sm:p-7 lg:p-8">
            <div className="mb-7 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-tpc-red">{selectedEvent.status}</p>
                <h3 className="mt-2 text-3xl font-black uppercase leading-none text-tpc-ink">{selectedEvent.title}</h3>
              </div>
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-tpc-gold/20 text-tpc-wine sm:flex">
                <Send size={22} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="event" value={selectedEvent.title} />
              <CustomDropdown
                label="Event"
                value={selectedEventSlug}
                options={eventOptions}
                placeholder="Choose a programme"
                onChange={(value) => {
                  setSelectedEventSlug(value);
                  setSubmitted(false);
                  setSubmitError("");
                  setRegistrationNotice(null);

                  if (value !== "june") {
                    setSkillInterest("");
                    setSkillError("");
                  }
                }}
              />

              {isCreatorsConf ? (
                <>
                  <input type="hidden" name="skill" value={skillInterest} />
                  <CustomDropdown
                    label="Skill you want to learn"
                    value={skillInterest}
                    options={skillOptions}
                    placeholder="Choose a skill track"
                    error={skillError}
                    onChange={(value) => {
                      setSkillInterest(value);
                      setSkillError("");
                      setSubmitError("");
                      setSubmitted(false);
                      setRegistrationNotice(null);
                    }}
                  />

                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-tpc-ink">Full name</span>
                    <input name="name" className="h-12 rounded-2xl border border-tpc-mist bg-tpc-cream px-4 text-sm font-semibold outline-none focus:border-tpc-red" required />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-tpc-ink">Email</span>
                    <input name="email" type="email" className="h-12 rounded-2xl border border-tpc-mist bg-tpc-cream px-4 text-sm font-semibold outline-none focus:border-tpc-red" required />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-tpc-ink">Phone / WhatsApp</span>
                    <input name="phone" className="h-12 rounded-2xl border border-tpc-mist bg-tpc-cream px-4 text-sm font-semibold outline-none focus:border-tpc-red" required />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-tpc-ink">City</span>
                    <input name="city" className="h-12 rounded-2xl border border-tpc-mist bg-tpc-cream px-4 text-sm font-semibold outline-none focus:border-tpc-red" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-tpc-ink">Church / group</span>
                    <input name="group" className="h-12 rounded-2xl border border-tpc-mist bg-tpc-cream px-4 text-sm font-semibold outline-none focus:border-tpc-red" />
                  </label>
                  <label className="grid gap-2 sm:col-span-2">
                    <span className="text-sm font-bold text-tpc-ink">Notes</span>
                    <textarea name="notes" rows={4} className="resize-none rounded-2xl border border-tpc-mist bg-tpc-cream px-4 py-3 text-sm font-semibold outline-none focus:border-tpc-red" />
                  </label>
                </>
              ) : (
                <div className="sm:col-span-2 rounded-[1.4rem] border border-tpc-gold/50 bg-tpc-gold/10 p-5 sm:p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-tpc-gold/30 text-tpc-wine">
                    <Clock3 size={22} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-tpc-red">
                    Registration has not commenced
                  </p>
                  <h4 className="mt-3 text-2xl font-black uppercase leading-tight text-tpc-ink">
                    TPC 2026 opens after Creator&apos;s Conf.
                  </h4>
                  <p className="mt-3 text-sm font-semibold leading-7 text-tpc-slate">
                    We are keeping this option visible so people know it is coming. The form will open when the team announces TPC 2026 registration.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="/conference" className="tpc-button tpc-button-dark">
                      See schedule
                    </a>
                    <a href={site.whatsapp} className="tpc-button tpc-button-ghost" target="_blank" rel="noopener noreferrer">
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            {isCreatorsConf ? (
              <>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="submit" className="tpc-button tpc-button-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting}>
                    {submitting ? "Sending..." : registrationEndpoint ? "Submit registration" : "Send details on WhatsApp"}
                    <ArrowRight size={16} />
                  </button>
                  <a href={site.whatsapp} className="tpc-button tpc-button-ghost" target="_blank" rel="noopener noreferrer">
                    Ask on WhatsApp
                  </a>
                </div>
                {submitError ? (
                  <p className="mt-4 rounded-2xl bg-tpc-red/10 px-4 py-3 text-sm font-bold text-tpc-red">
                    {submitError}
                  </p>
                ) : null}
                {submitted && registrationNotice ? (
                  <div className="mt-5 rounded-[1.2rem] border border-tpc-sage/20 bg-tpc-sage/10 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-tpc-sage">{registrationNotice.title}</p>
                    {registrationNotice.code ? (
                      <h4 className="mt-2 break-words text-3xl font-black uppercase leading-none text-tpc-ink">
                        {registrationNotice.code}
                      </h4>
                    ) : null}
                    <p className="mt-3 text-sm font-semibold leading-7 text-tpc-slate">
                      {registrationNotice.text}
                    </p>
                    <div className="mt-4 rounded-2xl bg-white p-4 text-sm font-bold leading-6 text-tpc-slate">
                      <p>{registrationNotice.name}</p>
                      <p className="mt-1 break-words">{registrationNotice.email}</p>
                      <p className="mt-1 text-tpc-red">{registrationNotice.skill}</p>
                    </div>
                  </div>
                ) : null}
              </>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
