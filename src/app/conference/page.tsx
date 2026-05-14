import Conference from "@/components/Conference";
import PageHero from "@/components/PageHero";

export default function ConferencePage() {
  return (
    <main>
      <PageHero
        eyebrow="Year schedule"
        title="The 2026 build-up is clear now."
        body="From worship to prayer, outreach, creators, volunteers, and TPC 2026, every gathering is part of the journey."
        primary={{ label: "Check registration", href: "/register" }}
        secondary={{ label: "Support an event", href: "/support" }}
      />
      <Conference />
    </main>
  );
}
