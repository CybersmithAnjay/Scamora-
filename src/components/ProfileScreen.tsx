import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileScreenProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetData: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onUpdateProfile,
  onResetData,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name: editName, email: editEmail });
    setIsEditModalOpen(false);
    showToast('Identity updated successfully.');
  };

  const handleConfirmReset = () => {
    onResetData();
    setIsResetConfirmOpen(false);
    showToast('All local threat logs and telemetry have been purged.');
  };

  return (
    <main className="pt-24 pb-36 px-4 md:px-8 max-w-4xl mx-auto space-y-8 flex flex-col relative z-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#00dbe9] text-[#002022] font-geist font-bold text-xs px-4 py-3 rounded-xl shadow-[0_0_30px_rgba(0,219,233,0.5)] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <section className="space-y-2 text-center mt-2">
        <h2 className="font-geist text-2xl md:text-4xl font-extrabold text-[#e0e2ee] tracking-tight">
          Profile &amp; Privacy
        </h2>
        <p className="text-sm md:text-base text-[#b9cacb] max-w-md mx-auto">
          Manage your identity, secure your data, and control your digital footprint.
        </p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* User Account Card (Spans 8 cols on md) */}
        <div className="glass-panel rounded-2xl p-6 md:col-span-8 flex flex-col justify-between relative overflow-hidden group border border-white/10">
          <div className="absolute top-0 right-0 p-5 opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-5xl text-[#00dbe9]">fingerprint</span>
          </div>

          <div>
            <h3 className="font-geist text-base md:text-lg font-bold text-[#dbfcff] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff] text-xl">person</span>
              <span>User Account</span>
            </h3>

            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#262a33] border border-[#3b494b] flex items-center justify-center relative shadow-[0_0_20px_rgba(0,219,233,0.15)] flex-shrink-0">
                <span className="material-symbols-outlined text-3xl text-[#e0e2ee]">
                  account_circle
                </span>
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#00f0ff] border-2 border-[#050810]" />
              </div>

              <div>
                <p className="font-geist text-xl font-bold text-[#e0e2ee]">{profile.name}</p>
                <p className="font-mono text-xs text-[#00dbe9] tracking-widest uppercase mt-0.5">
                  ID: {profile.id}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2.5 border-b border-white/5 text-sm">
              <span className="text-[#b9cacb]">Email Address</span>
              <span className="font-mono text-[#e0e2ee]">{profile.email}</span>
            </div>

            <div className="flex justify-between items-center py-2.5 border-b border-white/5 text-sm">
              <span className="text-[#b9cacb]">Subscription Tier</span>
              <span className="text-[#00f0ff] font-semibold flex items-center gap-1.5 font-geist">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>{profile.tier}</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setEditName(profile.name);
              setEditEmail(profile.email);
              setIsEditModalOpen(true);
            }}
            className="mt-6 w-full py-3.5 rounded-xl border border-[#0266ff] text-[#b3c5ff] font-geist font-bold text-xs uppercase tracking-wider hover:bg-[#0266ff]/15 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            <span>Edit Identity</span>
          </button>
        </div>

        {/* Privacy Controls (Spans 4 cols on md) */}
        <div className="glass-panel rounded-2xl p-6 md:col-span-4 flex flex-col justify-between border border-white/10">
          <div>
            <h3 className="font-geist text-base md:text-lg font-bold text-[#e0e2ee] mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b3c5ff] text-xl">vpn_key</span>
              <span>Privacy Controls</span>
            </h3>
            <p className="font-geist text-[10px] font-bold text-[#00f0ff]/80 uppercase tracking-widest mb-6">
              YOUR DATA STAYS YOURS
            </p>

            <div className="space-y-5">
              {/* Biometric Login */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#e0e2ee] font-geist">Biometric Login</p>
                  <p className="text-xs text-[#b9cacb] mt-0.5">Require FaceID/TouchID</p>
                </div>
                <button
                  onClick={() =>
                    onUpdateProfile({ biometricLogin: !profile.biometricLogin })
                  }
                  className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-all duration-200 ${
                    profile.biometricLogin ? 'bg-[#00f0ff]' : 'bg-[#31353e]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform duration-200 ${
                      profile.biometricLogin
                        ? 'translate-x-5 bg-[#00363a]'
                        : 'translate-x-0 bg-[#b9cacb]'
                    }`}
                  />
                </button>
              </div>

              {/* Stealth Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#e0e2ee] font-geist">Stealth Mode</p>
                  <p className="text-xs text-[#b9cacb] mt-0.5">Hide active status</p>
                </div>
                <button
                  onClick={() =>
                    onUpdateProfile({ stealthMode: !profile.stealthMode })
                  }
                  className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-all duration-200 ${
                    profile.stealthMode ? 'bg-[#00f0ff]' : 'bg-[#31353e]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform duration-200 ${
                      profile.stealthMode
                        ? 'translate-x-5 bg-[#00363a]'
                        : 'translate-x-0 bg-[#b9cacb]'
                    }`}
                  />
                </button>
              </div>

              {/* Telemetry */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#e0e2ee] font-geist">Telemetry</p>
                  <p className="text-xs text-[#b9cacb] mt-0.5">Share threat data</p>
                </div>
                <button
                  onClick={() =>
                    onUpdateProfile({ telemetry: !profile.telemetry })
                  }
                  className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-all duration-200 ${
                    profile.telemetry ? 'bg-[#00f0ff]' : 'bg-[#31353e]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-transform duration-200 ${
                      profile.telemetry
                        ? 'translate-x-5 bg-[#00363a]'
                        : 'translate-x-0 bg-[#b9cacb]'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions & Data Preferences (Full width 12 cols) */}
        <div className="glass-panel rounded-2xl p-6 md:col-span-12 border border-white/10">
          <h3 className="font-geist text-base md:text-lg font-bold text-[#e0e2ee] mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
            <span className="material-symbols-outlined text-[#efdbff] text-xl">
              settings_applications
            </span>
            <span>System Permissions &amp; Data</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Permissions */}
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#181c24]/80 border border-white/5">
                <span className="material-symbols-outlined text-[#00f0ff] mt-0.5 text-xl">
                  notifications_active
                </span>
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-[#e0e2ee] font-geist">Critical Alerts</p>
                  <p className="text-xs text-[#b9cacb] mb-2.5">
                    Push &amp; SMS notifications for severe threats.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-0.5 bg-[#00f0ff]/10 text-[#00dbe9] font-geist text-[10px] font-bold rounded border border-[#00f0ff]/20">
                      SMS
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#00f0ff]/10 text-[#00dbe9] font-geist text-[10px] font-bold rounded border border-[#00f0ff]/20">
                      PUSH
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#00f0ff] text-xl">check_circle</span>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#181c24]/80 border border-white/5">
                <span className="material-symbols-outlined text-[#b9cacb] mt-0.5 text-xl">
                  location_on
                </span>
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-[#e0e2ee] font-geist">Location Tracking</p>
                  <p className="text-xs text-[#b9cacb] mb-2">
                    Used for geo-fenced threat intelligence correlation.
                  </p>
                  <span className="px-2.5 py-0.5 bg-[#31353e] text-[#b9cacb] font-geist text-[10px] font-bold rounded border border-white/10">
                    {profile.locationTracking}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#b9cacb] text-xl">manage_search</span>
              </div>
            </div>

            {/* Data Retention Policy */}
            <div className="space-y-3">
              <div className="p-5 rounded-xl bg-[#0a0e16]/90 border border-white/5 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-[#b3c5ff] text-xl">database</span>
                  <h4 className="font-geist text-sm font-bold text-[#e0e2ee]">
                    Data Retention Policy
                  </h4>
                </div>

                <p className="text-xs text-[#b9cacb] mb-5 leading-relaxed">
                  Local threat logs and audio spectral fingerprints are automatically purged after 30
                  days to ensure maximum privacy.
                </p>

                <div className="w-full bg-[#31353e] h-2.5 rounded-full overflow-hidden mb-2">
                  <div
                    className="bg-[#0266ff] h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(profile.dataUsedGB / profile.dataTotalGB) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs font-mono text-[#b9cacb]">
                  <span>{profile.dataUsedGB.toFixed(1)} GB Used</span>
                  <span>{profile.dataTotalGB.toFixed(0)} GB Allocated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone (12 cols) */}
        <div className="glass-panel rounded-2xl p-6 md:col-span-12 border border-[#93000a]/30 bg-[#93000a]/5 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <h3 className="font-geist text-base md:text-lg font-bold text-[#ffb4ab] flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-lg">warning</span>
                <span>Danger Zone</span>
              </h3>
              <p className="text-xs md:text-sm text-[#b9cacb] max-w-lg leading-relaxed">
                Permanently delete all locally stored threat data, preferences, and reset the AI
                protection model. This action cannot be undone.
              </p>
            </div>

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-[#181c24] border border-[#ffb4ab]/40 text-[#ffb4ab] font-geist font-bold text-xs uppercase tracking-wider hover:bg-[#93000a] hover:text-white transition-all neon-glow-red whitespace-nowrap active:scale-95 cursor-pointer"
            >
              Reset Protection Data
            </button>
          </div>
        </div>

        {/* About Footer */}
        <div className="md:col-span-12 text-center py-6">
          <p className="font-geist text-xs font-bold text-[#b9cacb] uppercase tracking-widest mb-1.5">
            About SCAMORA
          </p>
          <p className="text-xs text-[#849495] leading-relaxed">
            Version 4.2.1 (Build 8842) • Enterprise Grade Defense
            <br />© 2026 Scamora Security Systems.
          </p>
        </div>
      </div>

      {/* Edit Identity Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel rounded-2xl p-6 border border-white/15 shadow-2xl">
            <h3 className="font-geist text-lg font-bold text-[#e0e2ee] mb-4">Edit Profile Identity</h3>
            <form onSubmit={handleSaveIdentity} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#b9cacb] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#0a0e16] border border-white/15 focus:border-[#00dbe9] rounded-xl px-4 py-2.5 text-sm text-[#e0e2ee] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#b9cacb] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-[#0a0e16] border border-white/15 focus:border-[#00dbe9] rounded-xl px-4 py-2.5 text-sm text-[#e0e2ee] outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#b9cacb] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#00dbe9] text-[#002022] px-5 py-2 rounded-xl text-xs font-bold font-geist uppercase tracking-wider hover:bg-[#7df4ff]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel rounded-2xl p-6 border border-[#ffb4ab]/40 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#93000a]/20 border border-[#ffb4ab]/30 flex items-center justify-center text-[#ffb4ab]">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <h3 className="font-geist text-lg font-bold text-[#e0e2ee]">
              Confirm Data Reset
            </h3>
            <p className="text-sm text-[#b9cacb]">
              Are you sure you want to permanently delete all local threat logs, reset the deep learning baseline, and restore default settings?
            </p>
            <div className="flex gap-3 pt-2 justify-end">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#b9cacb] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="bg-[#ff3b30] text-white px-5 py-2 rounded-xl text-xs font-bold font-geist uppercase tracking-wider hover:bg-[#ff5b5b] cursor-pointer"
              >
                Yes, Purge Data
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
