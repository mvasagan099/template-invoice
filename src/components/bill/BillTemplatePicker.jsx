import React, { useMemo, useState } from 'react';
import { BILL_TEMPLATES } from '../../constants/billPresets.js';
import { EXTENDED_BILL_CONFIGS } from './templates/extended/extendedBillConfig.js';
import { getBillDesign } from './templates/extended/billDesigns.js';

const choices = BILL_TEMPLATES.map((name, index) => ({ name, index,
  design: EXTENDED_BILL_CONFIGS[name] ? getBillDesign(EXTENDED_BILL_CONFIGS[name]).label : 'Original document layout',
}));

export function BillTemplatePicker({ value, onChange }) {
  const [query, setQuery] = useState('');
  const selected = choices.find((item) => item.name === value) || choices[0];
  const matches = useMemo(() => choices.filter((item) => `${item.name} ${item.design}`.toLowerCase().includes(query.trim().toLowerCase())), [query]);
  const position = matches.findIndex((item) => item.name === value);
  const move = (step) => {
    if (!matches.length) return;
    const next = position === -1 ? (step > 0 ? 0 : matches.length - 1) : (position + step + matches.length) % matches.length;
    onChange(matches[next].name);
  };
  return <div className="bill-design-picker">
    <div className="bill-design-picker-top"><label htmlFor="bill-template-choice">Template #{selected.index + 1} of {choices.length}</label>
      <input className="bill-input" type="search" aria-label="Search bill templates" placeholder="Search name, sidebar, manifest, cards…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
    <div className="bill-design-picker-controls">
      <button className="bill-btn" type="button" aria-label="Previous bill template" onClick={() => move(-1)} disabled={matches.length === 0}>←</button>
      <select id="bill-template-choice" className="bill-template-select" value={selected.name} onChange={(event) => onChange(event.target.value)}>
        {position === -1 && <option value={selected.name}>{selected.index + 1}. {selected.name} (current)</option>}
        {matches.map((item) => <option key={item.name} value={item.name}>{item.index + 1}. {item.name}</option>)}
      </select>
      <button className="bill-btn" type="button" aria-label="Next bill template" onClick={() => move(1)} disabled={matches.length === 0}>→</button>
    </div>
    <p className="bill-design-description">{selected.design}</p>
    {query && <p className="bill-design-match-count" role="status">{matches.length ? `${matches.length} matching templates` : 'No templates match your search.'}</p>}
  </div>;
}
