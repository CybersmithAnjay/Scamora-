import React, { useState } from 'react';
import { ProtectionSettings } from '../types';

interface ProtectionScreenProps {
  settings: ProtectionSettings;
  onUpdateSettings: (newSettings: Partial<ProtectionSettings>) => void;
}

export const ProtectionScreen: React.FC<ProtectionScreenProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const handleForceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onUpdateSettings({ lastDbUpdate: 'Just now' });
      setSyncFeedback('Threat database synchronized: v2.4.1 (Latest definitions loaded).');
      setTimeout(() => setSyncFeedback(null), 3000);
    }, 1200);
  };

  const isCoreOn = settings.coreProtectionActive;

  return (
    <main className="pt-24 pb-36 px-4 md:px-8 max-w-5xl mx-auto w-full flex flex-col gap-6 relative z-10">
      {/* Toast Feedback */}
      {syncFeedback && (
        <div className="fixed top-20 right-6 z-50 bg-[#00dbe9] text-[#002022] font-geist font-bold text-xs px-4 py-3 rounded-xl shadow-[0_0_30px_rgba(0,219,233,0.5)] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-sm">cloud_done</span>
          <span>{syncFeedback}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="font-geist text-2xl md:text-4xl font-extrabold text-[#dbfcff] tracking-tight">
          Protection Engine
        </h2>
        <p className="text-sm text-[#b9cacb] mt-1">
          Manage your active defenses and privacy controls.
        </p>
      </div>

      {/* Master Toggle Section */}
      <section
        className={`glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border transition-all duration-300 ${
          isCoreOn ? 'border-[#00dbe9]/50 glow-active' : 'border-white/10'
        }`}
      >
        <div>
          <h3 className="font-geist text-lg font-bold text-[#e0e2ee] flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-xl transition-colors ${
                isCoreOn ? 'text-[#00dbe9] icon-fill' : 'text-[#b9cacb]'
              }`}
            >
              gpp_maybe
            </span>
            <span>Core Protection</span>
          </h3>
          <p className="text-sm text-[#b9cacb] mt-1">
            {isCoreOn
              ? 'Real-time neural threat analysis is actively intercepting calls.'
              : 'Real-time threat analysis is currently disabled.'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`font-geist text-xs font-bold uppercase tracking-wider ${
              isCoreOn ? 'text-[#00dbe9]' : 'text-[#849495]'
            }`}
          >
            Protection: {isCoreOn ? 'Active' : 'Inactive'}
          </span>

          {/* Master Cyber Toggle Switch */}
          <button
            onClick={() =>
              onUpdateSettings({
                coreProtectionActive: !isCoreOn,
                systemsMonitored: !isCoreOn ? 4 : 0,
              })
            }
            aria-pressed={isCoreOn}
            className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-all duration-300 relative ${
              isCoreOn
                ? 'bg-[#00dbe9] shadow-[0_0_20px_rgba(0,219,233,0.5)]'
                : 'bg-[#31353e]'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full transition-transform duration-300 ${
                isCoreOn
                  ? 'translate-x-6 bg-[#00363a]'
                  : 'translate-x-0 bg-[#b9cacb]'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Grid Layout for Stats & Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column: Dashboard Stats */}
        <div className="flex flex-col gap-5">
          {/* Active Protections Card */}
          <section className="glass-panel rounded-2xl p-6 flex flex-col justify-between border border-white/10 h-full">
            <h3 className="font-geist text-xs font-bold text-[#b9cacb] uppercase tracking-wider mb-2">
              Active Protections
            </h3>

            <div className="flex items-baseline gap-3 my-3">
              <span className="font-geist text-4xl md:text-5xl font-extrabold text-[#e0e2ee]">
                {settings.systemsMonitored}
              </span>
              <span className="text-sm text-[#b9cacb]">Systems monitored</span>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs">
              <div
                className={`w-2 h-2 rounded-full ${
                  isCoreOn ? 'bg-[#00dbe9] animate-pulse' : 'bg-[#849495] opacity-50'
                }`}
              />
              <span className="text-[#b9cacb] font-geist">
                {isCoreOn ? 'All 4 defense nodes operational' : 'Awaiting activation'}
              </span>
            </div>
          </section>

          {/* Threat Database Card */}
          <section className="glass-panel rounded-2xl p-6 flex flex-col justify-between border border-white/10 h-full">
            <h3 className="font-geist text-xs font-bold text-[#b9cacb] uppercase tracking-wider mb-2">
              Threat Database
            </h3>

            <div className="flex items-center gap-3 my-2">
              <span
                className={`material-symbols-outlined text-2xl text-[#00dbe9] ${
                  isSyncing ? 'animate-spin' : ''
                }`}
              >
                sync
              </span>
              <span className="font-geist text-xl font-bold text-[#e0e2ee]">
                Synced ({settings.threatDatabaseVersion})
              </span>
            </div>

            <p className="text-xs md:text-sm text-[#b9cacb] mb-4">
              Last update: {settings.lastDbUpdate}
            </p>

            <div className="pt-2">
              <button
                onClick={handleForceSync}
                disabled={isSyncing}
                className="font-geist text-xs font-bold text-[#00dbe9] hover:opacity-80 transition-opacity flex items-center gap-1.5 uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                <span>{isSyncing ? 'Syncing...' : 'Force Sync'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Preferences & Controls */}
        <div className="flex flex-col gap-5">
          {/* Protection Preferences */}
          <section className="glass-panel rounded-2xl p-6 flex flex-col gap-4 border border-white/10">
            <h3 className="font-geist text-base font-bold text-[#e0e2ee]">
              Protection Preferences
            </h3>

            {/* Auto-Block Threats Toggle */}
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <div className="pr-4">
                <h4 className="font-geist text-sm font-semibold text-[#e0e2ee]">
                  Auto-Block Threats
                </h4>
                <p className="text-xs text-[#b9cacb] mt-0.5">
                  Automatically neutralize high-risk activity.
                </p>
              </div>

              <button
                onClick={() =>
                  onUpdateSettings({ autoBlockThreats: !settings.autoBlockThreats })
                }
                className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-all duration-200 ${
                  settings.autoBlockThreats ? 'bg-[#00dbe9]' : 'bg-[#31353e]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-transform duration-200 ${
                    settings.autoBlockThreats
                      ? 'translate-x-5 bg-[#00363a]'
                      : 'translate-x-0 bg-[#b9cacb]'
                  }`}
                />
              </button>
            </div>

            {/* Deep Scan Focus Toggle */}
            <div className="flex justify-between items-center py-2">
              <div className="pr-4">
                <h4 className="font-geist text-sm font-semibold text-[#e0e2ee]">
                  Deep Scan Focus
                </h4>
                <p className="text-xs text-[#b9cacb] mt-0.5">
                  Allocate more neural resources for thorough analysis.
                </p>
              </div>

              <button
                onClick={() =>
                  onUpdateSettings({ deepScanFocus: !settings.deepScanFocus })
                }
                className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-all duration-200 ${
                  settings.deepScanFocus ? 'bg-[#00dbe9]' : 'bg-[#31353e]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-transform duration-200 ${
                    settings.deepScanFocus
                      ? 'translate-x-5 bg-[#00363a]'
                      : 'translate-x-0 bg-[#b9cacb]'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Privacy & Notifications */}
          <section className="glass-panel rounded-2xl p-6 flex flex-col gap-4 border border-white/10">
            <h3 className="font-geist text-base font-bold text-[#e0e2ee]">
              Privacy &amp; Notifications
            </h3>

            {/* Anonymous Telemetry */}
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <div className="pr-4">
                <h4 className="font-geist text-sm font-semibold text-[#e0e2ee]">
                  Anonymous Telemetry
                </h4>
                <p className="text-xs text-[#b9cacb] mt-0.5">
                  Help improve AI detection models with encrypted hashes.
                </p>
              </div>

              <button
                onClick={() =>
                  onUpdateSettings({ anonymousTelemetry: !settings.anonymousTelemetry })
                }
                className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-all duration-200 ${
                  settings.anonymousTelemetry ? 'bg-[#00dbe9]' : 'bg-[#31353e]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-transform duration-200 ${
                    settings.anonymousTelemetry
                      ? 'translate-x-5 bg-[#00363a]'
                      : 'translate-x-0 bg-[#b9cacb]'
                  }`}
                />
              </button>
            </div>

            {/* Critical Alerts Only */}
            <div className="flex justify-between items-center py-2">
              <div className="pr-4">
                <h4 className="font-geist text-sm font-semibold text-[#e0e2ee]">
                  Critical Alerts Only
                </h4>
                <p className="text-xs text-[#b9cacb] mt-0.5">
                  Mute low-level warning notifications.
                </p>
              </div>

              <button
                onClick={() =>
                  onUpdateSettings({ criticalAlertsOnly: !settings.criticalAlertsOnly })
                }
                className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-all duration-200 ${
                  settings.criticalAlertsOnly ? 'bg-[#00dbe9]' : 'bg-[#31353e]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-transform duration-200 ${
                    settings.criticalAlertsOnly
                      ? 'translate-x-5 bg-[#00363a]'
                      : 'translate-x-0 bg-[#b9cacb]'
                  }`}
                />
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
