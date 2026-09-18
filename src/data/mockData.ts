import { Incident, UserProfile, ProtectionSettings, CallScenario } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Alex Mercer',
  id: 'SCM-8842-X',
  email: 'a.mercer@secure.net',
  tier: 'Elite Guardian',
  biometricLogin: true,
  stealthMode: false,
  telemetry: true,
  smsAlerts: true,
  pushAlerts: true,
  locationTracking: 'WHILE IN USE',
  dataUsedGB: 4.5,
  dataTotalGB: 10.0,
};

export const initialProtectionSettings: ProtectionSettings = {
  coreProtectionActive: false,
  systemsMonitored: 0,
  threatDatabaseVersion: 'v2.4.1',
  lastDbUpdate: '2 mins ago',
  autoBlockThreats: true,
  deepScanFocus: false,
  anonymousTelemetry: true,
  criticalAlertsOnly: false,
};

export const sampleIncidents: Incident[] = [
  {
    id: 'SC-2026-00821',
    caseRef: 'INV-2023-08X9-SIM',
    dateGenerated: 'October 24, 2026 14:32 UTC',
    threatClassification: 'Social Engineering - Voice Phishing (Vishing)',
    targetEntity: 'Authorized User Profile',
    severity: 'HIGH',
    status: 'Active',
    callerNumber: '+1 (800) 555-0199',
    callerName: 'Unknown Caller (Spoofed)',
    detectionSummary:
      'Scamora AI identified a highly sophisticated synthetic voice interaction targeting the primary user. The interaction attempted to extract secondary authentication tokens by mirroring the vocal patterns of a known financial advisor. Deepfake voice detection algorithms triggered a critical alert at confidence level 94.2%.',
    timeline: [
      {
        time: '14:12:03 UTC',
        title: 'Connection Initiated',
        description: 'Incoming connection initiated from masked VoIP protocol routing through multi-hop proxy.',
        type: 'incoming',
      },
      {
        time: '14:12:45 UTC',
        title: 'Audio Analysis Active',
        description: 'Scamora Audio Analysis active. Voice pattern matching initiated against known baseline profiles.',
        type: 'analysis',
      },
      {
        time: '14:13:22 UTC',
        title: 'Synthetic Voice Artifacts Detected',
        description: 'Synthetic voice artifacts detected. Threat level elevated to CRITICAL. Protection protocols engaged.',
        type: 'critical',
      },
      {
        time: '14:13:24 UTC',
        title: 'Protection Activated',
        description: 'Call terminated securely, caller identity blacklisted, incident metadata preserved.',
        type: 'action',
      },
    ],
    aiAssessment:
      "The acoustic analysis indicates the use of advanced voice cloning software, likely trained on publicly available audio samples of the target's financial advisor. The slight delay in response cadence and microscopic frequency anomalies strongly correlate with known generative AI attack vectors.",
    confidenceScore: 94.2,
    indicators: [
      'Unusual interaction pattern & pacing',
      'Urgency or emotional pressure detected',
      'Suspicious behavioral indicators & token query',
      'Synthetic audio frequency harmonics (94.2% AI match)',
    ],
  },
  {
    id: 'SC-2026-00820',
    caseRef: 'INV-2023-07D4-RES',
    dateGenerated: 'October 23, 2026 09:14 UTC',
    threatClassification: 'Suspicious Communication - Bank Wire Urgency',
    targetEntity: 'Authorized User Profile',
    severity: 'MEDIUM',
    status: 'Resolved',
    callerNumber: '+1 (888) 234-9981',
    callerName: 'Chase Fraud Alert (Impersonated)',
    detectionSummary:
      'Automated caller bot queried one-time verification passcodes regarding an alleged wire transfer. Scamora natural language analyzer detected standard credential harvesting scripts.',
    timeline: [
      {
        time: '09:10:00 UTC',
        title: 'Inbound Call Received',
        description: 'Automated robocall engine detected with synthetic text-to-speech cadence.',
        type: 'incoming',
      },
      {
        time: '09:10:45 UTC',
        title: 'Pattern Match',
        description: 'Script matched standard 2FA OTP interception fraud taxonomy.',
        type: 'analysis',
      },
      {
        time: '09:11:02 UTC',
        title: 'Neutralized',
        description: 'Call rejected automatically per user auto-block policy.',
        type: 'action',
      },
    ],
    aiAssessment:
      'Standard automated vishing engine with pre-recorded prompts. No personalized deepfake synthesis was observed.',
    confidenceScore: 88.5,
    indicators: [
      'Pre-recorded bot cadence',
      'OTP request within first 30 seconds',
      'VoIP PBX origin',
    ],
  },
  {
    id: 'SC-2026-00819',
    caseRef: 'INV-2023-06A1-RES',
    dateGenerated: 'October 21, 2026 18:40 UTC',
    threatClassification: 'Blocked Connection Attempt - Known Malicious Gateway',
    targetEntity: 'Authorized User Profile',
    severity: 'LOW',
    status: 'Resolved',
    callerNumber: '+44 20 7946 0192',
    callerName: 'Unverified Telecom Gateway',
    detectionSummary:
      'Carrier-level spoofed caller ID flagged in real-time threat database. Number originated from a high-velocity spam cluster in London telecom exchange.',
    timeline: [
      {
        time: '18:38:11 UTC',
        title: 'Gateway Alert',
        description: 'Number listed in Global Threat Intelligence feed v2.4.0.',
        type: 'incoming',
      },
      {
        time: '18:38:12 UTC',
        title: 'Silent Interception',
        description: 'Connection dropped before device ringer activated.',
        type: 'action',
      },
    ],
    aiAssessment:
      'Mass telemarketing and phishing campaign blast. Blocked at perimeter.',
    confidenceScore: 99.1,
    indicators: [
      'Global Threat DB Match',
      'High-velocity SIP trunking',
    ],
  },
];

export const sampleCallScenarios: CallScenario[] = [
  {
    id: 'scenario-deepfake',
    name: 'Deepfake Financial Advisor (High Risk)',
    callerName: 'Alex Mercer (Advisor Clone)',
    callerNumber: '000-555-0199',
    threatType: 'Social Engineering / Impersonation',
    severity: 'HIGH',
    riskScore: 91,
    technique: 'Social Engineering / Voice Cloning',
    description:
      'The structural linguistics and interaction cadence strongly align with known impersonation tactics designed to bypass logical scrutiny.',
    dialoguePreview:
      '"Alex, this is Marcus from Merrill. We have an anomalous transfer authorization pending on your portfolio. Please confirm your secondary secure PIN immediately."',
  },
  {
    id: 'scenario-irs',
    name: 'IRS Criminal Enforcement Spoof (High Risk)',
    callerName: 'Federal Tax Authority',
    callerNumber: '+1 (800) 829-1040',
    threatType: 'Government Impersonation & Extortion',
    severity: 'HIGH',
    riskScore: 95,
    technique: 'Fear Escalation & Legal Threat',
    description:
      'Caller employs psychological stress vectors and immediate arrest threats to coerce wire transfer resolution.',
    dialoguePreview:
      '"This is Agent Miller from the Department of Revenue. An active warrant has been issued in your district. Do not disconnect."',
  },
  {
    id: 'scenario-bank-otp',
    name: 'Bank Security 2FA Intercept (Medium Risk)',
    callerName: 'Wells Fargo Security Desk',
    callerNumber: '+1 (800) 869-3557',
    threatType: 'Credential & OTP Harvesting',
    severity: 'MEDIUM',
    riskScore: 78,
    technique: 'Urgent OTP Phishing',
    description:
      'Robotic IVR asking to confirm a $2,400 Zelle transfer by reading back the SMS code just dispatched to your phone.',
    dialoguePreview:
      '"Wells Fargo Fraud Alert: A transfer of $2,400 to Bitcoin ATM was requested. To cancel, please enter the 6-digit code sent to your mobile."',
  },
  {
    id: 'scenario-safe',
    name: 'Legitimate Contact (Safe Interaction)',
    callerName: 'Sarah Jenkins (Verified)',
    callerNumber: '+1 (415) 555-8392',
    threatType: 'Verified Contact',
    severity: 'LOW',
    riskScore: 4,
    technique: 'Authentic Voice Match',
    description: 'Acoustic harmonics and biometric cadence match verified contacts.',
    dialoguePreview:
      '"Hey Alex! Just calling to see if we are still meeting at 3 PM today for the design review."',
  },
];
