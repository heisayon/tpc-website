"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { schedule, site, type ScheduleItem } from "@/lib/site";

type RuntimeEventConfig = {
  open?: boolean;
  label?: string;
  message?: string;
  date?: string;
  time?: string;
  venue?: string;
};

const configEndpoint =
  process.env.NEXT_PUBLIC_TPC_CONFIG_ENDPOINT ??
  site.configEndpoint ??
  (process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT
    ? `${process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT}?action=config`
    : "");

function statusClass(status: ScheduleItem["status"]) {
  if (status === "open") return "bg-tpc-red text-white";
  if (status === "pending") return "bg-tpc-gold text-tpc-ink";
  if (status === "team") return "bg-tpc-sage text-white";
  return "bg-tpc-mist text-tpc-slate";
}

function cleanLabel(label: string, status: ScheduleItem["status"]) {
  if (status === "open" && /closed|not open|not commenced/i.test(label)) return "Register now";
  if (status === "closed" && /register|open/i.test(label)) return "Closed";
  return label;
}

export default function YearSchedule({ compact = false }: { compact?: boolean }) {
  const [runtimeEvents, setRuntimeEvents] = useState<Record<string, RuntimeEventConfig>>({});
  const items = compact ? schedule.slice(2) : schedule;

  useEffect(() => {
    if (!configEndpoint) return;

    let active = true;

    fetch(configEndpoint, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((config: { events?: Record<string, RuntimeEventConfig> } | null) => {
        if (active && config?.events) {
          setRuntimeEvents(config.events);
        }
      })
      .catch(() => {
        if (active) {
          setRuntimeEvents({});
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="grid gap-3">
        {items.map((item) => {
          const runtime = runtimeEvents[item.slug];
          const effectiveStatus: ScheduleItem["status"] =
            runtime?.open === false && item.status === "open"
              ? "closed"
              : runtime?.open === true && item.status === "pending"
                ? "open"
                : item.status;
          const label = cleanLabel(runtime?.label ?? (effectiveStatus === "closed" ? "Closed" : item.label), effectiveStatus);
          const description = runtime?.message ?? item.description;
          const details = [runtime?.date, runtime?.time, runtime?.venue].filter(Boolean).join(" | ");
          const unavailable = effectiveStatus === "past" || effectiveStatus === "closed";
          return (
            <article
              key={item.slug}
              className={`rounded-[1.2rem] border p-5 transition ${
                unavailable
                  ? "border-tpc-mist bg-white/60 text-tpc-slate"
                  : "border-tpc-ink/10 bg-white text-tpc-ink shadow-sm hover:-translate-y-1 hover:shadow-lift"
              }`}
            >
              <div className="grid gap-4 sm:grid-cols-[5rem_1fr_auto] sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tpc-ink text-xl font-black text-white">
                  {item.month}
                </div>
                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] ${statusClass(effectiveStatus)}`}>
                      {label}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-black uppercase leading-tight ${unavailable ? "line-through decoration-2" : ""}`}>
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-6">{description}</p>
                  {details ? (
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-tpc-red">{details}</p>
                  ) : null}
                </div>
                {item.registerHref && effectiveStatus === "open" ? (
                  <Link href={item.registerHref} className="tpc-button tpc-button-primary w-fit whitespace-nowrap">
                    Register
                    <ArrowRight size={15} />
                  </Link>
                ) : item.enquiryHref ? (
                  <a href={item.enquiryHref} className="tpc-button tpc-button-ghost w-fit whitespace-nowrap" target="_blank" rel="noopener noreferrer">
                    Enquire
                    <ArrowRight size={15} />
                  </a>
                ) : (
                  <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-tpc-cream text-tpc-red sm:flex">
                    <item.icon size={20} />
                  </div>
                )}
              </div>
            </article>
          );
        })}
    </div>
  );
}
