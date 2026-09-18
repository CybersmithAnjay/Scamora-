import React from 'react';
import { ScreenView, CallScenario, CRITICAL_RISK_THRESHOLD } from '../types';

interface HighRiskScreenProps {
  scenario: CallScenario;
  onActivateProtection: () => void;
  onContinueMonitoring: () => void;
  onNavigate: (screen: ScreenView) => void;
}

export const HighRiskScreen: React.FC<HighRiskScreenProps> = ({
  scenario,
  onActivateProtection,
  onContinueMonitoring,
  onNavigate,
}) => {
  const riskScore = scenario?.riskScore ?? 91;
  const isCritical = riskScore >= CRITICAL_RISK_THRESHOLD;

  return (
    <main className="pt-24 md:pt-28 pb-32 md:pb-24 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-8 min-h-[calc(100vh-80px)]">
      {/* Ambient Radial Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-25 z-0">
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] transition-colors duration-700 ${
            isCritical ? 'bg-[#93000a]' : 'bg-[#00dbe9]/20'
          }`}
        />
      </div>

      {/* Alert Header */}
      <div className="flex flex-col items-center text-center gap-2 mt-4 relative z-10">
        <div
          className={`flex items-center justify-center w-16 h-16 rounded-full mb-2 ${
            isCritical
              ? 'bg-[#93000a]/20 border border-[#ffb4ab]/40 pulse-red shadow-[0_0_30px_rgba(255,180,171,0.3)]'
              : 'bg-[#00f0ff]/10 border border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.3)]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-3xl icon-fill ${
              isCritical ? 'text-[#ffb4ab]' : 'text-[#00f0ff]'
            }`}
          >
            {isCritical ? 'warning' : 'verified_user'}
          </span>
        </div>
        <h1
          className={`font-geist text-3xl md:text-5xl font-extrabold tracking-tight uppercase ${
            isCritical ? 'text-[#ffb4ab]' : 'text-[#dbfcff]'
          }`}
        >
          {isCritical ? 'CRITICAL THREAT DETECTED' : 'SAFE INTERACTION VERIFIED'}
        </h1>
        <p className="text-base text-[#b9cacb] max-w-md mx-auto">
          {isCritical
            ? `Real-time analysis detected active threat indicators exceeding the critical safety threshold (${CRITICAL_RISK_THRESHOLD}%).`
            : `Real-time telemetry confirms acoustic harmonics and behavioral markers are within normal, safe limits.`}
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative z-10">
        {/* Risk Score Card (Spans 5 cols on md) */}
        <div
          className={`md:col-span-5 glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[280px] border transition-all duration-500 ${
            isCritical
              ? 'glow-red border-[#ffb4ab]/40 bg-[#93000a]/15'
              : 'border-[#00f0ff]/30 bg-[#002022]/40 shadow-[0_0_35px_rgba(0,219,233,0.15)]'
          }`}
        >
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: isCritical
                ? 'radial-gradient(circle at center, #ffb4ab 0%, transparent 70%)'
                : 'radial-gradient(circle at center, #00f0ff 0%, transparent 70%)',
            }}
          />
          <span className="font-geist text-xs font-bold text-[#b9cacb] uppercase tracking-widest mb-4 z-10">
            {isCritical ? 'Critical Threat Level' : 'Calculated Risk Index'}
          </span>

          <div className="relative z-10 flex items-baseline gap-2">
            <span
              className={`text-7xl md:text-8xl leading-none font-extrabold font-geist tracking-tighter transition-all duration-300 ${
                isCritical ? 'text-[#ffb4ab]' : 'text-[#00f0ff]'
              }`}
              style={{
                textShadow: isCritical
                  ? '0 0 30px rgba(255, 180, 171, 0.7)'
                  : '0 0 25px rgba(0, 240, 255, 0.5)',
              }}
            >
              {riskScore}
            </span>
            <span className="font-geist text-xl font-medium text-[#b9cacb]">/100</span>
          </div>

          {/* Conditional Threshold Indicator */}
          {isCritical ? (
            <div className="mt-6 flex items-center gap-2 bg-[#93000a]/50 border border-[#ffb4ab]/40 px-4 py-1.5 rounded-full z-10 shadow-[0_0_15px_rgba(255,91,91,0.3)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5b5b] animate-pulse" />
              <span className="font-geist text-xs font-bold text-[#ffb4ab] uppercase tracking-wider">
                Critical Threshold Passed (≥ {CRITICAL_RISK_THRESHOLD}%)
              </span>
            </div>
          ) : (
            <div className="mt-6 flex items-center gap-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-4 py-1.5 rounded-full z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              <span className="font-geist text-xs font-bold text-[#00f0ff] uppercase tracking-wider">
                Within Normal Limits (&lt; {CRITICAL_RISK_THRESHOLD}%)
              </span>
            </div>
          )}
        </div>

        {/* Context & Why Cards (Spans 7 cols on md) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Identified Technique */}
          <div className="glass-panel rounded-2xl p-5 md:p-6 flex flex-col gap-2 flex-1 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#00f0ff] text-xl">fingerprint</span>
              <h2 className="font-geist text-base md:text-lg font-bold text-[#00f0ff]">
                {isCritical ? 'Identified Threat Pattern' : 'Verified Authentication'}
              </h2>
            </div>
            <p className="font-geist text-base md:text-lg font-semibold text-[#e0e2ee]">
              {scenario?.technique || (isCritical ? 'Social Engineering / Impersonation' : 'Authentic Voice Match')}
            </p>
            <p className="text-sm text-[#b9cacb] mt-1 border-l-2 border-[#00f0ff]/40 pl-3 py-0.5 leading-relaxed">
              {scenario?.description ||
                (isCritical
                  ? 'The structural linguistics and interaction cadence strongly align with known impersonation tactics designed to bypass logical scrutiny.'
                  : 'Acoustic harmonics and biometric cadence match verified contacts without anomalies.')}
            </p>
          </div>

          {/* Indicators (Tactical List) */}
          <div className="glass-panel rounded-2xl p-5 md:p-6 flex flex-col gap-2 flex-1 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b9cacb] text-xl">analytics</span>
                <h2 className="font-geist text-base font-bold text-[#e0e2ee]">AI Analysis Vectors</h2>
              </div>
              <span className="font-geist text-[10px] font-bold text-[#e9d0ff] border border-[#8523dd]/40 bg-[#8523dd]/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                <span className="material-symbols-outlined text-xs">psychology</span>
                Insight
              </span>
            </div>

            <ul className="flex flex-col gap-1 text-sm divide-y divide-white/5">
              {isCritical ? (
                <>
                  <li className="flex items-center gap-3 py-2">
                    <span className="material-symbols-outlined text-[#ffb4ab] text-lg">trending_up</span>
                    <span className="text-[#e0e2ee]">Unusual interaction pattern & pacing</span>
                  </li>
                  <li className="flex items-center gap-3 py-2">
                    <span className="material-symbols-outlined text-[#ffb4ab] text-lg">timer</span>
                    <span className="text-[#e0e2ee]">Urgency or psychological pressure detected</span>
                  </li>
                  <li className="flex items-center gap-3 py-2">
                    <span className="material-symbols-outlined text-[#ffb4ab] text-lg">policy</span>
                    <span className="text-[#e0e2ee]">Suspicious behavioral indicators & credential harvesting</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-3 py-2">
                    <span className="material-symbols-outlined text-[#00f0ff] text-lg">check_circle</span>
                    <span className="text-[#e0e2ee]">Biometric voice cadence matches authentic baseline</span>
                  </li>
                  <li className="flex items-center gap-3 py-2">
                    <span className="material-symbols-outlined text-[#00f0ff] text-lg">check_circle</span>
                    <span className="text-[#e0e2ee]">Zero synthetic frequency harmonics detected</span>
                  </li>
                  <li className="flex items-center gap-3 py-2">
                    <span className="material-symbols-outlined text-[#00f0ff] text-lg">check_circle</span>
                    <span className="text-[#e0e2ee]">No social engineering or OTP coercion vectors</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2 relative z-10">
        {isCritical ? (
          <>
            <button
              onClick={onActivateProtection}
              className="flex-1 bg-[#00dbe9] text-[#002022] hover:bg-[#7df4ff] font-geist font-bold text-base h-14 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,219,233,0.45)] hover:shadow-[0_0_40px_rgba(0,219,233,0.6)] active:scale-95 transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-2xl icon-fill group-hover:scale-110 transition-transform">
                verified_user
              </span>
              <span>ACTIVATE PROTECTION</span>
            </button>

            <button
              onClick={onContinueMonitoring}
              className="flex-1 bg-transparent border border-[#b3c5ff]/50 text-[#b3c5ff] hover:bg-[#b3c5ff]/10 font-geist font-semibold text-base h-14 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">visibility</span>
              <span>CONTINUE MONITORING</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate('protection_active')}
              className="flex-1 bg-[#00dbe9] text-[#002022] hover:bg-[#7df4ff] font-geist font-bold text-base h-14 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,219,233,0.45)] hover:shadow-[0_0_40px_rgba(0,219,233,0.6)] active:scale-95 transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-2xl icon-fill group-hover:scale-110 transition-transform">
                arrow_back
              </span>
              <span>RETURN TO PROTECTED CALL</span>
            </button>

            <button
              onClick={onContinueMonitoring}
              className="flex-1 bg-transparent border border-[#b3c5ff]/50 text-[#b3c5ff] hover:bg-[#b3c5ff]/10 font-geist font-semibold text-base h-14 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">visibility</span>
              <span>KEEP MONITORING</span>
            </button>
          </>
        )}
      </div>
    </main>
  );
};

