import React from 'react';
import { LorryReceipt } from './templates/LorryReceipt.jsx';
import { ConsignmentNote } from './templates/ConsignmentNote.jsx';
import { GoodsReceipt } from './templates/GoodsReceipt.jsx';
import { ParcelBooking } from './templates/ParcelBooking.jsx';
import { FreightBill } from './templates/FreightBill.jsx';
import { Bilty } from './templates/Bilty.jsx';
import { TripChallan } from './templates/TripChallan.jsx';
import { ModernTransportBill } from './templates/ModernTransportBill.jsx';
import { StationReceipt } from './templates/StationReceipt.jsx';
import { TransportMemo } from './templates/TransportMemo.jsx';
import { EWayBill } from './templates/EWayBill.jsx';
import { EXTENDED_BILL_CONFIGS } from './templates/extended/extendedBillConfig.js';
import { UniversalBillTemplate } from './templates/extended/UniversalBillTemplate.jsx';

export const BILL_TEMPLATE_COMPONENTS = {
  'Lorry Receipt': LorryReceipt,
  'Consignment Note': ConsignmentNote,
  'Goods Receipt': GoodsReceipt,
  'Parcel Booking': ParcelBooking,
  'Freight Bill': FreightBill,
  'Bilty (Duplicate)': Bilty,
  Bilty: Bilty,
  'Trip Challan': TripChallan,
  'Modern Transport Bill': ModernTransportBill,
  'Station Receipt': StationReceipt,
  'Transport Memo': TransportMemo,
  'E-Way Bill': EWayBill,
};

export function BillA4Preview({ data, totals }) {
  const templateName = data.settings?.template || 'Lorry Receipt';
  const OriginalComponent = BILL_TEMPLATE_COMPONENTS[templateName];
  if (OriginalComponent) {
    return <OriginalComponent data={data} totals={totals} />;
  }

  const extendedConfig = EXTENDED_BILL_CONFIGS[templateName];
  if (extendedConfig) {
    return <UniversalBillTemplate data={data} totals={totals} config={extendedConfig} />;
  }

  return <LorryReceipt data={data} totals={totals} />;
}
