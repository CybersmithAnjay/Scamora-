import React, { useState } from 'react';
import { CallScenario } from '../types';

interface IncomingCallModalProps {
  scenario: CallScenario;
  isShieldInitiallyActive?: boolean;
  onAcceptCall: (withShield: boolean) => void;
  onDeclineCall: () => void;
  onActivateShield: () => void;
}

export const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  scenario,
  isShieldInitiallyActive = false,
  onAcceptCall,
  onDeclineCall,
  onActivateShield,
}) => {
  const [isActivated, setIsActivated] = useState<boolean>(isShieldInitiallyActive);

  const handleShieldClick = () => {
    setIsActivated(true);
    onActivateShield();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050810]/95 backdrop-blur-2xl flex flex-col items-center justify-between p-6 pb-28 md:pb-12 overflow-y-auto">
      {/* Ambient Red/Cyan Warning Background Blur */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] max-w-2xl aspect-square blur-[100px] transition-all duration-700 ${
            isActivated
              ? 'bg-[radial-gradient(ellipse_at_center,rgba(0,219,233,0.25)_0%,rgba(5,8,16,0)_70%)]'
              : 'bg-[radial-gradient(ellipse_at_center,rgba(147,0,10,0.18)_0%,rgba(5,8,16,0)_70%)]'
          }`}
        />
      </div>

      {/* OS Call Header info */}
      <div className="w-full max-w-md text-center space-y-2 mt-8 md:mt-12 relative z-10">
        <div className="flex items-center justify-center gap-2">
          <span className="font-geist text-xs uppercase tracking-widest text-[#b9cacb] font-semibold">
            INCOMING CALL
          </span>
          {isActivated && (
            <span className="px-2 py-0.5 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] font-geist text-[10px] font-bold tracking-wider uppercase animate-pulse">
              SHIELD PROTECTED
            </span>
          )}
        </div>
        <h1 className="font-geist text-3xl md:text-5xl font-bold text-[#e0e2ee] tracking-tight">
          {scenario.callerName || 'Unknown Caller'}
        </h1>
        <p className="text-lg md:text-xl text-[#b9cacb] font-mono">
          {scenario.callerNumber || '000-555-0199'}
        </p>
      </div>

      {/* Caller Avatar / Radar with Concentric Pulsing Wave */}
      <div className="relative my-8 flex items-center justify-center relative z-10">
        <div
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#181c24] flex items-center justify-center relative border transition-all duration-500 ${
            isActivated
              ? 'border-[#00f0ff]/60 shadow-[0_0_50px_rgba(0,240,255,0.35)]'
              : 'border-white/10 caller-pulse shadow-[0_0_40px_rgba(255,59,48,0.15)]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-6xl md:text-7xl transition-colors duration-300 ${
              isActivated ? 'text-[#00f0ff]' : 'text-[#b9cacb]/60'
            } icon-fill`}
          >
            person
          </span>

          {/* Tactical shield badge attached to avatar when activated */}
          {isActivated && (
            <div className="absolute -bottom-2 -right-2 bg-[#002022] border-2 border-[#00f0ff] text-[#00f0ff] w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_#00f0ff] animate-bounce">
              <span className="material-symbols-outlined text-xl icon-fill">verified_user</span>
            </div>
          )}
        </div>
      </div>

      {/* SCAMORA Overlay Card */}
      <div
        className={`w-full max-w-md glass-panel rounded-2xl p-6 flex flex-col items-center text-center space-y-4 relative overflow-hidden transition-all duration-500 shadow-2xl relative z-10 group border ${
          isActivated
            ? 'border-[#00f0ff] bg-[#002022]/60 shadow-[0_0_40px_rgba(0,219,233,0.35)]'
            : 'border-[#00f0ff]/30 hover:border-[#00f0ff]/60'
        }`}
      >
        {/* Decorative subtle border glow */}
        <div
          className={`absolute -inset-px bg-gradient-to-r transition-opacity duration-500 rounded-2xl pointer-events-none ${
            isActivated
              ? 'from-[#00f0ff]/30 via-[#00f0ff]/50 to-[#0266ff]/40 opacity-100'
              : 'from-[#00f0ff]/10 via-[#00f0ff]/30 to-[#0266ff]/20 opacity-70 group-hover:opacity-100'
          }`}
        />

        <div className="flex items-center space-x-2 text-[#00f0ff]">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
              isActivated
                ? 'bg-[#00f0ff] text-[#002022] border-[#00f0ff] shadow-[0_0_15px_#00f0ff]'
                : 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30 animate-pulse-ring'
            }`}
          >
            <span className="material-symbols-outlined text-xl icon-fill">
              {isActivated ? 'verified_user' : 'security'}
            </span>
          </div>
          <span className="font-geist text-sm font-extrabold tracking-widest uppercase text-[#dbfcff]">
            SCAMORA SHIELD
          </span>
        </div>

        <p className="text-sm text-[#b9cacb] px-4 leading-relaxed">
          {isActivated
            ? 'Scamora Shield is ACTIVATED. Real-time neural audio interception is ready when you answer.'
            : 'Scamora stays inactive until you choose to activate it. Tap below to arm defense, then pick up or decline.'}
        </p>

        {/* The Activate Shield Button with Active Feedback */}
        <button
          onClick={handleShieldClick}
          id="activate-scamora-shield-call-btn"
          className={`w-full py-4 px-6 rounded-xl font-geist font-extrabold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer ${
            isActivated
              ? 'bg-[#181c24] border-2 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_25px_rgba(0,219,233,0.3)]'
              : 'bg-[#00dbe9] text-[#002022] hover:bg-[#7df4ff] shadow-[0_0_30px_rgba(0,219,233,0.5)] hover:shadow-[0_0_40px_rgba(0,219,233,0.7)] group'
          }`}
        >
          <span
            className={`material-symbols-outlined text-2xl icon-fill transition-transform ${
              isActivated ? 'text-[#00f0ff]' : 'group-hover:scale-110'
            }`}
          >
            {isActivated ? 'check_circle' : 'shield'}
          </span>
          <span>{isActivated ? 'SHIELD ACTIVATED' : 'ACTIVATE SHIELD'}</span>
        </button>

        {isActivated && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span>Telemetry Armed • Ready to Answer</span>
          </div>
        )}
      </div>

      {/* Call Controls: Decline & Accept */}
      <div className="w-full max-w-md flex justify-around items-center px-6 mt-6 relative z-10">
        {/* Decline */}
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={onDeclineCall}
            aria-label="Decline Call"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#ff3b30] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform shadow-[0_10px_25px_rgba(255,59,48,0.35)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-3xl md:text-4xl icon-fill">call_end</span>
          </button>
          <span className="font-geist text-xs font-semibold text-[#b9cacb] uppercase tracking-wider">
            Decline
          </span>
        </div>

        {/* Accept / Pick Up Call */}
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => onAcceptCall(isActivated)}
            aria-label="Accept Call"
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#34c759] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform shadow-[0_10px_25px_rgba(52,199,89,0.35)] cursor-pointer ${
              isActivated ? 'ring-4 ring-[#00f0ff] ring-offset-4 ring-offset-[#050810] shadow-[0_0_30px_rgba(52,199,89,0.7)]' : ''
            }`}
          >
            <span className="material-symbols-outlined text-3xl md:text-4xl icon-fill">call</span>
          </button>
          <span className="font-geist text-xs font-semibold text-[#b9cacb] uppercase tracking-wider">
            {isActivated ? 'Accept (Protected)' : 'Accept'}
          </span>
        </div>
      </div>
    </div>
  );
};
