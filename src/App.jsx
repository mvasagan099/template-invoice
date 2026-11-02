import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell.jsx';
import { InvoiceForm } from './components/invoice/InvoiceForm.jsx';
import { BulkSequential } from './components/bulk/BulkSequential.jsx';
import { BulkRandom } from './components/bulk/BulkRandom.jsx';
import { Calculator } from './components/calculator/Calculator.jsx';
import { BillStudio } from './components/bill/BillStudio.jsx';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route
          path="/"
          element={<InvoiceForm documentTitle="Tax Invoice" />}
        />
        <Route
          path="/bulk-sequential"
          element={<BulkSequential />}
        />
        <Route
          path="/bulk-random"
          element={<BulkRandom />}
        />
        <Route
          path="/purchase-invoice"
          element={
            <InvoiceForm
              documentTitle="Purchase Invoice"
              fromCardTitle="Vendor details"
              fromCardDescription="The supplier who issued this invoice."
              toCardTitle="Your company details"
              toCardDescription="Shown as the receiving party."
              numberLabel="Purchase invoice number"
              billedToLabel="Billed from"
            />
          }
        />
        <Route
          path="/bulk-purchase"
          element={
            <BulkSequential
              pageTitle="Bulk Purchase"
              fromCardTitle="Supplier details"
              prefixDefault="PUR"
              numberingMode="alternating"
            />
          }
        />
        <Route
          path="/purchase-order"
          element={
            <InvoiceForm
              documentTitle="Purchase Order"
              fromCardTitle="Your company details"
              fromCardDescription="Shown as the document issuer."
              toCardTitle="Vendor details"
              toCardDescription="The supplier this order is sent to."
              numberLabel="PO number"
            />
          }
        />
        <Route
          path="/bulk-purchase-order"
          element={
            <BulkSequential
              pageTitle="Bulk Purchase Order"
              documentTitle="Purchase Order"
              fromCardTitle="Supplier details"
              prefixDefault="PO"
              numberingMode="alternating"
              billedToLabel="Billed from"
            />
          }
        />
        <Route
          path="/calculator"
          element={<Calculator />}
        />
        <Route
          path="/bill"
          element={<BillStudio />}
        />
      </Routes>
    </AppShell>
  );
}
