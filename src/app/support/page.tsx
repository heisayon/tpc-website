import Contact from "@/components/Contact";
import PageHero from "@/components/PageHero";
import Support from "@/components/Support";

export default function SupportPage() {
  return (
    <main>
      <PageHero
        eyebrow="Support TPC"
        title="Support is open-hearted, not priced."
        body="There is no fixed amount. If you believe in what God is doing with young people through TPC, support as you are led."
        primary={{ label: "Support TPC", href: "#support" }}
        secondary={{ label: "Partner with us", href: "/contact" }}
      />
      <Support />
      <Contact />
    </main>
  );
}
