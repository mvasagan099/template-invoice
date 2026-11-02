import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export function parseCsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
}

export function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        resolve(XLSX.utils.sheet_to_json(sheet, { defval: '' }));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}

export function parseImportFile(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith('.csv')) {
    return parseCsv(file);
  }
  if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
    return parseExcel(file);
  }
  return Promise.reject(new Error('Unsupported file type. Please upload a .csv, .xlsx, or .xls file.'));
}

export const REQUIRED_ROW_FIELDS = ['toCompany', 'itemNames', 'itemQuantities', 'itemPrices'];

export function sanitizeRow(row) {
  const splitPipe = (val, transform = (v) => v.trim()) => {
    if (!val && val !== 0) return [];
    return val
      .toString()
      .split('|')
      .map(transform)
      .filter((v) => v !== '' && v !== null && !Number.isNaN(v));
  };
  const splitPipeNonEmpty = (val) => {
    if (!val && val !== 0) return [];
    return val
      .toString()
      .split('|')
      .map((v) => v.trim())
      .filter(Boolean);
  };
  const splitPipeNewlines = (val) => {
    if (!val) return '';
    return val
      .toString()
      .split('|')
      .map((v) => v.trim())
      .join('\n');
  };

  return {
    invoiceDate: row.invoiceDate ?? '',
    fromCompany: row.fromCompany ?? '',
    fromDetails: splitPipeNewlines(row.fromDetails),
    toCompany: row.toCompany ?? '',
    toDetails: splitPipeNewlines(row.toDetails),
    shipToCompany: row.shipToCompany ?? '',
    shipToDetails: splitPipeNewlines(row.shipToDetails),
    bankName: row.bankName ?? '',
    accountNumber: row.accountNumber ?? '',
    ifsc: row.ifsc ?? '',
    accountHolder: row.accountHolder ?? '',
    itemNames: splitPipe(row.itemNames),
    itemQuantities: splitPipe(row.itemQuantities, (v) => parseInt(v.trim()) || 0),
    itemPrices: splitPipe(row.itemPrices, (v) => parseFloat(v.trim()) || 0),
    itemUnits: splitPipe(row.itemUnits),
    hsn: splitPipeNonEmpty(row.hsn),
    variety: splitPipe(row.variety),
    cgst: splitPipe(row.cgst, (v) => parseFloat(v.trim())),
    sgst: splitPipe(row.sgst, (v) => parseFloat(v.trim())),
    handlingFees: Number(row.handlingFees || 0),
    taxPct: row.taxPct !== undefined && row.taxPct !== null && row.taxPct !== '' ? Number(row.taxPct) : null,
  };
}

export function isRowInvalid(row) {
  return REQUIRED_ROW_FIELDS.some((field) => !row[field] && row[field] !== 0);
}
