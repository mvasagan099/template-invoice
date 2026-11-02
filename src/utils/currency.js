export function round2(e) {
  return Math.round((Number(e) + 2 ** -52) * 100) / 100;
}

export function formatCurrency(e, locale = 'en-IN', currency = 'INR') {
  const r = Number(e) || 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(r);
}

const ONES = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];

const TENS = [
  '',
  '',
  'Twenty',
  'Thirty',
  'Forty',
  'Fifty',
  'Sixty',
  'Seventy',
  'Eighty',
  'Ninety',
];

function convertTwoDigits(n) {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10);
  const rem = n % 10;
  return `${TENS[t]}${rem ? ' ' + ONES[rem] : ''}`;
}

function convertThreeDigits(n) {
  const h = Math.floor(n / 100);
  const rem = n % 100;
  let res = '';
  if (h) res += `${ONES[h]} Hundred`;
  if (rem) res += `${res ? ' ' : ''}${convertTwoDigits(rem)}`;
  return res;
}

function convertInteger(n) {
  if (n === 0) return 'Zero';
  const crore = Math.floor(n / 1e7);
  n %= 1e7;
  const lakh = Math.floor(n / 1e5);
  n %= 1e5;
  const thousand = Math.floor(n / 1e3);
  n %= 1e3;
  const rem = n;
  const parts = [];
  if (crore) parts.push(`${convertThreeDigits(crore)} Crore`);
  if (lakh) parts.push(`${convertThreeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${convertThreeDigits(thousand)} Thousand`);
  if (rem) parts.push(convertThreeDigits(rem));
  return parts.join(' ');
}

export function numberToIndianWords(e, currencyName = 'Rupees') {
  const n = Math.abs(Number(e) || 0);
  const r = Math.floor(n);
  const i = Math.round((n - r) * 100);
  let a = `${currencyName} ${convertInteger(r)}`;
  if (i > 0) a += ` and ${convertInteger(i)} Paise`;
  a += ' Only';
  return a;
}

export function calculateItemTotals(item) {
  const qty = Number(item.qty) || 0;
  const rate = Number(item.rate) || 0;
  const discountPct = Number(item.discountPct) || 0;
  const hasCgst = item.cgstPct !== undefined && item.cgstPct !== null && item.cgstPct !== '';
  const hasSgst = item.sgstPct !== undefined && item.sgstPct !== null && item.sgstPct !== '';
  const cgstRate = (hasCgst && Number(item.cgstPct)) || 0;
  const sgstRate = (hasSgst && Number(item.sgstPct)) || 0;
  const taxRate = hasCgst || hasSgst ? cgstRate + sgstRate : Number(item.taxPct) || 0;

  const gross = qty * rate;
  const discountAmount = (gross * discountPct) / 100;
  const taxable = gross - discountAmount;
  const taxAmount = (taxable * taxRate) / 100;
  const cgstAmount = hasCgst ? (taxable * cgstRate) / 100 : undefined;
  const sgstAmount = hasSgst ? (taxable * sgstRate) / 100 : undefined;

  return {
    gross,
    discountAmount,
    taxable,
    taxAmount,
    total: taxable + taxAmount,
    cgstAmount,
    sgstAmount,
    hasExplicitCgst: hasCgst,
    hasExplicitSgst: hasSgst,
  };
}

export function calculateInvoiceTotals(items = [], { isInterState = false } = {}) {
  let subtotal = 0;
  let totalDiscount = 0;
  let totalTaxable = 0;
  let totalTax = 0;
  let totalExplicitCgst = 0;
  let totalExplicitSgst = 0;
  let hasExplicit = false;

  items.forEach((item) => {
    const {
      gross,
      discountAmount,
      taxable,
      taxAmount,
      cgstAmount,
      sgstAmount,
      hasExplicitCgst,
      hasExplicitSgst,
    } = calculateItemTotals(item);
    subtotal += gross;
    totalDiscount += discountAmount;
    totalTaxable += taxable;
    totalTax += taxAmount;
    if (hasExplicitCgst || hasExplicitSgst) {
      hasExplicit = true;
      totalExplicitCgst += cgstAmount || 0;
      totalExplicitSgst += sgstAmount || 0;
    }
  });

  const cgst = hasExplicit ? totalExplicitCgst : isInterState ? 0 : totalTax / 2;
  const sgst = hasExplicit ? totalExplicitSgst : isInterState ? 0 : totalTax / 2;
  const igst = isInterState && !hasExplicit ? totalTax : 0;
  const grandTotal = totalTaxable + totalTax;

  return {
    subtotal: round2(subtotal),
    totalDiscount: round2(totalDiscount),
    totalTaxable: round2(totalTaxable),
    totalTax: round2(totalTax),
    cgst: round2(cgst),
    sgst: round2(sgst),
    igst: round2(igst),
    grandTotal: round2(grandTotal),
    roundedTotal: Math.round(grandTotal),
    roundOff: round2(Math.round(grandTotal) - grandTotal),
  };
}
