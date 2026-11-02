import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };


export function TransportMemo({ data: e, totals: t }) {
  let {
      transportDetails: n,
      consignor: r,
      consignee: i,
      vehicle: a,
      goods: o,
    } = e,
    s = (e) => e || ``,
    c = (e, t = `120px`) =>
      (0, y.jsx)(`span`, {
        style: {
          borderBottom: `1px solid #334155`,
          display: `inline-block`,
          minWidth: t,
          paddingLeft: `4px`,
          verticalAlign: `bottom`,
          fontWeight: `700`,
        },
        children: s(e),
      }),
    l = (t.loading || 0) + (t.unloading || 0);
  return (0, y.jsxs)(`div`, {
    id: `bill-a4-preview`,
    style: {
      width: `100%`,
      minHeight: `100%`,
      background: `#fff`,
      fontFamily: `'Segoe UI', Arial, sans-serif`,
      color: `#1e293b`,
      fontSize: `11px`,
      border: `3px solid #c2410c`,
    },
    children: [
      (0, y.jsx)(`div`, {
        style: {
          height: `8px`,
          background: `linear-gradient(90deg, #ea580c, #c2410c, #ea580c)`,
        },
      }),
      (0, y.jsxs)(`div`, {
        style: {
          borderBottom: `2px solid #c2410c`,
          display: `flex`,
          alignItems: `center`,
        },
        children: [
          e.settings?.logo &&
            (0, y.jsx)(`div`, {
              style: {
                width: `70px`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                padding: `8px`,
                borderRight: `1px solid #fed7aa`,
              },
              children: (0, y.jsx)(`img`, {
                src: e.settings.logo,
                alt: `Logo`,
                style: {
                  maxWidth: `54px`,
                  maxHeight: `54px`,
                  objectFit: `contain`,
                },
              }),
            }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, textAlign: `center`, padding: `10px 8px` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `24px`,
                  fontWeight: `900`,
                  color: `#c2410c`,
                  letterSpacing: `1px`,
                  textTransform: `uppercase`,
                  lineHeight: `1`,
                },
                children: s(n.companyName) || `TRANSPORT COMPANY`,
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  fontSize: `9.5px`,
                  color: `#64748b`,
                  marginTop: `3px`,
                },
                children: [
                  s(n.branch),
                  n.city ? ` — ${n.city}` : ``,
                  ` `,
                  n.state ? `, ${n.state}` : ``,
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `9px`, marginTop: `2px` },
                children: [
                  n.phone && `Ph: ${n.phone}`,
                  ` `,
                  n.email && ` | ${n.email}`,
                ],
              }),
              n.gst &&
                (0, y.jsxs)(`div`, {
                  style: {
                    fontSize: `9.5px`,
                    fontWeight: `700`,
                    color: `#c2410c`,
                    marginTop: `2px`,
                  },
                  children: [`GSTIN: `, n.gst],
                }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `170px`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              justifyContent: `center`,
              borderLeft: `1px solid #fed7aa`,
              padding: `8px`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  background: `#c2410c`,
                  color: `#fff`,
                  fontWeight: `900`,
                  fontSize: `11px`,
                  letterSpacing: `1px`,
                  padding: `3px 14px`,
                },
                children: `TRANSPORT MEMO`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8.5px`,
                  color: `#64748b`,
                  marginTop: `4px`,
                  letterSpacing: `0.5px`,
                },
                children: `G. R. No.`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `18px`,
                  fontWeight: `900`,
                  color: `#1e293b`,
                  lineHeight: `1`,
                },
                children: s(n.lrNo) || `________`,
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          borderBottom: `2px solid #c2410c`,
          background: `#fff7ed`,
          alignItems: `center`,
          padding: `6px 14px`,
          gap: `10px`,
        },
        children: [
          (0, y.jsx)(`span`, {
            style: {
              fontWeight: `900`,
              color: `#c2410c`,
              fontSize: `10px`,
              letterSpacing: `1px`,
            },
            children: `FROM:`,
          }),
          c(r.city, `130px`),
          (0, y.jsx)(`span`, {
            style: { color: `#c2410c`, fontSize: `20px`, fontWeight: `900` },
            children: `→`,
          }),
          (0, y.jsx)(`span`, {
            style: {
              fontWeight: `900`,
              color: `#c2410c`,
              fontSize: `10px`,
              letterSpacing: `1px`,
            },
            children: `TO:`,
          }),
          c(i.city, `130px`),
          (0, y.jsxs)(`span`, {
            style: {
              marginLeft: `auto`,
              display: `flex`,
              gap: `16px`,
              fontSize: `10px`,
            },
            children: [
              (0, y.jsxs)(`span`, {
                children: [
                  (0, y.jsx)(`strong`, {
                    style: { color: `#c2410c` },
                    children: `VEHICLE:`,
                  }),
                  ` `,
                  c(a.number, `90px`),
                ],
              }),
              (0, y.jsxs)(`span`, {
                children: [
                  (0, y.jsx)(`strong`, {
                    style: { color: `#c2410c` },
                    children: `DATE:`,
                  }),
                  ` `,
                  (0, y.jsx)(`strong`, { children: s(n.bookingDate) }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderBottom: `2px solid #c2410c` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `8px 14px`,
              borderRight: `1px solid #fed7aa`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8.5px`,
                  fontWeight: `700`,
                  color: `#c2410c`,
                  letterSpacing: `1px`,
                  textTransform: `uppercase`,
                  marginBottom: `4px`,
                },
                children: `Consignor (Sender)`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `800`, fontSize: `12px` },
                children: s(r.name),
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, color: `#475569` },
                children: s(r.address),
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, color: `#475569` },
                children: [s(r.city), ` `, s(r.state), ` - `, s(r.pincode)],
              }),
              r.mobile &&
                (0, y.jsxs)(`div`, {
                  style: { fontSize: `9.5px` },
                  children: [
                    `Ph: `,
                    (0, y.jsx)(`strong`, { children: s(r.mobile) }),
                  ],
                }),
              r.gst &&
                (0, y.jsxs)(`div`, {
                  style: {
                    fontSize: `9px`,
                    fontWeight: `700`,
                    marginTop: `2px`,
                  },
                  children: [`GSTIN: `, s(r.gst)],
                }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, padding: `8px 14px` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8.5px`,
                  fontWeight: `700`,
                  color: `#c2410c`,
                  letterSpacing: `1px`,
                  textTransform: `uppercase`,
                  marginBottom: `4px`,
                },
                children: `Consignee (Receiver)`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `800`, fontSize: `12px` },
                children: s(i.name),
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, color: `#475569` },
                children: s(i.address),
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, color: `#475569` },
                children: [s(i.city), ` `, s(i.state), ` - `, s(i.pincode)],
              }),
              i.mobile &&
                (0, y.jsxs)(`div`, {
                  style: { fontSize: `9.5px` },
                  children: [
                    `Ph: `,
                    (0, y.jsx)(`strong`, { children: s(i.mobile) }),
                  ],
                }),
              i.gst &&
                (0, y.jsxs)(`div`, {
                  style: {
                    fontSize: `9px`,
                    fontWeight: `700`,
                    marginTop: `2px`,
                  },
                  children: [`GSTIN: `, s(i.gst)],
                }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          background: `#fff7ed`,
          borderBottom: `2px solid #c2410c`,
          fontSize: `9.5px`,
          padding: `5px 14px`,
          gap: `24px`,
        },
        children: [
          (0, y.jsxs)(`span`, {
            children: [
              (0, y.jsx)(`strong`, {
                style: { color: `#c2410c` },
                children: `Driver:`,
              }),
              ` `,
              c(a.driverName, `100px`),
            ],
          }),
          (0, y.jsxs)(`span`, {
            children: [
              (0, y.jsx)(`strong`, {
                style: { color: `#c2410c` },
                children: `Driver Ph:`,
              }),
              ` `,
              c(a.driverMobile, `90px`),
            ],
          }),
          (0, y.jsxs)(`span`, {
            children: [
              (0, y.jsx)(`strong`, {
                style: { color: `#c2410c` },
                children: `Delivery Date:`,
              }),
              ` `,
              (0, y.jsx)(`strong`, { children: s(n.deliveryDate) }),
            ],
          }),
          (0, y.jsxs)(`span`, {
            children: [
              (0, y.jsx)(`strong`, {
                style: { color: `#c2410c` },
                children: `Bill No:`,
              }),
              ` `,
              (0, y.jsx)(`strong`, { children: s(n.billNo) }),
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
                `Sr.`,
                `Description of Goods`,
                `Pkgs`,
                `Weight`,
                `Rate (₹)`,
                `Freight (₹)`,
                `Hamali / Ld-Uld`,
                `Total (₹)`,
              ].map((e) =>
                (0, y.jsx)(
                  `th`,
                  {
                    style: {
                      background: `#c2410c`,
                      color: `#fff`,
                      padding: `6px 8px`,
                      textAlign:
                        e === `Description of Goods` ? `left` : `center`,
                      fontSize: `8.5px`,
                      fontWeight: `700`,
                      letterSpacing: `0.4px`,
                      border: `1px solid #9a3412`,
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
                let n = Number(e.freight) || 0,
                  r = (Number(e.loading) || 0) + (Number(e.unloading) || 0),
                  i =
                    (Number(e.insurance) || 0) + (Number(e.otherCharges) || 0),
                  a = n + r + i;
                return (0, y.jsxs)(
                  `tr`,
                  {
                    style: { background: t % 2 == 0 ? `#fff` : `#fef5ee` },
                    children: [
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #fed7aa`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                          color: `#94a3b8`,
                          fontSize: `10px`,
                        },
                        children: t + 1,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #fed7aa`,
                          padding: `5px 8px`,
                          fontWeight: `700`,
                        },
                        children: s(e.itemName),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #fed7aa`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                        },
                        children: s(e.packages),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #fed7aa`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                        },
                        children: e.weight ? `${e.weight} ${s(e.unit)}` : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #fed7aa`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                          fontFamily: `monospace`,
                        },
                        children:
                          e.rate === `` ? `` : Number(e.rate).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #fed7aa`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                          fontWeight: `700`,
                          fontFamily: `monospace`,
                        },
                        children: n ? n.toFixed(2) : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #fed7aa`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                          fontFamily: `monospace`,
                        },
                        children: r ? r.toFixed(2) : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #fed7aa`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                          fontWeight: `700`,
                          color: `#c2410c`,
                          fontFamily: `monospace`,
                        },
                        children: a ? a.toFixed(2) : ``,
                      }),
                    ],
                  },
                  e.id || t,
                );
              }),
              Array.from({ length: Math.max(0, 4 - o.length) }).map((e, t) =>
                (0, y.jsx)(
                  `tr`,
                  {
                    style: { height: `28px` },
                    children: Array(8)
                      .fill(null)
                      .map((e, t) =>
                        (0, y.jsx)(
                          `td`,
                          { style: { border: `1px solid #fed7aa` } },
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
        style: { display: `flex`, borderTop: `2px solid #c2410c` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `8px 14px`,
              borderRight: `1px solid #fed7aa`,
              fontSize: `9px`,
              color: `#64748b`,
              lineHeight: `1.6`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                children: [
                  (0, y.jsx)(`strong`, {
                    style: { color: `#334155` },
                    children: `Remarks:`,
                  }),
                  ` `,
                  s(o[0]?.remarks),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { marginTop: `4px` },
                children: [
                  `Goods carried at owner's risk. Claims within 24 hrs of delivery. Subject to `,
                  s(n.city) || `________`,
                  ` jurisdiction. E&OE.`,
                ],
              }),
            ],
          }),
          (0, y.jsx)(`div`, {
            style: { width: `280px` },
            children: (0, y.jsx)(`table`, {
              style: {
                width: `100%`,
                borderCollapse: `collapse`,
                fontSize: `10px`,
              },
              children: (0, y.jsxs)(`tbody`, {
                children: [
                  [
                    [`Basic Freight`, t.freight],
                    [`Hamali (Ld/Uld)`, l],
                    [`Insurance`, t.insurance],
                    [`Other Charges`, t.otherCharges],
                    [`Subtotal`, t.subtotal],
                    [`GST`, t.gstAmount],
                  ].map(([e, t]) =>
                    (0, y.jsxs)(
                      `tr`,
                      {
                        style: { borderBottom: `1px solid #fee2d0` },
                        children: [
                          (0, y.jsx)(`td`, {
                            style: { padding: `5px 12px`, color: `#64748b` },
                            children: e,
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `5px 12px`,
                              textAlign: `right`,
                              fontFamily: `monospace`,
                            },
                            children: t ? `₹ ${Number(t).toFixed(2)}` : ``,
                          }),
                        ],
                      },
                      e,
                    ),
                  ),
                  (0, y.jsxs)(`tr`, {
                    children: [
                      (0, y.jsx)(`td`, {
                        style: {
                          padding: `8px 12px`,
                          background: `#c2410c`,
                          color: `#fff`,
                          fontWeight: `900`,
                          fontSize: `12px`,
                        },
                        children: `GRAND TOTAL`,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          padding: `8px 12px`,
                          background: `#c2410c`,
                          color: `#fff`,
                          textAlign: `right`,
                          fontWeight: `900`,
                          fontSize: `12px`,
                          fontFamily: `monospace`,
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
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderTop: `2px solid #c2410c` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              width: `260px`,
              padding: `8px 14px`,
              borderRight: `1px solid #fed7aa`,
              fontSize: `10px`,
            },
            children: [
              (0, y.jsx)(`strong`, {
                style: { color: `#c2410c` },
                children: `Payment:`,
              }),
              (0, y.jsx)(`div`, {
                style: { display: `flex`, gap: `10px`, marginTop: `4px` },
                children: [`TO PAY`, `PAID`, `TO BE BILLED`].map((e) =>
                  (0, y.jsxs)(
                    `label`,
                    {
                      style: {
                        display: `flex`,
                        alignItems: `center`,
                        gap: `4px`,
                        fontWeight: `700`,
                        fontSize: `9.5px`,
                      },
                      children: [
                        (0, y.jsx)(`span`, {
                          style: {
                            width: `13px`,
                            height: `13px`,
                            border: `2px solid #c2410c`,
                            display: `inline-block`,
                          },
                        }),
                        e,
                      ],
                    },
                    e,
                  ),
                ),
              }),
            ],
          }),
          (0, y.jsx)(`div`, {
            style: { flex: 1, display: `flex` },
            children: [
              `Consignor`,
              `Driver`,
              `For ${s(n.companyName) || `Company`}`,
            ].map((e) =>
              (0, y.jsxs)(
                `div`,
                {
                  style: {
                    flex: 1,
                    padding: `8px 10px`,
                    textAlign: `center`,
                    borderRight: `1px solid #fed7aa`,
                  },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        height: `28px`,
                        borderBottom: `1px solid #c2410c`,
                      },
                    }),
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `8.5px`,
                        fontWeight: `700`,
                        color: `#475569`,
                        marginTop: `3px`,
                      },
                      children: e,
                    }),
                  ],
                },
                e,
              ),
            ),
          }),
        ],
      }),
      (0, y.jsx)(`div`, {
        style: {
          height: `6px`,
          background: `linear-gradient(90deg, #ea580c, #c2410c, #ea580c)`,
        },
      }),
    ],
  });
}
