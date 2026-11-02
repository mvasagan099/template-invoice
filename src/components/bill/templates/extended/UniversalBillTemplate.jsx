import React from 'react';
import { numberToIndianWords } from '../../../../utils/currency.js';

function formatDate(val) {
  if (!val) return '';
  try {
    return new Date(val).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return val;
  }
}

export function UniversalBillTemplate({ data, totals, config }) {
  const { transportDetails: n, consignor: r, consignee: i, vehicle: a, goods: o = [] } = data;
  const s = (v) => v || '';

  const theme = config.theme || {};
  const primary = theme.primary || '#0f172a';
  const secondary = theme.secondary || '#f8fafc';
  const border = theme.border || '2px solid #000000';
  const font = theme.font || 'Arial, Helvetica, sans-serif';
  const headerFont = theme.headerFont || font;
  const bg = theme.bg || '#ffffff';
  const layout = config.layout || 'classic-lr';

  // Goods calculations
  const totalPackages = o.reduce((acc, row) => acc + (Number(row.packages) || Number(row.quantity) || 0), 0);
  const totalWeight = o.reduce((acc, row) => acc + (parseFloat(row.weight) || 0), 0);
  const totalWeightUnit = o.find((row) => row.unit)?.unit || 'Kgs';

  const halfGst = (totals.gstAmount || 0) / 2;
  const isInterState = r.state && i.state && r.state.trim().toLowerCase() !== i.state.trim().toLowerCase();

  // Words for grand total
  const grandTotalRounded = Math.round(totals.grandTotal || 0);
  const amountInWords = numberToIndianWords(grandTotalRounded);

  return (
    <div
      id="bill-a4-preview"
      style={{
        width: '100%',
        minHeight: '100%',
        background: bg,
        fontFamily: font,
        color: '#000000',
        fontSize: '11px',
        border: border,
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background Watermark */}
      {data.settings?.watermark && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-32deg)',
            fontSize: '56px',
            fontWeight: '900',
            color: 'rgba(0, 0, 0, 0.07)',
            textTransform: 'uppercase',
            letterSpacing: '12px',
            pointerEvents: 'none',
            zIndex: 1,
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {data.settings.watermark}
        </div>
      )}

      {/* TOP HEADER / JURISDICTION / COPY BAR */}
      <div
        style={{
          borderBottom: border,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 10px',
          background: layout === 'dualtone-docket' ? primary : secondary,
          color: layout === 'dualtone-docket' ? '#ffffff' : primary,
          fontSize: '9.5px',
          fontWeight: '600',
          letterSpacing: '0.4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{config.tagline || 'Subject to local jurisdiction | Goods booked at Owner\'s Risk'}</span>
          {layout === 'cold-chain' && (
            <span
              style={{
                background: '#0284c7',
                color: '#fff',
                padding: '1px 6px',
                borderRadius: '3px',
                fontSize: '8.5px',
                fontWeight: '700',
              }}
            >
              ❄️ REEFER (2°C - 8°C)
            </span>
          )}
          {layout === 'heavy-freight' && (
            <span
              style={{
                background: '#f59e0b',
                color: '#000',
                padding: '1px 6px',
                borderRadius: '3px',
                fontSize: '8.5px',
                fontWeight: '800',
              }}
            >
              ⚠️ HEAVY HAULAGE / ODC
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {config.copyBadge && (
            <span
              style={{
                background: config.copyBadge.bg || '#eff6ff',
                color: config.copyBadge.color || primary,
                border: config.copyBadge.border || `1.5px solid ${primary}`,
                padding: '2px 8px',
                fontSize: '9.5px',
                fontWeight: '800',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                borderRadius: layout === 'modern-card' ? '4px' : '2px',
              }}
            >
              {config.copyBadge.text}
            </span>
          )}
        </div>
      </div>

      {/* MAIN BRANDING & TITLE SECTION */}
      <div
        style={{
          borderBottom: border,
          display: 'flex',
          alignItems: 'stretch',
          background: layout === 'dualtone-docket' ? primary : '#ffffff',
          color: layout === 'dualtone-docket' ? '#ffffff' : '#000000',
        }}
      >
        {/* Company Logo (if present) */}
        {data.settings?.logo && (
          <div
            style={{
              width: '80px',
              borderRight: border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              background: '#ffffff',
              padding: '6px',
            }}
          >
            <img
              src={data.settings.logo}
              alt="Logo"
              style={{
                maxWidth: '68px',
                maxHeight: '68px',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* Company Identity */}
        <div
          style={{
            flex: 1,
            padding: '10px 14px',
            textAlign: layout === 'corporate-clean' ? 'left' : 'center',
            borderRight: border,
          }}
        >
          <div
            style={{
              fontFamily: headerFont,
              fontSize: '24px',
              fontWeight: '900',
              color: layout === 'dualtone-docket' ? '#ffffff' : primary,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              lineHeight: '1.1',
              marginBottom: '3px',
            }}
          >
            {s(n.companyName) || 'UNIVERSAL LOGISTICS & TRANSPORT CORP'}
          </div>

          <div
            style={{
              fontSize: '10px',
              color: layout === 'dualtone-docket' ? '#e2e8f0' : '#4b5563',
              lineHeight: '1.4',
            }}
          >
            {s(n.branch)} {n.city ? `— ${n.city}` : ''} {n.state ? `, ${n.state}` : ''}{' '}
            {n.phone ? `| Ph: ${n.phone}` : ''} {n.email ? `| Email: ${n.email}` : ''}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: layout === 'corporate-clean' ? 'flex-start' : 'center',
              gap: '12px',
              marginTop: '4px',
              fontSize: '9.5px',
            }}
          >
            {n.gst && (
              <span
                style={{
                  fontWeight: '700',
                  color: layout === 'dualtone-docket' ? '#fed7aa' : primary,
                }}
              >
                GSTIN: {n.gst}
              </span>
            )}
            {n.website && (
              <span style={{ color: layout === 'dualtone-docket' ? '#cbd5e1' : '#6b7280' }}>
                Web: {n.website}
              </span>
            )}
          </div>
        </div>

        {/* Right Info Box: LR No, Dates, Barcode */}
        <div
          style={{
            width: '210px',
            padding: '8px 12px',
            flexShrink: 0,
            background: layout === 'dualtone-docket' ? '#0f172a' : secondary,
            color: layout === 'dualtone-docket' ? '#f8fafc' : '#000000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '3px',
            fontSize: '10px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: '900',
              color: layout === 'dualtone-docket' ? '#60a5fa' : primary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: `1px solid ${layout === 'dualtone-docket' ? '#334155' : '#cbd5e1'}`,
              paddingBottom: '2px',
              marginBottom: '2px',
            }}
          >
            {config.title || 'LORRY RECEIPT'}
          </div>

          <div>
            <span style={{ color: layout === 'dualtone-docket' ? '#94a3b8' : '#64748b' }}>
              LR / Bilty No:
            </span>{' '}
            <strong
              style={{
                fontSize: '12px',
                color: layout === 'dualtone-docket' ? '#f87171' : '#dc2626',
              }}
            >
              {s(n.lrNo) || 'PENDING'}
            </strong>
          </div>

          {n.billNo && (
            <div>
              <span style={{ color: layout === 'dualtone-docket' ? '#94a3b8' : '#64748b' }}>
                Bill No:
              </span>{' '}
              <strong>{n.billNo}</strong>
            </div>
          )}

          <div>
            <span style={{ color: layout === 'dualtone-docket' ? '#94a3b8' : '#64748b' }}>
              Booking Date:
            </span>{' '}
            <strong>{formatDate(n.bookingDate) || '—'}</strong>
          </div>

          {n.deliveryDate && (
            <div>
              <span style={{ color: layout === 'dualtone-docket' ? '#94a3b8' : '#64748b' }}>
                Delivery Exp:
              </span>{' '}
              <strong>{formatDate(n.deliveryDate)}</strong>
            </div>
          )}

          {/* Express barcode preview simulation if express courier */}
          {layout === 'express-courier' && (
            <div
              style={{
                marginTop: '4px',
                paddingTop: '3px',
                borderTop: '1px solid #cbd5e1',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  letterSpacing: '2px',
                  fontWeight: 'bold',
                }}
              >
                ║▌║▌║█│▌▌│█║▌
              </div>
              <div style={{ fontSize: '8px', color: '#64748b' }}>EXP-TRACK-{s(n.lrNo) || '001'}</div>
            </div>
          )}
        </div>
      </div>

      {/* ROUTE BANNER (FROM -> TO) */}
      <div
        style={{
          borderBottom: border,
          background: layout === 'dualtone-docket' ? '#f1f5f9' : '#ffffff',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontWeight: '700',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '10px' }}>
            From:
          </span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: '900',
              color: primary,
              textTransform: 'uppercase',
            }}
          >
            {s(r.city) || s(n.city) || 'ORIGIN STATION'}
          </span>
          <span style={{ color: '#94a3b8', fontSize: '15px' }}>➔</span>
          <span style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '10px' }}>
            To:
          </span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: '900',
              color: '#dc2626',
              textTransform: 'uppercase',
            }}
          >
            {s(i.city) || 'DESTINATION STATION'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '10px' }}>
          <div>
            <span style={{ color: '#64748b' }}>Booking Time:</span>{' '}
            <strong>{s(n.bookingTime) || '—'}</strong>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Payment Mode:</span>{' '}
            <strong
              style={{
                color: primary,
                border: `1px solid ${primary}`,
                padding: '1px 6px',
                borderRadius: '2px',
              }}
            >
              TO PAY / BILLED
            </strong>
          </div>
        </div>
      </div>

      {/* CONSIGNOR & CONSIGNEE SECTION */}
      <div
        style={{
          borderBottom: border,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* Consignor Box */}
        <div
          style={{
            borderRight: border,
            padding: '8px 12px',
            background: bg,
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: '800',
              color: primary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>CONSIGNOR (CONSIGNED FROM):</span>
            <span style={{ fontSize: '8.5px', color: '#64748b' }}>DISPATCH PARTY</span>
          </div>

          <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>
            {s(r.name) || 'M/s. ___________________________'}
          </div>

          <div style={{ fontSize: '10px', color: '#334155', minHeight: '26px', lineHeight: '1.3' }}>
            {s(r.address) || 'Address not provided'}
            {r.city ? `, ${r.city}` : ''} {r.state ? `(${r.state})` : ''} {r.pincode ? `- ${r.pincode}` : ''}
          </div>

          <div
            style={{
              marginTop: '4px',
              fontSize: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              <strong>GSTIN:</strong>{' '}
              <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{s(r.gst) || '—'}</span>
            </span>
            <span>
              <strong>Mob:</strong> {s(r.mobile) || '—'}
            </span>
          </div>
        </div>

        {/* Consignee Box */}
        <div
          style={{
            padding: '8px 12px',
            background: bg,
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: '800',
              color: primary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>CONSIGNEE (DELIVER TO):</span>
            <span style={{ fontSize: '8.5px', color: '#64748b' }}>RECEIVING PARTY</span>
          </div>

          <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>
            {s(i.name) || 'M/s. ___________________________'}
          </div>

          <div style={{ fontSize: '10px', color: '#334155', minHeight: '26px', lineHeight: '1.3' }}>
            {s(i.address) || 'Address not provided'}
            {i.city ? `, ${i.city}` : ''} {i.state ? `(${i.state})` : ''} {i.pincode ? `- ${i.pincode}` : ''}
          </div>

          <div
            style={{
              marginTop: '4px',
              fontSize: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              <strong>GSTIN:</strong>{' '}
              <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{s(i.gst) || '—'}</span>
            </span>
            <span>
              <strong>Mob:</strong> {s(i.mobile) || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* VEHICLE & DRIVER DETAILS BAR */}
      <div
        style={{
          borderBottom: border,
          background: secondary,
          padding: '6px 12px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
          gap: '8px',
          fontSize: '10px',
        }}
      >
        <div>
          <span style={{ color: '#64748b' }}>Vehicle / Lorry No:</span>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '900',
              color: primary,
              fontFamily: 'monospace',
            }}
          >
            {s(a.number) || '________________'}
          </div>
        </div>

        <div>
          <span style={{ color: '#64748b' }}>Driver Name:</span>
          <div style={{ fontWeight: '700' }}>{s(a.driverName) || '________________'}</div>
        </div>

        <div>
          <span style={{ color: '#64748b' }}>Driver Mobile:</span>
          <div style={{ fontWeight: '700' }}>{s(a.driverMobile) || '________________'}</div>
        </div>

        <div>
          <span style={{ color: '#64748b' }}>Driving License No:</span>
          <div style={{ fontWeight: '700' }}>{s(a.driverLicense) || '________________'}</div>
        </div>
      </div>

      {/* GOODS DESCRIPTION TABLE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <table
          style={{
            width: '100%',
            height: '100%',
            borderCollapse: 'collapse',
            fontSize: '10px',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr
              style={{
                background: layout === 'dualtone-docket' ? primary : '#f1f5f9',
                color: layout === 'dualtone-docket' ? '#ffffff' : '#0f172a',
                borderBottom: border,
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
              }}
            >
              <th style={{ padding: '6px 8px', borderRight: border, width: '40px', textAlign: 'center' }}>
                Sr.
              </th>
              <th style={{ padding: '6px 8px', borderRight: border, width: '80px', textAlign: 'center' }}>
                Pkgs
              </th>
              <th style={{ padding: '6px 8px', borderRight: border }}>Description of Goods / Articles</th>
              <th style={{ padding: '6px 8px', borderRight: border, width: '85px', textAlign: 'right' }}>
                Weight
              </th>
              <th style={{ padding: '6px 8px', borderRight: border, width: '70px', textAlign: 'right' }}>
                Rate (Rs)
              </th>
              <th style={{ padding: '6px 8px', borderRight: border, width: '85px', textAlign: 'right' }}>
                Freight (Rs)
              </th>
              <th style={{ padding: '6px 8px', width: '95px', textAlign: 'right' }}>Total (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {o && o.length > 0 ? (
              o.map((item, idx) => {
                const rowFreight = Number(item.freight) || 0;
                const rowLoading = Number(item.loading) || 0;
                const rowUnloading = Number(item.unloading) || 0;
                const rowInsurance = Number(item.insurance) || 0;
                const rowOther = Number(item.otherCharges) || 0;
                const rowSub = rowFreight + rowLoading + rowUnloading + rowInsurance + rowOther;

                return (
                  <tr
                    key={item.id || idx}
                    style={{
                      height: '30px',
                      borderBottom: `1px solid ${theme.border ? '#e2e8f0' : '#cbd5e1'}`,
                      background: idx % 2 === 1 && layout === 'modern-card' ? '#f8fafc' : 'transparent',
                    }}
                  >
                    <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'center' }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'center' }}>
                      {item.packages || item.quantity || '—'}
                    </td>
                    <td style={{ padding: '6px 8px', borderRight: border }}>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>
                        {item.itemName || 'Commercial Goods Consignment'}
                      </div>
                      {item.description && (
                        <div style={{ fontSize: '9px', color: '#64748b' }}>{item.description}</div>
                      )}
                      {item.remarks && (
                        <div style={{ fontSize: '8.5px', color: '#dc2626', fontStyle: 'italic' }}>
                          Remarks: {item.remarks}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'right' }}>
                      {item.weight ? `${item.weight} ${item.unit || 'Kg'}` : '—'}
                    </td>
                    <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'right' }}>
                      {item.rate ? Number(item.rate).toFixed(2) : '—'}
                    </td>
                    <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'right' }}>
                      {rowFreight ? rowFreight.toFixed(2) : '0.00'}
                    </td>
                    <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: '700' }}>
                      {rowSub ? rowSub.toFixed(2) : '0.00'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr style={{ height: '30px', borderBottom: border }}>
                <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'center' }}>1</td>
                <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'center' }}>—</td>
                <td style={{ padding: '6px 8px', borderRight: border }}>Commercial Freight Transport</td>
                <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'right' }}>—</td>
                <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'right' }}>—</td>
                <td style={{ padding: '6px 8px', borderRight: border, textAlign: 'right' }}>0.00</td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }}>0.00</td>
              </tr>
            )}

            {/* Fill empty ruled grid rows so the table fills the middle of the bill professionally */}
            {Array.from({ length: Math.max(0, 16 - (o && o.length > 0 ? o.length : 1)) }).map((_, rIdx) => {
              const rowNum = (o && o.length > 0 ? o.length : 1) + rIdx + 1;
              return (
                <tr
                  key={`empty-${rIdx}`}
                  style={{
                    height: '28px',
                    borderBottom: `1px solid ${theme.border ? '#e2e8f0' : '#cbd5e1'}`,
                  }}
                >
                  <td style={{ padding: '4px 8px', borderRight: border, textAlign: 'center', color: '#94a3b8' }}>
                    {rowNum}
                  </td>
                  <td style={{ padding: '4px 8px', borderRight: border, textAlign: 'center', color: '#cbd5e1' }}>—</td>
                  <td style={{ padding: '4px 8px', borderRight: border }}>&nbsp;</td>
                  <td style={{ padding: '4px 8px', borderRight: border, textAlign: 'right', color: '#cbd5e1' }}>—</td>
                  <td style={{ padding: '4px 8px', borderRight: border, textAlign: 'right', color: '#cbd5e1' }}>—</td>
                  <td style={{ padding: '4px 8px', borderRight: border, textAlign: 'right', color: '#cbd5e1' }}>—</td>
                  <td style={{ padding: '4px 8px', textAlign: 'right', color: '#cbd5e1' }}>—</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr
              style={{
                borderTop: border,
                borderBottom: border,
                background: secondary,
                fontWeight: '800',
              }}
            >
              <td style={{ padding: '5px 8px', borderRight: border, textAlign: 'center' }}>TOT</td>
              <td style={{ padding: '5px 8px', borderRight: border, textAlign: 'center' }}>
                {totalPackages > 0 ? totalPackages : '—'}
              </td>
              <td style={{ padding: '5px 8px', borderRight: border, textTransform: 'uppercase' }}>
                Total Consignment Manifest Summary
              </td>
              <td style={{ padding: '5px 8px', borderRight: border, textAlign: 'right' }}>
                {totalWeight > 0 ? `${totalWeight} ${totalWeightUnit}` : '—'}
              </td>
              <td style={{ padding: '5px 8px', borderRight: border, textAlign: 'right' }}>—</td>
              <td style={{ padding: '5px 8px', borderRight: border, textAlign: 'right' }}>
                {(totals.freight || 0).toFixed(2)}
              </td>
              <td style={{ padding: '5px 8px', textAlign: 'right', color: primary }}>
                {(totals.subtotal || 0).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* FINANCIAL BREAKDOWN & CHARGES SECTION */}
      <div
        style={{
          borderBottom: border,
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          background: bg,
        }}
      >
        {/* Left Side: Amount in Words, Special Notice & Terms */}
        <div
          style={{
            borderRight: border,
            padding: '10px 14px 12px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '10px', color: '#475569', marginBottom: '3px' }}>
              <strong>Amount in Words:</strong>
            </div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '800',
                color: primary,
                textTransform: 'capitalize',
                background: secondary,
                padding: '5px 10px',
                borderRadius: '3px',
                border: '1px solid #e2e8f0',
                marginBottom: '8px',
              }}
            >
              {amountInWords}
            </div>

            {/* GST Notification / RCM Notice */}
            <div
              style={{
                fontSize: '9px',
                color: '#475569',
                borderLeft: `3px solid ${primary}`,
                paddingLeft: '8px',
                marginBottom: '8px',
                lineHeight: '1.4',
              }}
            >
              <strong>GST Status:</strong> Person liable to pay GST is Consignor / Consignee under
              Reverse Charge Mechanism (RCM) as per Notification No. 13/2017-Central Tax (Rate).
            </div>

            {/* Specific Template Terms */}
            <div style={{ fontSize: '8.5px', color: '#64748b', lineHeight: '1.35', marginBottom: '8px' }}>
              <strong>Notice:</strong> {config.terms || 'Goods are accepted for carriage at owner\'s risk. Transporter is not responsible for en-route delays due to natural events, road accidents or police/RTO checking. Demurrage chargeable after 48 hours of vehicle arrival.'}
            </div>
          </div>

          <div
            style={{
              paddingTop: '6px',
              fontSize: '8.5px',
              color: '#64748b',
              fontStyle: 'italic',
              lineHeight: '1.3',
            }}
          >
            * This consignment note is issued subject to the provisions of the Carriage by Road Act, 2007.
          </div>
        </div>

        {/* Right Side: Tabular Charges Calculation */}
        <div style={{ padding: '0', background: secondary }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '10px',
            }}
          >
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '3px 8px', color: '#475569' }}>Basic Freight:</td>
                <td style={{ padding: '3px 8px', textAlign: 'right', fontWeight: '700' }}>
                  {(totals.freight || 0).toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '3px 8px', color: '#475569' }}>Loading / Hamali:</td>
                <td style={{ padding: '3px 8px', textAlign: 'right' }}>
                  {(totals.loading || 0).toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '3px 8px', color: '#475569' }}>Unloading Charges:</td>
                <td style={{ padding: '3px 8px', textAlign: 'right' }}>
                  {(totals.unloading || 0).toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '3px 8px', color: '#475569' }}>Insurance / FOV:</td>
                <td style={{ padding: '3px 8px', textAlign: 'right' }}>
                  {(totals.insurance || 0).toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '3px 8px', color: '#475569' }}>Statistical / Other Charges:</td>
                <td style={{ padding: '3px 8px', textAlign: 'right' }}>
                  {(totals.otherCharges || 0).toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #cbd5e1', fontWeight: '700', background: '#f8fafc' }}>
                <td style={{ padding: '4px 8px', color: '#1e293b' }}>Subtotal:</td>
                <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                  {(totals.subtotal || 0).toFixed(2)}
                </td>
              </tr>
              {totals.gstAmount > 0 && (
                <>
                  {isInterState ? (
                    <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <td style={{ padding: '3px 8px' }}>IGST:</td>
                      <td style={{ padding: '3px 8px', textAlign: 'right' }}>
                        {(totals.gstAmount || 0).toFixed(2)}
                      </td>
                    </tr>
                  ) : (
                    <>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                        <td style={{ padding: '3px 8px' }}>CGST:</td>
                        <td style={{ padding: '3px 8px', textAlign: 'right' }}>
                          {halfGst.toFixed(2)}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                        <td style={{ padding: '3px 8px' }}>SGST / UTGST:</td>
                        <td style={{ padding: '3px 8px', textAlign: 'right' }}>
                          {halfGst.toFixed(2)}
                        </td>
                      </tr>
                    </>
                  )}
                </>
              )}
              <tr
                style={{
                  background: layout === 'dualtone-docket' ? primary : '#f1f5f9',
                  color: layout === 'dualtone-docket' ? '#ffffff' : primary,
                  borderTop: border,
                  fontSize: '11px',
                  fontWeight: '900',
                }}
              >
                <td style={{ padding: '6px 8px', textTransform: 'uppercase' }}>GRAND TOTAL:</td>
                <td style={{ padding: '6px 8px', textAlign: 'right', fontSize: '13px' }}>
                  ₹{grandTotalRounded.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SIGNATURES SECTION */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1.3fr',
          minHeight: '75px',
          background: bg,
          fontSize: '9.5px',
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            borderRight: border,
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ color: '#64748b' }}>Booking Date & Time</div>
          <div style={{ borderTop: '1px dashed #94a3b8', paddingTop: '4px' }}>
            Consignor's Signature
          </div>
        </div>

        <div
          style={{
            borderRight: border,
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ color: '#64748b' }}>Vehicle Inspected</div>
          <div style={{ borderTop: '1px dashed #94a3b8', paddingTop: '4px' }}>
            Driver's Signature
          </div>
        </div>

        <div
          style={{
            borderRight: border,
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ color: '#64748b' }}>Received in Good Condition</div>
          <div style={{ borderTop: '1px dashed #94a3b8', paddingTop: '4px' }}>
            Consignee Stamp & Sign
          </div>
        </div>

        <div
          style={{
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: secondary,
          }}
        >
          <div style={{ color: primary, fontWeight: '700' }}>
            For {s(n.companyName) || 'Transport Company'}
          </div>
          <div style={{ borderTop: '1px dashed #94a3b8', paddingTop: '4px', color: '#0f172a' }}>
            Authorised Signatory
          </div>
        </div>
      </div>
    </div>
  );
}
