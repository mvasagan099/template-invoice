import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };


export function EWayBill({ data: e, totals: t }) {
  let {
      transportDetails: n,
      consignor: r,
      consignee: i,
      vehicle: a,
      goods: o,
    } = e,
    s = (e) => e || ``;
  return (0, y.jsxs)(`div`, {
    id: `bill-a4-preview`,
    style: {
      width: `100%`,
      minHeight: `100%`,
      background: `#fff`,
      fontFamily: `'Segoe UI', Arial, sans-serif`,
      color: `#1a1a2e`,
      fontSize: `10.5px`,
      border: `2px solid #1e40af`,
    },
    children: [
      (0, y.jsxs)(`div`, {
        style: {
          background: `#1e40af`,
          color: `#fff`,
          padding: `10px 16px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: { display: `flex`, alignItems: `center`, gap: `10px` },
            children: [
              e.settings?.logo &&
                (0, y.jsx)(`img`, {
                  src: e.settings.logo,
                  alt: `Logo`,
                  style: {
                    width: `40px`,
                    height: `40px`,
                    objectFit: `contain`,
                    borderRadius: `4px`,
                    border: `1px solid rgba(255,255,255,0.3)`,
                  },
                }),
              (0, y.jsxs)(`div`, {
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `16px`,
                      fontWeight: `800`,
                      letterSpacing: `1px`,
                    },
                    children: `E-WAY BILL`,
                  }),
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `9px`,
                      opacity: 0.8,
                      letterSpacing: `0.5px`,
                    },
                    children: `Goods and Services Tax Network`,
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { textAlign: `right`, fontSize: `10px` },
            children: [
              (0, y.jsx)(`div`, {
                style: { opacity: 0.8 },
                children: `Part A`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `700`, marginTop: `2px` },
                children: s(n.companyName) || `TRANSPORT COMPANY`,
              }),
              n.gst &&
                (0, y.jsxs)(`div`, {
                  style: { fontSize: `9px`, opacity: 0.8 },
                  children: [`GSTIN: `, n.gst],
                }),
            ],
          }),
        ],
      }),
      (0, y.jsx)(`div`, {
        style: {
          display: `flex`,
          borderBottom: `2px solid #1e40af`,
          background: `#eff6ff`,
        },
        children: [
          { label: `EWB No.`, value: s(n.lrNo) || `________` },
          { label: `Document No.`, value: s(n.billNo) || `________` },
          { label: `Document Date`, value: s(n.bookingDate) },
          { label: `Mode of Transport`, value: `Road` },
          { label: `Vehicle No.`, value: s(a.number) || `________` },
        ].map(({ label: e, value: t }) =>
          (0, y.jsxs)(
            `div`,
            {
              style: {
                flex: 1,
                padding: `6px 10px`,
                borderRight: `1px solid #bfdbfe`,
                textAlign: `center`,
              },
              children: [
                (0, y.jsx)(`div`, {
                  style: {
                    fontSize: `8px`,
                    fontWeight: `700`,
                    color: `#1e40af`,
                    letterSpacing: `0.5px`,
                    textTransform: `uppercase`,
                  },
                  children: e,
                }),
                (0, y.jsx)(`div`, {
                  style: {
                    fontWeight: `700`,
                    fontSize: `11px`,
                    marginTop: `2px`,
                  },
                  children: t,
                }),
              ],
            },
            e,
          ),
        ),
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderBottom: `2px solid #1e40af` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `10px 14px`,
              borderRight: `1px solid #bfdbfe`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  fontWeight: `800`,
                  color: `#1e40af`,
                  letterSpacing: `0.8px`,
                  textTransform: `uppercase`,
                  marginBottom: `6px`,
                  paddingBottom: `4px`,
                  borderBottom: `1px solid #bfdbfe`,
                },
                children: `Details of Supplier (Taxpayer)`,
              }),
              (0, y.jsxs)(`div`, {
                style: { marginBottom: `4px` },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { color: `#6b7280`, fontSize: `9px` },
                    children: `Name: `,
                  }),
                  (0, y.jsx)(`strong`, { children: s(r.name) }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { marginBottom: `4px` },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { color: `#6b7280`, fontSize: `9px` },
                    children: `GSTIN: `,
                  }),
                  (0, y.jsx)(`strong`, { children: s(r.gst) }),
                ],
              }),
              (0, y.jsx)(`div`, { children: s(r.address) }),
              (0, y.jsxs)(`div`, {
                children: [s(r.city), ` `, s(r.state), ` - `, s(r.pincode)],
              }),
              r.mobile &&
                (0, y.jsxs)(`div`, {
                  style: { marginTop: `2px` },
                  children: [
                    `Ph: `,
                    (0, y.jsx)(`strong`, { children: s(r.mobile) }),
                  ],
                }),
              (0, y.jsxs)(`div`, {
                style: { marginTop: `4px`, display: `flex`, gap: `16px` },
                children: [
                  (0, y.jsxs)(`span`, {
                    style: { fontSize: `9px` },
                    children: [
                      (0, y.jsx)(`strong`, {
                        style: { color: `#1e40af` },
                        children: `Place of Supply:`,
                      }),
                      ` `,
                      s(r.state),
                    ],
                  }),
                  (0, y.jsxs)(`span`, {
                    style: { fontSize: `9px` },
                    children: [
                      (0, y.jsx)(`strong`, {
                        style: { color: `#1e40af` },
                        children: `State Code:`,
                      }),
                      ` 27`,
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, padding: `10px 14px` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  fontWeight: `800`,
                  color: `#1e40af`,
                  letterSpacing: `0.8px`,
                  textTransform: `uppercase`,
                  marginBottom: `6px`,
                  paddingBottom: `4px`,
                  borderBottom: `1px solid #bfdbfe`,
                },
                children: `Details of Recipient (Taxpayer)`,
              }),
              (0, y.jsxs)(`div`, {
                style: { marginBottom: `4px` },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { color: `#6b7280`, fontSize: `9px` },
                    children: `Name: `,
                  }),
                  (0, y.jsx)(`strong`, { children: s(i.name) }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { marginBottom: `4px` },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { color: `#6b7280`, fontSize: `9px` },
                    children: `GSTIN: `,
                  }),
                  (0, y.jsx)(`strong`, { children: s(i.gst) }),
                ],
              }),
              (0, y.jsx)(`div`, { children: s(i.address) }),
              (0, y.jsxs)(`div`, {
                children: [s(i.city), ` `, s(i.state), ` - `, s(i.pincode)],
              }),
              i.mobile &&
                (0, y.jsxs)(`div`, {
                  style: { marginTop: `2px` },
                  children: [
                    `Ph: `,
                    (0, y.jsx)(`strong`, { children: s(i.mobile) }),
                  ],
                }),
              (0, y.jsxs)(`div`, {
                style: { marginTop: `4px`, display: `flex`, gap: `16px` },
                children: [
                  (0, y.jsxs)(`span`, {
                    style: { fontSize: `9px` },
                    children: [
                      (0, y.jsx)(`strong`, {
                        style: { color: `#1e40af` },
                        children: `Place of Delivery:`,
                      }),
                      ` `,
                      s(i.state),
                    ],
                  }),
                  (0, y.jsxs)(`span`, {
                    style: { fontSize: `9px` },
                    children: [
                      (0, y.jsx)(`strong`, {
                        style: { color: `#1e40af` },
                        children: `State Code:`,
                      }),
                      ` 27`,
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsx)(`div`, {
        style: {
          background: `#1e40af`,
          color: `#fff`,
          padding: `4px 14px`,
          fontSize: `9px`,
          fontWeight: `700`,
          letterSpacing: `1px`,
        },
        children: `PART B — VEHICLE DETAILS`,
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          borderBottom: `2px solid #1e40af`,
          background: `#eff6ff`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `6px 14px`,
              borderRight: `1px solid #bfdbfe`,
            },
            children: [
              (0, y.jsx)(`span`, {
                style: { color: `#1e40af`, fontWeight: `700`, fontSize: `9px` },
                children: `Vehicle Number: `,
              }),
              (0, y.jsx)(`strong`, { children: s(a.number) || `________` }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `6px 14px`,
              borderRight: `1px solid #bfdbfe`,
            },
            children: [
              (0, y.jsx)(`span`, {
                style: { color: `#1e40af`, fontWeight: `700`, fontSize: `9px` },
                children: `From: `,
              }),
              (0, y.jsx)(`strong`, { children: s(r.city) || `________` }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `6px 14px`,
              borderRight: `1px solid #bfdbfe`,
            },
            children: [
              (0, y.jsx)(`span`, {
                style: { color: `#1e40af`, fontWeight: `700`, fontSize: `9px` },
                children: `To: `,
              }),
              (0, y.jsx)(`strong`, { children: s(i.city) || `________` }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { padding: `6px 14px` },
            children: [
              (0, y.jsx)(`span`, {
                style: { color: `#1e40af`, fontWeight: `700`, fontSize: `9px` },
                children: `Delivery Date: `,
              }),
              (0, y.jsx)(`strong`, {
                children: s(n.deliveryDate) || `________`,
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`table`, {
        style: { width: `100%`, borderCollapse: `collapse` },
        children: [
          (0, y.jsx)(`thead`, {
            children: (0, y.jsx)(`tr`, {
              children: [
                `No.`,
                `Description of Goods`,
                `HSN Code`,
                `Qty`,
                `Unit`,
                `Taxable Value (₹)`,
                `Tax Rate`,
                `Tax Amount (₹)`,
              ].map((e) =>
                (0, y.jsx)(
                  `th`,
                  {
                    style: {
                      background: `#1e40af`,
                      color: `#fff`,
                      padding: `6px 8px`,
                      textAlign:
                        e === `Description of Goods` ? `left` : `center`,
                      fontSize: `8.5px`,
                      fontWeight: `700`,
                      letterSpacing: `0.3px`,
                      border: `1px solid #1e3a8a`,
                    },
                    children: e,
                  },
                  e,
                ),
              ),
            }),
          }),
          (0, y.jsxs)(`tbody`, {
            children: [
              o.map((e, t) => {
                let n =
                    (Number(e.freight) || 0) +
                    (Number(e.loading) || 0) +
                    (Number(e.unloading) || 0) +
                    (Number(e.insurance) || 0) +
                    (Number(e.otherCharges) || 0),
                  r = Number(e.gstPercent) || 0,
                  i = (r / 100) * n;
                return (0, y.jsxs)(
                  `tr`,
                  {
                    style: { background: t % 2 == 0 ? `#fff` : `#f0f7ff` },
                    children: [
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #bfdbfe`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                          color: `#6b7280`,
                        },
                        children: t + 1,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #bfdbfe`,
                          padding: `5px 8px`,
                          fontWeight: `600`,
                        },
                        children: s(e.itemName),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #bfdbfe`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                          fontFamily: `monospace`,
                          fontSize: `10px`,
                        },
                        children: (e.gstPercent, `9965`),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #bfdbfe`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                        },
                        children: s(e.packages),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #bfdbfe`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                          color: `#6b7280`,
                        },
                        children: s(e.unit) || `NOS`,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #bfdbfe`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                          fontFamily: `monospace`,
                          fontWeight: `600`,
                        },
                        children: n ? n.toFixed(2) : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #bfdbfe`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                        },
                        children: r ? `${r}%` : `—`,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #bfdbfe`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                          fontFamily: `monospace`,
                          fontWeight: `600`,
                        },
                        children: i ? i.toFixed(2) : ``,
                      }),
                    ],
                  },
                  e.id || t,
                );
              }),
              o.length < 3 &&
                Array.from({ length: 3 - o.length }).map((e, t) =>
                  (0, y.jsx)(
                    `tr`,
                    {
                      style: { height: `26px` },
                      children: Array(8)
                        .fill(null)
                        .map((e, t) =>
                          (0, y.jsx)(
                            `td`,
                            { style: { border: `1px solid #bfdbfe` } },
                            t,
                          ),
                        ),
                    },
                    `f${t}`,
                  ),
                ),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderTop: `2px solid #1e40af` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `8px 14px`,
              borderRight: `1px solid #bfdbfe`,
              fontSize: `9px`,
              color: `#6b7280`,
            },
            children: [
              (0, y.jsx)(`strong`, {
                style: { color: `#1a1a2e` },
                children: `Total Value of Goods:`,
              }),
              ` `,
              t.subtotal ? `₹ ${t.subtotal.toFixed(2)}` : `₹ 0.00`,
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              padding: `8px 14px`,
              borderRight: `1px solid #bfdbfe`,
              fontSize: `9px`,
              color: `#6b7280`,
            },
            children: [
              (0, y.jsx)(`strong`, {
                style: { color: `#1a1a2e` },
                children: `CGST:`,
              }),
              ` `,
              t.gstAmount ? `₹ ${(t.gstAmount / 2).toFixed(2)}` : `₹ 0.00`,
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              padding: `8px 14px`,
              borderRight: `1px solid #bfdbfe`,
              fontSize: `9px`,
              color: `#6b7280`,
            },
            children: [
              (0, y.jsx)(`strong`, {
                style: { color: `#1a1a2e` },
                children: `SGST:`,
              }),
              ` `,
              t.gstAmount ? `₹ ${(t.gstAmount / 2).toFixed(2)}` : `₹ 0.00`,
            ],
          }),
          (0, y.jsx)(`div`, {
            style: {
              padding: `8px 14px`,
              background: `#1e40af`,
              color: `#fff`,
              textAlign: `right`,
              minWidth: `200px`,
            },
            children: (0, y.jsxs)(`span`, {
              style: {
                fontWeight: `800`,
                fontSize: `12px`,
                letterSpacing: `0.5px`,
              },
              children: [
                `TOTAL VALUE: `,
                t.grandTotal ? `₹ ${t.grandTotal.toFixed(2)}` : `₹ 0.00`,
              ],
            }),
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { borderTop: `2px solid #1e40af`, display: `flex` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `8px 14px`,
              borderRight: `1px solid #bfdbfe`,
              fontSize: `8.5px`,
              color: `#6b7280`,
              lineHeight: `1.5`,
            },
            children: [
              (0, y.jsx)(`strong`, {
                style: { color: `#1e40af` },
                children: `Declaration:`,
              }),
              ` I hereby declare that all the information given above is true and correct to the best of my knowledge and belief.`,
              (0, y.jsxs)(`div`, {
                style: { marginTop: `4px` },
                children: [
                  `Subject to `,
                  s(n.city) || `________`,
                  ` Jurisdiction. E&OE.`,
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              display: `flex`,
              gap: `20px`,
              padding: `10px 14px`,
              alignItems: `flex-end`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                style: { textAlign: `center`, minWidth: `90px` },
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      height: `28px`,
                      borderBottom: `1px solid #1e40af`,
                    },
                  }),
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `8px`,
                      fontWeight: `700`,
                      color: `#1e40af`,
                      marginTop: `3px`,
                    },
                    children: `Supplier`,
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { textAlign: `center`, minWidth: `90px` },
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      height: `28px`,
                      borderBottom: `1px solid #1e40af`,
                    },
                  }),
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `8px`,
                      fontWeight: `700`,
                      color: `#1e40af`,
                      marginTop: `3px`,
                    },
                    children: `Recipient`,
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { textAlign: `center`, minWidth: `90px` },
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      height: `28px`,
                      borderBottom: `1px solid #1e40af`,
                    },
                  }),
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `8px`,
                      fontWeight: `700`,
                      color: `#1e40af`,
                      marginTop: `3px`,
                    },
                    children: `Transporter`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsx)(`div`, { style: { height: `4px`, background: `#1e40af` } }),
    ],
  });
}
