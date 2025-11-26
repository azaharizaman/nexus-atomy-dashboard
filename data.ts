
import { Package, RoadmapItem, Highlight } from './types';

export const PACKAGES: Package[] = [
  // Foundation & Infrastructure
  { id: '1', name: 'Nexus\\Tenant', description: 'Tenant isolation with automatic context scoping and queue job propagation', percentComplete: 90, loc: 2532, docLines: 1800, docCodeRatio: 0.71, reqs: 85, tests: 45, value: 175000, devCost: 22000, roi: 795, category: 'Infrastructure', criticality: 'High', nature: 'Architectural' },
  { id: '2', name: 'Nexus\\Sequencing', description: 'Thread-safe sequence generation with gap detection and pattern versioning', percentComplete: 100, loc: 2442, docLines: 2100, docCodeRatio: 0.86, reqs: 65, tests: 50, value: 140000, devCost: 18500, roi: 757, category: 'Infrastructure', criticality: 'High', nature: 'Architectural' },
  { id: '3', name: 'Nexus\\Period', description: 'Period management for accounting with auto-close and posting validation', percentComplete: 100, loc: 1305, docLines: 1500, docCodeRatio: 1.15, reqs: 55, tests: 40, value: 120000, devCost: 15000, roi: 800, category: 'Infrastructure', criticality: 'High', nature: 'Tier 1' },
  { id: '4', name: 'Nexus\\Uom', description: 'Unit of measurement conversions with dimension validation', percentComplete: 90, loc: 2135, docLines: 1900, docCodeRatio: 0.89, reqs: 45, tests: 35, value: 95000, devCost: 14000, roi: 679, category: 'Infrastructure', criticality: 'Medium', nature: 'Tier 1' },
  { id: '5', name: 'Nexus\\AuditLogger', description: 'CRUD tracking with timeline feeds and retention policies', percentComplete: 90, loc: 1520, docLines: 1600, docCodeRatio: 1.05, reqs: 50, tests: 38, value: 110000, devCost: 13500, roi: 815, category: 'Infrastructure', criticality: 'Medium', nature: 'Tier 2' },
  { id: '6', name: 'Nexus\\EventStream', description: 'Immutable event log with temporal queries and projection rebuilding', percentComplete: 85, loc: 3200, docLines: 2400, docCodeRatio: 0.75, reqs: 95, tests: 68, value: 245000, devCost: 28000, roi: 875, category: 'Infrastructure', criticality: 'Medium', nature: 'Tier 1' },
  { id: '7', name: 'Nexus\\Setting', description: 'Hierarchical settings management with tenant overrides', percentComplete: 95, loc: 1894, docLines: 1700, docCodeRatio: 0.90, reqs: 42, tests: 32, value: 88000, devCost: 12800, roi: 688, category: 'Infrastructure', criticality: 'Low', nature: 'Tier 2' },
  { id: '47', name: 'Nexus\\FeatureFlags', description: 'Feature flag management with context-based evaluation and percentage rollout', percentComplete: 100, loc: 2170, docLines: 1900, docCodeRatio: 0.88, reqs: 76, tests: 90, value: 145000, devCost: 9900, roi: 1465, category: 'Infrastructure', criticality: 'Medium', nature: 'Tier 2' },

  // Observability
  { id: '8', name: 'Nexus\\Monitoring', description: 'Production-grade observability with telemetry, health checks, alerting, SLO tracking', percentComplete: 100, loc: 4000, docLines: 3500, docCodeRatio: 0.88, reqs: 112, tests: 188, value: 285000, devCost: 32000, roi: 891, category: 'Observability', criticality: 'Medium', nature: 'Tier 2' },

  // Identity & Security
  { id: '9', name: 'Nexus\\Identity', description: 'User authentication with MFA, session management, RBAC', percentComplete: 95, loc: 3685, docLines: 3200, docCodeRatio: 0.87, reqs: 125, tests: 95, value: 320000, devCost: 35000, roi: 914, category: 'Security', criticality: 'High', nature: 'Tier 1' },
  { id: '48', name: 'Nexus\\SSO', description: 'Single Sign-On with SAML 2.0, OAuth2/OIDC, Azure AD, Google Workspace', percentComplete: 80, loc: 2205, docLines: 1800, docCodeRatio: 0.82, reqs: 65, tests: 89, value: 195000, devCost: 22000, roi: 886, category: 'Security', criticality: 'Medium', nature: 'Tier 3' },
  { id: '10', name: 'Nexus\\Crypto', description: 'Field-level encryption with key rotation and HSM integration', percentComplete: 85, loc: 3750, docLines: 2800, docCodeRatio: 0.75, reqs: 78, tests: 62, value: 215000, devCost: 28500, roi: 754, category: 'Security', criticality: 'Medium', nature: 'Tier 3' },
  { id: '11', name: 'Nexus\\Audit', description: 'Cryptographic audit chains with tamper detection', percentComplete: 30, loc: 1770, docLines: 800, docCodeRatio: 0.45, reqs: 45, tests: 25, value: 165000, devCost: 18000, roi: 917, category: 'Security', criticality: 'Low', nature: 'Tier 3' },

  // Finance & Accounting
  { id: '12', name: 'Nexus\\Finance', description: 'Double-entry bookkeeping with COA and journal entries', percentComplete: 90, loc: 1908, docLines: 2000, docCodeRatio: 1.05, reqs: 88, tests: 72, value: 225000, devCost: 26000, roi: 865, category: 'Finance', criticality: 'High', nature: 'Tier 2' },
  { id: '13', name: 'Nexus\\Accounting', description: 'Financial statements (P&L, BS, CF) with period close', percentComplete: 85, loc: 4804, docLines: 3600, docCodeRatio: 0.75, reqs: 115, tests: 88, value: 340000, devCost: 38000, roi: 895, category: 'Finance', criticality: 'Medium', nature: 'Tier 2' },
  { id: '14', name: 'Nexus\\Receivable', description: 'Customer invoicing with aging, collections, payment allocation', percentComplete: 75, loc: 2520, docLines: 2100, docCodeRatio: 0.83, reqs: 92, tests: 68, value: 210000, devCost: 24500, roi: 857, category: 'Finance', criticality: 'Medium', nature: 'Tier 2' },
  { id: '15', name: 'Nexus\\Payable', description: 'Vendor bill management with 3-way matching and payment scheduling', percentComplete: 70, loc: 3403, docLines: 2451, docCodeRatio: 0.72, reqs: 128, tests: 83, value: 190710, devCost: 24900, roi: 766, category: 'Finance', criticality: 'Medium', nature: 'Tier 2' },
  { id: '29', name: 'Nexus\\CashManagement', description: 'Bank reconciliation with statement import and forecasting', percentComplete: 80, loc: 2659, docLines: 2200, docCodeRatio: 0.83, reqs: 75, tests: 58, value: 185000, devCost: 23000, roi: 804, category: 'Finance', criticality: 'Medium', nature: 'Tier 2' },
  { id: '16', name: 'Nexus\\Budget', description: 'Budget planning with commitment tracking and variance alerts', percentComplete: 75, loc: 6309, docLines: 4500, docCodeRatio: 0.71, reqs: 135, tests: 92, value: 295000, devCost: 42000, roi: 702, category: 'Finance', criticality: 'Low', nature: 'Tier 2' },
  { id: '30', name: 'Nexus\\Assets', description: 'Fixed asset tracking with multi-method depreciation', percentComplete: 40, loc: 3953, docLines: 1800, docCodeRatio: 0.46, reqs: 85, tests: 45, value: 220000, devCost: 28000, roi: 786, category: 'Finance', criticality: 'Low', nature: 'Tier 2' },
  { id: '31', name: 'Nexus\\Currency', description: 'Multi-currency support with real-time exchange rates', percentComplete: 90, loc: 2055, docLines: 1850, docCodeRatio: 0.90, reqs: 58, tests: 48, value: 145000, devCost: 18000, roi: 806, category: 'Finance', criticality: 'Medium', nature: 'Tier 3' },
  { id: '49', name: 'Nexus\\Tax', description: 'Multi-jurisdiction tax calculation with temporal rates and compliance', percentComplete: 95, loc: 3812, docLines: 3200, docCodeRatio: 0.84, reqs: 81, tests: 142, value: 475000, devCost: 19050, roi: 2493, category: 'Finance', criticality: 'Medium', nature: 'Tier 2' },

  // Sales & Operations
  { id: '17', name: 'Nexus\\Sales', description: 'Quote-to-order lifecycle with pricing engine', percentComplete: 95, loc: 2549, docLines: 2300, docCodeRatio: 0.90, reqs: 95, tests: 75, value: 235000, devCost: 26500, roi: 887, category: 'Sales', criticality: 'Medium', nature: 'Tier 2' },
  { id: '18', name: 'Nexus\\Party', description: 'Unified customer/vendor/employee registry with deduplication', percentComplete: 90, loc: 2431, docLines: 2100, docCodeRatio: 0.86, reqs: 72, tests: 55, value: 175000, devCost: 21500, roi: 814, category: 'Sales', criticality: 'High', nature: 'Tier 1' },
  { id: '19', name: 'Nexus\\Product', description: 'Product catalog with template-variant architecture', percentComplete: 85, loc: 2840, docLines: 2400, docCodeRatio: 0.85, reqs: 88, tests: 68, value: 195000, devCost: 24000, roi: 813, category: 'Sales', criticality: 'Medium', nature: 'Tier 2' },
  { id: '20', name: 'Nexus\\Inventory', description: 'Inventory tracking with lot/serial numbers and valuation', percentComplete: 50, loc: 1990, docLines: 1200, docCodeRatio: 0.60, reqs: 95, tests: 52, value: 240000, devCost: 26000, roi: 923, category: 'Sales', criticality: 'High', nature: 'Tier 2' },
  { id: '21', name: 'Nexus\\Warehouse', description: 'Warehouse management with bin locations and picking', percentComplete: 40, loc: 608, docLines: 450, docCodeRatio: 0.74, reqs: 65, tests: 35, value: 210000, devCost: 24000, roi: 875, category: 'Sales', criticality: 'Medium', nature: 'Tier 2' },
  { id: '32', name: 'Nexus\\Procurement', description: 'Purchase requisitions, POs, and goods receipt', percentComplete: 30, loc: 5458, docLines: 2400, docCodeRatio: 0.44, reqs: 125, tests: 68, value: 285000, devCost: 38000, roi: 750, category: 'Sales', criticality: 'Low', nature: 'Tier 2' },

  // Manufacturing (New Vertical)
  { id: '50', name: 'Nexus\\Manufacturing', description: 'MRP II with versioned BOMs, routings, work orders, capacity planning, ML forecasting', percentComplete: 95, loc: 12028, docLines: 4500, docCodeRatio: 0.37, reqs: 48, tests: 160, value: 485000, devCost: 45000, roi: 1078, category: 'Manufacturing', criticality: 'Medium', nature: 'Tier 2' },

  // Human Resources
  { id: '22', name: 'Nexus\\Hrm', description: 'Employee lifecycle with leave and attendance', percentComplete: 40, loc: 3573, docLines: 2000, docCodeRatio: 0.56, reqs: 105, tests: 55, value: 255000, devCost: 30000, roi: 850, category: 'HR', criticality: 'Medium', nature: 'Tier 2' },
  { id: '23', name: 'Nexus\\Payroll', description: 'Payroll processing with statutory calculations', percentComplete: 50, loc: 1164, docLines: 900, docCodeRatio: 0.77, reqs: 68, tests: 42, value: 195000, devCost: 22000, roi: 886, category: 'HR', criticality: 'Medium', nature: 'Tier 2' },
  { id: '33', name: 'Nexus\\PayrollMysStatutory', description: 'Malaysian EPF, SOCSO, PCB calculations', percentComplete: 90, loc: 770, docLines: 850, docCodeRatio: 1.10, reqs: 45, tests: 38, value: 125000, devCost: 16500, roi: 758, category: 'HR', criticality: 'Medium', nature: 'Tier 3' },

  // Integration & Automation
  { id: '24', name: 'Nexus\\Connector', description: 'External system integration with circuit breaker and retry', percentComplete: 85, loc: 2500, docLines: 2100, docCodeRatio: 0.84, reqs: 78, tests: 62, value: 205000, devCost: 24000, roi: 854, category: 'Integration', criticality: 'Medium', nature: 'Tier 3' },
  { id: '25', name: 'Nexus\\Workflow', description: 'Process automation with state machines and approvals', percentComplete: 30, loc: 2430, docLines: 1200, docCodeRatio: 0.49, reqs: 85, tests: 48, value: 245000, devCost: 28000, roi: 875, category: 'Integration', criticality: 'Low', nature: 'Tier 2' },
  { id: '34', name: 'Nexus\\Notifier', description: 'Multi-channel notifications with delivery tracking', percentComplete: 95, loc: 1969, docLines: 1850, docCodeRatio: 0.94, reqs: 65, tests: 52, value: 145000, devCost: 18500, roi: 784, category: 'Integration', criticality: 'Low', nature: 'Tier 3' },
  { id: '51', name: 'Nexus\\Messaging', description: 'Message queue abstraction for RabbitMQ, Redis, SQS', percentComplete: 100, loc: 1402, docLines: 1200, docCodeRatio: 0.86, reqs: 35, tests: 31, value: 135000, devCost: 16000, roi: 844, category: 'Integration', criticality: 'Low', nature: 'Tier 3' },
  { id: '35', name: 'Nexus\\Scheduler', description: 'Background job scheduling with cron and retry logic', percentComplete: 80, loc: 2645, docLines: 2200, docCodeRatio: 0.83, reqs: 72, tests: 58, value: 175000, devCost: 22000, roi: 795, category: 'Integration', criticality: 'Low', nature: 'Tier 2' },
  { id: '36', name: 'Nexus\\DataProcessor', description: 'OCR and ETL interface contracts', percentComplete: 50, loc: 325, docLines: 400, docCodeRatio: 1.23, reqs: 28, tests: 18, value: 155000, devCost: 18000, roi: 861, category: 'Integration', criticality: 'Low', nature: 'Tier 3' },
  { id: '26', name: 'Nexus\\MachineLearning', description: 'ML-powered anomaly detection with external AI providers and MLflow', percentComplete: 100, loc: 6400, docLines: 4000, docCodeRatio: 0.63, reqs: 52, tests: 120, value: 385000, devCost: 25875, roi: 1488, category: 'Integration', criticality: 'Medium', nature: 'Tier 3' },
  { id: '37', name: 'Nexus\\Geo', description: 'Address geocoding, geofencing, and distance calculation', percentComplete: 80, loc: 2218, docLines: 1900, docCodeRatio: 0.86, reqs: 58, tests: 45, value: 165000, devCost: 20000, roi: 825, category: 'Integration', criticality: 'Low', nature: 'Tier 3' },
  { id: '52', name: 'Nexus\\Routing', description: 'Route optimization with TSP/VRP solvers and OR-Tools integration', percentComplete: 70, loc: 1568, docLines: 1200, docCodeRatio: 0.77, reqs: 42, tests: 35, value: 175000, devCost: 18000, roi: 972, category: 'Integration', criticality: 'Low', nature: 'Tier 3' },

  // Reporting & Data
  { id: '27', name: 'Nexus\\Reporting', description: 'Scheduled report generation with parameterization', percentComplete: 75, loc: 3589, docLines: 2800, docCodeRatio: 0.78, reqs: 95, tests: 72, value: 235000, devCost: 28000, roi: 839, category: 'Reporting', criticality: 'Medium', nature: 'Tier 2' },
  { id: '38', name: 'Nexus\\Export', description: 'Multi-format export (PDF, Excel, CSV) with streaming', percentComplete: 95, loc: 3417, docLines: 3100, docCodeRatio: 0.91, reqs: 78, tests: 68, value: 185000, devCost: 24000, roi: 771, category: 'Reporting', criticality: 'Low', nature: 'Tier 3' },
  { id: '39', name: 'Nexus\\Import', description: 'Bulk data import with validation and transformation', percentComplete: 80, loc: 4992, docLines: 3800, docCodeRatio: 0.76, reqs: 125, tests: 88, value: 265000, devCost: 34000, roi: 779, category: 'Reporting', criticality: 'Low', nature: 'Tier 2' },
  { id: '28', name: 'Nexus\\Analytics', description: 'KPI tracking with drill-down and trend analysis', percentComplete: 70, loc: 1479, docLines: 1200, docCodeRatio: 0.81, reqs: 65, tests: 48, value: 195000, devCost: 22000, roi: 886, category: 'Reporting', criticality: 'Low', nature: 'Tier 2' },
  { id: '40', name: 'Nexus\\Document', description: 'Enterprise document management with versioning', percentComplete: 85, loc: 3393, docLines: 2900, docCodeRatio: 0.85, reqs: 95, tests: 72, value: 225000, devCost: 28000, roi: 804, category: 'Reporting', criticality: 'Low', nature: 'Tier 2' },
  { id: '53', name: 'Nexus\\Content', description: 'Content management with multi-language support and SEO', percentComplete: 100, loc: 1614, docLines: 1400, docCodeRatio: 0.87, reqs: 45, tests: 12, value: 165000, devCost: 18000, roi: 917, category: 'Reporting', criticality: 'Low', nature: 'Tier 3' },
  { id: '41', name: 'Nexus\\Storage', description: 'Storage abstraction for local, S3, Azure with encryption', percentComplete: 95, loc: 695, docLines: 800, docCodeRatio: 1.15, reqs: 35, tests: 28, value: 95000, devCost: 12000, roi: 792, category: 'Reporting', criticality: 'Low', nature: 'Tier 3' },

  // Compliance & Governance
  { id: '42', name: 'Nexus\\Compliance', description: 'Operational compliance with SOD checks', percentComplete: 80, loc: 2137, docLines: 1850, docCodeRatio: 0.87, reqs: 75, tests: 58, value: 215000, devCost: 24000, roi: 896, category: 'Compliance', criticality: 'Medium', nature: 'Tier 2' },
  { id: '43', name: 'Nexus\\Statutory', description: 'Tax and regulatory reporting with country adapters', percentComplete: 75, loc: 2152, docLines: 1900, docCodeRatio: 0.88, reqs: 85, tests: 65, value: 205000, devCost: 24500, roi: 837, category: 'Compliance', criticality: 'Medium', nature: 'Tier 2' },
  { id: '44', name: 'Nexus\\Backoffice', description: 'Multi-entity company hierarchy with cost centers', percentComplete: 20, loc: 2698, docLines: 1200, docCodeRatio: 0.44, reqs: 95, tests: 45, value: 235000, devCost: 28000, roi: 839, category: 'Compliance', criticality: 'Low', nature: 'Tier 2' },
  { id: '45', name: 'Nexus\\OrgStructure', description: 'Organizational chart with reporting lines', percentComplete: 15, loc: 1800, docLines: 800, docCodeRatio: 0.44, reqs: 68, tests: 35, value: 185000, devCost: 22000, roi: 841, category: 'Compliance', criticality: 'Low', nature: 'Tier 2' },
  { id: '46', name: 'Nexus\\FieldService', description: 'Work order management with technician scheduling', percentComplete: 35, loc: 4356, docLines: 2000, docCodeRatio: 0.46, reqs: 115, tests: 62, value: 285000, devCost: 35000, roi: 814, category: 'Compliance', criticality: 'Low', nature: 'Tier 2' }
];

export const ROADMAP: RoadmapItem[] = [
  {
    id: 'r1',
    title: 'Complete Inventory Documentation',
    term: 'Immediate',
    impact: 'Blocking for warehouse, manufacturing',
    valueImpact: 240000,
    action: 'Complete remaining 45% of documentation (add ~790 doc lines)',
    packages: ['Nexus\\Inventory']
  },
  {
    id: 'r2',
    title: 'Complete Assets Package',
    term: 'Immediate',
    impact: 'Required for depreciation automation',
    valueImpact: 220000,
    action: 'Implement GL integration, add ~2,150 doc lines',
    packages: ['Nexus\\Assets']
  },
  {
    id: 'r3',
    title: 'Finish Receivable Documentation',
    term: 'Immediate',
    impact: 'Critical for cash flow management',
    valueImpact: 210000,
    action: 'Complete credit management docs, add ~420 doc lines',
    packages: ['Nexus\\Receivable']
  },
  {
    id: 'r4',
    title: 'Complete Payable Documentation',
    term: 'Medium-Term',
    impact: 'Required for full AP automation',
    valueImpact: 190710,
    action: 'Add remaining 5 documentation files (api-reference, integration-guide)',
    packages: ['Nexus\\Payable']
  },
  {
    id: 'r5',
    title: 'Advance Warehouse',
    term: 'Medium-Term',
    impact: 'Enables pick/pack/ship workflows',
    valueImpact: 210000,
    action: 'Complete bin management, add ~154 doc lines',
    packages: ['Nexus\\Warehouse']
  },
  {
    id: 'r6',
    title: 'Complete EventStream',
    term: 'Medium-Term',
    impact: 'Required for GL compliance',
    valueImpact: 245000,
    action: 'Finish snapshot repository, add ~400 doc lines',
    packages: ['Nexus\\EventStream']
  },
  {
    id: 'r7',
    title: 'HRM/Payroll Suite',
    term: 'Long-Term',
    impact: 'Complete employee lifecycle',
    valueImpact: 575000,
    action: 'Complete leave/attendance systems',
    packages: ['Nexus\\Hrm', 'Nexus\\Payroll']
  },
  {
    id: 'r8',
    title: 'Workflow Engine',
    term: 'Long-Term',
    impact: 'Approval automation across modules',
    valueImpact: 245000,
    action: 'Implement state machine engine, add ~1,230 doc lines',
    packages: ['Nexus\\Workflow']
  },
  {
    id: 'r9',
    title: 'Backoffice/OrgStructure',
    term: 'Long-Term',
    impact: 'Multi-entity support',
    valueImpact: 420000,
    action: 'Complete entity management, add ~2,398 doc lines',
    packages: ['Nexus\\Backoffice', 'Nexus\\OrgStructure']
  }
];

export const HIGHLIGHTS: Highlight[] = [
  {
    category: 'Most Valuable Packages',
    items: [
      { label: 'Nexus\\Manufacturing', value: '$485,000', subtext: '95% Complete' },
      { label: 'Nexus\\Tax', value: '$475,000', subtext: '95% Complete' },
      { label: 'Nexus\\MachineLearning', value: '$385,000', subtext: '100% Complete' },
      { label: 'Nexus\\Accounting', value: '$340,000', subtext: '85% Complete' },
      { label: 'Nexus\\Identity', value: '$320,000', subtext: '95% Complete' },
    ]
  },
  {
    category: 'Highest ROI',
    items: [
      { label: 'Nexus\\Tax', value: '2,493%', subtext: '$475k Value' },
      { label: 'Nexus\\MachineLearning', value: '1,488%', subtext: '$385k Value' },
      { label: 'Nexus\\FeatureFlags', value: '1,465%', subtext: '$145k Value' },
      { label: 'Nexus\\Manufacturing', value: '1,078%', subtext: '$485k Value' },
      { label: 'Nexus\\Routing', value: '972%', subtext: '$175k Value' },
    ]
  },
  {
    category: 'Doc Quality Leaders',
    items: [
      { label: 'Nexus\\DataProcessor', value: '1.23:1', subtext: 'Doc Ratio' },
      { label: 'Nexus\\Period', value: '1.15:1', subtext: 'Doc Ratio' },
      { label: 'Nexus\\Storage', value: '1.15:1', subtext: 'Doc Ratio' },
      { label: 'Nexus\\PayrollMysStatutory', value: '1.10:1', subtext: 'Doc Ratio' },
      { label: 'Nexus\\AuditLogger', value: '1.05:1', subtext: 'Doc Ratio' },
    ]
  }
];
