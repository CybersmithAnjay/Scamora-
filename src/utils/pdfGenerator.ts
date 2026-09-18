import { jsPDF } from 'jspdf';
import { Incident } from '../types';

export function generateIncidentReportPDF(incident: Incident): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      drawPageHeader(true);
      y = 35;
    }
  };

  const drawPageHeader = (isContinuation = false) => {
    // Top banner
    doc.setFillColor(10, 14, 22);
    doc.rect(0, 0, pageWidth, 24, 'F');

    // Accent cyber line
    doc.setFillColor(0, 219, 233);
    doc.rect(0, 24, pageWidth, 1.2, 'F');

    // Brand Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 219, 233);
    doc.text('SCAMORA', margin, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(185, 202, 203);
    doc.text('AI THREAT INTELLIGENCE & FORENSIC SYSTEMS', margin, 18);

    // Right header info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(
      isContinuation ? `CASE REF: ${incident.caseRef} (CONT.)` : 'CONFIDENTIAL INCIDENT REPORT',
      pageWidth - margin,
      12,
      { align: 'right' }
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(185, 202, 203);
    doc.text(`ID: ${incident.id || incident.caseRef}`, pageWidth - margin, 18, { align: 'right' });
  };

  // Draw initial header
  drawPageHeader(false);
  y = 34;

  // Title section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(20, 25, 35);
  doc.text('THREAT INVESTIGATION REPORT', margin, y);
  y += 7;

  // Subtitle / Date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 115, 125);
  doc.text(`Generated: ${incident.dateGenerated || new Date().toISOString()}`, margin, y);
  y += 6;

  // Severity Banner Box
  let sevBgR = 240, sevBgG = 240, sevBgB = 245;
  let sevTextR = 30, sevTextG = 30, sevTextB = 40;
  if (incident.severity === 'HIGH') {
    sevBgR = 147; sevBgG = 0; sevBgB = 10;
    sevTextR = 255; sevTextG = 230; sevTextB = 230;
  } else if (incident.severity === 'MEDIUM') {
    sevBgR = 2; sevBgG = 102; sevBgB = 255;
    sevTextR = 255; sevTextG = 255; sevTextB = 255;
  } else {
    sevBgR = 50; sevBgG = 65; sevBgB = 75;
    sevTextR = 255; sevTextG = 255; sevTextB = 255;
  }

  doc.setFillColor(sevBgR, sevBgG, sevBgB);
  doc.roundedRect(margin, y, contentWidth, 10, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(sevTextR, sevTextG, sevTextB);
  doc.text(`THREAT SEVERITY: ${incident.severity}   |   CONFIDENCE: ${incident.confidenceScore}%   |   STATUS: ${incident.status}`, margin + 5, y + 6.5);
  y += 15;

  // Metadata Table Box
  doc.setFillColor(248, 249, 252);
  doc.setDrawColor(220, 225, 235);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  const col1X = margin + 5;
  const col2X = margin + contentWidth / 2 + 2;

  // Row 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(120, 130, 140);
  doc.text('CASE REFERENCE', col1X, y + 6);
  doc.text('THREAT CLASSIFICATION', col2X, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(20, 25, 35);
  doc.text(incident.caseRef, col1X, y + 11);
  doc.text(incident.threatClassification, col2X, y + 11, { maxWidth: contentWidth / 2 - 8 });

  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(120, 130, 140);
  doc.text('TARGET ENTITY / USER', col1X, y + 18);
  doc.text('CALLER ORIGIN / NUMBER', col2X, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(20, 25, 35);
  doc.text(incident.targetEntity || 'Target Protected Endpoint', col1X, y + 23);
  doc.text(incident.callerNumber || 'Unknown Origin', col2X, y + 23);

  y += 32;

  // SECTION 1: Detection Summary
  checkPageBreak(30);
  doc.setFillColor(0, 219, 233);
  doc.rect(margin, y, 3, 5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 20, 30);
  doc.text('1. DETECTION SUMMARY & TELEMETRY', margin + 6, y + 4.5);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 60, 70);
  const summaryLines = doc.splitTextToSize(incident.detectionSummary || 'No summary available.', contentWidth - 4);
  doc.text(summaryLines, margin + 2, y);
  y += summaryLines.length * 4.5 + 8;

  // SECTION 2: Forensic Event Timeline
  checkPageBreak(40);
  doc.setFillColor(0, 219, 233);
  doc.rect(margin, y, 3, 5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 20, 30);
  doc.text('2. FORENSIC EVENT TIMELINE', margin + 6, y + 4.5);
  y += 8;

  if (incident.timeline && incident.timeline.length > 0) {
    incident.timeline.forEach((event) => {
      checkPageBreak(18);

      // Dot
      doc.setFillColor(0, 150, 220);
      if (event.type === 'critical') doc.setFillColor(220, 40, 40);
      if (event.type === 'action') doc.setFillColor(133, 35, 221);
      doc.circle(margin + 3, y + 1.5, 1.5, 'F');

      // Timestamp & Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(20, 25, 35);
      doc.text(`[${event.time}]  ${event.title}`, margin + 8, y + 2.5);

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(80, 90, 100);
      const descLines = doc.splitTextToSize(event.description, contentWidth - 12);
      doc.text(descLines, margin + 8, y + 7);

      y += 8 + descLines.length * 3.8;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 110, 120);
    doc.text('No detailed timeline records associated with this incident.', margin + 4, y);
    y += 8;
  }
  y += 4;

  // SECTION 3: AI Assessment Overview
  checkPageBreak(35);
  doc.setFillColor(133, 35, 221);
  doc.rect(margin, y, 3, 5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(10, 20, 30);
  doc.text('3. AI NEURAL THREAT ASSESSMENT', margin + 6, y + 4.5);
  y += 8;

  // Assessment Callout Box
  const assessLines = doc.splitTextToSize(incident.aiAssessment || 'Threat pattern evaluated by Scamora AI engine.', contentWidth - 12);
  const assessBoxHeight = assessLines.length * 4.5 + 8;
  checkPageBreak(assessBoxHeight + 5);

  doc.setFillColor(245, 240, 255);
  doc.setDrawColor(200, 175, 240);
  doc.roundedRect(margin, y, contentWidth, assessBoxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 30, 60);
  doc.text(assessLines, margin + 6, y + 6);
  y += assessBoxHeight + 8;

  // SECTION 4: Threat Indicators (if available)
  if (incident.indicators && incident.indicators.length > 0) {
    checkPageBreak(25);
    doc.setFillColor(0, 219, 233);
    doc.rect(margin, y, 3, 5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(10, 20, 30);
    doc.text('4. DETECTED HEURISTIC & FORENSIC INDICATORS', margin + 6, y + 4.5);
    y += 8;

    incident.indicators.forEach((indicator) => {
      checkPageBreak(8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(50, 60, 70);
      doc.text(`•  ${indicator}`, margin + 4, y);
      y += 5;
    });
    y += 4;
  }

  // Footer & Disclaimer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Bottom border
    doc.setDrawColor(220, 225, 235);
    doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);

    // Disclaimer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(130, 140, 150);
    const disclaimer = 'CONFIDENTIAL: AI-generated analytical report by Scamora Autonomous Defense Protocol. For security and threat review purposes only.';
    doc.text(disclaimer, margin, pageHeight - 11);

    // Page Number
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 110, 120);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 11, { align: 'right' });
  }

  return doc;
}

export function downloadIncidentReportPDF(incident: Incident): void {
  const doc = generateIncidentReportPDF(incident);
  const filename = `SCAMORA_REPORT_${incident.caseRef || incident.id || 'INCIDENT'}.pdf`;
  doc.save(filename);
}
