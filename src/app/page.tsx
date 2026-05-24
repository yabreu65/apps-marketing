import { ContactFormSection } from '@/components/sections/ContactFormSection';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AILeadIntelligenceSection } from '@/components/sections/AILeadIntelligenceSection';
import { MarketingSection } from '@/components/sections/MarketingSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ProjectDiagnosisSection } from '@/components/sections/ProjectDiagnosisSection';
import { ProjectTypesSection } from '@/components/sections/ProjectTypesSection';
import { PublicHeader } from '@/components/sections/PublicHeader';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { PublicLeadAssistantWidget } from '@/modules/lead-assistant/components/PublicLeadAssistantWidget';

export default function HomePage() {
  return (
    <main className="bg-[var(--bg-primary)] pb-24 text-[var(--text-primary)] md:pb-0">
      <PublicHeader />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <ProjectTypesSection />
      <MarketingSection />
      <AILeadIntelligenceSection />
      <ProjectDiagnosisSection />
      <ProcessSection />
      <UseCasesSection />
      <ContactFormSection />
      <Footer />
      <PublicLeadAssistantWidget />
    </main>
  );
}
