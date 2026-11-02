import React, { useState } from 'react';
import { BILL_TEMPLATES } from '../../constants/billPresets.js';
import { exportBillToPng, exportBillToPdf } from '../../utils/pdfExport.js';

export function BillToolbar({ resetData, settings, updateSection }) {
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

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

  function handlePrint() {
    const outer = document.querySelector('.bill-a4-outer');
    const prevTransform = outer ? outer.style.transform : '';
    const prevMargin = outer ? outer.style.marginBottom : '';

    if (outer) {
      outer.style.transform = 'none';
      outer.style.marginBottom = '0px';
    }

    setTimeout(() => {
      window.print();
      if (outer) {
        outer.style.transform = prevTransform;
        outer.style.marginBottom = prevMargin;
      }
    }, 150);
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
            title="Print bill"
          >
            🖨 Print
          </button>
          <button
            className="bill-btn"
            onClick={handleDownloadPng}
            disabled={downloadingPng}
            title="Download as PNG"
          >
            {downloadingPng ? '⏳ PNG...' : '🖼 PNG'}
          </button>
          <button
            className="bill-btn bill-btn-primary"
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            title="Download as PDF"
          >
            {downloadingPdf ? '⏳ PDF...' : '↓ PDF'}
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
