import React, { useState, useEffect } from 'react';
import { ScreenView, CallScenario, CRITICAL_RISK_THRESHOLD } from '../types';

interface AnalyzingScreenProps {
  scenario: CallScenario;
  onNavigate: (screen: ScreenView) => void;
  onAbort: () => void;
}

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({
  scenario,
  onNavigate,
  onAbort,
}) => {
  const targetRisk = scenario?.riskScore ?? 85;
  const isCritical = targetRisk >= CRITICAL_RISK_THRESHOLD;

  const [progress1, setProgress1] = useState(20);
  const [progress2, setProgress2] = useState(10);
  const [riskPercent, setRiskPercent] = useState(Math.min(25, targetRisk));

  useEffect(() => {
    const timer1 = setInterval(() => {
      setProgress1((p) => (p < 95 ? p + 8 : p));
      setProgress2((p) => (p < 88 ? p + 7 : p));
      setRiskPercent((r) => {
        if (r < targetRisk) {
          return Math.min(targetRisk, r + Math.max(1, Math.floor(Math.abs(targetRisk - r) / 4)));
        }
        return targetRisk;
      });
    }, 120);

    // Auto navigate to assessment screen after 4.5 seconds of analysis
    const autoNav = setTimeout(() => {
      onNavigate('high_risk');
    }, 4500);

    return () => {
      clearInterval(timer1);
      clearTimeout(autoNav);
    };
  }, [onNavigate, targetRisk]);

  return (
    <main className="flex-grow flex flex-col pt-24 pb-36 px-4 md:px-8 relative z-10 gap-6 w-full max-w-md mx-auto items-center justify-center min-h-[calc(100vh-80px)]">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00f0ff]/10 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div
        className={`absolute bottom-1/4 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-[90px] pointer-events-none -z-10 transition-colors duration-700 ${
          isCritical ? 'bg-[#ffb4ab]/20' : 'bg-[#00f0ff]/15'
        }`}
      />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center mb-1 animate-pulse-ring border border-[#00f0ff]/30">
          <span className="material-symbols-outlined text-[#00f0ff] animate-radar text-2xl">
            memory
          </span>
        </div>
        <h1 className="font-geist text-2xl md:text-3xl font-bold text-[#dbfcff] tracking-tight">
          SCAMORA IS ANALYZING
        </h1>
        <p className="text-sm text-[#b9cacb]">
          Intercepting real-time audio telemetry & harmonics...
        </p>
      </div>

      {/* Risk Assessment Meter Card */}
      <section
        className={`w-full glass-panel rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 border ${
          isCritical
            ? 'neon-glow-red border-[#ffb4ab]/40 bg-[#93000a]/10'
            : 'border-[#00f0ff]/30 bg-[#002022]/30 shadow-[0_0_35px_rgba(0,219,233,0.15)]'
        }`}
      >
        {/* Tactical Corner Markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30 m-2" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/30 m-2" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/30 m-2" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30 m-2" />

        <div className="flex items-center gap-2 mb-4">
          <span
            className={`font-geist text-xs font-bold uppercase tracking-widest ${
              isCritical ? 'text-[#ffb4ab]' : 'text-[#00f0ff]'
            }`}
          >
            {isCritical ? 'CRITICAL THREAT EVALUATION' : 'NORMAL RISK ASSESSMENT'}
          </span>
        </div>

        <div className="relative w-44 h-44 flex items-center justify-center mb-2">
          {/* Outer Decorative Dashed Radar Ring */}
          <svg className="absolute inset-0 w-full h-full animate-radar opacity-30" viewBox="0 0 100 100">
            <circle
              className={isCritical ? 'text-[#ffb4ab]' : 'text-[#00f0ff]'}
              cx="50"
              cy="50"
              fill="none"
              r="48"
              stroke="currentColor"
              strokeDasharray="2 4"
              strokeWidth="0.75"
            />
          </svg>

          {/* Main Progress Ring */}
          <svg
            className={`absolute inset-0 w-full h-full -rotate-90 ${
              isCritical
                ? 'drop-shadow-[0_0_15px_rgba(255,180,171,0.6)]'
                : 'drop-shadow-[0_0_15px_rgba(0,219,233,0.6)]'
            }`}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="44"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="4.5"
            />
            <circle
              className={`transition-all duration-300 ease-out ${
                isCritical ? 'text-[#ff5b5b]' : 'text-[#00dbe9]'
              }`}
              cx="50"
              cy="50"
              fill="none"
              r="44"
              stroke="currentColor"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 - (276.46 * Math.min(100, riskPercent)) / 100}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="flex flex-col items-center justify-center text-center z-10">
            <span
              className={`font-geist text-5xl font-extrabold tracking-tight ${
                isCritical ? 'text-[#ffb4ab]' : 'text-[#00f0ff]'
              }`}
            >
              {riskPercent}%
            </span>
            <span
              className={`font-geist text-[10px] font-bold tracking-widest uppercase mt-1 px-2 py-0.5 rounded-full ${
                isCritical
                  ? 'bg-[#93000a]/50 text-[#ffb4ab] border border-[#ffb4ab]/40 animate-pulse'
                  : 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30'
              }`}
            >
              {isCritical ? 'CRITICAL THRESHOLD PASSED' : 'WITHIN NORMAL LIMITS'}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#b9cacb] mt-2 font-mono text-center">
          Target: {scenario.callerNumber || '000-555-0199'}
        </p>
      </section>

      {/* Progress List */}
      <section className="w-full flex flex-col gap-3">
        {/* Progress Item 1 */}
        <div className="glass-panel rounded-xl p-4 flex items-center gap-4 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-[#00f0ff]/10 flex items-center justify-center flex-shrink-0 relative">
            <span className="material-symbols-outlined text-[#00f0ff] text-base animate-spin">
              autorenew
            </span>
          </div>
          <div className="flex-grow">
            <p className="font-geist text-sm font-medium text-[#e0e2ee]">
              Analyzing acoustic & voice biometrics...
            </p>
            <div className="w-full h-1.5 bg-[#31353e] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#00f0ff] rounded-full relative transition-all duration-300"
                style={{ width: `${progress1}%` }}
              >
                <div className="absolute top-0 right-0 w-4 h-full bg-white/60 blur-[2px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Item 2 */}
        <div className="glass-panel rounded-xl p-4 flex items-center gap-4 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-[#00f0ff]/10 flex items-center justify-center flex-shrink-0 relative">
            <span className="material-symbols-outlined text-[#00f0ff] text-base animate-spin" style={{ animationDuration: '2s' }}>
              radar
            </span>
          </div>
          <div className="flex-grow">
            <p className="font-geist text-sm font-medium text-[#e0e2ee]">
              Cross-referencing fraud taxonomies...
            </p>
            <div className="w-full h-1.5 bg-[#31353e] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#00f0ff] rounded-full relative transition-all duration-300"
                style={{ width: `${progress2}%` }}
              >
                <div className="absolute top-0 right-0 w-4 h-full bg-white/60 blur-[2px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
        <button
          onClick={() => onNavigate('high_risk')}
          className={`font-geist font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
            isCritical
              ? 'bg-[#ff3b30]/20 border border-[#ff3b30]/60 text-[#ffb4ab] hover:bg-[#ff3b30]/30 shadow-[0_0_20px_rgba(255,59,48,0.3)]'
              : 'bg-[#00f0ff]/20 border border-[#00f0ff]/60 text-[#dbfcff] hover:bg-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,219,233,0.3)]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {isCritical ? 'warning' : 'verified'}
          </span>
          <span>{isCritical ? 'View High-Risk Assessment' : 'View Safe Assessment'}</span>
        </button>

        <button
          onClick={onAbort}
          className="font-geist text-xs font-semibold text-[#00dbe9] hover:text-white uppercase tracking-widest flex items-center justify-center gap-2 border border-[#00dbe9]/30 px-5 py-3 rounded-full glass-panel hover:bg-[#00dbe9]/10 transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">close</span>
          <span>ABORT ANALYSIS</span>
        </button>
      </div>
    </main>
  );
};

