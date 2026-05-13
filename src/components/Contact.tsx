import { Instagram, Mail, MessageCircle } from "lucide-react";
import { contacts, emailDirectory, site } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="tpc-section bg-tpc-cream">
      <div className="tpc-container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="tpc-eyebrow">Contact</p>
          <h2 className="tpc-heading mt-4">Need clarity? Reach the team.</h2>
          <p className="tpc-subheading mt-5">
            Use WhatsApp for volunteering, school outreach, groups, and quick enquiries. Use email when the message needs detail.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {contacts.map((contact) => {
            return (
              <a
                key={contact.label}
                href={contact.href}
                className="tpc-card tpc-card-hover flex min-h-[260px] min-w-0 flex-col items-center justify-center p-7 text-center sm:p-8"
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-tpc-red/10 text-tpc-red">
                  <contact.icon size={22} />
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-tpc-slate">{contact.label}</p>
                <h3 className="mx-auto mt-3 max-w-[15rem] break-words text-[clamp(1.55rem,2.2vw,2rem)] font-black leading-tight text-tpc-ink">
                  {contact.value}
                </h3>
                <p className="mx-auto mt-4 max-w-[17rem] text-sm font-semibold leading-6 text-tpc-slate">{contact.note}</p>
              </a>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={site.whatsapp} className="tpc-button tpc-button-primary" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} />
            Message the team
          </a>
          <a href={`mailto:${site.email}`} className="tpc-button tpc-button-ghost">
            <Mail size={16} />
            Send us a mail
          </a>
          <a href={site.instagram} className="tpc-button tpc-button-ghost" target="_blank" rel="noopener noreferrer">
            <Instagram size={16} />
            Follow updates
          </a>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="mb-5 text-center">
            <p className="tpc-eyebrow">Email desk</p>
            <h3 className="mt-3 text-3xl font-black uppercase leading-none text-tpc-ink sm:text-4xl">
              Use the right inbox.
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {emailDirectory.map((item) => (
              <a
                key={item.email}
                href={`mailto:${item.email}`}
                className="rounded-[1.2rem] border border-tpc-mist bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-tpc-gold hover:shadow-lift"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-tpc-red">{item.label}</p>
                <p className="mt-2 break-all text-base font-black text-tpc-ink">{item.email}</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-tpc-slate">{item.note}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
