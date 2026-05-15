import { InternalChatWidget } from '@/components/chat/InternalChatWidget';
import { AILeadIntelligenceSection } from '@/components/sections/AILeadIntelligenceSection';
import { ContactFormSection } from '@/components/sections/ContactFormSection';
import { CredibilityStripSection } from '@/components/sections/CredibilityStripSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProductShowcaseSection } from '@/components/sections/ProductShowcaseSection';
import { ProjectDiagnosisSection } from '@/components/sections/ProjectDiagnosisSection';
import { ProjectTypesSection } from '@/components/sections/ProjectTypesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';

export default function HomePage() {
  return (
    <main className="bg-[#0B1020] text-[#F8FAFC]">
      <HeroSection />
      <CredibilityStripSection />
      <WhyUsSection />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <ProductShowcaseSection />
      <AILeadIntelligenceSection />
      <ProjectTypesSection />
      <ProcessSection />
      <ProjectDiagnosisSection />
      <ContactFormSection />
      <FinalCtaSection />
      <Footer />
      <InternalChatWidget />
    </main>
  );
}
