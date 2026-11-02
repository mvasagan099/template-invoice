let itemCounter = 0;

export function sequentialNumber(index, { prefix = 'INV', padding = 4, startAt = 1 } = {}) {
  const num = (Number(startAt) || 1) + index;
  return `${prefix}-${String(num).padStart(padding, '0')}`;
}

export function randomNumber({ prefix = 'INV', length = 6 } = {}) {
  let digits = '';
  for (let i = 0; i < length; i++) {
    digits += '0123456789'[Math.floor(Math.random() * 10)];
  }
  return `${prefix}-${digits}`;
}

export function alternatingNumber(index, { prefix = 'INV', padding = 4, startAt = 1 } = {}) {
  const start = Number(startAt) || 1;
  const num = start + (Math.floor(index / 2) * 5 + (index % 2 === 1 ? 2 : 0));
  return `${prefix}-${String(num).padStart(padding, '0')}`;
}

export function createDefaultItem() {
  return {
    id: `item-${++itemCounter}-${Date.now()}`,
    description: '',
    hsn: '',
    qty: 1,
    unit: 'pcs',
    rate: 0,
    discountPct: 0,
    taxPct: 18,
  };
}
