import React from 'react';
import { ScreenView, CallScenario, ActiveTab } from '../types';

interface ScenarioSimulatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  scenarios: CallScenario[];
  currentScenario: CallScenario;
  onSelectScenario: (scenario: CallScenario) => void;
  onNavigateScreen: (screen: ScreenView, tab?: ActiveTab) => void;
  onLaunchCallSimulation: (scenario: CallScenario) => void;
}

export const ScenarioSimulatorDrawer: React.FC<ScenarioSimulatorDrawerProps> = ({
  isOpen,
  onClose,
  scenarios,
  currentScenario,
  onSelectScenario,
  onNavigateScreen,
  onLaunchCallSimulation,
}) => {
  if (!isOpen) return null;

  const screensList: { id: ScreenView; name: string; icon: string; tab?: ActiveTab }[] = [
    { id: 'shield', name: '1. Main Shield Dashboard', icon: 'shield', tab: 'SHIELD' },
    { id: 'incoming_call', name: '2. Incoming Call Screen', icon: 'ring_volume', tab: 'SHIELD' },
    { id: 'protection_active', name: '3. Protection Active', icon: 'gpp_good', tab: 'SHIELD' },
    { id: 'analyzing', name: '4. AI Telemetry & Risk Meter', icon: 'memory', tab: 'SHIELD' },
    { id: 'high_risk', name: '5. Risk & Threat Assessment', icon: 'assessment', tab: 'SHIELD' },
    { id: 'incident_created', name: '6. Incident Created & Sequence', icon: 'assignment_turned_in', tab: 'INCIDENTS' },
    { id: 'investigator_report', name: '7. Investigator Report', icon: 'summarize', tab: 'INCIDENTS' },
    { id: 'incidents', name: '8. Incidents History', icon: 'history', tab: 'INCIDENTS' },
    { id: 'protection_settings', name: '9. Protection Engine', icon: 'gpp_maybe', tab: 'PROTECTION' },
    { id: 'profile', name: '10. Profile & Privacy', icon: 'person', tab: 'PROFILE' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex justify-end">
      <div className="w-full max-w-md bg-[#0e121a] border-l border-white/10 h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff] text-2xl">radar</span>
              <h2 className="font-geist text-lg font-bold text-[#dbfcff]">
                Simulation Center
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#b9cacb] hover:text-white"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Quick Threat Scenarios */}
          <div className="mb-6">
            <h3 className="font-geist text-xs font-bold text-[#00f0ff] uppercase tracking-wider mb-3">
              Trigger Live Threat Scenario
            </h3>
            <div className="space-y-2.5">
              {scenarios.map((sc) => {
                const isSelected = currentScenario.id === sc.id;
                let badgeColor = 'bg-[#93000a]/20 border-[#ffb4ab]/30 text-[#ffb4ab]';
                if (sc.severity === 'MEDIUM') badgeColor = 'bg-[#0266ff]/20 border-[#0266ff]/30 text-[#b3c5ff]';
                if (sc.severity === 'LOW') badgeColor = 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00dbe9]';

                return (
                  <div
                    key={sc.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#181c24] border-[#00dbe9] shadow-[0_0_15px_rgba(0,219,233,0.2)]'
                        : 'bg-[#10131c] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-geist text-sm font-semibold text-[#e0e2ee]">
                        {sc.name}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${badgeColor}`}>
                        {sc.severity}
                      </span>
                    </div>
                    <p className="text-xs text-[#b9cacb] font-mono mb-2">
                      {sc.callerName} • {sc.callerNumber}
                    </p>
                    <p className="text-xs text-[#b9cacb]/80 italic mb-3">
                      {sc.dialoguePreview}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onSelectScenario(sc);
                          onLaunchCallSimulation(sc);
                          onClose();
                        }}
                        className="flex-1 bg-[#00dbe9] text-[#002022] hover:bg-[#7df4ff] font-geist font-bold text-[11px] uppercase tracking-wider py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <span className="material-symbols-outlined text-sm">phone_forwarded</span>
                        <span>Simulate Call Flow</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Jump Directly to Any Screen */}
          <div className="mb-6">
            <h3 className="font-geist text-xs font-bold text-[#b3c5ff] uppercase tracking-wider mb-3">
              Direct Screen Navigation
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {screensList.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => {
                    onNavigateScreen(screen.id, screen.tab);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-[#10131c] border border-white/5 hover:border-[#00dbe9]/40 hover:bg-white/5 flex items-center gap-3 transition-all text-xs font-semibold text-[#e0e2ee] font-geist group"
                >
                  <span className="material-symbols-outlined text-[#00f0ff] text-base group-hover:scale-110 transition-transform">
                    {screen.icon}
                  </span>
                  <span className="flex-1">{screen.name}</span>
                  <span className="material-symbols-outlined text-sm text-[#849495] group-hover:text-white group-hover:translate-x-1 transition-all">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-[#849495] font-mono">
            SCAMORA v4.2.1 • Cyber Sentinel Protocol
          </p>
        </div>
      </div>
    </div>
  );
};
