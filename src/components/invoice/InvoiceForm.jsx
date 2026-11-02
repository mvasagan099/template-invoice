import React, { useState, useRef, useMemo } from 'react';
import { Card } from '../common/Card.jsx';
import { Field } from '../common/Field.jsx';
import { Button } from '../common/Button.jsx';
import { useToast } from '../common/Toast.jsx';
import { TemplateGrid } from './TemplateGrid.jsx';
import { A4InvoiceSheet } from './A4InvoiceSheet.jsx';
import {
  getTemplateById,
  getTemplatesForDocument,
} from '../../constants/templates.js';
import { sequentialNumber, createDefaultItem } from '../../utils/generators.js';
import { exportSheetToPdf } from '../../utils/pdfExport.js';

export function InvoiceForm({
  documentTitle = 'Tax Invoice',
  fromCardTitle = 'Company details',
  fromCardDescription = 'Shown as the document issuer.',
  toCardTitle = 'Customer details',
  toCardDescription = 'The person or business being billed.',
  numberLabel = 'Invoice number',
  billedToLabel = 'Billed to',
}) {
  const { notify } = useToast();
  const sheetRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const [logo, setLogo] = useState('');
  const [signature, setSignature] = useState('');
  const [customerSignature, setCustomerSignature] = useState('');

  const [from, setFrom] = useState({
    name: '',
    address: '',
    gstin: '',
    email: '',
    phone: '',
  });

  const [to, setTo] = useState({
    name: '',
    address: '',
    gstin: '',
    email: '',
  });

  const [invoiceNumber, setInvoiceNumber] = useState(sequentialNumber(0));
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState('');
  const [isInterState, setIsInterState] = useState(false);
  const [items, setItems] = useState([createDefaultItem()]);
  const [notes, setNotes] = useState('');
  const [terms, setTerms] = useState('Due within 15 days of invoice date.');
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    ifsc: '',
  });

  const [selectedTemplateId, setSelectedTemplateId] = useState('indigo-letterhead');

  const templates = useMemo(
    () => getTemplatesForDocument(documentTitle, from.name),
    [documentTitle, from.name]
  );
  const activeTemplate = getTemplateById(selectedTemplateId);

  function handleImageUpload(e, setter) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      notify('Please select an image file (PNG, JPG, SVG, etc.)', 'warning');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => setter(event.target.result);
    reader.readAsDataURL(file);
  }

  const invoiceData = {
    documentTitle,
    invoiceNumber,
    date,
    dueDate,
    from: { ...from, logo },
    to,
    items,
    isInterState,
    notes,
    terms,
    signature,
    customerSignature,
    bankDetails,
    billedToLabel,
  };

  function updateItem(id, updates) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }

  function addItem() {
    setItems((prev) => [...prev, createDefaultItem()]);
  }

  function removeItem(id) {
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));
  }

  async function handleExportPdf() {
    if (!from.name || items.every((item) => !item.description)) {
      notify('Add a company name and at least one item before exporting.', 'warning');
      return;
    }
    setExporting(true);
    try {
      await exportSheetToPdf(sheetRef.current, `${invoiceNumber || 'invoice'}.pdf`);
      notify('PDF exported successfully.', 'success');
    } catch {
      notify('Something went wrong exporting the PDF. Please try again.', 'error');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="generator-layout">
      <div className="generator-heading">
        <div>
          <h1>{documentTitle}</h1>
          <p className="generator-subtitle">
            Fill in the details on the left — the A4 preview updates instantly on the right.
          </p>
        </div>
        <Button onClick={handleExportPdf} loading={exporting}>
          Export PDF
        </Button>
      </div>

      <div className="generator-grid">
        <div className="generator-form">
          <Card title="Company Logo" description="Upload a transparent PNG, JPG, or SVG.">
            <div className="logo-upload-wrap">
              <div className="logo-preview-box">
                {logo ? (
                  <img src={logo} alt="Company logo preview" className="logo-preview-img" />
                ) : (
                  <span className="logo-preview-placeholder">No Logo</span>
                )}
              </div>
              <div className="logo-upload-actions">
                <label className="logo-upload-btn">
                  📁 Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, setLogo)}
                    id="tax-invoice-logo-upload"
                  />
                </label>
                {logo && (
                  <button className="logo-remove-btn" onClick={() => setLogo('')}>
                    ✕ Remove
                  </button>
                )}
                <span className="logo-upload-hint">
                  PNG, JPG, SVG supported.
                  <br />
                  Shown in invoice header.
                </span>
              </div>
            </div>
          </Card>

          <Card title={fromCardTitle} description={fromCardDescription}>
            <Field
              label="Company name"
              required
              value={from.name}
              onChange={(e) => setFrom({ ...from, name: e.target.value })}
              placeholder="Acme Traders Pvt. Ltd."
            />
            <Field
              label="Address"
              as="textarea"
              value={from.address}
              onChange={(e) => setFrom({ ...from, address: e.target.value })}
              placeholder="Street, city, state, PIN"
            />
            <div className="field-row">
              <Field
                label="GSTIN"
                value={from.gstin}
                onChange={(e) => setFrom({ ...from, gstin: e.target.value })}
                placeholder="29ABCDE1234F1Z5"
              />
              <Field
                label="Phone"
                value={from.phone}
                onChange={(e) => setFrom({ ...from, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>
            <Field
              label="Email"
              type="email"
              value={from.email}
              onChange={(e) => setFrom({ ...from, email: e.target.value })}
              placeholder="billing@acme.com"
            />
          </Card>

          <Card title={toCardTitle} description={toCardDescription}>
            <Field
              label="Customer name"
              required
              value={to.name}
              onChange={(e) => setTo({ ...to, name: e.target.value })}
              placeholder="Client Enterprises"
            />
            <Field
              label="Address"
              as="textarea"
              value={to.address}
              onChange={(e) => setTo({ ...to, address: e.target.value })}
              placeholder="Street, city, state, PIN"
            />
            <div className="field-row">
              <Field
                label="GSTIN"
                value={to.gstin}
                onChange={(e) => setTo({ ...to, gstin: e.target.value })}
                placeholder="Optional"
              />
              <Field
                label="Email"
                type="email"
                value={to.email}
                onChange={(e) => setTo({ ...to, email: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </Card>

          <Card title="Invoice details">
            <div className="field-row">
              <Field
                label={numberLabel}
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
              <Field
                label="Date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="field-row">
              <Field
                label="Due date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                help="Optional"
              />
            </div>
          </Card>

          <Card
            title="Invoice items"
            description="Line items, quantities, rates, discounts and per-item tax."
            actions={
              <Button size="sm" variant="secondary" onClick={addItem}>
                + Add row
              </Button>
            }
          >
            <div className="items-editor">
              <div className="items-editor-head">
                <span>Description</span>
                <span>HSN/SAC</span>
                <span>Qty</span>
                <span>Unit</span>
                <span>Rate</span>
                <span>Disc %</span>
                <span>Tax %</span>
                <span />
              </div>
              {items.map((item) => (
                <div key={item.id} className="items-editor-row">
                  <input
                    className="input"
                    placeholder="Item or service"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  />
                  <input
                    className="input"
                    placeholder="HSN"
                    value={item.hsn}
                    onChange={(e) => updateItem(item.id, { hsn: e.target.value })}
                  />
                  <input
                    className="input"
                    type="number"
                    min="0"
                    value={item.qty}
                    onChange={(e) => updateItem(item.id, { qty: e.target.value })}
                  />
                  <input
                    className="input"
                    placeholder="Unit"
                    value={item.unit || ''}
                    onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                  />
                  <input
                    className="input"
                    type="number"
                    min="0"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, { rate: e.target.value })}
                  />
                  <input
                    className="input"
                    type="number"
                    min="0"
                    max="100"
                    value={item.discountPct}
                    onChange={(e) => updateItem(item.id, { discountPct: e.target.value })}
                  />
                  <input
                    className="input"
                    type="number"
                    min="0"
                    max="100"
                    value={item.taxPct}
                    onChange={(e) => updateItem(item.id, { taxPct: e.target.value })}
                  />
                  <button
                    className="items-row-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    disabled={items.length === 1}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Tax information">
            <label className="switch-row">
              <span>
                <span className="switch-row-title">Inter-state supply</span>
                <span className="switch-row-help">Splits tax as IGST instead of CGST + SGST.</span>
              </span>
              <span
                className={`switch${isInterState ? ' switch-on' : ''}`}
                onClick={() => setIsInterState((prev) => !prev)}
                role="switch"
                aria-checked={isInterState}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIsInterState((prev) => !prev);
                  }
                }}
              >
                <span className="switch-thumb" />
              </span>
            </label>
          </Card>

          <Card title="Payment details">
            <div className="field-row">
              <Field
                label="Bank name"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
              />
              <Field
                label="Account name"
                value={bankDetails.accountName}
                onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
              />
            </div>
            <div className="field-row">
              <Field
                label="Account number"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
              />
              <Field
                label="IFSC"
                value={bankDetails.ifsc}
                onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
              />
            </div>
          </Card>

          <Card title="Notes, terms & signatures">
            <Field
              label="Notes"
              as="textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thank you for your business."
            />
            <Field
              label="Terms"
              as="textarea"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginTop: '16px',
              }}
            >
              <div
                className="logo-upload-wrap"
                style={{ padding: 0, flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div
                  className="logo-preview-box"
                  style={{ height: '64px', width: '160px', borderRadius: '8px' }}
                >
                  {customerSignature ? (
                    <img
                      src={customerSignature}
                      alt="Customer Signature"
                      className="logo-preview-img"
                    />
                  ) : (
                    <span className="logo-preview-placeholder">
                      No Customer
                      <br />
                      Signature
                    </span>
                  )}
                </div>
                <div className="logo-upload-actions">
                  <label className="logo-upload-btn">
                    ✍️ Customer Signature
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageUpload(e, setCustomerSignature)}
                    />
                  </label>
                  {customerSignature && (
                    <button className="logo-remove-btn" onClick={() => setCustomerSignature('')}>
                      ✕ Remove
                    </button>
                  )}
                </div>
              </div>

              <div
                className="logo-upload-wrap"
                style={{ padding: 0, flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div
                  className="logo-preview-box"
                  style={{ height: '64px', width: '160px', borderRadius: '8px' }}
                >
                  {signature ? (
                    <img src={signature} alt="Signature" className="logo-preview-img" />
                  ) : (
                    <span className="logo-preview-placeholder">
                      No Auth
                      <br />
                      Signature
                    </span>
                  )}
                </div>
                <div className="logo-upload-actions">
                  <label className="logo-upload-btn">
                    ✍️ Auth Signature
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageUpload(e, setSignature)}
                    />
                  </label>
                  {signature && (
                    <button className="logo-remove-btn" onClick={() => setSignature('')}>
                      ✕ Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Template" description="Choose the visual design for this document.">
            <TemplateGrid
              templates={templates}
              selectedId={selectedTemplateId}
              onSelect={setSelectedTemplateId}
            />
          </Card>
        </div>

        <div className="generator-preview">
          <div className="preview-sticky">
            <div className="a4-preview-shell">
              <div className="a4-preview-scale">
                <A4InvoiceSheet
                  template={activeTemplate}
                  data={invoiceData}
                  sheetRef={sheetRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
