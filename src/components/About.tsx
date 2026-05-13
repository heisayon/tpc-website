import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { heroImages, pillars } from "@/lib/site";

const beliefs = [
  "TPC exists to raise a generation of teenagers who know God for themselves and carry him Proudly.",
  "We believe teenagers are not too young to encounter God, understand His Word, and respond with their whole lives.",
  "Prayer is not performance, and fire is not hype. It is a life that stays with God, obeys Him, and carries His presence beyond the meeting.",
  "Our vision is not just to fill a room. It is to see young people awakened, rooted in truth, and set apart for Jesus in their schools, homes, cities, and generation.",
];

export default function About() {
  return (
    <section id="about" className="tpc-section bg-tpc-cream">
      <div className="tpc-container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="tpc-eyebrow">About TPC</p>
            <h2 className="tpc-heading mt-4 max-w-2xl">
              We are not gathering young people to impress them, We are gathering them to meet God.
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[1.3rem] bg-tpc-ink">
            <Image
              src={heroImages.room}
              alt="Young people gathered at TPC"
              width={900}
              height={600}
              className="h-full min-h-[340px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,11,13,0)_35%,rgba(16,11,13,0.82)_100%)]" />
            <p className="absolute bottom-0 left-0 right-0 p-6 text-sm font-bold leading-7 text-white">
             TPC is for the teenager who is curious, the young person who is tired, the quiet one at the back, the one who wants more, and the one who is trying to find their way back to God.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {beliefs.map((belief) => (
            <div key={belief} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-bold leading-6 text-tpc-slate shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-tpc-red" />
              <span>{belief}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="tpc-card tpc-card-hover p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-tpc-red/10 text-tpc-red">
                <pillar.icon size={22} />
              </div>
              <h3 className="text-xl font-black uppercase leading-tight text-tpc-ink">{pillar.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-tpc-slate">{pillar.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/conference" className="tpc-button tpc-button-dark">
            See the 2026 build-up
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
