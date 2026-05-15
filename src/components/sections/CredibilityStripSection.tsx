import { Container } from '@/components/ui/Container';

const segments = [
  'Web + sistemas',
  'MVP SaaS',
  'Dashboards internos',
  'IA local con Ollama',
  'Sin envío a terceros',
  'Diagnóstico comercial',
];

export function CredibilityStripSection() {
  return (
    <section className="tech-strip-glow relative overflow-hidden border-b border-[#26324A] py-6 sm:py-8">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[url('/visual/arc-flow.svg')] bg-cover bg-center opacity-75" />
      <Container>
        <div className="glass-card rounded-[1.65rem] border border-[#A78BFA]/20 px-4 py-4 sm:px-5">
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A8B6CC]">Ecosistema de capacidades reales</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {segments.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-full border border-[#26324A] bg-[#070B18]/75 px-3 py-1.5 text-[11px] font-medium text-[#CBD5E1]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_14px_rgba(167,139,250,0.9)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
