import React, { useState } from 'react';
import {
  ActiveTab,
  ScreenView,
  Incident,
  UserProfile,
  ProtectionSettings,
  CallScenario,
} from './types';
import {
  initialUserProfile,
  initialProtectionSettings,
  sampleIncidents,
  sampleCallScenarios,
} from './data/mockData';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { ShieldDashboard } from './components/ShieldDashboard';
import { IncomingCallModal } from './components/IncomingCallModal';
import { ProtectionActiveScreen } from './components/ProtectionActiveScreen';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { HighRiskScreen } from './components/HighRiskScreen';
import { IncidentCreatedScreen } from './components/IncidentCreatedScreen';
import { InvestigatorReportScreen } from './components/InvestigatorReportScreen';
import { IncidentsScreen } from './components/IncidentsScreen';
import { ProtectionScreen } from './components/ProtectionScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ScenarioSimulatorDrawer } from './components/ScenarioSimulatorDrawer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('SHIELD');
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('shield');

  // Application Domain State
  const [isShieldActive, setIsShieldActive] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [protectionSettings, setProtectionSettings] =
    useState<ProtectionSettings>(initialProtectionSettings);
  const [incidents, setIncidents] = useState<Incident[]>(sampleIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident>(sampleIncidents[0]);

  // Simulation & Call States
  const [scenarios] = useState<CallScenario[]>(sampleCallScenarios);
  const [currentScenario, setCurrentScenario] = useState<CallScenario>(sampleCallScenarios[0]);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isIncomingCallOpen, setIsIncomingCallOpen] = useState<boolean>(false);

  // Toggle master shield
  const handleToggleShield = () => {
    const nextState = !isShieldActive;
    setIsShieldActive(nextState);
    setProtectionSettings((prev) => ({
      ...prev,
      coreProtectionActive: nextState,
      systemsMonitored: nextState ? 4 : 0,
    }));
  };

  // Launch simulated incoming call flow
  const handleTriggerIncomingCall = (customScenario?: CallScenario) => {
    if (customScenario) {
      setCurrentScenario(customScenario);
    }
    setIsIncomingCallOpen(true);
    setCurrentScreen('incoming_call');
  };

  // User accepts call from incoming overlay
  const handleAcceptCall = (withShield: boolean) => {
    setIsIncomingCallOpen(false);
    if (withShield || isShieldActive) {
      setIsShieldActive(true);
      setProtectionSettings((prev) => ({ ...prev, coreProtectionActive: true, systemsMonitored: 4 }));
      setCurrentScreen('protection_active');
    } else {
      setCurrentScreen('protection_active');
    }
  };

  // User declines call
  const handleDeclineCall = () => {
    setIsIncomingCallOpen(false);
    setCurrentScreen('shield');
  };

  // Activate shield during incoming call (arms shield in-place while keeping incoming call active)
  const handleActivateShieldFromCall = () => {
    setIsShieldActive(true);
    setProtectionSettings((prev) => ({ ...prev, coreProtectionActive: true, systemsMonitored: 4 }));
  };

  // Emergency activation on high-risk screen -> completes defense & creates incident
  const handleActivateEmergencyProtection = () => {
    const now = new Date();
    const utcHours = now.getUTCHours().toString().padStart(2, '0');
    const utcMins = now.getUTCMinutes().toString().padStart(2, '0');
    const utcSecs = now.getUTCSeconds().toString().padStart(2, '0');
    const timeStr = `${utcHours}:${utcMins}:${utcSecs} UTC`;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newIncId = `SC-2026-${randomSuffix}`;
    const newCaseRef = `INV-2026-${randomSuffix}-AI`;

    const newIncident: Incident = {
      id: newIncId,
      caseRef: newCaseRef,
      dateGenerated: `${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ${utcHours}:${utcMins} UTC`,
      threatClassification: currentScenario.technique || 'Social Engineering - Voice Phishing (Vishing)',
      targetEntity: 'Authorized User Profile',
      severity: currentScenario.severity,
      status: 'Active',
      callerNumber: currentScenario.callerNumber,
      callerName: currentScenario.callerName,
      detectionSummary: `Scamora AI identified an active ${currentScenario.threatType} targeting the user. Behavioral biometric models and spectral voice harmonics indicated a ${currentScenario.riskScore}% risk factor. Automatic defense protocols engaged.`,
      timeline: [
        {
          time: `${utcHours}:${utcMins}:01 UTC`,
          title: 'Call Received',
          description: `Incoming connection initiated from ${currentScenario.callerNumber}.`,
          type: 'incoming',
        },
        {
          time: `${utcHours}:${utcMins}:03 UTC`,
          title: 'Shield Activated',
          description: 'Audio telemetry interception & pattern detection engaged.',
          type: 'analysis',
        },
        {
          time: `${utcHours}:${utcMins}:15 UTC`,
          title: 'Threat Detected',
          description: `Pattern match: ${currentScenario.technique}. Risk score elevated to ${currentScenario.riskScore}%.`,
          type: 'critical',
        },
        {
          time: `${utcHours}:${utcMins}:16 UTC`,
          title: 'Protection Activated',
          description: 'Call terminated securely & forensic payload preserved.',
          type: 'action',
        },
      ],
      aiAssessment: `The structural acoustic analysis indicates generative voice anomalies or known phishing scripts. Threat vector ${currentScenario.threatType} was neutralized.`,
      confidenceScore: currentScenario.riskScore,
      indicators: [
        'Unusual interaction cadence',
        'Urgency and pressure vectors detected',
        'Impersonation markers confirmed',
      ],
    };

    setIncidents((prev) => [newIncident, ...prev]);
    setSelectedIncident(newIncident);
    setCurrentScreen('incident_created');
    setCurrentTab('INCIDENTS');
  };

  // Reset all local telemetry data
  const handleResetData = () => {
    setIncidents([]);
    setUserProfile((prev) => ({ ...prev, dataUsedGB: 0.2 }));
    setProtectionSettings(initialProtectionSettings);
    setIsShieldActive(false);
  };

  // Screen navigation helper
  const handleNavigate = (screen: ScreenView, tab?: ActiveTab) => {
    setCurrentScreen(screen);
    if (tab) {
      setCurrentTab(tab);
    } else {
      if (['shield', 'incoming_call', 'protection_active', 'analyzing', 'high_risk'].includes(screen)) {
        setCurrentTab('SHIELD');
      } else if (['incidents', 'incident_created', 'investigator_report'].includes(screen)) {
        setCurrentTab('INCIDENTS');
      } else if (screen === 'protection_settings') {
        setCurrentTab('PROTECTION');
      } else if (screen === 'profile') {
        setCurrentTab('PROFILE');
      }
    }
  };

  // Main screen routing
  const renderScreen = () => {
    if (isIncomingCallOpen || currentScreen === 'incoming_call') {
      return (
        <IncomingCallModal
          scenario={currentScenario}
          isShieldInitiallyActive={isShieldActive}
          onAcceptCall={handleAcceptCall}
          onDeclineCall={handleDeclineCall}
          onActivateShield={handleActivateShieldFromCall}
        />
      );
    }

    switch (currentScreen) {
      case 'shield':
        return (
          <ShieldDashboard
            isShieldActive={isShieldActive}
            onToggleShield={handleToggleShield}
            onNavigate={handleNavigate}
            onTabChange={setCurrentTab}
            onTriggerIncomingCall={() => handleTriggerIncomingCall()}
          />
        );

      case 'protection_active':
        return (
          <ProtectionActiveScreen
            scenario={currentScenario}
            onNavigate={handleNavigate}
            onDeactivate={() => {
              setIsShieldActive(false);
              setCurrentScreen('shield');
            }}
          />
        );

      case 'analyzing':
        return (
          <AnalyzingScreen
            scenario={currentScenario}
            onNavigate={handleNavigate}
            onAbort={() => setCurrentScreen('protection_active')}
          />
        );

      case 'high_risk':
        return (
          <HighRiskScreen
            scenario={currentScenario}
            onActivateProtection={handleActivateEmergencyProtection}
            onContinueMonitoring={() => setCurrentScreen('protection_active')}
            onNavigate={handleNavigate}
          />
        );

      case 'incident_created':
        return (
          <IncidentCreatedScreen
            incident={selectedIncident}
            onNavigate={handleNavigate}
            onViewReport={() => setCurrentScreen('investigator_report')}
          />
        );

      case 'investigator_report':
        return (
          <InvestigatorReportScreen
            incident={selectedIncident}
            onBack={() => setCurrentScreen('incidents')}
          />
        );

      case 'incidents':
        return (
          <IncidentsScreen
            incidents={incidents}
            onSelectIncident={(inc) => {
              setSelectedIncident(inc);
              setCurrentScreen('investigator_report');
            }}
            onNavigate={handleNavigate}
          />
        );

      case 'protection_settings':
        return (
          <ProtectionScreen
            settings={protectionSettings}
            onUpdateSettings={(updated) => {
              setProtectionSettings((prev) => {
                const next = { ...prev, ...updated };
                if (updated.coreProtectionActive !== undefined) {
                  setIsShieldActive(updated.coreProtectionActive);
                }
                return next;
              });
            }}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            profile={userProfile}
            onUpdateProfile={(updated) => setUserProfile((prev) => ({ ...prev, ...updated }))}
            onResetData={handleResetData}
          />
        );

      default:
        return (
          <ShieldDashboard
            isShieldActive={isShieldActive}
            onToggleShield={handleToggleShield}
            onNavigate={handleNavigate}
            onTabChange={setCurrentTab}
            onTriggerIncomingCall={() => handleTriggerIncomingCall()}
          />
        );
    }
  };

  return (
    <div className="bg-[#050810] text-[#e0e2ee] min-h-screen relative overflow-x-hidden selection:bg-[#00dbe9] selection:text-[#002022]">
      {/* Background ambient gradient glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0266ff]/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8523dd]/10 blur-[130px]" />
      </div>

      {/* Top App Bar (Hidden during incoming call overlay) */}
      {!isIncomingCallOpen && currentScreen !== 'incoming_call' && (
        <TopAppBar
          currentTab={currentTab}
          currentScreen={currentScreen}
          isShieldActive={isShieldActive}
          onToggleShield={handleToggleShield}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            if (tab === 'SHIELD') setCurrentScreen('shield');
            else if (tab === 'INCIDENTS') setCurrentScreen('incidents');
            else if (tab === 'PROTECTION') setCurrentScreen('protection_settings');
            else if (tab === 'PROFILE') setCurrentScreen('profile');
          }}
          onNavigate={handleNavigate}
          onOpenSimulator={() => setIsSimulatorOpen(true)}
          isSimulatingCall={isIncomingCallOpen || ['protection_active', 'analyzing', 'high_risk'].includes(currentScreen)}
        />
      )}

      {/* Active Screen View */}
      {renderScreen()}

      {/* Mobile Bottom Navigation Bar (Hidden during incoming call overlay) */}
      {!isIncomingCallOpen && currentScreen !== 'incoming_call' && (
        <BottomNavBar
          currentTab={currentTab}
          currentScreen={currentScreen}
          onTabChange={setCurrentTab}
          onNavigate={handleNavigate}
        />
      )}

      {/* Scenario Simulator Drawer */}
      <ScenarioSimulatorDrawer
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        scenarios={scenarios}
        currentScenario={currentScenario}
        onSelectScenario={(sc) => setCurrentScenario(sc)}
        onNavigateScreen={handleNavigate}
        onLaunchCallSimulation={(sc) => {
          setCurrentScenario(sc);
          handleTriggerIncomingCall(sc);
        }}
      />
    </div>
  );
}
