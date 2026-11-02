import assert from 'node:assert/strict';
import { writeFileSync, readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BillA4Preview } from '../src/components/bill/BillA4Preview.jsx';
import { BILL_TEMPLATES, DEFAULT_BILL_DATA } from '../src/constants/billPresets.js';
import { EXTENDED_BILL_CONFIGS } from '../src/components/bill/templates/extended/extendedBillConfig.js';
import { getBillDesign } from '../src/components/bill/templates/extended/billDesigns.js';

const zeroTotals = Object.fromEntries([
  'freight', 'loading', 'unloading', 'insurance', 'otherCharges',
  'subtotal', 'gstAmount', 'grandTotal',
].map((key) => [key, 0]));
const render = (data, totals = zeroTotals) => renderToStaticMarkup(
  <BillA4Preview data={data} totals={totals} />,
).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
const forbidden = /UNIVERSAL LOGISTICS &amp; TRANSPORT CORP|Auto Transport Company|BABA TRANSPORT COMPANY|R G TRANSPORT SERVICES|INDIAN RAILWAYS|Address not provided|Commercial Goods Consignment|Commercial Freight Transport|PENDING|EXP-TRACK-001|XXXXXXXXXX|9555260722|9965|N\/A|_{3,}|\b0\.00\b|NaN|undefined/;

assert.equal(DEFAULT_BILL_DATA.transportDetails.bookingDate, '');
assert.equal(BILL_TEMPLATES.length, 1061);

for (const template of BILL_TEMPLATES) {
  const data = structuredClone(DEFAULT_BILL_DATA);
  data.settings.template = template;
  assert.doesNotMatch(render(data), forbidden, `${template}: empty bill contains invented data`);

  // Partially filling a party must not invent its missing name, city or address.
  data.consignor.name = 'Sender_Test_482';
  data.consignor.address = 'Entered_Address_932';
  data.transportDetails.city = 'Company_City_345';
  let text = render(data);
  assert.ok(text.includes('Sender_Test_482'), `${template}: entered sender missing`);
  assert.ok(text.includes('Entered_Address_932'), `${template}: entered address missing`);
  assert.doesNotMatch(text, forbidden, `${template}: partial bill contains invented data`);

  data.transportDetails.companyName = 'Entered_Company_618';
  data.transportDetails.lrNo = 'LR_Test_738';
  data.consignee.name = 'Receiver_Test_725';
  data.goods[0] = { ...data.goods[0], itemName: 'Entered_Goods_591', freight: 125, gstPercent: 0 };
  text = render(data, { ...zeroTotals, freight: 125, subtotal: 125, grandTotal: 125 });
  for (const entered of ['Entered_Company_618', 'LR_Test_738', 'Receiver_Test_725', 'Entered_Goods_591']) {
    assert.ok(text.includes(entered), `${template}: ${entered} missing`);
  }
  assert.ok(text.includes('125'), `${template}: entered freight missing`);

  // Clearing fields and removing every goods row must also produce a clean bill.
  data.transportDetails = { ...DEFAULT_BILL_DATA.transportDetails };
  data.consignor = { ...DEFAULT_BILL_DATA.consignor };
  data.consignee = { ...DEFAULT_BILL_DATA.consignee };
  data.goods = [];
  text = render(data);
  assert.doesNotMatch(text, forbidden, `${template}: removed goods contain invented data`);
  assert.ok(!text.includes('Entered_'), `${template}: cleared values reappeared`);
}

const extended = structuredClone(DEFAULT_BILL_DATA);
extended.settings.template = 'Goa Maritime Feeder Bilty';
extended.transportDetails.city = 'Company_City_345';
let text = render(extended);
assert.doesNotMatch(text, /From: Company_City_345|ORIGIN STATION|DESTINATION STATION|Mormugao Port Trust|TO PAY \/ BILLED/);

// An explicitly entered zero is a value; an untouched charge is blank.
extended.goods[0].freight = 0;
assert.match(render(extended), /0\.00/);
extended.goods[0].freight = '';
assert.doesNotMatch(render(extended), /0\.00/);

const eway = structuredClone(DEFAULT_BILL_DATA);
eway.settings.template = 'E-Way Bill';
assert.doesNotMatch(render(eway), /State Code: 27|9965|Road/);
eway.consignor.gst = '33ABCDE1234F1Z5';
eway.consignee.gst = '29ABCDE1234F1Z5';
text = render(eway);
assert.match(text, /State Code: 33/);
assert.match(text, /State Code: 29/);

console.log(`Passed blank, partial, filled and cleared rendering checks for all ${BILL_TEMPLATES.length} bill templates.`);

// Ignore text, ALL attributes (including colours, classes and design IDs), and
// compare the actual element trees. Recolouring or renaming cannot pass this.
const structures = new Map();
for (const [name, config] of Object.entries(EXTENDED_BILL_CONFIGS)) {
  const data = structuredClone(DEFAULT_BILL_DATA);
  data.settings.template = name;
  const markup = renderToStaticMarkup(<BillA4Preview data={data} totals={zeroTotals} />);
  const skeleton = (markup.match(/<\/?[a-z][^>]*>/gi) || []).map((tag) => tag.replace(/\s[^>]*|\/>$/g, '>')).join('');
  assert.ok(!structures.has(skeleton), `${name} duplicates the structure of ${structures.get(skeleton)}`);
  structures.set(skeleton, name);
  for (const section of ['header', 'route', 'parties', 'vehicle', 'goods', 'summary', 'notes', 'signatures']) {
    assert.equal(markup.split(`data-section="${section}"`).length - 1, 1, `${name}: missing or duplicate ${section}`);
  }
  assert.ok(getBillDesign(config).key);
}
assert.equal(structures.size, 1050);
console.log('Passed 1050 unique element-tree checks with all text, colours and attributes removed.');
for (const name of BILL_TEMPLATES.filter((name) => !EXTENDED_BILL_CONFIGS[name])) {
  const data = structuredClone(DEFAULT_BILL_DATA); data.settings.template = name;
  const markup = renderToStaticMarkup(<BillA4Preview data={data} totals={zeroTotals} />);
  const skeleton = (markup.match(/<\/?[a-z][^>]*>/gi) || []).map((tag) => tag.replace(/\s[^>]*|\/>$/g, '>')).join('');
  assert.ok(!structures.has(skeleton), `${name}: duplicate layout`);
  structures.set(skeleton, name);
}
assert.equal(structures.size, 1061);

for (const name of Object.keys(EXTENDED_BILL_CONFIGS)) {
  const data = structuredClone(DEFAULT_BILL_DATA); data.settings.template = name;
  data.transportDetails = { ...data.transportDetails, lrNo: 'LR-DECIMAL-TEST', bookingTime: '14:38', paymentMode: 'Paid', terms: 'Instructions_Test_453' };
  data.consignor.state = 'Tamil Nadu'; data.consignee.state = 'Karnataka';
  data.goods[0] = { ...data.goods[0], itemName: 'Goods_837', description: 'Description_951', remarks: 'Remarks_617', quantity: 37, packages: 23, weight: 149, unit: 'kg', rate: 61.25, freight: 511.25, loading: 13.5, unloading: 17.25, insurance: 2.5, otherCharges: 3.5, gstPercent: 5 };
  const totals = { freight: 511.25, loading: 13.5, unloading: 17.25, insurance: 2.5, otherCharges: 3.5, subtotal: 548, gstAmount: 27.4, grandTotal: 575.4 };
  let printed = render(data, totals);
  for (const value of ['LR-DECIMAL-TEST', '14:38', 'Paid', 'Instructions_Test_453', 'Goods_837', 'Description_951', 'Remarks_617', '37', '23', '149', '61.25', '511.25', '575.40']) {
    assert.ok(printed.includes(value), `${name}: entered ${value} was lost`);
  }
  assert.ok(printed.includes('IGST'), `${name}: interstate tax label missing`);
  data.consignee.state = 'Tamil Nadu';
  printed = render(data, totals);
  assert.ok(printed.includes('CGST') && printed.includes('SGST') && printed.includes('13.70'), `${name}: split tax incorrect`);
}
console.log('Passed 1061 distinct layouts, entered-field preservation, decimal totals and interstate/intrastate GST checks.');

// Optional browser fixture: temporary review material, never shipped as app data.
if (process.env.BILL_REVIEW_FILE) {
  const sample = structuredClone(DEFAULT_BILL_DATA);
  sample.transportDetails = { ...sample.transportDetails, companyName: 'SOUTHERN FREIGHT SERVICES', branch: 'Chennai Branch', city: 'Chennai', state: 'Tamil Nadu', gst: '33ABCDE1234F1Z5', phone: '+91 98765 43210', email: 'dispatch@example.test', website: 'https://example.test', lrNo: 'LR-2026-0084', billNo: 'TB-0084', bookingDate: '2026-11-02', deliveryDate: '2026-11-04', bookingTime: '10:30', paymentMode: 'To Pay', terms: 'Please contact the receiving office before unloading.' };
  sample.consignor = { name: 'Meridian Manufacturing Pvt. Ltd.', address: '42 Industrial Estate, Ambattur', city: 'Chennai', state: 'Tamil Nadu', pincode: '600058', gst: '33ABCDE1234F1Z5', mobile: '+91 98765 12340' };
  sample.consignee = { name: 'Northstar Distribution Centre', address: '18 Logistics Park, Electronic City', city: 'Bengaluru', state: 'Karnataka', pincode: '560100', gst: '29ABCDE1234F1Z5', mobile: '+91 98765 56780' };
  sample.vehicle = { number: 'TN 01 AB 1234', driverName: 'R. Kumar', driverMobile: '+91 98765 11220', driverLicense: 'TN0120260012345' };
  sample.goods = Array.from({ length: Number(process.env.BILL_REVIEW_ROWS || 3) }, (_, i) => ({ ...DEFAULT_BILL_DATA.goods[0], id: `review-${i}`, itemName: ['Machinery spare parts', 'Electrical components', 'Packing materials'][i % 3], description: 'Sealed cartons — handle with care', quantity: i + 2, packages: i + 2, weight: `${(i + 1) * 45}`, unit: 'kg', rate: 500, freight: 1500, loading: 50, unloading: 50, insurance: 0, otherCharges: 0, gstPercent: 5, remarks: 'Keep dry' }));
  const reviewTotals = { freight: sample.goods.length * 1500, loading: sample.goods.length * 50, unloading: sample.goods.length * 50, insurance: 0, otherCharges: 0, subtotal: sample.goods.length * 1600, gstAmount: sample.goods.length * 80, grandTotal: sample.goods.length * 1680 };
  const entries = Object.entries(EXTENDED_BILL_CONFIGS);
  const sheets = entries.map(([name, config]) => {
    const data = structuredClone(sample); data.settings.template = name;
    return `<article data-template="${config.id}"><p class="review-label">${config.id}. ${name} — ${getBillDesign(config).label}</p>${renderToStaticMarkup(<BillA4Preview data={data} totals={reviewTotals} />)}</article>`;
  }).join('');
  const css = readFileSync('src/components/bill/templates/extended/billDesigns.css', 'utf8');
  writeFileSync(process.env.BILL_REVIEW_FILE, `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:20px;background:#e5e7eb;font-family:Arial}article{margin-bottom:30px;width:794px}.review-label{font-size:13px}#bill-a4-preview{width:794px!important;height:1123px!important;max-height:1123px!important;display:flex!important;flex-direction:column!important;box-sizing:border-box;position:relative;overflow:hidden}
    ${css}</style></head><body>${sheets}<script>
    const issues=[];document.querySelectorAll('article').forEach(a=>{const p=a.querySelector('.bill-document'),r=p.getBoundingClientRect();for(const el of p.querySelectorAll('[data-section],.bd-region,.bd-header,.bd-goods-table,.bd-cargo-card,.bd-item-journal')){const b=el.getBoundingClientRect();if(b.bottom>r.bottom-8||b.right>r.right+1||b.left<r.left-1)issues.push({id:a.dataset.template,section:el.dataset.section||el.className,bottom:Math.round(b.bottom-r.top),right:Math.round(b.right-r.left)});}});
    const report=document.createElement('pre');report.id='layout-report';report.textContent=JSON.stringify({pages:document.querySelectorAll('article').length,issues});document.body.prepend(report);
    </script></body></html>`);
  console.log(`Wrote browser review fixture to ${process.env.BILL_REVIEW_FILE}`);
}
