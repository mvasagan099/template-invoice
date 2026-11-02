import React, { useState } from 'react';
import { BillTemplatePicker } from './BillTemplatePicker.jsx';
import { exportBillToPng, exportBillToPdf, exportBillToPrint } from '../../utils/pdfExport.js';

export function BillToolbar({ resetData, settings, updateSection }) {
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [printing, setPrinting] = useState(false);
  const busy = printing || downloadingPng || downloadingPdf;

  async function handleDownloadPng() {
    try {
      setDownloadingPng(true);
      const element = document.getElementById('bill-a4-preview');
      await exportBillToPng(element, 'Transport_Bill.png');
    } catch (err) {
      console.error(err);
      alert('PNG generation failed: ' + err.message);
    } finally {
      setDownloadingPng(false);
    }
  }

  async function handleDownloadPdf() {
    try {
      setDownloadingPdf(true);
      const element = document.getElementById('bill-a4-preview');
      await exportBillToPdf(element, 'Transport_Bill.pdf');
    } catch (err) {
      console.error(err);
      alert('PDF generation failed: ' + err.message);
    } finally {
      setDownloadingPdf(false);
    }
  }

  async function handlePrint() {
    try {
      setPrinting(true);
      await exportBillToPrint(document.getElementById('bill-a4-preview'));
    } catch (err) {
      console.error(err);
      alert('Print preparation failed: ' + err.message);
    } finally {
      setPrinting(false);
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
            onClick={handlePrint}
            disabled={busy}
            title="Print bill"
          >
            {printing ? '⏳ Print...' : '🖨 Print'}
          </button>
          <button
            className="bill-btn"
            onClick={handleDownloadPng}
            disabled={busy}
            title="Download as PNG"
          >
            {downloadingPng ? '⏳ PNG...' : '🖼 PNG'}
          </button>
          <button
            className="bill-btn bill-btn-primary"
            onClick={handleDownloadPdf}
            disabled={busy}
            title="Download as PDF"
          >
            {downloadingPdf ? '⏳ PDF...' : '↓ PDF'}
          </button>
        </div>
      </div>
      <BillTemplatePicker value={settings.template} onChange={(value) => updateSection('settings', 'template', value)} />
      <div style={{ marginTop: '8px' }}>
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
