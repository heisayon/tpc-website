import FAQ from "@/components/FAQ";
import PageHero from "@/components/PageHero";
import Register from "@/components/Register";

export default function RegisterPage() {
  return (
    <main>
      <PageHero
        eyebrow="Register"
        title="One form. Choose the programme."
        body="Choose a programme from the form. The site checks the live registration sheet before it opens any registration."
        primary={{ label: "Fill the form", href: "#register" }}
        secondary={{ label: "Ask a question", href: "/contact" }}
      />
      <Register defaultEventSlug="june" />
      <FAQ />
    </main>
  );
}
