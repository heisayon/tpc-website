import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { heroImages, site, stats } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative min-h-[88svh] overflow-hidden bg-tpc-ink pt-28 text-white sm:pt-32">
      <Image
        src={heroImages.main}
        alt="Teenagers praying at Teens Prayer Conference"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,6,7,0.92)_0%,rgba(8,6,7,0.78)_46%,rgba(8,6,7,0.28)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(0deg,#100b0d,rgba(16,11,13,0))]" />

      <div className="tpc-container relative z-10 flex min-h-[calc(88svh-7rem)] flex-col justify-center pb-12 sm:pb-16">
        <div className="max-w-4xl min-w-0">
          <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-tpc-honey">
            {site.tagline}
          </p>
          <h1 className="max-w-[9.8ch] text-[clamp(2.35rem,11.5vw,8.8rem)] font-black uppercase leading-[0.88] tracking-normal sm:max-w-4xl sm:leading-[0.82]">
            <span className="block">Teens</span>
            <span className="block">Prayer</span>
            <span className="block">Conference</span>
            <span className="block">2026</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm font-semibold leading-7 text-white/80 sm:mt-7 sm:text-xl sm:leading-8">
            Birthing: A Call to Intimacy.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:mt-9">
            <Link href="/register" className="tpc-button tpc-button-gold">
              Register
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/conference"
              className="tpc-button border border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20"
            >
              <CalendarDays size={17} />
              See 2026 schedule
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-3xl grid-cols-3 gap-3 border-t border-white/20 pt-5 text-center sm:mt-14 sm:gap-4 sm:pt-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-black uppercase leading-none text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[0.58rem] font-extrabold uppercase tracking-[0.12em] text-white/50 sm:text-xs sm:tracking-[0.16em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
