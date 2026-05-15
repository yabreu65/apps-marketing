'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function InternalLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/internal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

      if (!response.ok || !data?.ok) {
        setError(data?.message ?? 'No se pudo iniciar sesión interna.');
        return;
      }

      router.replace('/internal/leads');
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#26324A] bg-[#151B2E] p-6">
      <div>
        <label htmlFor="internal-password" className="mb-1 block text-sm font-medium text-slate-200">
          Contraseña interna
        </label>
        <input
          id="internal-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-orange-400 focus:outline-none"
          placeholder="Ingresá la contraseña"
        />
      </div>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg border border-orange-500/40 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-100 hover:bg-orange-500/30 disabled:opacity-60"
      >
        {isSubmitting ? 'Validando...' : 'Ingresar al dashboard interno'}
      </button>
    </form>
  );
}
