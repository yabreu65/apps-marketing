import type { Metadata } from 'next';
import { Domine, Geist, Inter, Manrope } from 'next/font/google';
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

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://apps-marketing-sage.vercel.app'),
  title: 'PawTech Studio',
  description:
    'PawTech Studio — Tecnología que deja huella con landing pages, websites, sistemas, automatización e IA aplicada para negocios.',
  openGraph: {
    title: 'PawTech Studio',
    description:
      'Tecnología que deja huella con soluciones comerciales y sistemas hechos para negocios que quieren crecer con dirección.',
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
    <html lang="es" className={`${geist.variable} ${inter.variable} ${domine.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
