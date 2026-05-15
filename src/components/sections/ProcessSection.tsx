import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  { step: 1, title: 'Entendemos el negocio', description: 'Objetivo comercial, contexto operativo y prioridad real de implementación.' },
  { step: 2, title: 'Definimos la solución', description: 'Elegimos la arquitectura correcta: landing, web, sistema interno o MVP SaaS.' },
  { step: 3, title: 'Construimos el producto', description: 'Desarrollamos una versión usable y profesional enfocada en conversión y operación.' },
  { step: 4, title: 'Medimos y mejoramos', description: 'Iteramos con datos reales para escalar con menor fricción técnica y comercial.' },
];

export function ProcessSection() {
  return (
    <section className="border-b border-[#26324A] bg-[#0B1020] py-16 sm:py-20">
      <Container className="space-y-8">
        <SectionHeading
          eyebrow="How it works"
          title="Un proceso simple para construir con foco en negocio"
          description="Trabajamos en ciclos cortos y claros para pasar de idea a solución implementada sin perder foco comercial."
        />

        <ol className="grid gap-4 md:grid-cols-2" aria-label="Proceso de trabajo">
          {steps.map((step) => (
            <li key={step.step} className="rounded-2xl border border-[#26324A] bg-[#151B2E] p-5 shadow-[0_10px_30px_rgba(11,16,32,0.35)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA]">Paso {step.step}</p>
              <h3 className="mt-2 text-lg font-semibold text-[#FFFBF5]">{step.title}</h3>
              <p className="mt-2 text-sm text-[#CBD5E1]">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
