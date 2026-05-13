import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heroImages } from "@/lib/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

function HeroButton({
  cta,
  variant,
  showArrow = false,
}: {
  cta: { label: string; href: string };
  variant: "primary" | "secondary";
  showArrow?: boolean;
}) {
  const external = cta.href.startsWith("http");
  const mail = cta.href.startsWith("mailto:");
  const className =
    variant === "primary"
      ? "tpc-button tpc-button-gold"
      : "tpc-button border border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20";
  const content = (
    <>
      {cta.label}
      {showArrow ? <ArrowRight size={16} /> : null}
    </>
  );

  if (external || mail) {
    return (
      <a
        href={cta.href}
        className={className}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {content}
    </Link>
  );
}

export default function PageHero({ eyebrow, title, body, primary, secondary }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-tpc-ink pt-32 text-white sm:pt-36">
      <Image
        src={heroImages.teaching}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
        priority={false}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,11,13,0.94),rgba(16,11,13,0.72),rgba(16,11,13,0.5))]" />
      <div className="tpc-container relative z-10 pb-16 pt-8 sm:pb-20 lg:pt-14">
        <p className="tpc-eyebrow text-tpc-gold">{eyebrow}</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <h1 className="max-w-4xl text-[clamp(2.8rem,7vw,6.2rem)] font-black uppercase leading-[0.88]">
            {title}
          </h1>
          <div>
            <p className="max-w-xl text-base font-semibold leading-8 text-white/75 sm:text-lg">{body}</p>
            {(primary || secondary) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {primary ? (
                  <HeroButton cta={primary} variant="primary" showArrow />
                ) : null}
                {secondary ? (
                  <HeroButton cta={secondary} variant="secondary" />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
