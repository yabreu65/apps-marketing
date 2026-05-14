export type RecommendedSolution =
  | 'Landing comercial'
  | 'Sitio web profesional'
  | 'Sistema web a medida'
  | 'Dashboard / panel interno'
  | 'MVP SaaS'
  | 'Automatización comercial'
  | 'IA aplicada al negocio (fase avanzada)';

export type DiagnosisOption = {
  id: string;
  label: string;
  value: string;
};

export type DiagnosisQuestion = {
  id: 'goal' | 'stage' | 'urgency';
  title: string;
  options: DiagnosisOption[];
};

export type DiagnosisResult = {
  recommendedSolution: RecommendedSolution;
  rationale: string;
  nextAction: string;
};
