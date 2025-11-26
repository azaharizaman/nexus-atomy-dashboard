
export interface Package {
  id: string;
  name: string;
  description: string;
  percentComplete: number;
  loc: number;
  docLines: number;
  docCodeRatio: number;
  reqs: number;
  tests: number;
  value: number;
  devCost: number;
  roi: number;
  category: string; // Vertical
  criticality: 'High' | 'Medium' | 'Low';
  nature: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  term: 'Immediate' | 'Medium-Term' | 'Long-Term';
  impact: string;
  valueImpact: number;
  action: string;
  packages: string[];
}

export interface Highlight {
  category: string;
  items: { label: string; value: string | number; subtext?: string }[];
}

export type ViewMode = 'dashboard' | 'packages' | 'roadmap' | 'analytics';
