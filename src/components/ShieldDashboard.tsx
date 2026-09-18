import React from 'react';
import { ScreenView, ActiveTab } from '../types';

interface ShieldDashboardProps {
  isShieldActive: boolean;
  onToggleShield: () => void;
  onNavigate: (screen: ScreenView) => void;
  onTabChange: (tab: ActiveTab) => void;
  onTriggerIncomingCall: () => void;
}

export const ShieldDashboard: React.FC<ShieldDashboardProps> = ({
  isShieldActive,
  onToggleShield,
  onNavigate,
  onTabChange,
  onTriggerIncomingCall,
}) => {
  return (
    <main className="pt-24 pb-32 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
      {/* Background Radial Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Title Section */}
      <section className="text-center py-4 flex flex-col gap-2 items-center">
        <h1 className="font-geist text-3xl md:text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#dbfcff] via-[#00f0ff] to-[#0266ff] uppercase">
          DETECT. DEFEND. REPORT.
        </h1>
        <p className="font-sans text-base md:text-lg text-[#b9cacb] max-w-2xl">
          Real-time threat interception and digital sovereignty protocol.
        </p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* MAIN STATUS CARD (Spans 8 cols on desktop) */}
        <div
          className={`md:col-span-8 glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[360px] transition-all duration-500 border ${
            isShieldActive
              ? 'border-[#00dbe9]/60 shadow-[0_0_50px_rgba(0,219,233,0.25)]'
              : 'border-[#3b494b]/60 ambient-glow hover:border-[#00f0ff]/40'
          }`}
        >
          {/* Subtle Ambient status glow behind */}
          <div
            className={`absolute -inset-10 transition-opacity duration-700 pointer-events-none ${
              isShieldActive
                ? 'bg-[radial-gradient(circle_at_center,rgba(0,219,233,0.2)_0%,rgba(133,35,221,0.1)_50%,transparent_70%)] opacity-100'
                : 'bg-[radial-gradient(circle_at_center,rgba(0,219,233,0.06)_0%,transparent_70%)] opacity-40'
            }`}
          />

          {/* Tactical Header Bar */}
          <div className="flex justify-between items-center mb-4 relative z-10">
            <div className="flex items-center gap-3">
              {/* Tactical LED Indicator */}
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  isShieldActive
                    ? 'bg-[#00dbe9] shadow-[0_0_15px_#00dbe9] animate-pulse'
                    : 'bg-[#849495] shadow-[0_0_10px_rgba(132,148,149,0.5)]'
                }`}
              />
              <div>
                <span className="font-geist text-xs font-bold text-[#00f0ff] uppercase tracking-widest block">
                  DEFENSE PROTOCOL
                </span>
                <h2 className="font-geist text-xl md:text-2xl font-bold tracking-wider uppercase text-[#e0e2ee]">
                  {isShieldActive ? 'SCAMORA SHIELD: ACTIVE' : 'SCAMORA SHIELD: STANDBY'}
                </h2>
              </div>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-xs font-bold font-geist tracking-wider uppercase border transition-all duration-300 ${
                isShieldActive
                  ? 'bg-[#00f0ff]/15 border-[#00f0ff]/40 text-[#00dbe9] shadow-[0_0_15px_rgba(0,219,233,0.3)]'
                  : 'bg-white/5 border-white/10 text-[#849495]'
              }`}
            >
              {isShieldActive ? 'ARMED' : 'UNARMED'}
            </div>
          </div>

          {/* CENTERPIECE: Clearly Visible Clickable SCAMORA SHIELD Interactive Emblem */}
          <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-10 text-center">
            <button
              onClick={onToggleShield}
              aria-label={isShieldActive ? 'Deactivate Scamora Shield' : 'Activate Scamora Shield'}
              className={`group relative w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-500 cursor-pointer focus:outline-none ${
                isShieldActive
                  ? 'bg-[#002022]/80 border-2 border-[#00f0ff] shadow-[0_0_45px_rgba(0,240,255,0.45)] scale-105'
                  : 'bg-[#10131c]/90 border-2 border-white/20 hover:border-[#00dbe9]/80 hover:shadow-[0_0_35px_rgba(0,219,233,0.3)] hover:scale-105 active:scale-95'
              }`}
            >
              {/* Rotating outer radar dashed ring */}
              <div
                className={`absolute -inset-3 rounded-full border border-dashed transition-all duration-700 pointer-events-none ${
                  isShieldActive
                    ? 'border-[#00f0ff]/50 animate-radar'
                    : 'border-white/10 group-hover:border-[#00f0ff]/30'
                }`}
              />

              {/* Pulsing halo ring */}
              <div
                className={`absolute -inset-1 rounded-full transition-all duration-500 pointer-events-none ${
                  isShieldActive
                    ? 'bg-[#00f0ff]/10 animate-pulse-ring'
                    : 'bg-transparent group-hover:bg-[#00f0ff]/5'
                }`}
              />

              {/* Large Shield Icon */}
              <span
                className={`material-symbols-outlined text-5xl md:text-6xl transition-all duration-300 ${
                  isShieldActive
                    ? 'text-[#00f0ff] icon-fill drop-shadow-[0_0_20px_rgba(0,240,255,0.9)] animate-pulse'
                    : 'text-[#b9cacb] group-hover:text-[#00dbe9] group-hover:scale-110'
                }`}
              >
                security
              </span>

              {/* Title inside Emblem */}
              <span className="font-geist text-[11px] md:text-xs font-extrabold tracking-widest uppercase mt-1 transition-colors text-[#dbfcff]">
                SCAMORA SHIELD
              </span>

              <span
                className={`font-geist text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isShieldActive
                    ? 'text-[#00f0ff]'
                    : 'text-[#849495] group-hover:text-[#00dbe9]'
                }`}
              >
                {isShieldActive ? 'CLICK TO PAUSE' : 'CLICK TO ACTIVATE'}
              </span>
            </button>

            <p className="text-sm md:text-base text-[#b9cacb] max-w-md mt-4 leading-relaxed">
              {isShieldActive
                ? 'Scamora AI Shield is actively intercepting audio signals, carrier packets, and heuristic metadata.'
                : 'Scamora stays inactive until you choose to activate it. Click above or use the button below.'}
            </p>

            {isShieldActive && (
              <div className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00dbe9] text-xs font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-ping" />
                <span>Zero-Trust AI Interception Engaged</span>
              </div>
            )}
          </div>

          {/* Primary Activation Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onToggleShield}
              id="scamora-shield-main-btn"
              className={`flex-1 font-geist font-bold text-base md:text-lg rounded-xl py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 group cursor-pointer ${
                isShieldActive
                  ? 'bg-[#181c24] border-2 border-[#00dbe9] text-[#00dbe9] hover:bg-[#00dbe9]/15 shadow-[0_0_25px_rgba(0,219,233,0.2)]'
                  : 'bg-[#00dbe9] text-[#002022] hover:bg-[#7df4ff] shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]'
              }`}
            >
              <span
                className="material-symbols-outlined text-2xl transition-transform group-hover:scale-110 icon-fill"
              >
                {isShieldActive ? 'shield' : 'gpp_maybe'}
              </span>
              <span>{isShieldActive ? 'DEACTIVATE SCAMORA SHIELD' : 'ACTIVATE SCAMORA SHIELD'}</span>
            </button>

            <button
              onClick={onTriggerIncomingCall}
              className="bg-[#0266ff]/20 border border-[#0266ff]/60 text-[#b3c5ff] hover:bg-[#0266ff]/30 hover:text-white font-geist font-semibold text-sm rounded-xl py-4 px-5 flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">phone_in_talk</span>
              <span>Simulate Threat Call</span>
            </button>
          </div>
        </div>

        {/* STATS GRID (Spans 4 cols on desktop, stacked vertically) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          {/* Stat Item 1: Protected Calls */}
          <div className="glass-panel rounded-2xl p-5 flex items-center justify-between group hover:bg-white/5 transition-colors border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#0266ff]/20 flex items-center justify-center text-[#b3c5ff]">
                <span className="material-symbols-outlined text-xl">call_made</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#b9cacb] uppercase tracking-wider font-geist">
                  Protected Calls
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#dbfcff] font-geist">
                  124
                </span>
              </div>
            </div>
            <span className="text-xs text-[#00dbe9] font-semibold bg-[#00dbe9]/10 px-2 py-0.5 rounded-full border border-[#00dbe9]/20">
              100% OK
            </span>
          </div>

          {/* Stat Item 2: Prevented Threats */}
          <div className="glass-panel rounded-2xl p-5 flex items-center justify-between group hover:bg-white/5 transition-colors border-l-4 border-l-[#00f0ff] border-y border-r border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff]">
                <span className="material-symbols-outlined text-xl">block</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#b9cacb] uppercase tracking-wider font-geist">
                  Prevented Threats
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#dbfcff] font-geist">
                  12
                </span>
              </div>
            </div>
            <span className="text-xs text-[#00f0ff] font-semibold font-mono">
              +3 this week
            </span>
          </div>

          {/* Stat Item 3: Active Incidents */}
          <button
            onClick={() => {
              onTabChange('INCIDENTS');
              onNavigate('incidents');
            }}
            className="glass-panel rounded-2xl p-5 flex items-center justify-between group hover:bg-[#93000a]/10 transition-colors border-l-4 border-l-[#ffb4ab] border-y border-r border-white/5 text-left cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#93000a]/20 flex items-center justify-center text-[#ffb4ab]">
                <span className="material-symbols-outlined text-xl">warning</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#b9cacb] uppercase tracking-wider font-geist">
                  Active Incidents
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#ffb4ab] font-geist">
                  3
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#ffb4ab] group-hover:translate-x-1 transition-transform">
              <span className="text-xs uppercase font-semibold tracking-wider font-geist hidden sm:inline">Review</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </button>
        </div>

        {/* RECENT ACTIVITY SECTION (Spans full width) */}
        <div className="md:col-span-12 mt-2 flex flex-col gap-3">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-geist text-lg md:text-xl font-semibold uppercase tracking-wider text-[#e0e2ee]">
              Recent Activity
            </h3>
            <button
              onClick={() => {
                onTabChange('INCIDENTS');
                onNavigate('incidents');
              }}
              className="text-xs font-semibold font-geist text-[#00dbe9] hover:underline uppercase tracking-wider cursor-pointer"
            >
              VIEW LOGS
            </button>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden flex flex-col divide-y divide-white/5 border border-white/10">
            {/* Tactical Item 1 */}
            <div
              onClick={() => onNavigate('investigator_report')}
              className="flex items-center p-4 hover:bg-white/5 transition-colors gap-4 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-[#93000a]/20 flex items-center justify-center text-[#ffb4ab] flex-shrink-0">
                <span className="material-symbols-outlined text-lg">dangerous</span>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm md:text-base font-medium text-[#e0e2ee] group-hover:text-[#00dbe9] transition-colors">
                  Blocked Phishing Attempt
                </span>
                <span className="text-xs text-[#b9cacb] font-mono">+1 (800) 555-0199 • Deepfake Voice Cloning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#849495] font-mono">Just now</span>
                <span className="material-symbols-outlined text-sm text-[#b9cacb] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  chevron_right
                </span>
              </div>
            </div>

            {/* Tactical Item 2 */}
            <div className="flex items-center p-4 hover:bg-white/5 transition-colors gap-4">
              <div className="w-9 h-9 rounded-full bg-[#0266ff]/20 flex items-center justify-center text-[#b3c5ff] flex-shrink-0">
                <span className="material-symbols-outlined text-lg">verified_user</span>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm md:text-base font-medium text-[#e0e2ee]">System Scan Complete</span>
                <span className="text-xs text-[#b9cacb]">0 anomalies found • Behavioral baseline intact</span>
              </div>
              <span className="text-xs text-[#849495] font-mono">2h ago</span>
            </div>

            {/* Tactical Item 3 */}
            <div className="flex items-center p-4 hover:bg-white/5 transition-colors gap-4">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#849495] flex-shrink-0">
                <span className="material-symbols-outlined text-lg">update</span>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm md:text-base font-medium text-[#e0e2ee]">Definitions Updated</span>
                <span className="text-xs text-[#b9cacb]">Global Threat Intelligence Feed v2.4.1</span>
              </div>
              <span className="text-xs text-[#849495] font-mono">5h ago</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
