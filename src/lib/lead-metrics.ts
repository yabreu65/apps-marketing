import { buildLeadScore } from '@/lib/lead-score';
import { LEAD_STATUSES, isLeadStatus, type LeadStatus } from '@/lib/lead-status';

export type LeadDashboardMetrics = {
  total: number;
  byStatus: Record<LeadStatus, number>;
  highPotential: number;
  uncontacted: number;
  topServiceInterest: {
    name: string;
    count: number;
  } | null;
};

type LeadMetricsInput = {
  status: string;
  serviceInterest: string;
  message: string;
  source: string;
  email?: string | null;
  phone?: string | null;
  businessType?: string | null;
};

function createStatusBucket(): Record<LeadStatus, number> {
  const bucket = {} as Record<LeadStatus, number>;

  for (const status of LEAD_STATUSES) {
    bucket[status] = 0;
  }

  return bucket;
}

export function buildLeadDashboardMetrics(leads: LeadMetricsInput[]): LeadDashboardMetrics {
  const byStatus = createStatusBucket();
  const serviceInterestCount = new Map<string, number>();

  let highPotential = 0;
  let uncontacted = 0;

  for (const lead of leads) {
    const normalizedStatus = lead.status.trim().toLowerCase();

    if (isLeadStatus(normalizedStatus)) {
      byStatus[normalizedStatus] += 1;
    }

    if (normalizedStatus === 'new') {
      uncontacted += 1;
    }

    const score = buildLeadScore({
      serviceInterest: lead.serviceInterest,
      businessType: lead.businessType,
      message: lead.message,
      source: lead.source,
      status: lead.status,
      email: lead.email,
      phone: lead.phone,
    });

    if (score.level === 'high') {
      highPotential += 1;
    }

    const normalizedServiceInterest = lead.serviceInterest.trim();
    if (normalizedServiceInterest.length > 0) {
      serviceInterestCount.set(normalizedServiceInterest, (serviceInterestCount.get(normalizedServiceInterest) ?? 0) + 1);
    }
  }

  const topServiceInterest = Array.from(serviceInterestCount.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }

      return a[0].localeCompare(b[0], 'es');
    })
    .at(0);

  return {
    total: leads.length,
    byStatus,
    highPotential,
    uncontacted,
    topServiceInterest: topServiceInterest
      ? {
          name: topServiceInterest[0],
          count: topServiceInterest[1],
        }
      : null,
  };
}
