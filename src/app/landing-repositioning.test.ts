import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

function readSource(relativePath: string) {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), 'utf-8');
}

describe('PawTech Studio landing repositioning', () => {
  it('updates landing metadata and hero branding', () => {
    const layoutSource = readSource('src/app/layout.tsx');
    const heroSource = readSource('src/components/sections/HeroSection.tsx');

    expect(layoutSource).toContain("title: 'PawTech Studio'");
    expect(layoutSource).toContain('Tecnología que deja huella');
    expect(heroSource).toContain('PawTech Studio');
    expect(heroSource).toContain('Tecnología que deja huella');
  });

  it('uses the new narrative navigation and authority section order', () => {
    const headerSource = readSource('src/components/sections/PublicHeader.tsx');
    const pageSource = readSource('src/app/page.tsx');

    expect(headerSource).toContain("{ label: 'Autoridad', href: '#autoridad' }");
    expect(headerSource).toContain("{ label: 'Casos', href: '#casos' }");
    expect(headerSource).toContain('alt="PawTech Studio"');

    expect(pageSource).toContain("import { AuthorityProductsSection } from '@/components/sections/AuthorityProductsSection';");
    expect(pageSource).not.toContain('<ConceptEcosystemSection />');
    expect(pageSource).not.toContain('<MarketingSection />');
    expect(pageSource).not.toContain('<AILeadIntelligenceSection />');
    expect(pageSource).not.toContain('<ProjectTypesSection />');

    const servicesIndex = pageSource.indexOf('<ServicesSection />');
    const diagnosisIndex = pageSource.indexOf('<ProjectDiagnosisSection />');
    const authorityIndex = pageSource.indexOf('<AuthorityProductsSection />');
    const processIndex = pageSource.indexOf('<ProcessSection />');
    const useCasesIndex = pageSource.indexOf('<UseCasesSection />');
    const contactIndex = pageSource.indexOf('<ContactFormSection />');

    expect(servicesIndex).toBeGreaterThan(-1);
    expect(diagnosisIndex).toBeGreaterThan(servicesIndex);
    expect(authorityIndex).toBeGreaterThan(diagnosisIndex);
    expect(processIndex).toBeGreaterThan(authorityIndex);
    expect(useCasesIndex).toBeGreaterThan(processIndex);
    expect(contactIndex).toBeGreaterThan(useCasesIndex);
  });

  it('aligns services, form options, footer, diagnosis and proof copy', () => {
    const servicesSource = readSource('src/components/sections/ServicesSection.tsx');
    const contactSource = readSource('src/components/sections/ContactFormSection.tsx');
    const footerSource = readSource('src/components/sections/Footer.tsx');
    const diagnosisSource = readSource('src/components/sections/ProjectDiagnosisSection.tsx');
    const useCasesSource = readSource('src/data/use-cases.ts');
    const authoritySource = readSource('src/components/sections/AuthorityProductsSection.tsx');

    expect(servicesSource).toContain('Landing pages');
    expect(servicesSource).toContain('Websites profesionales');
    expect(servicesSource).toContain('Sistemas internos y dashboards');
    expect(servicesSource).toContain('Automatización');
    expect(servicesSource).toContain('Asistentes y chatbots con IA');
    expect(servicesSource).toContain('MVP SaaS');

    expect(contactSource).toContain('Landing pages');
    expect(contactSource).toContain('Websites profesionales');
    expect(contactSource).toContain('Asistentes y chatbots con IA');

    expect(footerSource).toContain('PawTech Studio');
    expect(footerSource).toContain('Tecnología que deja huella');
    expect(diagnosisSource).toContain('PawTech Studio');

    expect(useCasesSource).toContain('PawTech Studio');
    expect(authoritySource).toContain('BuildingOS');
    expect(authoritySource).toContain('CocinaCore');
    expect(authoritySource).toContain("href: '#'");
  });
});
