import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { InternalChatWidget } from '@/components/chat/InternalChatWidget';
import { ContactFormSection } from '@/components/sections/ContactFormSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { OfferPackagesSection } from '@/components/sections/OfferPackagesSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProjectDiagnosisSection } from '@/components/sections/ProjectDiagnosisSection';
import { ProjectTypesSection } from '@/components/sections/ProjectTypesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';

export default function HomePage() {
  return (
    <main className="bg-[#0B1020] text-[#F8FAFC]">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <ProjectTypesSection />
      <ProjectDiagnosisSection />
      <OfferPackagesSection />
      <UseCasesSection />
      <BenefitsSection />
      <ProcessSection />
      <ContactFormSection />
      <FinalCtaSection />
      <Footer />
      <InternalChatWidget />
    </main>
  );
}
