'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { LEAD_STATUSES, getLeadStatusLabel } from '@/lib/lead-status';

type LeadStatusUpdaterProps = {
  leadId: string;
  currentStatus: string;
};

export function LeadStatusUpdater({ leadId, currentStatus }: LeadStatusUpdaterProps) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  const hasRealChange = useMemo(() => selectedStatus !== currentStatus, [selectedStatus, currentStatus]);

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setInfoMessage(null);

    if (!hasRealChange) {
      setInfoMessage('Seleccioná un estado diferente para actualizar.');
      return;
    }

    const response = await fetch(`/api/admin/leads/${leadId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: selectedStatus }),
    });

    const data = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

    if (!response.ok || !data?.ok) {
      setError(data?.message ?? 'No se pudo actualizar el estado del lead.');
      return;
    }

    setSuccessMessage('Estado actualizado correctamente.');
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-3 rounded-2xl border border-[#26324A] bg-[#151B2E] p-5">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-slate-400">Estado comercial</p>
        <p className="text-sm text-slate-300">Actualizá el estado del lead para reflejar el avance del seguimiento.</p>
      </div>

      <div className="flex flex-col gap-2">
        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-orange-400 focus:outline-none"
          disabled={isPending}
        >
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {getLeadStatusLabel(status)}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isPending || !hasRealChange}
          className="rounded-lg border border-orange-500/40 bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-100 hover:bg-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Actualizando estado...' : 'Guardar estado'}
        </button>
      </div>

      {infoMessage ? <p className="text-sm text-slate-300">{infoMessage}</p> : null}
      {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </form>
  );
}
