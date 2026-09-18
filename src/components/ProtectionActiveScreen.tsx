import React, { useState, useEffect } from 'react';
import { ScreenView, CallScenario, CRITICAL_RISK_THRESHOLD } from '../types';
import { AudioVisualizer } from './AudioVisualizer';

interface ProtectionActiveScreenProps {
  scenario: CallScenario;
  onNavigate: (screen: ScreenView) => void;
  onDeactivate: () => void;
}

export const ProtectionActiveScreen: React.FC<ProtectionActiveScreenProps> = ({
  scenario,
  onNavigate,
  onDeactivate,
}) => {
  const [seconds, setSeconds] = useState(12);
  const isCritical = (scenario?.riskScore ?? 80) >= CRITICAL_RISK_THRESHOLD;

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <main className="relative z-10 pt-24 pb-36 px-4 md:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      {/* Ambient Central Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00f0ff]/10 rounded-full blur-[140px]" />
      </div>

      {/* Central Pulsing Shield Graphic */}
      <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center mb-6">
        {/* Pulsing Rings */}
        <div className="absolute inset-0 border-2 border-[#00f0ff]/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <div className="absolute inset-4 border border-[#00f0ff]/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />

        {/* Core Shield Container */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 bg-[#181c24]/90 backdrop-blur-md rounded-full flex items-center justify-center border border-[#00f0ff]/60 animate-ambient-pulse z-10">
          <span
            className="material-symbols-outlined text-[72px] md:text-[84px] text-[#00f0ff] icon-fill"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.8))' }}
          >
            shield
          </span>
        </div>
      </div>

      {/* Typography Header */}
      <div className="text-center mb-6 max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00dbe9] text-xs font-semibold uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-pulse" />
          Live Call Protected • {formatTime(seconds)}
        </div>
        <h1 className="font-geist text-2xl md:text-4xl font-bold text-[#dbfcff] mb-2 tracking-tight">
          SCAMORA PROTECTION ACTIVE
        </h1>
        <p className="text-base text-[#b9cacb]">
          Scamora Shield is protecting this interaction.
        </p>
      </div>

      {/* Live Audio Telemetry Visualizer */}
      <div className="w-full max-w-lg mb-6 glass-panel rounded-xl p-3 border border-white/5 relative z-10 flex flex-col items-center">
        <div className="w-full flex justify-between items-center text-xs text-[#b9cacb] mb-1 font-mono">
          <span>AUDIO FREQ TELEMETRY</span>
          <span className="text-[#00dbe9] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] animate-ping" />
            REAL-TIME
          </span>
        </div>
        <AudioVisualizer isActive={true} threatLevel={isCritical ? 'HIGH' : 'LOW'} />
      </div>

      {/* Tactical Status List (Glass Card) */}
      <div
        onClick={() => onNavigate('analyzing')}
        className="w-full max-w-lg glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-[#00dbe9]/40 transition-all relative z-10 mb-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <ul className="flex flex-col gap-4">
          {/* Status Item 1 */}
          <li className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            {isCritical ? (
              <>
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#93000a]/20 border border-[#93000a]/40 text-[#ffb4ab]">
                  <span className="material-symbols-outlined text-xl">security_update_warning</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm md:text-base font-medium text-[#e0e2ee]">
                    Suspicious interaction flagged
                  </span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5b5b] animate-pulse shadow-[0_0_8px_#ff5b5b]" />
              </>
            ) : (
              <>
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
                  <span className="material-symbols-outlined text-xl">verified</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm md:text-base font-medium text-[#e0e2ee]">
                    Verified acoustic interaction
                  </span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              </>
            )}
          </li>

          <li className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Status Item 2 */}
          <li className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff]">
              <span className="material-symbols-outlined text-xl icon-fill">verified_user</span>
            </div>
            <div className="flex-1">
              <span className="text-sm md:text-base font-medium text-[#e0e2ee]">
                Protection enabled
              </span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          </li>

          <li className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Status Item 3 */}
          <li className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff]">
              <span className="material-symbols-outlined text-xl">receipt_long</span>
            </div>
            <div className="flex-1">
              <span className="text-sm md:text-base font-medium text-[#e0e2ee]">
                Incident logging enabled
              </span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          </li>

          <li className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Status Item 4 */}
          <li className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#8523dd]/10 border border-[#8523dd]/30 text-[#e9d0ff]">
              <span className="material-symbols-outlined text-xl">radar</span>
            </div>
            <div className="flex-1 flex items-center gap-2 flex-wrap">
              <span className="text-sm md:text-base font-medium text-[#e0e2ee]">
                Incident monitoring active
              </span>
              <span className="px-2 py-0.5 rounded-full border border-[#8523dd]/40 bg-[#8523dd]/20 text-[10px] font-bold text-[#e9d0ff] tracking-wider uppercase">
                AI ACTIVE
              </span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#8523dd] shadow-[0_0_8px_rgba(133,35,221,0.8)] animate-pulse" />
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-lg flex flex-col sm:flex-row gap-3 relative z-10">
        <button
          onClick={() => onNavigate('analyzing')}
          className="flex-1 bg-[#00dbe9] text-[#002022] hover:bg-[#7df4ff] font-geist font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,219,233,0.3)] transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">analytics</span>
          <span>Analyze Threat Risk</span>
        </button>

        <button
          onClick={onDeactivate}
          className="flex-1 bg-[#181c24] border border-white/15 text-[#e0e2ee] hover:bg-white/5 font-geist font-semibold text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">stop_circle</span>
          <span>Deactivate Shield</span>
        </button>
      </div>

      {/* Privacy Note */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#b9cacb]/70 relative z-10 font-mono">
        <span className="material-symbols-outlined text-sm">lock</span>
        <span>Relevant incident metadata is securely preserved.</span>
      </div>
    </main>
  );
};

