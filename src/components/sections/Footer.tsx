import { Container } from '@/components/ui/Container';

export function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Soluciones: ['Desarrollo web', 'Sistemas internos', 'MVP SaaS', 'Dashboards'],
    Proceso: ['Diagnóstico', 'Roadmap', 'Implementación', 'Evolución'],
    'IA local': ['Resumen comercial', 'Lead scoring', 'Ollama opcional', 'Soporte humano'],
  } as const;

  return (
    <footer className="footer-depth relative overflow-hidden border-t border-[#26324A] py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[url('/visual/arc-flow.svg')] bg-cover bg-top opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[#7C3AED]/12 blur-3xl" />

      <Container className="relative z-10 space-y-8">
        <div className="grid gap-8 border-b border-[#26324A] pb-8 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="space-y-3">
            <p className="text-xl font-semibold text-[#FFFBF5]">Yoryi AI Studio</p>
            <p className="max-w-sm text-sm leading-6 text-[#A8B6CC]">
              Desarrollo web, sistemas e IA local aplicada para equipos que quieren crecer con dirección tecnológica.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {['in', 'x', 'gh'].map((item) => (
                <span key={item} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#26324A] bg-[#0B1020]/70 text-xs font-semibold text-[#CBD5E1]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {Object.entries(links).map(([title, sectionLinks]) => (
              <div key={title}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C4B5FD]">{title}</p>
                <ul className="mt-3 space-y-2">
                  {sectionLinks.map((link) => (
                    <li key={link} className="text-sm text-[#A8B6CC]">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs text-[#8EA0BC] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Apps Marketing / Yoryi AI Studio. Todos los derechos reservados.</p>
          <p>IA local opcional con Ollama. Sin envío a terceros ni decisiones automáticas.</p>
        </div>
      </Container>
    </footer>
  );
}
