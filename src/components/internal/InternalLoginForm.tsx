'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type InternalLoginFormProps = {
  redirect: string;
};

function getLoginErrorMessage(status: number | undefined, apiMessage?: string) {
  if (status === 401) return 'Credenciales inválidas.';
  if (status === 429) return 'Demasiados intentos. Esperá unos minutos antes de volver a intentar.';
  if (status === 503) return 'La autenticación interna no está configurada correctamente.';
  return apiMessage ?? 'No se pudo iniciar sesión interna.';
}

export function InternalLoginForm({ redirect }: InternalLoginFormProps) {
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
        body: JSON.stringify({ password, redirect }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; redirectTo?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setError(getLoginErrorMessage(response.status, data?.message));
        return;
      }

      router.replace(data.redirectTo ?? '/internal/leads');
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-6">
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
          placeholder="ingresa la contraseña"
        />
      </div>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg border border-orange-500/40 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-100 hover:bg-orange-500/30 disabled:opacity-60"
      >
        {isSubmitting ? 'Validando acceso...' : 'Ingresar al dashboard interno'}
      </button>
    </form>
  );
}
