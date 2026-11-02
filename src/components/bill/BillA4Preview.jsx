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

const ORIGINAL_TEMPLATE_ROW_TARGETS = {
  'Lorry Receipt': 21,
  'Consignment Note': 19,
  'Goods Receipt': 22,
  'Parcel Booking': 21,
  'Freight Bill': 9,
  'Bilty (Duplicate)': 17,
  'Bilty': 17,
  'Trip Challan': 10,
  'Modern Transport Bill': 13,
  'Station Receipt': 23,
  'Transport Memo': 19,
  'E-Way Bill': 20,
};

function getPaddedDataForTemplate(data, templateName) {
  const targetRows = ORIGINAL_TEMPLATE_ROW_TARGETS[templateName];
  if (!targetRows) return data;
  const userGoods = data.goods || [];
  if (userGoods.length >= targetRows) return data;

  const paddedGoods = [...userGoods];
  const emptyCount = targetRows - userGoods.length;
  for (let i = 0; i < emptyCount; i++) {
    paddedGoods.push({
      id: `pad-${i}`,
      itemName: '',
      description: '',
      quantity: '',
      packages: '',
      weight: '',
      unit: '',
      rate: '',
      freight: '',
      loading: '',
      unloading: '',
      insurance: '',
      otherCharges: '',
      gstPercent: '',
      remarks: '',
    });
  }
  return { ...data, goods: paddedGoods };
}

export function BillA4Preview({ data, totals }) {
  const templateName = data.settings?.template || 'Lorry Receipt';
  const OriginalComponent = BILL_TEMPLATE_COMPONENTS[templateName];
  if (OriginalComponent) {
    const paddedData = getPaddedDataForTemplate(data, templateName);
    return <OriginalComponent data={paddedData} totals={totals} />;
  }

  const extendedConfig = EXTENDED_BILL_CONFIGS[templateName];
  if (extendedConfig) {
    return <UniversalBillTemplate data={data} totals={totals} config={extendedConfig} />;
  }

  const paddedData = getPaddedDataForTemplate(data, 'Lorry Receipt');
  return <LorryReceipt data={paddedData} totals={totals} />;
}
