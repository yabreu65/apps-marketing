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

export function buildLeadWhereInput(filters: LeadDashboardFilters) {
  const searchFilter = filters.q
    ? {
        OR: [
          { name: { contains: filters.q, mode: 'insensitive' as const } },
          { email: { contains: filters.q, mode: 'insensitive' as const } },
          { phone: { contains: filters.q, mode: 'insensitive' as const } },
          { businessType: { contains: filters.q, mode: 'insensitive' as const } },
          { serviceInterest: { contains: filters.q, mode: 'insensitive' as const } },
          { message: { contains: filters.q, mode: 'insensitive' as const } },
        ],
      }
    : {};

  return {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.source ? { source: filters.source } : {}),
    ...(filters.serviceInterest ? { serviceInterest: filters.serviceInterest } : {}),
    ...searchFilter,
  };
}
