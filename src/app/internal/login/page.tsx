import { InternalLoginForm } from '@/components/internal/InternalLoginForm';

export default function InternalLoginPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] px-4 py-10 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl space-y-5">
        <header className="space-y-2 rounded-2xl border border-[#26324A] bg-[#111827] p-6 shadow-lg shadow-black/20">
          <h1 className="text-2xl font-semibold text-[#FFFBF5]">Acceso interno</h1>
          <p className="text-sm text-slate-300">Ingresá la contraseña local para acceder al dashboard interno.</p>
        </header>

        <InternalLoginForm />
      </div>
    </main>
  );
}
