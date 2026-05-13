import About from "@/components/About";
import Conference from "@/components/Conference";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Merch from "@/components/Merch";
import Register from "@/components/Register";
import Support from "@/components/Support";
import Volunteer from "@/components/Volunteer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Marquee />
      <Conference compact />
      <Register />
      <Merch compact />
      <Volunteer />
      <Support />
      <Gallery />
      <FAQ />
      <Contact />
    </main>
  );
}
