import FAQ from "@/components/FAQ";
import PageHero from "@/components/PageHero";
import Register from "@/components/Register";

export default function RegisterPage() {
  return (
    <main>
      <PageHero
        eyebrow="Register"
        title="One form. Choose the programme."
        body="Creator’s Conf is open now.
TPC 2026 registration has not started yet.
For school outreach, volunteering, and group enquiries, please message the team on WhatsApp."
        primary={{ label: "Fill the form", href: "#register" }}
        secondary={{ label: "Ask a question", href: "/contact" }}
      />
      <Register defaultEventSlug="june" />
      <FAQ />
    </main>
  );
}
