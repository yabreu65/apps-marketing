import { AILeadIntelligenceSection } from '@/components/sections/AILeadIntelligenceSection';
import { ContactFormSection } from '@/components/sections/ContactFormSection';
import { CredibilityStripSection } from '@/components/sections/CredibilityStripSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProjectDiagnosisSection } from '@/components/sections/ProjectDiagnosisSection';
import { ProjectTypesSection } from '@/components/sections/ProjectTypesSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PublicLeadAssistantWidget } from '@/modules/lead-assistant/components/PublicLeadAssistantWidget';

export default function HomePage() {
  return (
    <main className="bg-[var(--bg-primary)] pb-24 text-[var(--text-primary)] md:pb-0">
      <HeroSection />
      <CredibilityStripSection />
      <ProblemSection />
      <EcosystemSection />
      <ServicesSection />
      <ProjectTypesSection />
      <AILeadIntelligenceSection />
      <ProjectDiagnosisSection />
      <ContactFormSection />
      <FinalCtaSection />
      <Footer />
      <PublicLeadAssistantWidget />
    </main>
  );
}
