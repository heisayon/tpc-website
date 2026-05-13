import PageHero from "@/components/PageHero";
import Volunteer from "@/components/Volunteer";

export default function VolunteerPage() {
  return (
    <main>
      <PageHero
        eyebrow="Volunteer"
        title="Serve with prayer, care, and steady hands."
        body="Volunteering is handled through WhatsApp so the team can speak with you properly. July is strictly for the volunteer prayer meeting."
        primary={{ label: "Message the team", href: "/contact" }}
        secondary={{ label: "See schedule", href: "/conference" }}
      />
      <Volunteer />
    </main>
  );
}
