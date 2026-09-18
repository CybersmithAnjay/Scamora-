export const CRITICAL_RISK_THRESHOLD = 75;

export type ActiveTab = 'SHIELD' | 'INCIDENTS' | 'PROTECTION' | 'PROFILE';

export type ScreenView = 
  | 'shield' 
  | 'incoming_call' 
  | 'protection_active' 
  | 'analyzing' 
  | 'high_risk' 
  | 'incident_created' 
  | 'investigator_report' 
  | 'incidents' 
  | 'protection_settings' 
  | 'profile';

export type IncidentSeverity = 'HIGH' | 'MEDIUM' | 'LOW';
export type IncidentStatus = 'Active' | 'Resolved' | 'Under Review';

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  type: 'incoming' | 'analysis' | 'critical' | 'action';
}

export interface Incident {
  id: string;
  caseRef: string;
  dateGenerated: string;
  threatClassification: string;
  targetEntity: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  callerNumber: string;
  callerName?: string;
  detectionSummary: string;
  timeline: TimelineEvent[];
  aiAssessment: string;
  confidenceScore: number;
  indicators: string[];
}

export interface UserProfile {
  name: string;
  id: string;
  email: string;
  tier: string;
  biometricLogin: boolean;
  stealthMode: boolean;
  telemetry: boolean;
  smsAlerts: boolean;
  pushAlerts: boolean;
  locationTracking: 'WHILE IN USE' | 'ALWAYS' | 'OFF';
  dataUsedGB: number;
  dataTotalGB: number;
}

export interface ProtectionSettings {
  coreProtectionActive: boolean;
  systemsMonitored: number;
  threatDatabaseVersion: string;
  lastDbUpdate: string;
  autoBlockThreats: boolean;
  deepScanFocus: boolean;
  anonymousTelemetry: boolean;
  criticalAlertsOnly: boolean;
}

export interface CallScenario {
  id: string;
  name: string;
  callerName: string;
  callerNumber: string;
  threatType: string;
  severity: IncidentSeverity;
  riskScore: number;
  technique: string;
  description: string;
  dialoguePreview: string;
}
