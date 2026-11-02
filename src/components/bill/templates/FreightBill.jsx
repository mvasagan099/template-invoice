import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };


export function FreightBill({ data: e, totals: t }) {
  let {
      transportDetails: n,
      consignor: r,
      consignee: i,
      vehicle: a,
      goods: o,
    } = e,
    s = t.gstAmount / 2,
    c = t.gstAmount / 2;
  return (0, y.jsxs)(`div`, {
    className: `bill-a4`,
    id: `bill-a4-preview`,
    style: {
      fontFamily: `'Courier New', Courier, monospace`,
      color: `#000`,
      fontSize: `11px`,
      padding: `32px 40px`,
    },
    children: [
      (0, y.jsxs)(`div`, {
        style: {
          textAlign: `center`,
          borderBottom: `3px double #000`,
          paddingBottom: `12px`,
          marginBottom: `12px`,
        },
        children: [
          (0, y.jsx)(`h1`, {
            style: {
              fontSize: `20px`,
              fontWeight: `900`,
              margin: `0 0 4px`,
              letterSpacing: `2px`,
              textTransform: `uppercase`,
            },
            children: n.companyName,
          }),
          (0, y.jsxs)(`div`, {
            style: { fontSize: `11px`, marginBottom: `4px` },
            children: [
              n.branch,
              n.city ? ` — ${n.city}` : ``,
              n.state ? `, ${n.state}` : ``,
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { fontSize: `10px` },
            children: [
              n.phone && `Tel: ${n.phone}`,
              n.email && ` | Email: ${n.email}`,
              n.website && ` | ${n.website}`,
            ],
          }),
          n.gst &&
            (0, y.jsxs)(`div`, {
              style: { fontSize: `10px`, fontWeight: `700`, marginTop: `4px` },
              children: [`GSTIN: `, n.gst],
            }),
          (0, y.jsx)(`div`, {
            style: {
              marginTop: `8px`,
              fontSize: `14px`,
              fontWeight: `900`,
              letterSpacing: `3px`,
              border: `2px solid #000`,
              display: `inline-block`,
              padding: `2px 16px`,
            },
            children: `FREIGHT BILL / CONSIGNMENT NOTE`,
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          justifyContent: `space-between`,
          marginBottom: `10px`,
          padding: `6px 0`,
          borderBottom: `1px solid #000`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            children: [
              (0, y.jsx)(`span`, {
                style: { fontWeight: `700` },
                children: `LR No.:`,
              }),
              ` `,
              n.lrNo,
            ],
          }),
          (0, y.jsxs)(`div`, {
            children: [
              (0, y.jsx)(`span`, {
                style: { fontWeight: `700` },
                children: `Bill No.:`,
              }),
              ` `,
              n.billNo,
            ],
          }),
          (0, y.jsxs)(`div`, {
            children: [
              (0, y.jsx)(`span`, {
                style: { fontWeight: `700` },
                children: `Date:`,
              }),
              ` `,
              n.bookingDate,
            ],
          }),
          (0, y.jsxs)(`div`, {
            children: [
              (0, y.jsx)(`span`, {
                style: { fontWeight: `700` },
                children: `Delivery Date:`,
              }),
              ` `,
              n.deliveryDate,
            ],
          }),
        ],
      }),
      (0, y.jsx)(`table`, {
        style: {
          width: `100%`,
          borderCollapse: `collapse`,
          border: `1px solid #000`,
          marginBottom: `10px`,
        },
        children: (0, y.jsxs)(`tbody`, {
          children: [
            (0, y.jsxs)(`tr`, {
              children: [
                (0, y.jsxs)(`td`, {
                  style: {
                    border: `1px solid #000`,
                    padding: `6px 8px`,
                    width: `50%`,
                    verticalAlign: `top`,
                  },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontWeight: `700`,
                        borderBottom: `1px solid #000`,
                        marginBottom: `4px`,
                        paddingBottom: `2px`,
                      },
                      children: `CONSIGNOR (Sender):`,
                    }),
                    (0, y.jsx)(`div`, {
                      style: { fontWeight: `700`, fontSize: `12px` },
                      children: r.name,
                    }),
                    (0, y.jsx)(`div`, {
                      children: r.address,
                    }),
                    (0, y.jsxs)(`div`, {
                      children: [
                        r.city,
                        r.state ? `, ${r.state}` : ``,
                        ` — `,
                        r.pincode,
                      ],
                    }),
                    (0, y.jsxs)(`div`, {
                      children: [
                        `Ph: `,
                        r.mobile,
                      ],
                    }),
                    (0, y.jsxs)(`div`, {
                      style: { marginTop: `4px` },
                      children: [
                        `GSTIN: `,
                        r.gst,
                      ],
                    }),
                  ],
                }),
                (0, y.jsxs)(`td`, {
                  style: {
                    border: `1px solid #000`,
                    padding: `6px 8px`,
                    width: `50%`,
                    verticalAlign: `top`,
                  },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontWeight: `700`,
                        borderBottom: `1px solid #000`,
                        marginBottom: `4px`,
                        paddingBottom: `2px`,
                      },
                      children: `CONSIGNEE (Receiver):`,
                    }),
                    (0, y.jsx)(`div`, {
                      style: { fontWeight: `700`, fontSize: `12px` },
                      children: i.name,
                    }),
                    (0, y.jsx)(`div`, {
                      children: i.address,
                    }),
                    (0, y.jsxs)(`div`, {
                      children: [
                        i.city,
                        i.state ? `, ${i.state}` : ``,
                        ` — `,
                        i.pincode,
                      ],
                    }),
                    (0, y.jsxs)(`div`, {
                      children: [
                        `Ph: `,
                        i.mobile,
                      ],
                    }),
                    (0, y.jsxs)(`div`, {
                      style: { marginTop: `4px` },
                      children: [
                        `GSTIN: `,
                        i.gst,
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, y.jsx)(`tr`, {
              children: (0, y.jsxs)(`td`, {
                colSpan: `2`,
                style: { border: `1px solid #000`, padding: `5px 8px` },
                children: [
                  (0, y.jsx)(`strong`, { children: `Vehicle No.:` }),
                  ` `,
                  a.number,
                  `  \xA0\xA0`,
                  (0, y.jsx)(`strong`, { children: `Driver:` }),
                  ` `,
                  a.driverName,
                  `  \xA0\xA0`,
                  (0, y.jsx)(`strong`, { children: `Driver Lic.:` }),
                  ` `,
                  a.driverLicense,
                  `  \xA0\xA0`,
                  (0, y.jsx)(`strong`, { children: `Driver Ph.:` }),
                  ` `,
                  a.driverMobile,
                ],
              }),
            }),
          ],
        }),
      }),
      (0, y.jsxs)(`table`, {
        style: {
          width: `100%`,
          borderCollapse: `collapse`,
          border: `1px solid #000`,
          marginBottom: `8px`,
          fontSize: `10px`,
        },
        children: [
          (0, y.jsx)(`thead`, {
            children: (0, y.jsxs)(`tr`, {
              style: { background: `#1a1a1a`, color: `white` },
              children: [
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #555`,
                    padding: `5px 6px`,
                    textAlign: `center`,
                  },
                  children: `Sr.`,
                }),
                (0, y.jsx)(`th`, {
                  style: { border: `1px solid #555`, padding: `5px 6px` },
                  children: `Description of Goods`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #555`,
                    padding: `5px 6px`,
                    textAlign: `center`,
                  },
                  children: `Pkgs`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #555`,
                    padding: `5px 6px`,
                    textAlign: `center`,
                  },
                  children: `Wt (Kg)`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #555`,
                    padding: `5px 6px`,
                    textAlign: `right`,
                  },
                  children: `Rate`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #555`,
                    padding: `5px 6px`,
                    textAlign: `right`,
                  },
                  children: `Freight (₹)`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #555`,
                    padding: `5px 6px`,
                    textAlign: `right`,
                  },
                  children: `Ld./Uld.`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #555`,
                    padding: `5px 6px`,
                    textAlign: `right`,
                  },
                  children: `Others`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #555`,
                    padding: `5px 6px`,
                    textAlign: `center`,
                  },
                  children: `GST%`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #555`,
                    padding: `5px 6px`,
                    textAlign: `right`,
                  },
                  children: `Amount (₹)`,
                }),
              ],
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
                  r = n + n * ((Number(e.gstPercent) || 0) / 100);
                return (0, y.jsxs)(
                  `tr`,
                  {
                    children: [
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `5px 6px`,
                          textAlign: `center`,
                        },
                        children: t + 1,
                      }),
                      (0, y.jsxs)(`td`, {
                        style: { border: `1px solid #ccc`, padding: `5px 6px` },
                        children: [
                          (0, y.jsx)(`div`, {
                            style: { fontWeight: `600` },
                            children: e.itemName || ``,
                          }),
                          e.description &&
                            (0, y.jsx)(`div`, {
                              style: { fontSize: `9px`, color: `#666` },
                              children: e.description,
                            }),
                        ],
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `5px 6px`,
                          textAlign: `center`,
                        },
                        children: e.packages || ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `5px 6px`,
                          textAlign: `center`,
                        },
                        children: e.weight || ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `5px 6px`,
                          textAlign: `right`,
                        },
                        children:
                          e.rate === `` ? `` : Number(e.rate).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `5px 6px`,
                          textAlign: `right`,
                        },
                        children:
                          e.freight === `` ? `` : Number(e.freight).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `5px 6px`,
                          textAlign: `right`,
                        },
                        children:
                          Number(e.loading) || Number(e.unloading)
                            ? (Number(e.loading) + Number(e.unloading)).toFixed(
                                2,
                              )
                            : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `5px 6px`,
                          textAlign: `right`,
                        },
                        children:
                          Number(e.insurance) || Number(e.otherCharges)
                            ? (
                                Number(e.insurance) + Number(e.otherCharges)
                              ).toFixed(2)
                            : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `5px 6px`,
                          textAlign: `center`,
                        },
                        children: e.gstPercent === `` ? `` : `${e.gstPercent}%`,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `5px 6px`,
                          textAlign: `right`,
                          fontWeight: `700`,
                        },
                        children: r ? r.toFixed(2) : ``,
                      }),
                    ],
                  },
                  e.id || t,
                );
              }),
              o.length < 4 &&
                Array.from({ length: 4 - o.length }).map((e, t) =>
                  (0, y.jsx)(
                    `tr`,
                    {
                      style: { height: `24px` },
                      children: Array(10)
                        .fill(null)
                        .map((e, t) =>
                          (0, y.jsx)(
                            `td`,
                            {
                              style: { border: `1px solid #ccc` },
                              children: `\xA0`,
                            },
                            t,
                          ),
                        ),
                    },
                    `empty-${t}`,
                  ),
                ),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, gap: `12px`, marginBottom: `10px` },
        children: [
          (0, y.jsxs)(`table`, {
            style: {
              flex: `1.5`,
              borderCollapse: `collapse`,
              border: `1px solid #000`,
              fontSize: `10px`,
            },
            children: [
              (0, y.jsxs)(`thead`, {
                children: [
                  (0, y.jsx)(`tr`, {
                    style: { background: `#1a1a1a`, color: `white` },
                    children: (0, y.jsx)(`th`, {
                      colSpan: `4`,
                      style: {
                        padding: `4px 8px`,
                        textAlign: `center`,
                        border: `1px solid #555`,
                      },
                      children: `GST Breakdown`,
                    }),
                  }),
                  (0, y.jsxs)(`tr`, {
                    children: [
                      (0, y.jsx)(`th`, {
                        style: { border: `1px solid #000`, padding: `4px 6px` },
                        children: `Taxable Amt`,
                      }),
                      (0, y.jsx)(`th`, {
                        style: { border: `1px solid #000`, padding: `4px 6px` },
                        children: `CGST`,
                      }),
                      (0, y.jsx)(`th`, {
                        style: { border: `1px solid #000`, padding: `4px 6px` },
                        children: `SGST`,
                      }),
                      (0, y.jsx)(`th`, {
                        style: { border: `1px solid #000`, padding: `4px 6px` },
                        children: `Total GST`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, y.jsx)(`tbody`, {
                children: (0, y.jsxs)(`tr`, {
                  children: [
                    (0, y.jsx)(`td`, {
                      style: {
                        border: `1px solid #ccc`,
                        padding: `5px 6px`,
                        textAlign: `right`,
                      },
                      children: t.subtotal ? t.subtotal.toFixed(2) : ``,
                    }),
                    (0, y.jsx)(`td`, {
                      style: {
                        border: `1px solid #ccc`,
                        padding: `5px 6px`,
                        textAlign: `right`,
                      },
                      children: s ? s.toFixed(2) : ``,
                    }),
                    (0, y.jsx)(`td`, {
                      style: {
                        border: `1px solid #ccc`,
                        padding: `5px 6px`,
                        textAlign: `right`,
                      },
                      children: c ? c.toFixed(2) : ``,
                    }),
                    (0, y.jsx)(`td`, {
                      style: {
                        border: `1px solid #ccc`,
                        padding: `5px 6px`,
                        textAlign: `right`,
                        fontWeight: `700`,
                      },
                      children: t.gstAmount ? t.gstAmount.toFixed(2) : ``,
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, y.jsx)(`table`, {
            style: {
              flex: `1`,
              borderCollapse: `collapse`,
              border: `1px solid #000`,
              fontSize: `10px`,
            },
            children: (0, y.jsxs)(`tbody`, {
              children: [
                [
                  [`Basic Freight`, t.freight],
                  [`Loading/Unloading`, t.loading + t.unloading],
                  [`Insurance`, t.insurance],
                  [`Other Charges`, t.otherCharges],
                  [`Sub Total`, t.subtotal],
                  [`GST Amount`, t.gstAmount],
                ].map(([e, t]) =>
                  (0, y.jsxs)(
                    `tr`,
                    {
                      children: [
                        (0, y.jsx)(`td`, {
                          style: {
                            border: `1px solid #ccc`,
                            padding: `4px 6px`,
                            width: `60%`,
                          },
                          children: e,
                        }),
                        (0, y.jsx)(`td`, {
                          style: {
                            border: `1px solid #ccc`,
                            padding: `4px 6px`,
                            textAlign: `right`,
                            fontWeight: e === `Sub Total` ? `700` : `normal`,
                            width: `40%`,
                          },
                          children: t ? t.toFixed(2) : ``,
                        }),
                      ],
                    },
                    e,
                  ),
                ),
                (0, y.jsxs)(`tr`, {
                  style: { background: `#1a1a1a`, color: `white` },
                  children: [
                    (0, y.jsx)(`td`, {
                      style: {
                        border: `1px solid #555`,
                        padding: `5px 6px`,
                        fontWeight: `900`,
                        width: `60%`,
                      },
                      children: `GRAND TOTAL`,
                    }),
                    (0, y.jsx)(`td`, {
                      style: {
                        border: `1px solid #555`,
                        padding: `5px 6px`,
                        textAlign: `right`,
                        fontWeight: `900`,
                        width: `40%`,
                      },
                      children: t.grandTotal
                        ? `₹ ${t.grandTotal.toFixed(2)}`
                        : ``,
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          border: `1px solid #000`,
          padding: `5px 8px`,
          marginBottom: `10px`,
          fontSize: `10px`,
        },
        children: [
          (0, y.jsx)(`strong`, { children: `Amount in Words:` }),
          ` `,
          ((e) =>
            e
              ? `Rupees ${Math.floor(e)} and ${Math.round((e % 1) * 100)}/100 Only`
              : ``)(t.grandTotal),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          border: `1px solid #000`,
          padding: `6px 8px`,
          marginBottom: `16px`,
          fontSize: `9px`,
        },
        children: [
          (0, y.jsx)(`strong`, { children: `Terms & Conditions:` }),
          `\xA0 1. Goods transported at owner's risk. \xA0 2. Claims for damage/shortage must be lodged within 24 hrs of delivery. \xA0 3. Company not liable for consequential loss. \xA0 4. Subject to jurisdiction of booking station. \xA0 5. E&OE.`,
        ],
      }),
      (0, y.jsx)(`div`, {
        style: {
          display: `flex`,
          justifyContent: `space-between`,
          paddingTop: `8px`,
          borderTop: `2px solid #000`,
        },
        children: [
          { label: `Consignor Signature`, sub: `${r.name || ``}` },
          { label: `Booking Clerk`, sub: `` },
          { label: `Driver`, sub: `${a.driverName || ``}` },
          {
            label: `For ${n.companyName}`,
            sub: `Authorised Signatory`,
          },
        ].map(({ label: e, sub: t }) =>
          (0, y.jsxs)(
            `div`,
            {
              style: { textAlign: `center`, width: `150px` },
              children: [
                (0, y.jsx)(`div`, {
                  style: {
                    height: `50px`,
                    borderBottom: `1px solid #000`,
                    marginBottom: `4px`,
                  },
                }),
                (0, y.jsx)(`div`, {
                  style: { fontWeight: `700`, fontSize: `10px` },
                  children: e,
                }),
                t &&
                  (0, y.jsx)(`div`, {
                    style: { fontSize: `9px`, color: `#666` },
                    children: t,
                  }),
              ],
            },
            e,
          ),
        ),
      }),
    ],
  });
}
