export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  phase: 'phase-1' | 'future';
};

export type UseCaseItem = {
  id: string;
  title: string;
  audience: string;
  outcome: string;
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type ContactOption = {
  label: string;
  value: string;
  href: string;
};

export type SiteMetadata = {
  title: string;
  description: string;
};
