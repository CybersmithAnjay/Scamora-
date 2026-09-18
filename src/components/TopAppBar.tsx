import React from 'react';
import { ActiveTab, ScreenView } from '../types';

interface TopAppBarProps {
  currentTab: ActiveTab;
  currentScreen: ScreenView;
  isShieldActive?: boolean;
  onToggleShield?: () => void;
  onTabChange: (tab: ActiveTab) => void;
  onNavigate: (screen: ScreenView) => void;
  onOpenSimulator: () => void;
  isSimulatingCall: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  currentScreen,
  isShieldActive = false,
  onToggleShield,
  onTabChange,
  onNavigate,
  onOpenSimulator,
  isSimulatingCall,
}) => {
  const isBackVisible = currentScreen !== 'shield' && currentScreen !== 'incidents' && currentScreen !== 'protection_settings' && currentScreen !== 'profile';

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-[#10131c]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_40px_rgba(0,219,233,0.08)]">
      {/* Leading action: Back or Shield icon */}
      <div className="flex items-center gap-3">
        {isBackVisible ? (
          <button
            onClick={() => onNavigate('shield')}
            aria-label="Back to dashboard"
            className="text-[#dbfcff] hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
        ) : (
          <button
            onClick={() => onNavigate('shield')}
            aria-label="Home"
            className="text-[#dbfcff] hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 cursor-pointer"
          >
            <span className="material-symbols-outlined icon-fill text-2xl text-[#00dbe9]">security</span>
          </button>
        )}

        {/* Brand Logo */}
        <button
          onClick={() => {
            onTabChange('SHIELD');
            onNavigate('shield');
          }}
          className="font-geist font-bold text-2xl md:text-3xl tracking-tighter text-[#dbfcff] hover:text-[#00dbe9] transition-colors cursor-pointer"
        >
          SCAMORA
        </button>
      </div>

      {/* Desktop Navigation Cluster */}
      <nav className="hidden md:flex items-center gap-8">
        <button
          onClick={() => {
            onTabChange('SHIELD');
            onNavigate('shield');
          }}
          className={`flex items-center gap-2 py-2 px-1 text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer ${
            currentTab === 'SHIELD' && currentScreen === 'shield'
              ? 'text-[#00dbe9] border-b-2 border-[#00dbe9]'
              : 'text-[#b9cacb] hover:text-[#dbfcff] opacity-70 hover:opacity-100'
          }`}
        >
          <span className={`material-symbols-outlined text-lg ${currentTab === 'SHIELD' ? 'icon-fill' : ''}`}>
            shield
          </span>
          <span>SHIELD</span>
        </button>

        <button
          onClick={() => {
            onTabChange('INCIDENTS');
            onNavigate('incidents');
          }}
          className={`flex items-center gap-2 py-2 px-1 text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer ${
            currentTab === 'INCIDENTS' || currentScreen === 'incidents' || currentScreen === 'incident_created' || currentScreen === 'investigator_report'
              ? 'text-[#00dbe9] border-b-2 border-[#00dbe9]'
              : 'text-[#b9cacb] hover:text-[#dbfcff] opacity-70 hover:opacity-100'
          }`}
        >
          <span className={`material-symbols-outlined text-lg ${currentTab === 'INCIDENTS' ? 'icon-fill' : ''}`}>
            history
          </span>
          <span>INCIDENTS</span>
        </button>

        <button
          onClick={() => {
            onTabChange('PROTECTION');
            onNavigate('protection_settings');
          }}
          className={`flex items-center gap-2 py-2 px-1 text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer ${
            currentTab === 'PROTECTION' || currentScreen === 'protection_settings'
              ? 'text-[#00dbe9] border-b-2 border-[#00dbe9]'
              : 'text-[#b9cacb] hover:text-[#dbfcff] opacity-70 hover:opacity-100'
          }`}
        >
          <span className={`material-symbols-outlined text-lg ${currentTab === 'PROTECTION' ? 'icon-fill' : ''}`}>
            gpp_maybe
          </span>
          <span>PROTECTION</span>
        </button>

        <button
          onClick={() => {
            onTabChange('PROFILE');
            onNavigate('profile');
          }}
          className={`flex items-center gap-2 py-2 px-1 text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer ${
            currentTab === 'PROFILE' || currentScreen === 'profile'
              ? 'text-[#00dbe9] border-b-2 border-[#00dbe9]'
              : 'text-[#b9cacb] hover:text-[#dbfcff] opacity-70 hover:opacity-100'
          }`}
        >
          <span className={`material-symbols-outlined text-lg ${currentTab === 'PROFILE' ? 'icon-fill' : ''}`}>
            person
          </span>
          <span>PROFILE</span>
        </button>
      </nav>

      {/* Trailing Controls: Quick SCAMORA SHIELD Activator & Simulation Launch */}
      <div className="flex items-center gap-2">
        {onToggleShield && (
          <button
            onClick={onToggleShield}
            title={isShieldActive ? 'Click to Pause Scamora Shield' : 'Click to Activate Scamora Shield'}
            className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold font-geist tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              isShieldActive
                ? 'bg-[#00f0ff]/15 border-[#00f0ff]/50 text-[#00dbe9] shadow-[0_0_15px_rgba(0,219,233,0.3)]'
                : 'bg-white/5 border-white/15 text-[#b9cacb] hover:border-[#00dbe9]/50 hover:text-white'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-all ${
                isShieldActive ? 'bg-[#00dbe9] animate-pulse shadow-[0_0_8px_#00dbe9]' : 'bg-[#849495]'
              }`}
            />
            <span>{isShieldActive ? 'SHIELD: ON' : 'SHIELD: OFF'}</span>
          </button>
        )}

        <button
          onClick={onOpenSimulator}
          title="Interactive Screen Switcher & Threat Simulator"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            isSimulatingCall
              ? 'bg-[#93000a]/30 border-[#ffb4ab]/40 text-[#ffb4ab] animate-pulse'
              : 'bg-[#00f0ff]/10 border-[#00dbe9]/30 text-[#00dbe9] hover:bg-[#00f0ff]/20'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-ping" />
          <span className="hidden sm:inline">Simulate Call</span>
          <span className="sm:hidden">Test</span>
        </button>

        <button
          onClick={onOpenSimulator}
          aria-label="Radar scan"
          className="text-[#00dbe9] hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl animate-spin" style={{ animationDuration: '8s' }}>
            radar
          </span>
        </button>
      </div>
    </header>
  );
};
