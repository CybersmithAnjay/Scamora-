import React, { useState } from 'react';
import { Incident, IncidentSeverity, ScreenView } from '../types';

interface IncidentsScreenProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
  onNavigate: (screen: ScreenView) => void;
}

export const IncidentsScreen: React.FC<IncidentsScreenProps> = ({
  incidents,
  onSelectIncident,
  onNavigate,
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSeverity =
      selectedSeverity === 'ALL' || inc.severity === selectedSeverity;
    const matchesSearch =
      inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.threatClassification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.callerNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <main className="pt-24 pb-36 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
      {/* Header & Filter Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-geist text-2xl md:text-4xl font-extrabold text-[#dbfcff] tracking-tight">
            Incidents
          </h2>
          <p className="text-xs md:text-sm text-[#b9cacb] mt-0.5">
            Historical threat records and forensics.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-[#262a33] hover:bg-[#31353e] border border-[#849495]/40 rounded-full px-4 py-2 flex items-center gap-2 transition-colors cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#e0e2ee]"
          >
            <span className="material-symbols-outlined text-sm">filter_list</span>
            <span>FILTER: {selectedSeverity}</span>
          </button>

          {/* Filter Dropdown */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-44 glass-panel rounded-xl py-2 shadow-2xl border border-white/10 z-20">
              {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => {
                    setSelectedSeverity(sev);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold font-geist uppercase tracking-wider flex items-center justify-between hover:bg-white/10 transition-colors ${
                    selectedSeverity === sev ? 'text-[#00dbe9]' : 'text-[#b9cacb]'
                  }`}
                >
                  <span>{sev}</span>
                  {selectedSeverity === sev && (
                    <span className="material-symbols-outlined text-sm">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#849495] text-lg">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by ID, caller number, or classification..."
          className="w-full bg-[#0a0e16] border border-white/10 focus:border-[#00dbe9] focus:shadow-[0_0_15px_rgba(0,219,233,0.2)] rounded-xl py-3 pl-11 pr-4 text-sm text-[#e0e2ee] placeholder-[#849495] outline-none transition-all"
        />
      </div>

      {/* Incident List Cards */}
      <div className="flex flex-col gap-4">
        {filteredIncidents.map((incident) => {
          let icon = 'warning';
          let iconBg = 'bg-[#93000a] text-[#ffdad6]';
          let borderGlow = 'hover:border-[#ffb4ab]/40';
          let sevBg = 'bg-[#93000a]/20 border-[#ffb4ab]/30 text-[#ffb4ab]';

          if (incident.severity === 'MEDIUM') {
            icon = 'mark_email_unread';
            iconBg = 'bg-[#0266ff]/30 text-[#b3c5ff] border border-[#0266ff]/40';
            borderGlow = 'hover:border-[#0266ff]/40';
            sevBg = 'bg-[#0266ff]/20 border-[#0266ff]/30 text-[#b3c5ff]';
          } else if (incident.severity === 'LOW') {
            icon = 'public_off';
            iconBg = 'bg-[#31353e] text-[#b9cacb] border border-white/10';
            borderGlow = 'hover:border-white/20';
            sevBg = 'bg-[#31353e] border-white/10 text-[#b9cacb]';
          }

          return (
            <article
              key={incident.id}
              onClick={() => onSelectIncident(incident)}
              className={`glass-panel rounded-2xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center transition-all hover:-translate-y-0.5 cursor-pointer border border-white/10 ${borderGlow}`}
            >
              <div className="flex gap-4 items-center w-full sm:w-auto">
                <div className={`${iconBg} p-3 rounded-full flex shrink-0`}>
                  <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-[#b9cacb] tracking-wider">
                    {incident.id}
                  </span>
                  <h3 className="font-geist text-base font-bold text-[#e0e2ee]">
                    {incident.threatClassification.split(' - ')[0]}
                  </h3>
                  <span className="text-xs text-[#b9cacb]/80 font-mono mt-0.5">
                    {incident.callerNumber}
                  </span>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-end w-full sm:w-auto justify-between sm:justify-center mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-white/5 sm:border-t-0">
                <div className={`flex items-center gap-2 border px-3 py-1 rounded-full ${sevBg}`}>
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      incident.severity === 'HIGH' ? 'bg-[#ff5b5b] animate-pulse' : 'bg-current'
                    }`}
                  />
                  <span className="font-geist text-[10px] font-bold uppercase tracking-wider">
                    {incident.severity}
                  </span>
                </div>

                <span
                  className={`font-geist text-[10px] font-bold tracking-widest uppercase ${
                    incident.status === 'Active' ? 'text-[#00f0ff]' : 'text-[#849495]'
                  }`}
                >
                  {incident.status}
                </span>
              </div>
            </article>
          );
        })}

        {filteredIncidents.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl border border-white/5">
            <span className="material-symbols-outlined text-4xl text-[#849495] mb-2">
              search_off
            </span>
            <p className="text-sm text-[#b9cacb]">No incidents found matching your query.</p>
          </div>
        )}
      </div>
    </main>
  );
};
