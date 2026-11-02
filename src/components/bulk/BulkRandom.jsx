import React, { useState, useRef, useMemo } from 'react';
import { Card } from '../common/Card.jsx';
import { Field } from '../common/Field.jsx';
import { Button } from '../common/Button.jsx';
import { useToast } from '../common/Toast.jsx';
import { UploadZone } from '../common/UploadZone.jsx';
import { EmptyState } from '../common/EmptyState.jsx';
import { TemplateGrid } from '../invoice/TemplateGrid.jsx';
import { A4InvoiceSheet } from '../invoice/A4InvoiceSheet.jsx';
import {
  getTemplateById,
  getTemplatesForDocument,
} from '../../constants/templates.js';
import { randomNumber } from '../../utils/generators.js';
import {
  parseImportFile,
  sanitizeRow,
  isRowInvalid,
} from '../../utils/excelImport.js';
import { exportSheetToPdf } from '../../utils/pdfExport.js';

export function BulkRandom({
  documentTitle = 'Tax Invoice',
  pageTitle = 'Bulk invoices — random',
  fromCardTitle = 'Default Issuer details',
  prefixDefault = 'INV',
}) {
  const { notify } = useToast();
  const [issuer, setIssuer] = useState({
    name: '',
    address: '',
    gstin: '',
    logo: null,
  });
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    ifsc: '',
  });
  const [terms, setTerms] = useState(
    'Payment due within 7 days. Late payments may incur an additional fee.'
  );
  const [signature, setSignature] = useState(null);
  const [defaultTaxPct, setDefaultTaxPct] = useState(0);
  const [prefix, setPrefix] = useState(prefixDefault);
  const [selectedTemplateId, setSelectedTemplateId] = useState('indigo-letterhead');

  const [rows, setRows] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [fileName, setFileName] = useState('');
  const [importing, setImporting] = useState(false);
  const [exportingAll, setExportingAll] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hiddenRefs = useRef([]);

  const templates = useMemo(
    () => getTemplatesForDocument(documentTitle, issuer.name),
    [documentTitle, issuer.name]
  );
  const activeTemplate = getTemplateById(selectedTemplateId);

  const processedRows = useMemo(
    () =>
      rows.map((row, index) => ({
        row,
        invoiceNumber: randomNumbers[index] || randomNumber({ prefix }),
        date: row.invoiceDate || new Date().toISOString().slice(0, 10),
        hasError: isRowInvalid(row),
      })),
    [rows, randomNumbers, prefix]
  );

  const errorCount = processedRows.filter((r) => r.hasError).length;
  const activeIndexSafe = Math.min(selectedIndex, Math.max(processedRows.length - 1, 0));
  const activeProcessed = processedRows[activeIndexSafe];

  function handleReshuffleNumbers() {
    setRandomNumbers(rows.map(() => randomNumber({ prefix })));
    notify('Document numbers reshuffled.', 'info');
  }

  function buildInvoiceData(item) {
    const r = item.row;
    const items = r.itemNames.map((name, idx) => {
      const variety = r.variety[idx] || '';
      const hasCgst = r.cgst.length > idx && !isNaN(r.cgst[idx]);
      const hasSgst = r.sgst.length > idx && !isNaN(r.sgst[idx]);
      return {
        description: name,
        variety,
        hsn: r.hsn[idx] || '',
        qty: r.itemQuantities[idx] || 0,
        rate: r.itemPrices[idx] || 0,
        unit: r.itemUnits[idx] || '',
        taxPct: r.taxPct === null ? defaultTaxPct : r.taxPct,
        cgstPct: hasCgst ? r.cgst[idx] : undefined,
        sgstPct: hasSgst ? r.sgst[idx] : undefined,
      };
    });

    if (r.handlingFees > 0) {
      items.push({
        description: 'Handling Fees',
        qty: 1,
        rate: r.handlingFees,
        taxPct: r.taxPct === null ? defaultTaxPct : r.taxPct,
      });
    }

    return {
      documentTitle,
      invoiceNumber: item.invoiceNumber,
      date: item.date,
      from: {
        name: r.fromCompany || issuer.name,
        address: r.fromDetails || issuer.address,
        logo: issuer.logo,
      },
      to: {
        name: r.toCompany,
        address: r.toDetails,
      },
      shipTo: r.shipToCompany
        ? { name: r.shipToCompany, address: r.shipToDetails }
        : null,
      notes: r.notes || '',
      terms: r.terms || terms,
      signature,
      bankDetails:
        r.bankName || r.accountNumber
          ? {
              bankName: r.bankName,
              accountName: r.accountHolder,
              accountNumber: r.accountNumber,
              ifsc: r.ifsc,
            }
          : bankDetails,
      items,
    };
  }

  async function handleFileImport(file) {
    setImporting(true);
    setFileName(file.name);
    try {
      const raw = await parseImportFile(file);
      const parsed = raw.slice(0, 50).map(sanitizeRow);
      setRows(parsed);
      setRandomNumbers(parsed.map(() => randomNumber({ prefix })));
      setSelectedIndex(0);
      notify(
        `Imported ${parsed.length} row${parsed.length === 1 ? '' : 's'} from ${file.name}.`,
        'success'
      );
    } catch (err) {
      notify(err.message || 'Could not parse that file.', 'error');
      setRows([]);
      setRandomNumbers([]);
    } finally {
      setImporting(false);
    }
  }

  function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIssuer((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSignatureUpload(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleDownloadAll() {
    if (processedRows.length === 0) {
      notify('Upload a CSV or Excel file first.', 'warning');
      return;
    }
    if (errorCount > 0) {
      notify(
        `${errorCount} row${errorCount === 1 ? '' : 's'} missing required fields — fix before exporting.`,
        'warning'
      );
      return;
    }
    setExportingAll(true);
    try {
      const sheets = hiddenRefs.current.filter(Boolean);
      for (let i = 0; i < sheets.length; i++) {
        const item = processedRows[i];
        const customer = (item.row.toCompany || 'Customer').replace(/[^a-zA-Z0-9]/g, '_');
        const d = (item.row.invoiceDate || 'Date').toString().replace(/[^a-zA-Z0-9]/g, '-');
        const num = item.invoiceNumber || `invoice-${i + 1}`;
        await exportSheetToPdf(sheets[i], `${customer}-${d}-${num}.pdf`);
      }
      notify(`Downloaded ${sheets.length} invoices as separate PDFs.`, 'success');
    } catch {
      notify('Batch export failed. Please try again.', 'error');
    } finally {
      setExportingAll(false);
    }
  }

  async function handleDownloadCurrent() {
    const sheet = hiddenRefs.current[activeIndexSafe];
    if (sheet) {
      setExportingAll(true);
      try {
        const item = processedRows[activeIndexSafe];
        const customer = (item.row.toCompany || 'Customer').replace(/[^a-zA-Z0-9]/g, '_');
        const d = (item.row.invoiceDate || 'Date').toString().replace(/[^a-zA-Z0-9]/g, '-');
        await exportSheetToPdf(
          sheet,
          `${customer}-${d}-${item.invoiceNumber || 'invoice'}.pdf`
        );
        notify('Downloaded preview successfully.', 'success');
      } catch {
        notify('Failed to download preview.', 'error');
      } finally {
        setExportingAll(false);
      }
    }
  }

  return (
    <div className="generator-layout">
      <div className="generator-heading">
        <div>
          <h1>{pageTitle}</h1>
          <p className="generator-subtitle">
            Import data from a spreadsheet, and generate randomly numbered documents in one pass.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {rows.length > 0 && (
            <Button variant="secondary" onClick={handleReshuffleNumbers}>
              🔀 Reshuffle numbers
            </Button>
          )}
          <Button onClick={handleDownloadAll} loading={exportingAll}>
            Download all as PDF
          </Button>
        </div>
      </div>

      <div className="generator-grid">
        <div className="generator-form">
          <Card title={fromCardTitle} description="Used as fallback if not provided in CSV.">
            <div className="field-row">
              <Field
                label="Company name"
                required
                value={issuer.name}
                onChange={(e) => setIssuer({ ...issuer, name: e.target.value })}
              />
              <Field
                label="GSTIN"
                value={issuer.gstin}
                onChange={(e) => setIssuer({ ...issuer, gstin: e.target.value })}
              />
            </div>
            <Field
              label="Address"
              as="textarea"
              value={issuer.address}
              onChange={(e) => setIssuer({ ...issuer, address: e.target.value })}
            />
            <div style={{ marginTop: 12 }}>
              <Field
                label="Company Logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
              />
              {issuer.logo && (
                <img
                  src={issuer.logo}
                  alt="Logo Preview"
                  style={{ height: 48, marginTop: 8, objectFit: 'contain' }}
                />
              )}
            </div>
          </Card>

          <Card title="Default Bank Details" description="Used as fallback if not provided in CSV.">
            <div className="field-row">
              <Field
                label="Bank Name"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
              />
              <Field
                label="Account Name"
                value={bankDetails.accountName}
                onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
              />
            </div>
            <div className="field-row">
              <Field
                label="Account No"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
              />
              <Field
                label="IFSC Code"
                value={bankDetails.ifsc}
                onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
              />
            </div>
          </Card>

          <Card title="Signature & Terms">
            <Field
              label="Terms & Conditions"
              as="textarea"
              rows={3}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
            />
            <div style={{ marginTop: 12 }}>
              <Field
                label="Authorized Signature"
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
              />
              {signature && (
                <img
                  src={signature}
                  alt="Signature Preview"
                  style={{ height: 48, marginTop: 8, objectFit: 'contain' }}
                />
              )}
            </div>
          </Card>

          <Card title="Numbering & Tax">
            <div className="field-row">
              <Field
                label="Prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
              <Field
                label="Default Tax %"
                type="number"
                min="0"
                value={defaultTaxPct}
                onChange={(e) => setDefaultTaxPct(Number(e.target.value))}
              />
            </div>
          </Card>

          <Card
            title="Import data"
            description="CSV or Excel. Required columns: toCompany, itemNames, itemQuantities, itemPrices."
          >
            <UploadZone onFile={handleFileImport} busy={importing} fileName={fileName} />
          </Card>

          {rows.length > 0 && (
            <Card
              title="Template"
              description="Applied to every document in this batch."
            >
              <TemplateGrid
                templates={templates}
                selectedId={selectedTemplateId}
                onSelect={setSelectedTemplateId}
              />
            </Card>
          )}
        </div>

        <div className="generator-preview">
          <Card
            title="Preview"
            description={
              rows.length
                ? `${rows.length} documents ready — ${errorCount} need attention.`
                : undefined
            }
            actions={
              rows.length > 0 && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleDownloadCurrent}
                  loading={exportingAll}
                >
                  Download this invoice
                </Button>
              )
            }
          >
            {rows.length === 0 ? (
              <EmptyState
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16v16H4z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 9h16M9 9v11"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                }
                title="No data yet"
                text="Upload a spreadsheet to see a preview of every document before you export."
              />
            ) : (
              <>
                <div className="actions-bar" style={{ marginBottom: 16 }}>
                  <div className="bulk-summary">
                    <div className="bulk-stat">
                      <span className="bulk-stat-value">{rows.length}</span>
                      <span className="bulk-stat-label">Total rows</span>
                    </div>
                    <div className="bulk-stat">
                      <span className="bulk-stat-value">{rows.length - errorCount}</span>
                      <span className="bulk-stat-label">Ready</span>
                    </div>
                    <div className="bulk-stat">
                      <span className="bulk-stat-value">{errorCount}</span>
                      <span className="bulk-stat-label">Need attention</span>
                    </div>
                  </div>
                </div>

                <div className="bulk-preview-nav">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeIndexSafe === 0}
                  >
                    ← Previous
                  </button>
                  <span className="bulk-preview-label">
                    Previewing {activeIndexSafe + 1} of {processedRows.length} —{' '}
                    {activeProcessed?.row.toCompany || 'Untitled customer'}
                  </span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        Math.min(processedRows.length - 1, prev + 1)
                      )
                    }
                    disabled={activeIndexSafe === processedRows.length - 1}
                  >
                    Next →
                  </button>
                </div>

                {activeProcessed && (
                  <div className="a4-preview-shell">
                    <div className="a4-preview-scale">
                      <A4InvoiceSheet
                        template={activeTemplate}
                        data={buildInvoiceData(activeProcessed)}
                      />
                    </div>
                  </div>
                )}

                <div className="bulk-table-wrap" style={{ marginTop: 24 }}>
                  <table className="bulk-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>To Company</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processedRows.map((item, idx) => (
                        <tr
                          key={idx}
                          className={`${item.hasError ? 'row-error' : ''} bulk-row-selectable${idx === activeIndexSafe ? ' bulk-row-active' : ''}`}
                          onClick={() => setSelectedIndex(idx)}
                        >
                          <td>{item.invoiceNumber}</td>
                          <td>{item.date}</td>
                          <td>{item.row.toCompany || '—'}</td>
                          <td>{item.row.itemNames.join(', ') || '—'}</td>
                          <td>{item.row.itemQuantities.join(', ') || '0'}</td>
                          <td>{item.row.itemPrices.join(', ') || '0'}</td>
                          <td>
                            {item.hasError ? (
                              <span className="badge badge-danger">Missing data</span>
                            ) : (
                              <span className="badge badge-success">Ready</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      <div
        className="hidden-render-layer"
        aria-hidden="true"
        style={{ position: 'fixed', left: -9999, top: -9999, pointerEvents: 'none' }}
      >
        {processedRows.map((item, idx) => (
          <A4InvoiceSheet
            key={idx}
            template={activeTemplate}
            sheetRef={(el) => {
              hiddenRefs.current[idx] = el;
            }}
            data={buildInvoiceData(item)}
          />
        ))}
      </div>
    </div>
  );
}
