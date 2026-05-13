import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { site, supportUses } from "@/lib/site";

export default function Support() {
  return (
    <section id="support" className="tpc-section bg-tpc-ink text-white">
      <div className="tpc-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="tpc-eyebrow text-tpc-gold">Support</p>
            <h2 className="mt-4 max-w-2xl text-[clamp(2.5rem,6vw,5.4rem)] font-black uppercase leading-[0.9]">
            Give because this work matters.
            </h2>
            <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/70 sm:text-lg">
            Your support helps us create spaces where young people can pray, learn the Word, worship, be cared for, and encounter God without unnecessary barriers.

No fixed tiers.
No pressure.
Just give as you are led.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.supportLink} className="tpc-button tpc-button-gold" target="_blank" rel="noopener noreferrer">
                Support TPC
                <ArrowRight size={16} />
              </a>
              <Link href="/contact" className="tpc-button border border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20">
                Talk to us first
              </Link>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-tpc-gold/20 text-tpc-gold">
              <Heart size={22} />
            </div>
            <h3 className="text-3xl font-black uppercase">What support helps carry</h3>
            <ul className="mt-6 grid gap-4">
              {supportUses.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-white/70">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-tpc-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
