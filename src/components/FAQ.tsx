"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/site";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="tpc-section bg-white">
      <div className="tpc-container grid gap-10 lg:grid-cols-[22rem_1fr]">
        <div>
          <p className="tpc-eyebrow">FAQ</p>
          <h2 className="mt-4 font-display text-4xl leading-none text-tpc-ink sm:text-5xl">
            Questions, answered cleanly.
          </h2>
          <p className="mt-5 text-sm leading-6 text-tpc-slate">
            Keep this section updated as registration, venue, transport, and merch details become final.
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-tpc-mist bg-tpc-cream">
          {faqs.map((faq, index) => {
            const active = open === index;
            return (
              <div key={faq.q} className="border-b border-tpc-mist last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(active ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
                  aria-expanded={active}
                >
                  <span className={`font-bold transition ${active ? "text-tpc-red" : "text-tpc-ink"}`}>
                    {faq.q}
                  </span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${active ? "bg-tpc-red text-white" : "bg-white text-tpc-ink"}`}>
                    {active ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                {active ? (
                  <div className="px-5 pb-6 sm:px-7">
                    <p className="max-w-3xl text-sm leading-7 text-tpc-slate">{faq.a}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
