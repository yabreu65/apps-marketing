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

export type ProjectTypeItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  idealFor: string;
  outcome: string;
  statusLabel: 'Disponible ahora' | 'Proyecto a medida' | 'Fase avanzada';
};

export type OfferPackageItem = {
  id: string;
  title: string;
  subtitle: string;
  idealFor: string;
  includes: string[];
  outcome: string;
  statusLabel: 'Disponible ahora' | 'Proyecto a medida' | 'Fase avanzada';
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
