import { ContactFormSection } from '@/components/sections/ContactFormSection';
import { DiagnosisCtaSection } from '@/components/sections/DiagnosisCtaSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeBannerSection } from '@/components/sections/MarqueeBannerSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProjectDiagnosisSection } from '@/components/sections/ProjectDiagnosisSection';
import { PublicHeader } from '@/components/sections/PublicHeader';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PublicLeadAssistantWidget } from '@/modules/lead-assistant/components/PublicLeadAssistantWidget';

export default function HomePage() {
  return (
    <main className="bg-[var(--bg-primary)] pb-24 text-[var(--text-primary)] md:pb-0">
      <PublicHeader />
      <HeroSection />
      <MarqueeBannerSection />
      <ProblemSection />
      <ServicesSection />
      <DiagnosisCtaSection />
      <EcosystemSection />
      {/* <ProjectTypesSection /> */}
      <ProjectDiagnosisSection />
      <ContactFormSection />
      <Footer />
      <PublicLeadAssistantWidget />
    </main>
  );
}
