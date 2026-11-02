import React from 'react';
import { EXTENDED_BILL_CONFIGS } from './templates/extended/extendedBillConfig.js';

export function BillExtraFields({ data, updateSection }) {
  if (!EXTENDED_BILL_CONFIGS[data.settings.template]) return null;
  const n = data.transportDetails;
  return <div className="bill-section">
    <h3 className="bill-section-title">Booking & Instructions</h3>
    <div className="bill-section-body">
      <div className="bill-grid">
        <div className="bill-field"><label className="bill-label" htmlFor="bill-booking-time">Booking Time</label><input id="bill-booking-time" className="bill-input" type="time" value={n.bookingTime ?? ''} onChange={(e) => updateSection('transportDetails', 'bookingTime', e.target.value)} /></div>
        <div className="bill-field"><label className="bill-label" htmlFor="bill-payment-mode">Payment Mode</label><select id="bill-payment-mode" className="bill-input" value={n.paymentMode ?? ''} onChange={(e) => updateSection('transportDetails', 'paymentMode', e.target.value)}>
          <option value="">Select payment mode</option><option>To Pay</option><option>Paid</option><option>To Be Billed</option>
        </select></div>
      </div>
      <div className="bill-field" style={{ marginTop: 10 }}><label className="bill-label" htmlFor="bill-instructions">Notes / Instructions</label><textarea id="bill-instructions" className="bill-input" rows={3} value={n.terms ?? ''} onChange={(e) => updateSection('transportDetails', 'terms', e.target.value)} /></div>
    </div>
  </div>;
}
