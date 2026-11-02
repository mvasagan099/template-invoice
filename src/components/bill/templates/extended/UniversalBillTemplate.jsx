import React, { useEffect, useRef } from 'react';
import { numberToIndianWords } from '../../../../utils/currency.js';
import { getBillDesign } from './billDesigns.js';
import './billDesigns.css';

const hasValue = (v) => v != null && String(v).trim() !== '';
const text = (v) => v ?? '';
const CHARGES = ['freight', 'loading', 'unloading', 'insurance', 'otherCharges'];
const hasCharges = (rows, fields = CHARGES) => rows.some((row) => fields.some((key) => hasValue(row[key])));
const amount = (v) => Number(v || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const rowTotal = (row) => CHARGES.reduce((sum, key) => sum + (Number(row[key]) || 0), 0);
const address = (p) => [p.address, p.city, p.state, p.pincode].filter(hasValue).join(', ');
function date(v) {
  if (!v) return '';
  const parsed = new Date(`${v}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? v : parsed.toLocaleDateString('en-IN');
}
function Field({ label, value, large = false }) {
  return <div className={`bd-field${large ? ' bd-field-large' : ''}`}><span>{label}</span><strong>{text(value)}</strong></div>;
}
function Identity({ data }) {
  const n = data.transportDetails;
  return <div className="bd-identity" data-part="identity">
    {data.settings?.logo && <img className="bd-logo" src={data.settings.logo} alt="Company logo" />}
    <div className="bd-identity-copy"><div className="bd-company">{text(n.companyName)}</div>
      <div className="bd-contact">{[n.branch, n.city, n.state].filter(hasValue).join(' · ')}</div>
      <div className="bd-contact">{[n.phone, n.email].filter(hasValue).join(' · ')}</div>
      {n.gst && <div className="bd-contact"><b>GSTIN</b> {n.gst}</div>}
      {n.website && <div className="bd-contact">{n.website}</div>}
    </div></div>;
}
function DocumentTitle({ title }) {
  // Catalog geography and status badges must not masquerade as entered bill data.
  return <div className="bd-document-title" data-part="title"><div className="bd-kicker">TRANSPORT DOCUMENT</div><div className="bd-title">{title}</div></div>;
}
function References({ data, table = false }) {
  const n = data.transportDetails;
  const fields = [['LR / Bilty No.', n.lrNo], ['Bill No.', n.billNo], ['Booking Date', date(n.bookingDate)], ['Delivery Date', date(n.deliveryDate)]];
  if (table) return <table className="bd-reference-table" data-part="references"><tbody>{fields.map(([label, value]) => <tr key={label}><th>{label}</th><td>{text(value)}</td></tr>)}</tbody></table>;
  return <div className="bd-references" data-part="references">{fields.map(([label, value]) => <Field key={label} label={label} value={value} />)}</div>;
}
function BrandHeader({ data, variant, title: documentTitle }) {
  const identity = <Identity data={data} />, title = <DocumentTitle title={documentTitle} />, refs = <References data={data} />, table = <References data={data} table />;
  const headers = [
    <><div className="bd-header-pair">{identity}{title}</div>{refs}</>,
    <><div className="bd-header-crest">{title}{identity}</div><div className="bd-header-rule">{refs}</div></>,
    <><div className="bd-header-split">{identity}<div>{title}{table}</div></div></>,
    <><div className="bd-header-banner">{title}</div><div className="bd-header-pair">{identity}{table}</div></>,
    <><div className="bd-header-rail"><div>{title}{identity}</div><aside>{refs}</aside></div></>,
    <><div className="bd-ledger-title">{title}</div><div className="bd-ledger-header"><div>{identity}</div><div>{refs}</div></div></>,
    <><div className="bd-header-corner"><div>{table}</div><div>{identity}{title}</div></div></>,
    <><div className="bd-editorial-title">{title}</div><div className="bd-editorial-brand">{identity}</div><div className="bd-editorial-refs">{refs}</div></>,
    <><div className="bd-stationery-brand">{identity}</div><div className="bd-stationery-bottom"><div>{title}</div><div>{refs}</div></div></>,
    <><div className="bd-certificate-header"><div>{identity}</div><div className="bd-certificate-title">{title}</div><div>{table}</div></div></>,
  ];
  return <div className={`bd-header bd-header-${variant}`} data-section="header">{headers[variant]}</div>;
}
function Party({ party, label, marker }) {
  return <div className="bd-party"><div className="bd-section-heading"><span className="bd-section-number">{marker}</span>{label}</div>
    <div className="bd-party-name">{text(party.name)}</div><div className="bd-address">{address(party)}</div>
    <div className="bd-party-contact"><Field label="GSTIN" value={party.gst} /><Field label="Mobile" value={party.mobile} /></div></div>;
}
function Parties({ data, variant }) {
  if (variant === 'table') return <div className="bd-party-register" data-section="parties"><div className="bd-section-heading">PARTY REGISTER</div>
    <table><thead><tr><th>Party</th><th>Name & address</th><th>GSTIN / Mobile</th></tr></thead><tbody>
      {[[data.consignor, 'Consignor (Sender)'], [data.consignee, 'Consignee (Receiver)']].map(([p, label]) => <tr key={label}><th>{label}</th><td><b>{text(p.name)}</b><div>{address(p)}</div></td><td>{text(p.gst)}<div>{text(p.mobile)}</div></td></tr>)}
    </tbody></table></div>;
  return <div className={`bd-parties bd-parties-${variant}`} data-section="parties"><Party party={data.consignor} label="Consignor (Sender)" marker="01" /><Party party={data.consignee} label="Consignee (Receiver)" marker="02" /></div>;
}
function Route({ data, variant }) {
  return <div className={`bd-route bd-route-${variant}`} data-section="route"><div className="bd-route-stations"><Field label="From" value={data.consignor.city} large /><span className="bd-route-link" aria-hidden="true">→</span><Field label="To" value={data.consignee.city} large /></div>
    <div className="bd-route-booking"><Field label="Booking Time" value={data.transportDetails.bookingTime} /><Field label="Payment Mode" value={data.transportDetails.paymentMode} /></div></div>;
}
function Vehicle({ data, variant }) {
  const v = data.vehicle;
  return <div className={`bd-vehicle bd-vehicle-${variant}`} data-section="vehicle"><div className="bd-section-heading">VEHICLE & DRIVER</div><div className="bd-vehicle-fields">
    <Field label="Vehicle / Lorry No." value={v.number} /><Field label="Driver Name" value={v.driverName} /><Field label="Driver Mobile" value={v.driverMobile} /><Field label="Driving Licence" value={v.driverLicense} />
  </div></div>;
}
const columns = {
  serial: { label: '#', width: '5%' }, description: { label: 'Goods / Description' }, packages: { label: 'Pkgs', width: '8%' }, quantity: { label: 'Qty', width: '8%' }, weight: { label: 'Weight', width: '12%' },
  rate: { label: 'Rate (₹)', width: '12%' }, freight: { label: 'Freight (₹)', width: '13%' }, total: { label: 'Total (₹)', width: '14%' }, loading: { label: 'Loading', width: '11%' }, unloading: { label: 'Unloading', width: '11%' }, other: { label: 'Ins. / Other', width: '13%' }, remarks: { label: 'Remarks', width: '20%' },
};
const tableColumns = [
  ['serial', 'description', 'packages', 'weight', 'rate', 'freight', 'total'],
  ['serial', 'packages', 'quantity', 'weight', 'description', 'remarks'],
  ['serial', 'description', 'freight', 'loading', 'unloading', 'other', 'total'],
];
const itemExtras = [['quantity', 'Qty'], ['packages', 'Pkgs'], ['weight', 'Weight'], ['rate', 'Rate'], ['freight', 'Freight'], ['gstPercent', 'GST']];
const extraColumns = [['quantity', 'gstPercent'], ['rate', 'freight', 'gstPercent'], ['quantity', 'packages', 'weight', 'rate', 'gstPercent']];
function Description({ item, extras = ['quantity', 'gstPercent'] }) {
  return <div className="bd-item-description"><b>{text(item.itemName)}</b>{item.description && <div>{item.description}</div>}
    <div className="bd-item-meta">{itemExtras.filter(([key]) => extras.includes(key) && hasValue(item[key])).map(([key, label]) => <span key={key}>{label}: {text(item[key])}{key === 'gstPercent' ? '%' : key === 'weight' && item.unit ? ` ${item.unit}` : ''}</span>)}</div>
  </div>;
}
function Cell({ field, item, index, empty, variant = 0 }) {
  if (empty) return null;
  if (field === 'serial') return index + 1;
  if (field === 'description') return <><Description item={item} extras={extraColumns[variant]} />{variant !== 1 && item.remarks && <div className="bd-item-remark">{item.remarks}</div>}</>;
  if (field === 'weight') return hasValue(item.weight) ? [item.weight, item.unit].filter(hasValue).join(' ') : '';
  if (field === 'other') return hasCharges([item], ['insurance', 'otherCharges']) ? amount((Number(item.insurance) || 0) + (Number(item.otherCharges) || 0)) : '';
  if (field === 'total') return hasCharges([item]) ? amount(rowTotal(item)) : '';
  if (['rate', ...CHARGES].includes(field)) return hasValue(item[field]) ? amount(item[field]) : '';
  return text(item[field]);
}
function QuantityLedger({ rows }) {
  return <table className="bd-quantity-ledger"><colgroup><col style={{ width: '5%' }} /><col /><col style={{ width: '9%' }} /><col style={{ width: '9%' }} /><col style={{ width: '15%' }} /><col style={{ width: '14%' }} /></colgroup>
    <thead><tr><th>#</th><th>Goods / Description</th><th>Qty</th><th>Pkgs</th><th>Weight</th><th>Rate (₹)</th></tr></thead>
    <tbody>{rows.map(({ item, index, empty }) => <React.Fragment key={index}>
      <tr className="bd-quantity-main"><td rowSpan={2}>{empty ? '' : index + 1}</td><td><Description item={item} extras={['gstPercent']} />{item.remarks && <div className="bd-item-remark">{item.remarks}</div>}</td>
        {['quantity', 'packages', 'weight', 'rate'].map((key) => <td key={key}><Cell field={key} item={item} empty={empty} /></td>)}
      </tr><tr className="bd-quantity-finance"><td colSpan={3}><div className="bd-quantity-charges">{['loading', 'unloading', 'insurance', 'otherCharges'].map((key) => <Field key={key} label={{ loading: 'Loading', unloading: 'Unloading', insurance: 'Insurance', otherCharges: 'Other' }[key]} value={<Cell field={key} item={item} empty={empty} />} />)}</div></td>
        <td><Field label="Freight (₹)" value={<Cell field="freight" item={item} empty={empty} />} /></td><td><Field label="Line Total (₹)" value={<Cell field="total" item={item} empty={empty} />} /></td>
      </tr></React.Fragment>)}</tbody>
  </table>;
}
function ChargeSlips({ rows }) {
  const fields = ['freight', 'loading', 'unloading', 'insurance', 'otherCharges', 'total'];
  const labels = ['Freight', 'Loading', 'Unloading', 'Insurance', 'Other', 'Line Total'];
  return <div className="bd-charge-slips">{rows.map(({ item, index, empty }) => <div className="bd-charge-slip" key={index}>
    <div className="bd-slip-heading"><span>{empty ? '' : String(index + 1).padStart(2, '0')}</span><div><Description item={item} extras={['quantity', 'packages', 'weight', 'rate', 'gstPercent']} />{item.remarks && <div className="bd-item-remark">{item.remarks}</div>}</div></div>
    <table><thead><tr>{labels.map((label) => <th key={label}>{label} (₹)</th>)}</tr></thead><tbody><tr>{fields.map((key) => <td key={key}><Cell field={key} item={item} empty={empty} /></td>)}</tr></tbody></table>
  </div>)}</div>;
}
function Goods({ data, variant }) {
  const used = (data.goods || []).filter((item) => Object.entries(item).some(([key, v]) => key !== 'id' && hasValue(v)));
  const rows = Array.from({ length: Math.max(used.length, variant >= 3 ? 4 : 7) }, (_, index) => ({ item: used[index] || {}, empty: index >= used.length, index }));
  return <div className={`bd-goods bd-goods-${variant}`} data-section="goods"><div className="bd-section-heading">GOODS PARTICULARS <span>SAID TO CONTAIN</span></div>
    {variant < 3 ? <table className="bd-goods-table"><colgroup>{tableColumns[variant].map((key) => <col key={key} style={{ width: columns[key].width }} />)}</colgroup>
      <thead>{variant === 2 && <tr className="bd-charge-groups"><th colSpan={2}>Cargo</th><th colSpan={4}>Freight & Handling Breakdown</th><th>Line Value</th></tr>}<tr>{tableColumns[variant].map((key) => <th key={key} className={`bd-cell-${key}`}>{columns[key].label}</th>)}</tr></thead>
      <tbody>{rows.map(({ item, index, empty }) => <tr key={index}>{tableColumns[variant].map((key) => <td key={key} className={`bd-cell-${key}`}><Cell field={key} item={item} index={index} empty={empty} variant={variant} /></td>)}</tr>)}</tbody>
    </table> : variant === 3 ? <div className="bd-cargo-cards">{rows.map(({ item, index, empty }) => <div className="bd-cargo-card" key={index}>
      <div className="bd-cargo-index">{empty ? '' : String(index + 1).padStart(2, '0')}</div><div className="bd-cargo-content"><Description item={item} /><div className="bd-cargo-measures"><Field label="Packages" value={item.packages} /><Field label="Weight" value={<Cell field="weight" item={item} />} /><Field label="Rate (₹)" value={<Cell field="rate" item={item} />} /></div>{item.remarks && <div className="bd-item-remark">{item.remarks}</div>}</div>
      <div className="bd-cargo-price"><Field label="Freight (₹)" value={<Cell field="freight" item={item} />} /><Field label="Total (₹)" value={<Cell field="total" item={item} />} /></div></div>)}</div>
      : variant === 5 ? <QuantityLedger rows={rows} /> : variant === 6 ? <ChargeSlips rows={rows} />
      : <div className="bd-item-journals">{rows.map(({ item, index, empty }) => <div className="bd-item-journal" key={index}><div className="bd-journal-heading"><span>{empty ? '' : index + 1}</span><Description item={item} /><Field label="Line Total (₹)" value={<Cell field="total" item={item} />} /></div>
        <div className="bd-journal-detail">{['packages', 'weight', 'rate', 'freight'].map((key) => <Field key={key} label={columns[key].label} value={<Cell field={key} item={item} />} />)}<Field label="Remarks" value={item.remarks} /></div></div>)}</div>}
  </div>;
}
function Summary({ data, totals, variant }) {
  const goods = data.goods || [];
  const charge = (key) => hasCharges(goods, [key]) ? amount(totals[key]) : '';
  const fields = [['Basic Freight', charge('freight')], ['Loading', charge('loading')], ['Unloading', charge('unloading')], ['Insurance', charge('insurance')], ['Other Charges', charge('otherCharges')]];
  if (hasCharges(goods)) fields.push(['Subtotal', amount(totals.subtotal)]);
  if (Number(totals.gstAmount)) {
    const interstate = data.consignor.state && data.consignee.state && data.consignor.state.trim().toLowerCase() !== data.consignee.state.trim().toLowerCase();
    if (interstate) fields.push(['IGST', amount(totals.gstAmount)]);
    else fields.push(['CGST', amount(totals.gstAmount / 2)], ['SGST', amount(totals.gstAmount / 2)]);
  }
  const total = hasCharges(goods) ? `₹ ${amount(totals.grandTotal)}` : '';
  return <div className={`bd-summary bd-summary-${variant}`} data-section="summary"><div className="bd-section-heading">FREIGHT SETTLEMENT</div>
    {variant === 'band' ? <div className="bd-summary-band">{fields.map(([label, value]) => <Field key={label} label={label} value={value} />)}<Field label="Grand Total" value={total} large /></div>
      : <><dl>{fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className="bd-grand-total"><span>Grand Total</span><strong>{total}</strong></div></>}
  </div>;
}
function Notes({ data, totals }) {
  return <div className="bd-notes" data-section="notes"><div className="bd-section-heading">AMOUNT IN WORDS</div><div className="bd-words">{hasCharges(data.goods || []) ? numberToIndianWords(totals.grandTotal) : ''}</div><div className="bd-section-heading">NOTES / INSTRUCTIONS</div><div className="bd-instructions">{text(data.transportDetails.terms)}</div></div>;
}
function Signatures({ data, page }) {
  const labels = page % 3 === 0 ? ['Consignor', 'Driver', 'Consignee', 'Authorised Signatory'] : ['Booked By', 'Received By', 'Authorised Signatory'];
  return <div className={`bd-signatures bd-signatures-${page % 3}`} data-section="signatures">{labels.map((label, index) => <div key={label}><div className="bd-signature-name">{index === labels.length - 1 && data.transportDetails.companyName ? `For ${data.transportDetails.companyName}` : ''}</div><div className="bd-signature-line" /><span>{label}</span></div>)}</div>;
}
export function UniversalBillTemplate({ data, totals, config }) {
  const design = getBillDesign(config);
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  // Measure natural document height, before the preview's external zoom. Long
  // addresses and additional rows must shrink the complete sheet, never crop it.
  useEffect(() => {
    const page = pageRef.current, content = contentRef.current;
    if (!page || !content) return;
    let disposed = false;
    const fit = () => {
      if (disposed) return;
      const style = getComputedStyle(page);
      const available = page.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      content.style.transform = 'none';
      content.style.height = `${available}px`;
      const scale = Math.min(1, available / Math.max(1, content.scrollHeight));
      content.style.transform = `scale(${scale})`;
      page.dataset.fitScale = String(scale);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(page);
    content.addEventListener('load', fit, true);
    document.fonts?.ready.then(fit);
    return () => { disposed = true; observer.disconnect(); content.removeEventListener('load', fit, true); };
  }, [data, totals, design.key]);
  const sections = {
    route: <Route data={data} variant={design.route} />, parties: <Parties data={data} variant={design.party} />, vehicle: <Vehicle data={data} variant={design.vehicle} />,
    goods: <Goods data={data} variant={design.goods} />, summary: <Summary data={data} totals={totals} variant={design.summary} />, notes: <Notes data={data} totals={totals} />, signatures: <Signatures data={data} page={design.page} />,
  };
  const region = (node, index) => typeof node === 'string' ? <React.Fragment key={`${node}-${index}`}>{sections[node]}</React.Fragment>
    : <div key={index} className={`bd-region bd-region-${node.type}`}>{node.children.map(region)}</div>;
  return <div ref={pageRef} id="bill-a4-preview" className={`bill-document bd-page-${design.page}${data.goods?.length > 10 ? ' bd-dense' : ''}`} data-design={design.key}
    style={{ '--bd-ink': config.theme?.primary || '#17243b', '--bd-wash': config.theme?.secondary || '#f1f5f9' }}>
    {data.settings?.watermark && <div className="bd-watermark">{data.settings.watermark}</div>}
    <div ref={contentRef} className="bd-sheet-content"><BrandHeader data={data} variant={design.header} title={design.title} /><div className="bd-page-body">{design.regions.map(region)}</div></div>
  </div>;
}
