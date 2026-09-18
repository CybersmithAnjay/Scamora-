import React from 'react';
import { ActiveTab, ScreenView } from '../types';

interface BottomNavBarProps {
  currentTab: ActiveTab;
  currentScreen: ScreenView;
  onTabChange: (tab: ActiveTab) => void;
  onNavigate: (screen: ScreenView) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  currentScreen,
  onTabChange,
  onNavigate,
}) => {
  const isShieldActive =
    currentTab === 'SHIELD' ||
    ['shield', 'incoming_call', 'protection_active', 'analyzing', 'high_risk'].includes(currentScreen);

  const isIncidentsActive =
    currentTab === 'INCIDENTS' ||
    ['incidents', 'incident_created', 'investigator_report'].includes(currentScreen);

  const isProtectionActive =
    currentTab === 'PROTECTION' || currentScreen === 'protection_settings';

  const isProfileActive =
    currentTab === 'PROFILE' || currentScreen === 'profile';

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-[#1c2028]/80 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] md:hidden rounded-t-2xl">
      {/* SHIELD */}
      <button
        onClick={() => {
          onTabChange('SHIELD');
          onNavigate('shield');
        }}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 px-3 py-1 rounded-xl ${
          isShieldActive
            ? 'text-[#00dbe9] bg-[#00dbe9]/10'
            : 'text-[#b9cacb] opacity-60 hover:opacity-100 hover:text-[#dbfcff]'
        }`}
      >
        <span className={`material-symbols-outlined text-2xl mb-0.5 ${isShieldActive ? 'icon-fill' : ''}`}>
          shield
        </span>
        <span className="text-[10px] font-semibold tracking-wider uppercase font-geist">SHIELD</span>
      </button>

      {/* INCIDENTS */}
      <button
        onClick={() => {
          onTabChange('INCIDENTS');
          onNavigate('incidents');
        }}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 px-3 py-1 rounded-xl ${
          isIncidentsActive
            ? 'text-[#00dbe9] bg-[#00dbe9]/10'
            : 'text-[#b9cacb] opacity-60 hover:opacity-100 hover:text-[#dbfcff]'
        }`}
      >
        <span className={`material-symbols-outlined text-2xl mb-0.5 ${isIncidentsActive ? 'icon-fill' : ''}`}>
          history
        </span>
        <span className="text-[10px] font-semibold tracking-wider uppercase font-geist">INCIDENTS</span>
      </button>

      {/* PROTECTION */}
      <button
        onClick={() => {
          onTabChange('PROTECTION');
          onNavigate('protection_settings');
        }}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 px-3 py-1 rounded-xl ${
          isProtectionActive
            ? 'text-[#00dbe9] bg-[#00dbe9]/10'
            : 'text-[#b9cacb] opacity-60 hover:opacity-100 hover:text-[#dbfcff]'
        }`}
      >
        <span className={`material-symbols-outlined text-2xl mb-0.5 ${isProtectionActive ? 'icon-fill' : ''}`}>
          gpp_maybe
        </span>
        <span className="text-[10px] font-semibold tracking-wider uppercase font-geist">PROTECTION</span>
      </button>

      {/* PROFILE */}
      <button
        onClick={() => {
          onTabChange('PROFILE');
          onNavigate('profile');
        }}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 px-3 py-1 rounded-xl ${
          isProfileActive
            ? 'text-[#00dbe9] bg-[#00dbe9]/10'
            : 'text-[#b9cacb] opacity-60 hover:opacity-100 hover:text-[#dbfcff]'
        }`}
      >
        <span className={`material-symbols-outlined text-2xl mb-0.5 ${isProfileActive ? 'icon-fill' : ''}`}>
          person
        </span>
        <span className="text-[10px] font-semibold tracking-wider uppercase font-geist">PROFILE</span>
      </button>
    </nav>
  );
};
