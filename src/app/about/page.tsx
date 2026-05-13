import About from "@/components/About";
import Contact from "@/components/Contact";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About the movement"
        title="Young people can burn for God without pretending."
        body="TPC is for honest hunger: prayer, the Word, worship, discipline, friendship, service, and the kind of fire that remains after the programme ends."
        primary={{ label: "See schedule", href: "/conference" }}
        secondary={{ label: "Message the team", href: "/contact" }}
      />
      <About />
      <Contact />
    </main>
  );
}
