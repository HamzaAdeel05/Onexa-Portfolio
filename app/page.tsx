
import AboutSection from "./_components/About";
import Contact from "./_components/Contact";
import ContactSection from "./_components/ContactLast";
import HeroSections from "./_components/HeroSections";
import ProcessSection from "./_components/HowWeWork";
import SelectedWork from "./_components/SelectedWork";
import ServicesSection from "./_components/Services";
import TechnologySection from "./_components/TechnologySection";

export default function Home() {
  return (
    <main>
      <HeroSections />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <SelectedWork />
      <Contact />
      <TechnologySection />
      <ContactSection />
    </main>
  );
}
