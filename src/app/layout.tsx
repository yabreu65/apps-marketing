import type { Metadata } from 'next';
import { Domine, Geist, Inter } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const domine = Domine({
  subsets: ['latin'],
  variable: '--font-domine',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://apps-marketing-sage.vercel.app'),
  title: 'Apps Marketing / Yoryi AI Studio',
  description:
    'Landing comercial para desarrollo web, marketing digital e inteligencia artificial aplicada a negocios.',
  openGraph: {
    title: 'Apps Marketing / Yoryi AI Studio',
    description:
      'Landing comercial para desarrollo web, marketing digital e inteligencia artificial aplicada a negocios.',
    type: 'website',
    locale: 'es_AR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${inter.variable} ${domine.variable}`}>
      <body>{children}</body>
    </html>
  );
}
