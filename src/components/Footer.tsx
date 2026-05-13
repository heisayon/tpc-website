import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Mail, MessageCircle } from "lucide-react";
import { emailDirectory, navItems, site } from "@/lib/site";

const actionLinks = [
  { label: "Volunteer", href: "/volunteer" },
  { label: "Support", href: "/support" },
  { label: "Merch", href: "/merch" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-tpc-ink text-white">
      <div className="border-b border-white/10">
        <div className="tpc-container grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="tpc-eyebrow text-tpc-gold">Keep the fire burning</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black uppercase leading-none text-white sm:text-5xl">
              Come hungry. Bring people. Keep praying after.
            </h2>
          </div>
          <Link href="/conference" className="tpc-button tpc-button-gold w-fit">
            See schedule
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="tpc-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.75fr_1.25fr]">
        <div>
          <Link href="/" className="mb-5 flex items-center gap-3">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <Image src={site.logo} alt="" fill sizes="56px" className="object-contain" />
            </span>
            <span>
              <span className="block text-3xl font-black uppercase leading-none">TPC</span>
              <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-white/40">
                Teens Prayer Conference
              </span>
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-6 text-white/60">{site.description}</p>
          <div className="mt-6 flex gap-2">
            {[
              { icon: Instagram, label: "Instagram", href: site.instagram },
              { icon: MessageCircle, label: "WhatsApp", href: site.whatsapp },
              { icon: Mail, label: "Email", href: `mailto:${site.email}` },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-tpc-gold/70 hover:text-tpc-gold"
              >
                <item.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white/40">Explore</h3>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white/40">Action</h3>
          <ul className="space-y-3">
            {actionLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-white/40">Reach us</h3>
          <div className="space-y-4 text-sm">
            <a href={site.whatsapp} className="block text-white/60 transition hover:text-white">
              {site.whatsappDisplay}
            </a>
            {emailDirectory.map((item) => (
              <a
                key={item.email}
                href={`mailto:${item.email}`}
                className="block break-all text-white/60 transition hover:text-white"
              >
                <span className="block text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-white/30">
                  {item.label}
                </span>
                {item.email}
              </a>
            ))}
            <a href={site.instagram} className="block text-white/60 transition hover:text-white">
              <span className="block text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-white/30">
                Instagram
              </span>
              {site.instagramHandle}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="tpc-container flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Teens Prayer Conference. All rights reserved.</p>
          <p>Non-denominational. Young Adults.Jesus Centered.</p>
        </div>
      </div>
    </footer>
  );
}
