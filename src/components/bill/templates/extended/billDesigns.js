// Stable structural compositions, independent of theme colours and template text.
const group = (type, ...children) => ({ type, children });
export const PAGE_DESIGNS = [
  { name: 'Classic folio', party: 'columns', route: 'ribbon', vehicle: 'strip', summary: 'ledger',
    regions: ['route', 'parties', 'vehicle', 'goods', group('wide-left', 'notes', 'summary'), 'signatures'] },
  { name: 'Operations sidebar', party: 'columns', route: 'vertical', vehicle: 'list', summary: 'band',
    regions: [group('rail-left', group('stack', 'route', 'vehicle', 'notes'), group('grow', 'parties', 'goods')), 'summary', 'signatures'] },
  { name: 'Editorial invoice', party: 'cards', route: 'timeline', vehicle: 'strip', summary: 'ledger',
    regions: ['parties', 'route', 'goods', 'vehicle', group('wide-left', 'notes', 'summary'), 'signatures'] },
  { name: 'Boxed dispatch docket', party: 'stacked', route: 'ribbon', vehicle: 'list', summary: 'band',
    regions: ['route', group('wide-left', 'parties', 'vehicle'), 'goods', 'summary', 'notes', 'signatures'] },
  { name: 'Address rail', party: 'stacked', route: 'split', vehicle: 'strip', summary: 'ledger',
    regions: [group('address-rail', group('stack', 'parties', 'notes'), group('grow', 'route', 'vehicle', 'goods', 'summary')), 'signatures'] },
  { name: 'Warehouse manifest', party: 'table', route: 'timeline', vehicle: 'strip', summary: 'ledger',
    regions: ['vehicle', 'route', 'goods', group('wide-left', 'parties', 'summary'), 'notes', 'signatures'] },
  { name: 'Freight invoice', party: 'cards', route: 'vertical', vehicle: 'list', summary: 'band',
    regions: ['parties', group('rail-left', group('stack', 'route', 'vehicle', 'notes'), 'goods'), 'summary', 'signatures'] },
  { name: 'Transit control sheet', party: 'columns', route: 'split', vehicle: 'grid', summary: 'ledger',
    regions: [group('equal', 'route', 'vehicle'), 'parties', 'goods', group('wide-left', 'notes', 'summary'), 'signatures'] },
  { name: 'Accounts register', party: 'table', route: 'ribbon', vehicle: 'grid', summary: 'ledger',
    regions: ['parties', 'route', 'goods', group('equal', 'vehicle', 'summary'), 'notes', 'signatures'] },
  { name: 'Settlement rail', party: 'columns', route: 'timeline', vehicle: 'strip', summary: 'receipt',
    regions: ['route', group('settlement-rail', group('stack', 'summary', 'notes'), group('grow', 'parties', 'goods')), 'vehicle', 'signatures'] },
  { name: 'Delivery receipt', party: 'bands', route: 'split', vehicle: 'strip', summary: 'band',
    regions: ['route', 'parties', 'goods', 'vehicle', 'summary', 'notes', 'signatures'] },
  { name: 'Finance statement', party: 'table', route: 'ribbon', vehicle: 'list', summary: 'receipt',
    regions: [group('wide-left', 'summary', 'vehicle'), 'parties', 'route', 'goods', 'notes', 'signatures'] },
  { name: 'Trip journal', party: 'bands', route: 'timeline', vehicle: 'list', summary: 'band',
    regions: ['route', group('wide-left', 'parties', 'vehicle'), 'goods', 'notes', 'summary', 'signatures'] },
  { name: 'Correspondence waybill', party: 'stacked', route: 'vertical', vehicle: 'strip', summary: 'ledger',
    regions: [group('wide-left', 'parties', 'route'), 'vehicle', 'goods', group('wide-left', 'notes', 'summary'), 'signatures'] },
  { name: 'Compact booking sheet', party: 'bands', route: 'split', vehicle: 'grid', summary: 'receipt',
    regions: [group('equal', 'vehicle', 'route'), 'parties', 'goods', group('wide-left', 'summary', 'notes'), 'signatures'] },
];
export const HEADER_DESIGNS = ['Letterhead', 'Centred crest', 'Split masthead', 'Title banner', 'Reference rail', 'Ledger heading', 'Corner docket', 'Editorial masthead', 'Stacked stationery', 'Bordered certificate'];
export const GOODS_DESIGNS = ['Freight ledger', 'Packing manifest', 'Charge breakdown', 'Cargo cards', 'Item journals', 'Quantity ledger', 'Charge slips'];
const DOCUMENT_TITLES = ['Lorry Receipt', 'Consignment Note', 'Freight Invoice', 'Dispatch Docket', 'Cargo Booking Note', 'Goods Manifest', 'Transport Invoice', 'Transit Waybill', 'Freight Register', 'Freight Settlement', 'Delivery Receipt', 'Freight Statement', 'Trip Challan', 'Goods Waybill', 'Booking Receipt'];
export function getBillDesign(config) {
  const index = Number(config.id) - 12;
  const capacity = PAGE_DESIGNS.length * HEADER_DESIGNS.length * GOODS_DESIGNS.length;
  if (!Number.isInteger(index) || index < 0 || index >= capacity) throw new Error(`Missing bill design for ${config.name || config.id}`);
  const page = index % 15;
  const header = Math.floor(index / 15) % 10;
  const goods = Math.floor(index / 150);
  return { ...PAGE_DESIGNS[page], page, header, goods, title: DOCUMENT_TITLES[page], key: `${page}-${header}-${goods}`,
    label: `${PAGE_DESIGNS[page].name} · ${HEADER_DESIGNS[header]} · ${GOODS_DESIGNS[goods]}` };
}
