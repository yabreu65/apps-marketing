import { InternalLoginForm } from '@/components/internal/InternalLoginForm';
import { normalizeInternalRedirect } from '@/lib/internal-auth';

type InternalLoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InternalLoginPage({ searchParams }: InternalLoginPageProps) {
  const params = (await searchParams) ?? {};
  const rawRedirect = typeof params.redirect === 'string' ? params.redirect : undefined;
  const redirect = normalizeInternalRedirect(rawRedirect);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] px-4 py-10 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl space-y-5">
        <header className="space-y-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 shadow-lg shadow-black/20">
          <h1 className="text-2xl font-semibold text-[var(--warm-white)]">Acceso interno</h1>
          <p className="text-sm text-slate-300">
            ingresa la contraseña de acceso interno. Esta protección es mínima y solo para entorno local.
          </p>
        </header>

        <InternalLoginForm redirect={redirect} />
      </div>
    </main>
  );
}
