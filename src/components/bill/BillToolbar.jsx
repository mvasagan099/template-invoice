import React from 'react';
import { jsPDF } from 'jspdf';
import { BILL_TEMPLATES } from '../../constants/billPresets.js';
import { captureBillCanvas } from '../../utils/pdfExport.js';

export function BillToolbar({ resetData, settings, updateSection }) {
  async function handleDownloadPng() {
    try {
      const element = document.getElementById('bill-a4-preview');
      const canvas = await captureBillCanvas(element);
      const link = document.createElement('a');
      link.download = 'Transport_Bill.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error(err);
      alert('PNG generation failed: ' + err.message);
    }
  }

  async function handleDownloadPdf() {
    try {
      const element = document.getElementById('bill-a4-preview');
      const canvas = await captureBillCanvas(element);
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, Math.min(pageHeight, 297));
      pdf.save('Transport_Bill.pdf');
    } catch (err) {
      console.error(err);
      alert('PDF generation failed: ' + err.message);
    }
  }

  return (
    <div className="bill-toolbar">
      <div className="bill-toolbar-top">
        <span className="bill-toolbar-title">🚚 Transport Bill Studio</span>
        <div className="bill-toolbar-actions">
          <button
            className="bill-btn bill-btn-danger"
            onClick={resetData}
            title="Reset all data"
          >
            ↺ Reset
          </button>
          <button
            className="bill-btn"
            onClick={() => window.print()}
            title="Print bill"
          >
            🖨 Print
          </button>
          <button
            className="bill-btn"
            onClick={handleDownloadPng}
            title="Download as PNG"
          >
            🖼 PNG
          </button>
          <button
            className="bill-btn bill-btn-primary"
            onClick={handleDownloadPdf}
            title="Download as PDF"
          >
            ↓ PDF
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: '#6b7280',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Template:
        </label>
        <select
          className="bill-template-select"
          value={settings.template}
          onChange={(e) => updateSection('settings', 'template', e.target.value)}
        >
          {BILL_TEMPLATES.map((tmpl) => (
            <option key={tmpl} value={tmpl}>
              {tmpl}
            </option>
          ))}
        </select>
        <input
          className="bill-input"
          style={{ flex: 1 }}
          placeholder="Watermark (e.g. ORIGINAL)"
          value={settings.watermark}
          onChange={(e) => updateSection('settings', 'watermark', e.target.value)}
        />
      </div>
    </div>
  );
}
