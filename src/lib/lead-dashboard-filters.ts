import type { Prisma } from '@prisma/client';

export type LeadDashboardFilters = {
  status?: string;
  source?: string;
  serviceInterest?: string;
  q?: string;
};

export function getSingleSearchParam(value: string | string[] | undefined): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (Array.isArray(value) && typeof value[0] === 'string') {
    const trimmed = value[0].trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return undefined;
}

export function extractLeadFiltersFromRecord(searchParams: Record<string, string | string[] | undefined>): LeadDashboardFilters {
  return {
    status: getSingleSearchParam(searchParams.status),
    source: getSingleSearchParam(searchParams.source),
    serviceInterest: getSingleSearchParam(searchParams.serviceInterest),
    q: getSingleSearchParam(searchParams.q),
  };
}

export function extractLeadFiltersFromUrl(url: URL): LeadDashboardFilters {
  return {
    status: getSingleSearchParam(url.searchParams.get('status') ?? undefined),
    source: getSingleSearchParam(url.searchParams.get('source') ?? undefined),
    serviceInterest: getSingleSearchParam(url.searchParams.get('serviceInterest') ?? undefined),
    q: getSingleSearchParam(url.searchParams.get('q') ?? undefined),
  };
}

export function buildLeadWhereInput(filters: LeadDashboardFilters): Prisma.LeadWhereInput {
  return {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.source ? { source: filters.source } : {}),
    ...(filters.serviceInterest ? { serviceInterest: filters.serviceInterest } : {}),
    ...(filters.q
      ? {
          OR: [
            { name: { contains: filters.q, mode: 'insensitive' } },
            { email: { contains: filters.q, mode: 'insensitive' } },
            { phone: { contains: filters.q, mode: 'insensitive' } },
            { businessType: { contains: filters.q, mode: 'insensitive' } },
            { serviceInterest: { contains: filters.q, mode: 'insensitive' } },
            { message: { contains: filters.q, mode: 'insensitive' } },
          ],
        }
      : {}),
  };
}
