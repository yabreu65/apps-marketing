import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="bg-[#0B1020] py-8">
      <Container className="flex flex-col gap-3 border-t border-[#26324A] pt-6 text-sm text-[#94A3B8] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Apps Marketing / Yoryi AI Studio</p>
        <p>Soluciones web, marketing e IA aplicada para negocios que quieren crecer con tecnología.</p>
      </Container>
    </footer>
  );
}
