'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Servicios', href: '#soluciones' },
  { label: 'Proyectos', href: '#ruta-etapa' },
  { label: 'Ecosistema', href: '#ecosistema' },
  { label: 'Diagnóstico', href: '#diagnostico' },
  { label: 'Contacto', href: '#contacto' },
];

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 py-6 z-50  bg-transparent backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center px-1 py-1 transition hover:scale-[1.02] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--purple-soft)]"
          >
            <img src="/logo_pawtech.svg" alt="Apps Marketing" className="h-12 w-auto sm:h-14 lg:h-20 xl:h-24" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--purple-soft)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="#diagnostico"
              className="hover-lift inline-flex h-11 items-center rounded-full bg-[var(--orange-cta)] px-5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(245,158,11,0.3)] transition hover:bg-[var(--orange-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] focus-visible:ring-orange-300"
            >
              Solicitar diagnóstico
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-shell-2)] text-[var(--text-primary)] transition hover:border-slate-400/60 hover:bg-[var(--bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] focus-visible:ring-cyan-300 lg:hidden"
          >
            <span className="sr-only">{mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
            <span className="relative block h-4 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 rounded bg-current transition ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-4 rounded bg-current transition ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-4 rounded bg-current transition ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[color:rgba(5,9,22,0.96)] transition duration-300 lg:hidden ${mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-28">
          <nav className="space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="motion-fade-up block rounded-2xl border border-[var(--border-subtle)]/90 bg-[var(--bg-secondary)]/55 px-5 py-4 text-lg font-medium text-[var(--text-primary)] transition hover:border-cyan-300/50 hover:bg-[var(--bg-secondary)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <Link
              href="#diagnostico"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--orange-cta)] px-5 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(245,158,11,0.32)] transition hover:bg-[var(--orange-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Solicitar diagnóstico
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
