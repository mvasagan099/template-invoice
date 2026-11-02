# Lords & Kings — Invoice & Document Generator

A complete, production-grade recreation of [invoice.lordsandkingsagro.com](https://invoice.lordsandkingsagro.com), reverse-engineered and rebuilt with modern React, Vite, and full feature fidelity.

---

## 🚀 Features

### 1. 📄 Tax Invoice, Purchase Invoice & Purchase Order (`/`, `/purchase-invoice`, `/purchase-order`)
- **Issuer / Company Details**: Upload transparent company logo, company name, address, 15-character GSTIN, phone, and billing email.
- **Customer / Vendor Details**: Name, address, GSTIN, and email.
- **Document Metadata**: Configurable document titles, document numbers (custom or auto-generated), invoice date, and optional due date.
- **Itemized Table**:
  - Item description, HSN/SAC code, quantity, unit (pcs, kg, etc.), price/rate, discount percentage, and GST tax percentage (0%, 5%, 12%, 18%, 28%).
  - Real-time line item calculations: gross, discount amount, taxable amount, and tax amount.
  - Interactive row actions: `+ Add row`, `× Remove row`.
- **Tax Breakdown**:
  - Interactive switch toggle for **Inter-State Supply** (IGST) vs **Intra-State Supply** (CGST + SGST 50/50 split).
  - Subtotal, total discount, taxable value, CGST/SGST/IGST, round-off calculation, and grand total.
- **Indian Number-to-Words Converter**: Real-time conversion into Indian numbering system words (`Crore`, `Lakh`, `Thousand`, `Rupees ... and ... Paise Only`).
- **Payment & Bank Details**: Bank name, account name, account number, and IFSC code.
- **Signatures & Notes**:
  - Customer signature image upload & preview.
  - Authorised signatory signature image upload & preview.
  - Notes and Terms & Conditions.
- **50 Visual Design Templates**: Switch between 50 distinct A4 layout styles (Letterhead, Banner, Clean, Display, Gradient, Minimalist, Futura Split, Brutal Mono, Tech Grid, etc.).
- **High-Definition PDF Export**:
  - 3x canvas rasterization via `html2canvas` and A4 vector generation via `jsPDF`.
  - Embedded invisible text layer overlay for crisp, selectable, and searchable text in generated PDFs.

---

### 2. ⚡ Bulk Invoices — Sequential & Alternating (`/bulk-sequential`, `/bulk-purchase`, `/bulk-purchase-order`)
- **Excel (.xlsx, .xls) & CSV (.csv) Import**:
  - Drag-and-drop or file picker upload supporting up to 50 documents per batch.
  - Support for multi-item rows using pipe-delimited values (`Item 1|Item 2`, `10|20`, `100|200`).
  - Pre-flight data validation: detects missing required fields (`toCompany`, `itemNames`, `itemQuantities`, `itemPrices`).
- **Sequential & Alternating Numbering**:
  - Customizable invoice prefix (e.g. `INV`, `PUR`, `PO`).
  - Configurable starting index with padded sequence numbering.
  - Alternating numbering pattern option.
- **Interactive Batch Studio**:
  - Summary metrics: Total rows, Ready count, and Need Attention count.
  - Step-by-step document preview carousel.
  - Interactive data table to click and inspect any individual row.
  - Download single preview PDF or batch export all documents as separate named PDFs (`Customer_Date_InvoiceNo.pdf`).

---

### 3. 🎲 Bulk Invoices — Random (`/bulk-random`)
- Automated generation of randomized invoice numbers across all imported spreadsheet rows.
- **🔀 Reshuffle Numbers** button to instantly generate fresh document numbers for the entire batch.
- Batch PDF export and individual document previews.

---

### 4. 🚚 Transport Bill Studio (`/bill`)
- **1,061 Transport Bill Templates**: 11 original layouts plus 1,050 composed designs. Original layouts include:
  1. Lorry Receipt (LR)
  2. Consignment Note
  3. Goods Receipt
  4. Parcel Booking
  5. Freight Bill
  6. Bilty / Bilty (Duplicate)
  7. Trip Challan
  8. Modern Transport Bill
  9. Station Receipt
  10. Transport Memo
  11. E-Way Bill
- **One-Click Transporter Presets**:
  - Instant autofill for major Indian logistics providers:
    - *VRL Logistics Ltd.*
    - *TCI Freight*
    - *Safexpress Pvt. Ltd.*
    - *GATI Ltd.*
    - *Blue Dart Express Ltd.*
- **Comprehensive Fields**:
  - Transport details: LR No, Bill No, Booking Date, Delivery Date, Booking Time, Branch, GSTIN, Phone, Email, Website.
  - Consignor (Sender) & Consignee (Receiver) addresses and GSTIN.
  - Vehicle & driver details: Vehicle Number, Driver Name, Mobile, License.
  - Goods charges table: Item name, packaging, weight, unit, rate, auto-computed freight (`qty * rate`), loading, unloading, insurance, other charges, GST %.
  - Live Totals calculation.
  - Add, Duplicate, and Remove item rows.
- **Export & Persistence**:
  - 🖼 PNG export.
  - ↓ PDF export.
  - 🖨 Print layout.
  - LocalStorage draft persistence (`invoicepro_bill_draft`).

---

### 5. 🧮 Ledger & Smart Calculator (`/calculator`)
- Full-featured ledger and smart invoice calculation utility embedded directly within the studio.
- Live tax computations, line item balancing, theme toggling (light/dark mode), and Excel export.

---

## 🛠️ Project Structure

```
├── public/
│   ├── calculator.html       # Embedded ledger & smart calculator utility
│   ├── favicon.png           # Lords & Kings logo / favicon
│   └── favicon.ico
├── src/
│   ├── constants/
│   │   ├── templates.js      # 50 full invoice visual templates
│   │   └── billPresets.js    # Bill template catalog, presets & blank default state
│   ├── utils/
│   │   ├── currency.js       # Indian numbering number-to-words, rounding, GST math
│   │   ├── generators.js     # Sequential, random, alternating number generators
│   │   ├── excelImport.js    # PapaParse & SheetJS importer and row sanitizer
│   │   └── pdfExport.js      # html2canvas & jsPDF exporter with text overlay
│   ├── components/
│   │   ├── common/           # Button, Card, Field, Toast, UploadZone, EmptyState
│   │   ├── invoice/          # InvoiceForm, A4InvoiceSheet, TemplateGrid
│   │   ├── bulk/             # BulkSequential, BulkRandom
│   │   ├── bill/             # BillStudio, BillToolbar, BillForms, BillA4Preview
│   │   │   └── templates/    # 1,061 transport bill templates with distinct structural compositions
│   │   ├── calculator/       # Calculator iframe component
│   │   └── layout/           # AppNav, AppShell
│   ├── styles/
│   │   └── index.css         # Complete design system CSS
│   ├── App.jsx               # Application route definitions
│   └── main.jsx              # React root entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🏃 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```


### Bill template catalog

The Bill Studio includes 1,061 templates: 11 original layouts and 1,050 composed
layouts. The composed catalog combines 15 page compositions, 10 masthead
arrangements, and 7 goods formats. Templates 762–1061 add the Quantity Ledger
and Charge Slips formats; existing template names and IDs remain stable.

Search by template name or design (for example, `quantity ledger`, `charge slips`,
or `sidebar`), and use the arrow buttons to compare matching designs. Blank
fields stay blank in previews and exports. Booking time, payment mode and
instructions are optional inputs.

Run `npm run test:bills` to check all templates for blank/partial/filled/cleared
data, preservation of entered fields, decimal totals, GST, and unique DOM
structures after removing all text, colours and attributes.

Bill Print, PDF and PNG share one frozen A4 image with 6 mm safe margins.
The Print button opens an isolated image document so application wrappers cannot
create extra pages. PDF always contains one A4 page; PNG uses the same A4 frame.
The export checks also cover image placement, grid geometry, text spacing and
print-frame cleanup. Safari's optional browser headers and footers can be turned
off in the print dialog for a clean document.
