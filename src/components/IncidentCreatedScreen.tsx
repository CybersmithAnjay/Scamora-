import React, { useState } from 'react';
import { ScreenView, Incident } from '../types';
import { downloadIncidentReportPDF } from '../utils/pdfGenerator';

interface IncidentCreatedScreenProps {
  incident: Incident;
  onNavigate: (screen: ScreenView) => void;
  onViewReport: () => void;
}

export const IncidentCreatedScreen: React.FC<IncidentCreatedScreenProps> = ({
  incident,
  onNavigate,
  onViewReport,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownloadPdf = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      downloadIncidentReportPDF(incident);
      setToastMessage(`PDF Report (${incident.caseRef}.pdf) generated successfully!`);
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setToastMessage('Error generating PDF report.');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-32 md:pb-24 w-full relative z-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#00dbe9] text-[#002022] font-geist font-bold text-xs px-4 py-3 rounded-xl shadow-[0_0_30px_rgba(0,219,233,0.5)] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Title */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="font-geist text-3xl md:text-5xl font-extrabold text-[#dbfcff] tracking-tight mb-2">
          INCIDENT CREATED
        </h1>
        <p className="text-base text-[#b9cacb]">
          Automated defense sequence completed. Log compiled.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8">
        {/* Primary Incident Card (Spans 8 cols on md) */}
        <div className="glass-panel glow-error rounded-2xl p-6 md:p-8 col-span-1 md:col-span-8 relative overflow-hidden border border-[#ffb4ab]/30 flex flex-col justify-between">
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-[#93000a]/20 blur-3xl rounded-full z-0 pointer-events-none opacity-40" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <div>
                <div className="font-geist text-xs font-semibold text-[#b9cacb] uppercase tracking-wider mb-1">
                  INCIDENT ID
                </div>
                <div className="font-geist text-2xl md:text-3xl font-bold text-[#e0e2ee] tracking-wider">
                  {incident.id || 'SC-2026-00821'}
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#93000a]/30 border border-[#ffb4ab]/30 px-3.5 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#ff5b5b] relative">
                  <div className="absolute inset-0 bg-[#ff5b5b] rounded-full status-pulse" />
                </div>
                <span className="font-geist text-xs font-bold text-[#ffb4ab] uppercase tracking-wider">
                  SEVERITY: {incident.severity}
                </span>
              </div>
            </div>

            {/* 4 Metadata Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-[#181c24]/80 p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-[#00f0ff] text-xl mb-1 opacity-90">
                  call
                </span>
                <span className="font-geist text-[10px] font-bold text-[#b9cacb] uppercase tracking-wider">
                  INBOUND
                </span>
              </div>

              <div className="bg-[#181c24]/80 p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-[#00f0ff] text-xl mb-1 opacity-90">
                  schedule
                </span>
                <span className="font-geist text-[10px] font-bold text-[#b9cacb] uppercase tracking-wider">
                  14:22 UTC
                </span>
              </div>

              <div className="bg-[#181c24]/80 p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-[#00f0ff] text-xl mb-1 opacity-90">
                  memory
                </span>
                <span className="font-geist text-[10px] font-bold text-[#b9cacb] uppercase tracking-wider">
                  AI DETECT
                </span>
              </div>

              <div className="bg-[#181c24]/80 p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-[#ffb4ab] text-xl mb-1 opacity-90">
                  warning
                </span>
                <span className="font-geist text-[10px] font-bold text-[#b9cacb] uppercase tracking-wider">
                  SPOOFED
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 relative z-10 mt-2">
            <button
              onClick={onViewReport}
              className="flex-1 bg-transparent border border-white/20 text-[#e0e2ee] hover:bg-white/10 font-geist font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              <span>VIEW INCIDENT</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              id="generate-pdf-investigator-report-btn"
              className="flex-1 bg-[#00dbe9] text-[#002022] hover:bg-[#7df4ff] font-geist font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:shadow-[0_0_25px_rgba(0,219,233,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">picture_as_pdf</span>
              <span>GENERATE PDF REPORT</span>
            </button>
          </div>
        </div>

        {/* Vertical Defense Sequence Timeline (Spans 4 cols on md) */}
        <div className="glass-panel rounded-2xl p-6 col-span-1 md:col-span-4 flex flex-col h-full border border-white/10">
          <h3 className="font-geist text-lg font-bold text-[#e0e2ee] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-xl">timeline</span>
            Defense Sequence
          </h3>

          <div className="relative pl-6 flex-1 flex flex-col justify-between gap-5">
            {/* Vertical Connecting Line */}
            <div className="absolute left-2.5 top-2 bottom-2 w-px bg-white/15" />

            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#31353e] border border-white/30" />
              <div className="font-mono text-[11px] text-[#b9cacb] mb-0.5">14:22:01</div>
              <div className="font-geist text-sm font-semibold text-[#e0e2ee]">Call Received</div>
              <div className="text-xs text-[#b9cacb]/70 font-mono mt-0.5">+1 (800) 555-0199</div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_rgba(0,219,233,0.8)]" />
              <div className="font-mono text-[11px] text-[#00f0ff] mb-0.5">14:22:03</div>
              <div className="font-geist text-sm font-semibold text-[#00f0ff]">Shield Activated</div>
              <div className="text-xs text-[#b9cacb]/70 mt-0.5">Audio analysis initiated</div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#ff5b5b] shadow-[0_0_10px_rgba(255,180,171,0.8)]" />
              <div className="font-mono text-[11px] text-[#ffb4ab] mb-0.5">14:22:15</div>
              <div className="font-geist text-sm font-semibold text-[#ffb4ab]">Risk Detected</div>
              <div className="text-xs text-[#b9cacb]/70 mt-0.5">Pattern match: Voice Cloning</div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-[26px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#efdbff] border-2 border-[#10131c] shadow-[0_0_15px_rgba(220,184,255,0.8)] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#8523dd] rounded-full" />
              </div>
              <div className="font-mono text-[11px] text-[#efdbff] mb-0.5">14:22:16</div>
              <div className="font-geist text-sm font-bold text-[#efdbff]">Protection Activated</div>
              <div className="text-xs text-[#b9cacb]/70 mt-0.5">Call terminated & logged</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
