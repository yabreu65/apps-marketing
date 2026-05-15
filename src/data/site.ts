import type { ContactOption, NavItem, SiteMetadata } from '@/types/site';

export const siteMetadata: SiteMetadata = {
  title: 'Apps Marketing / Yoryi AI Studio',
  description:
    'Landing comercial para desarrollo web, marketing digital e inteligencia artificial aplicada a negocios.',
};

export const navItems: NavItem[] = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Casos de uso', href: '#casos' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Contacto', href: '#contacto' },
];

export const contactOptions: ContactOption[] = [
  {
    label: 'WhatsApp (manual)',
    value: '+54 9 11 0000 0000',
    href: 'https://wa.me/5491100000000',
  },
];
