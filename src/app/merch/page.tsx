import Merch from "@/components/Merch";
import PageHero from "@/components/PageHero";
import Support from "@/components/Support";

export default function MerchPage() {
  return (
    <main>
      <PageHero
        eyebrow="TPC store"
        title="Preview the shirts. Order on Bumpa."
        body="TPC 2026 is Birthing: A Call to Intimacy.
The shirts are part of the theme and the message. Each previewed shirt is NGN 6,000. Final orders, sizes, and availability will be handled on Bumpa."
        primary={{ label: "Browse merch", href: "#merch" }}
        secondary={{ label: "Support TPC", href: "/support" }}
      />
      <Merch />
      <Support />
    </main>
  );
}
