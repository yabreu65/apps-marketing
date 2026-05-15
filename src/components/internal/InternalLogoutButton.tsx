'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function InternalLogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    try {
      await fetch('/api/internal/logout', { method: 'POST' });
      router.replace('/internal/login');
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="rounded-lg border border-slate-500/40 bg-slate-700/30 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700/50 disabled:opacity-60"
    >
      {isSubmitting ? 'Saliendo...' : 'Cerrar sesión'}
    </button>
  );
}
