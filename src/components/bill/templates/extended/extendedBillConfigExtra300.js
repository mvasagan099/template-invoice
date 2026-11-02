import { PAGE_DESIGNS, HEADER_DESIGNS, getBillDesign } from './billDesigns.js';

// IDs 762–1061 extend the catalog without changing any existing saved selection.
// Two new goods structures × ten mastheads × fifteen page compositions.
const palettes = [
  ['#17243b', '#f1f5f9'], ['#134e4a', '#f0fdfa'], ['#4c1d95', '#f5f3ff'],
  ['#78350f', '#fffbeb'], ['#1e3a8a', '#eff6ff'],
];
export const EXTRA_300_BILL_CONFIGS = Object.fromEntries(Array.from({ length: 300 }, (_, index) => {
  const id = 762 + index;
  const page = PAGE_DESIGNS[index % PAGE_DESIGNS.length];
  const header = HEADER_DESIGNS[Math.floor(index / PAGE_DESIGNS.length) % HEADER_DESIGNS.length];
  const format = index < 150 ? 'Quantity Ledger' : 'Charge Slips';
  const name = `${page.name} — ${format} — ${header}`;
  const [primary, secondary] = palettes[index % palettes.length];
  const config = { id, name, layout: 'composed', theme: { primary, secondary } };
  return [name, { ...config, title: getBillDesign(config).title }];
}));
