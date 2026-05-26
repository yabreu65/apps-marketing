import { Container } from '@/components/ui/Container';

const socialLinks = [
  {
    label: 'LinkedIn',
    short: 'in',
    href: 'https://www.linkedin.com',
  },
  {
    label: 'X',
    short: 'x',
    href: 'https://x.com',
  },
  {
    label: 'GitHub',
    short: 'gh',
    href: 'https://github.com/yoryiabreu',
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Soluciones: ['Desarrollo web', 'Sistemas internos', 'MVP SaaS', 'Dashboards'],
    Proceso: ['Diagnóstico', 'Roadmap', 'Implementación', 'Evolución'],
    'IA local': ['Resumen comercial', 'Priorización comercial', 'Ollama opcional', 'Soporte humano'],
  } as const;

  return (
    <footer className="footer-depth relative overflow-hidden border-t border-[var(--border-subtle)] py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[url('/visual/arc-flow.svg')] bg-cover bg-top opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-36 w-[28rem] -translate-x-1/2 rounded-full bg-[var(--purple-primary)]/12 blur-3xl" />

      <Container className="relative z-10 space-y-8">
        <div className="grid gap-8 border-b border-[var(--border-subtle)] pb-8 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="space-y-3">
            <p className="text-xl font-semibold text-[var(--warm-white)]">PAW Tech</p>
            <p className="max-w-sm text-sm leading-6 text-[var(--text-soft)]">
              Desarrollo web, sistemas e IA local aplicada para equipos que quieren crecer con dirección tecnológica.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 text-xs font-semibold text-[var(--text-secondary)] transition hover:border-[var(--purple-soft)]/45 hover:text-[var(--text-bright)]"
                >
                  {item.short}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {Object.entries(links).map(([title, sectionLinks]) => (
              <div key={title}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-accent)]">{title}</p>
                <ul className="mt-3 space-y-2">
                  {sectionLinks.map((link) => (
                    <li key={link} className="text-sm text-[var(--text-soft)]">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs text-[var(--text-soft-2)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PAW Tech / Yoryi AI Studio. Todos los derechos reservados.</p>
          <p>IA local opcional con Ollama. Sin envío a terceros ni decisiones automáticas.</p>
        </div>
      </Container>
    </footer>
  );
}
