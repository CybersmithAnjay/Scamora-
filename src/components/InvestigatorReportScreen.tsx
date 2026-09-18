import React, { useState } from 'react';
import { Incident } from '../types';
import { downloadIncidentReportPDF } from '../utils/pdfGenerator';

interface InvestigatorReportScreenProps {
  incident: Incident;
  onBack: () => void;
}

export const InvestigatorReportScreen: React.FC<InvestigatorReportScreenProps> = ({
  incident,
  onBack,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `SCAMORA Incident Report: ${incident.caseRef} (${incident.threatClassification}) - Threat Confirmed at ${incident.confidenceScore}% confidence.`
      );
    }
    showToast('Report reference link copied to clipboard.');
  };

  const handleExportPDF = () => {
    try {
      setIsGeneratingPdf(true);
      downloadIncidentReportPDF(incident);
      showToast(`PDF Report (${incident.caseRef}.pdf) generated successfully!`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      showToast('Error generating PDF report. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-36 relative z-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#00dbe9] text-[#002022] font-geist font-bold text-xs px-4 py-3 rounded-xl shadow-[0_0_30px_rgba(0,219,233,0.5)] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col items-start gap-2 mb-6">
        <div className="flex items-center gap-2 text-[#00f0ff] font-geist text-xs font-bold tracking-widest uppercase">
          <span className="material-symbols-outlined text-base">visibility</span>
          <span>Preview Mode</span>
        </div>

        <h2 className="font-geist text-2xl md:text-4xl font-extrabold text-[#e0e2ee] tracking-tight">
          Investigator Report
        </h2>

        <div className="bg-[#93000a]/25 border border-[#ffb4ab]/30 text-[#ffb4ab] px-3.5 py-1 rounded-full font-geist text-xs font-bold flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-[#ff5b5b] animate-pulse" />
          <span>SIMULATED INCIDENT — PROTOTYPE</span>
        </div>
      </div>

      {/* Document Container */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 rotate-[-25deg]">
          <span className="font-geist text-[100px] md:text-[140px] font-black tracking-tighter text-white">
            SCAMORA
          </span>
        </div>

        {/* Incident Metadata Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          <div className="space-y-4">
            <div>
              <p className="text-[#b9cacb] font-geist text-xs font-semibold uppercase tracking-wider mb-1">
                Case Reference
              </p>
              <p className="font-mono text-sm md:text-base text-[#e0e2ee] bg-[#181c24]/80 px-3.5 py-2.5 rounded-xl border border-white/5 font-medium">
                {incident.caseRef}
              </p>
            </div>

            <div>
              <p className="text-[#b9cacb] font-geist text-xs font-semibold uppercase tracking-wider mb-1">
                Date Generated
              </p>
              <p className="font-mono text-sm md:text-base text-[#e0e2ee] bg-[#181c24]/80 px-3.5 py-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">
                  calendar_today
                </span>
                <span>{incident.dateGenerated}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[#b9cacb] font-geist text-xs font-semibold uppercase tracking-wider mb-1">
                Threat Classification
              </p>
              <div className="flex items-center gap-2 bg-[#181c24]/80 px-3.5 py-2.5 rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-[#ffb4ab] text-lg flex-shrink-0">
                  warning
                </span>
                <span className="text-sm md:text-base text-[#e0e2ee] font-medium truncate">
                  {incident.threatClassification}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[#b9cacb] font-geist text-xs font-semibold uppercase tracking-wider mb-1">
                Target Entity
              </p>
              <p className="text-sm md:text-base text-[#e0e2ee] bg-[#181c24]/80 px-3.5 py-2.5 rounded-xl border border-white/5 font-medium">
                {incident.targetEntity}
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t border-white/10 relative z-10" />

        {/* Detection Summary */}
        <section className="relative z-10">
          <h3 className="font-geist text-lg font-bold text-[#00f0ff] mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">analytics</span>
            <span>Detection Summary</span>
          </h3>
          <p className="text-sm md:text-base text-[#b9cacb] leading-relaxed bg-[#181c24]/50 p-5 rounded-xl border border-white/5">
            {incident.detectionSummary}
          </p>
        </section>

        {/* Event Timeline */}
        <section className="relative z-10">
          <h3 className="font-geist text-lg font-bold text-[#00f0ff] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">timeline</span>
            <span>Event Timeline</span>
          </h3>

          <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/15 pl-2">
            {incident.timeline.map((event, idx) => {
              let dotColor = 'border-[#00f0ff] bg-[#050810]';
              let cardBg = 'bg-[#181c24]/80 border-white/5 text-[#e0e2ee]';

              if (event.type === 'critical') {
                dotColor = 'bg-[#ff5b5b] shadow-[0_0_10px_#ff5b5b] border-transparent animate-pulse';
                cardBg = 'bg-[#93000a]/15 border-[#ffb4ab]/30 text-[#ffb4ab]';
              } else if (event.type === 'action') {
                dotColor = 'bg-[#8523dd] shadow-[0_0_10px_#8523dd] border-transparent';
                cardBg = 'bg-[#8523dd]/10 border-[#8523dd]/30 text-[#efdbff]';
              }

              return (
                <div key={idx} className="relative pl-8">
                  <div
                    className={`absolute left-[-5px] top-2 w-[14px] h-[14px] rounded-full border-2 ${dotColor} z-10`}
                  />
                  <p className="font-mono text-xs text-[#b9cacb] mb-1">{event.time}</p>
                  <div className={`p-4 rounded-xl border ${cardBg}`}>
                    <p className="text-sm font-semibold mb-0.5">{event.title}</p>
                    <p className="text-xs md:text-sm text-[#b9cacb] leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AI Assessment Overview */}
        <section className="relative z-10">
          <div className="rounded-2xl p-5 md:p-6 bg-[#8523dd]/10 border border-[#8523dd]/40 shadow-[0_0_20px_rgba(133,35,221,0.15)]">
            <h3 className="font-geist text-base md:text-lg font-bold text-[#efdbff] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8523dd] text-xl">psychology</span>
              <span>AI Assessment Overview</span>
            </h3>
            <p className="text-sm md:text-base text-[#b9cacb] leading-relaxed">
              {incident.aiAssessment}
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="pt-4 border-t border-white/5 relative z-10">
          <p className="text-xs text-[#849495] flex items-start gap-2 leading-relaxed">
            <span className="material-symbols-outlined text-sm mt-0.5 opacity-70 flex-shrink-0">
              info
            </span>
            <span>
              AI-generated analytical aid. This report does not establish criminal responsibility
              and is intended solely for internal security review and threat modeling purposes.
              Data provided is simulated.
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-between items-center">
        <button
          onClick={onBack}
          className="w-full sm:w-auto bg-[#181c24] border border-white/10 text-[#b9cacb] hover:text-white hover:border-white/30 font-geist font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>BACK</span>
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleShare}
            className="bg-transparent border border-[#0266ff] text-[#b3c5ff] hover:bg-[#0266ff]/15 font-geist font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">share</span>
            <span>SHARE REPORT</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isGeneratingPdf}
            id="export-pdf-report-btn"
            className="bg-[#00dbe9] text-[#002022] hover:bg-[#7df4ff] disabled:opacity-50 font-geist font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,219,233,0.35)] transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            <span>{isGeneratingPdf ? 'GENERATING PDF...' : 'EXPORT PDF REPORT'}</span>
          </button>
        </div>
      </div>
    </main>
  );
};
