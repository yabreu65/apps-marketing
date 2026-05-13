import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { ContactFormSection } from '@/components/sections/ContactFormSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';
import { Footer } from '@/components/sections/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
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
      <UseCasesSection />
      <BenefitsSection />
      <ProcessSection />
      <ContactFormSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
