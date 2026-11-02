import React from 'react';
import {
  calculateInvoiceTotals,
  calculateItemTotals,
  formatCurrency,
  numberToIndianWords,
} from '../../utils/currency.js';

function hexToRgba(hex, alpha) {
  const cleanHex = hex.replace('#', '');
  const parsed = parseInt(
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex,
    16
  );
  return `rgba(${(parsed >> 16) & 255}, ${(parsed >> 8) & 255}, ${parsed & 255}, ${alpha})`;
}

export function A4InvoiceSheet({ template, data, sheetRef }) {
  const {
    documentTitle = 'Tax Invoice',
    invoiceNumber = '',
    date = '',
    dueDate = '',
    from = {},
    to = {},
    shipTo = {},
    items = [],
    isInterState = false,
    notes = '',
    terms = '',
    signature = null,
    customerSignature = null,
    bankDetails = {},
    currency = 'INR',
    billedToLabel = 'Billed to',
  } = data || {};

  const totals = calculateInvoiceTotals(items, { isInterState });
  const accent = template?.accent || '#4F46E5';
  const hasHsn = items.some((item) => item.hsn && String(item.hsn).trim() !== '');
  const hasVariety = items.some((item) => item.variety && String(item.variety).trim() !== '');
  const colSpan = 6 + (hasHsn ? 1 : 0) + (hasVariety ? 1 : 0);

  const sheetStyle = { '--accent': accent };
  if (template?.bg === 'tint') {
    sheetStyle.backgroundColor = hexToRgba(accent, 0.05);
  }

  return (
    <div
      ref={sheetRef}
      className={`a4-sheet layout-${template?.layout || 'classic'} header-${template?.headerStyle || 'letterhead'} table-${template?.tableStyle || 'bordered'} rule-${template?.rule || 'solid'} decor-${template?.decor || 'none'} logo-${template?.logoPosition || 'left'} badge-${template?.numberBadge || 'plain'} font-${template?.headlineFont || 'default'} bg-${template?.bg || 'white'}`}
      data-watermark={documentTitle}
      style={sheetStyle}
    >
      <header className="sheet-header">
        <div className="sheet-header-brand">
          {from.logo ? (
            <img
              src={from.logo}
              alt={`${from.name || 'Company'} logo`}
              className="sheet-logo"
            />
          ) : (
            <div className="sheet-logo-placeholder" aria-hidden="true">
              {(from.name || 'C').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="sheet-company-name">
              {from.name || 'Your Company Name'}
            </div>
            <div className="sheet-company-address">
              {from.address || 'Company address line, City, State — PIN'}
            </div>
            {from.gstin && (
              <div className="sheet-company-meta">GSTIN: {from.gstin}</div>
            )}
          </div>
        </div>

        <div className="sheet-header-title">
          <div className="sheet-doc-title">{documentTitle}</div>
          <div className="sheet-doc-number">{invoiceNumber || '—'}</div>
        </div>
      </header>

      <div className="sheet-info-layout">
        <div className="sheet-meta-strip">
          <div className="sheet-meta-item">
            <span className="sheet-meta-label">Date</span>
            <span className="sheet-meta-value">{date || '—'}</span>
          </div>
          {dueDate && (
            <div className="sheet-meta-item">
              <span className="sheet-meta-label">Due date</span>
              <span className="sheet-meta-value">{dueDate}</span>
            </div>
          )}
        </div>

        <div className="sheet-parties">
          <div className="sheet-party">
            <div className="sheet-party-label">{billedToLabel}</div>
            <div className="sheet-party-name">{to.name || 'Customer name'}</div>
            <div className="sheet-party-address">
              {to.address || 'Customer address'}
            </div>
            {to.gstin && (
              <div className="sheet-party-meta">GSTIN: {to.gstin}</div>
            )}
            {to.email && (
              <div className="sheet-party-meta">{to.email}</div>
            )}
          </div>

          {shipTo?.name && (
            <div className="sheet-party">
              <div className="sheet-party-label">Shipped to</div>
              <div className="sheet-party-name">{shipTo.name}</div>
              <div className="sheet-party-address">{shipTo.address}</div>
              {shipTo.gstin && (
                <div className="sheet-party-meta">GSTIN: {shipTo.gstin}</div>
              )}
            </div>
          )}

          {template?.layout === 'sidebar' && (
            <div className="sheet-party sheet-party-sidebar">
              <div className="sheet-party-label">Document details</div>
              <div className="sheet-sidebar-row">
                <span>Number</span>
                <strong>{invoiceNumber || '—'}</strong>
              </div>
              <div className="sheet-sidebar-row">
                <span>Date</span>
                <strong>{date || '—'}</strong>
              </div>
              <div className="sheet-sidebar-row">
                <span>Terms</span>
                <strong>{terms || 'Due on receipt'}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      <table className="sheet-table">
        <thead>
          <tr>
            <th className="col-idx">#</th>
            <th className="col-desc">Item Name</th>
            {hasVariety && <th className="col-var">Variety</th>}
            {hasHsn && <th className="col-hsn">HSN/SAC</th>}
            <th className="col-qty">Qty</th>
            <th className="col-unit">Unit</th>
            <th className="col-rate">Price</th>
            <th className="col-amount">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={colSpan} className="sheet-table-empty">
                No items added yet
              </td>
            </tr>
          ) : (
            items.map((item, idx) => {
              const itemTotal = calculateItemTotals(item);
              return (
                <tr key={item.id || idx}>
                  <td className="col-idx">{idx + 1}</td>
                  <td className="col-desc">
                    {item.description || item.itemName || '—'}
                  </td>
                  {hasVariety && (
                    <td className="col-var">{item.variety || '—'}</td>
                  )}
                  {hasHsn && (
                    <td className="col-hsn">{item.hsn || '—'}</td>
                  )}
                  <td className="col-qty">{item.qty || 0}</td>
                  <td className="col-unit">{item.unit || 'pcs'}</td>
                  <td className="col-rate">
                    {formatCurrency(item.rate || item.price || 0, 'en-IN', currency)}
                  </td>
                  <td className="col-amount">
                    {formatCurrency(itemTotal.total, 'en-IN', currency)}
                  </td>
                </tr>
              );
            })
          )}

          {items.length > 0 && (
            <>
              {totals.totalDiscount > 0 && (
                <tr className="tax-row">
                  <td
                    colSpan={colSpan - 1}
                    className="tax-label"
                    style={{ textAlign: 'right' }}
                  >
                    Subtotal:
                  </td>
                  <td className="tax-value" style={{ textAlign: 'right' }}>
                    {formatCurrency(totals.subtotal, 'en-IN', currency)}
                  </td>
                </tr>
              )}

              {totals.totalDiscount > 0 && (
                <tr className="tax-row">
                  <td
                    colSpan={colSpan - 1}
                    className="tax-label"
                    style={{ textAlign: 'right' }}
                  >
                    Discount:
                  </td>
                  <td className="tax-value" style={{ textAlign: 'right' }}>
                    −{formatCurrency(totals.totalDiscount, 'en-IN', currency)}
                  </td>
                </tr>
              )}

              <tr className="tax-row">
                <td
                  colSpan={colSpan - 1}
                  className="tax-label"
                  style={{ textAlign: 'right' }}
                >
                  Taxable Amount / Value:
                </td>
                <td className="tax-value" style={{ textAlign: 'right' }}>
                  {formatCurrency(totals.totalTaxable, 'en-IN', currency)}
                </td>
              </tr>

              {isInterState ? (
                <tr className="tax-row">
                  <td
                    colSpan={colSpan - 1}
                    className="tax-label"
                    style={{ textAlign: 'right' }}
                  >
                    IGST:
                  </td>
                  <td className="tax-value" style={{ textAlign: 'right' }}>
                    {formatCurrency(totals.igst, 'en-IN', currency)}
                  </td>
                </tr>
              ) : (
                <>
                  <tr className="tax-row">
                    <td
                      colSpan={colSpan - 1}
                      className="tax-label"
                      style={{ textAlign: 'right' }}
                    >
                      CGST:
                    </td>
                    <td className="tax-value" style={{ textAlign: 'right' }}>
                      {formatCurrency(totals.cgst, 'en-IN', currency)}
                    </td>
                  </tr>
                  <tr className="tax-row">
                    <td
                      colSpan={colSpan - 1}
                      className="tax-label"
                      style={{ textAlign: 'right' }}
                    >
                      SGST:
                    </td>
                    <td className="tax-value" style={{ textAlign: 'right' }}>
                      {formatCurrency(totals.sgst, 'en-IN', currency)}
                    </td>
                  </tr>
                </>
              )}

              {totals.roundOff !== 0 && (
                <tr className="tax-row">
                  <td
                    colSpan={colSpan - 1}
                    className="tax-label"
                    style={{ textAlign: 'right' }}
                  >
                    Round Off:
                  </td>
                  <td className="tax-value" style={{ textAlign: 'right' }}>
                    {formatCurrency(totals.roundOff, 'en-IN', currency)}
                  </td>
                </tr>
              )}

              <tr className="grand-total-row">
                <td
                  colSpan={colSpan - 1}
                  className="total-label"
                  style={{ textAlign: 'right' }}
                >
                  <b>Grand Total / Invoice Amount:</b>
                </td>
                <td className="total-value" style={{ textAlign: 'right' }}>
                  <b>{formatCurrency(totals.roundedTotal, 'en-IN', currency)}</b>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      <div className="sheet-words-row">
        <div className="sheet-words-box">
          <span className="sheet-words-label">Amount in words</span>
          <span className="sheet-words-value">
            {numberToIndianWords(totals.roundedTotal)}
          </span>
        </div>
      </div>

      <div className="sheet-footer-layout">
        {bankDetails.accountNumber && (
          <div className="sheet-bank-box">
            <div className="sheet-bank-title">Payment Details</div>
            <div className="sheet-bank-content">
              {bankDetails.bankName && (
                <div className="sheet-bank-name">{bankDetails.bankName}</div>
              )}
              {bankDetails.accountName && (
                <div className="sheet-bank-row">
                  <span>Account Name</span>
                  <strong>{bankDetails.accountName}</strong>
                </div>
              )}
              {bankDetails.accountNumber && (
                <div className="sheet-bank-row">
                  <span>Account No.</span>
                  <strong>{bankDetails.accountNumber}</strong>
                </div>
              )}
              {bankDetails.ifsc && (
                <div className="sheet-bank-row">
                  <span>IFSC Code</span>
                  <strong>{bankDetails.ifsc}</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {(notes || (terms && template?.layout !== 'sidebar')) && (
          <div className="sheet-notes-box">
            {notes && (
              <div className="sheet-note-group">
                <div className="sheet-footer-label">Notes</div>
                <div className="sheet-footer-text">{notes}</div>
              </div>
            )}
            {terms && template?.layout !== 'sidebar' && (
              <div className="sheet-note-group">
                <div className="sheet-footer-label">Terms & Conditions</div>
                <div className="sheet-footer-text">{terms}</div>
              </div>
            )}
          </div>
        )}

        <div className="sheet-signature-box">
          {signature ? (
            <img
              src={signature}
              alt="Authorised signature"
              className="sheet-signature-img"
            />
          ) : (
            <div className="sheet-signature-line" />
          )}
          <div className="sheet-signature-label">Authorised Signatory</div>
        </div>
      </div>
    </div>
  );
}
