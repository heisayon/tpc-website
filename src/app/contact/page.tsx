import Contact from "@/components/Contact";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Need clarity? Message the team."
        body="WhatsApp is best for volunteering, school outreach, group attendance, and quick questions. Email is best for partnerships, invitations, and details that need a clear thread."
        primary={{ label: "Message the team", href: site.whatsapp }}
        secondary={{ label: "Send us a mail", href: `mailto:${site.email}` }}
      />
      <Contact />
    </main>
  );
}
