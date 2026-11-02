import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };


export function ModernTransportBill({ data: e, totals: t }) {
  let {
      transportDetails: n,
      consignor: r,
      consignee: i,
      vehicle: a,
      goods: o,
    } = e,
    s = (e) => e || ``,
    c = (t.gstAmount || 0) / 2,
    l = (t.gstAmount || 0) / 2,
    u = (t.loading || 0) + (t.unloading || 0);
  return (0, y.jsxs)(`div`, {
    id: `bill-a4-preview`,
    style: {
      width: `100%`,
      minHeight: `100%`,
      background: `#f0faf8`,
      fontFamily: `'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
      color: `#1a1a2e`,
      fontSize: `11px`,
      padding: `0`,
    },
    children: [
      (0, y.jsx)(`div`, {
        style: {
          height: `6px`,
          background: `linear-gradient(90deg, #0d9488, #14b8a6, #0d9488)`,
        },
      }),
      (0, y.jsxs)(`div`, {
        style: {
          background: `#fff`,
          margin: `16px 20px`,
          borderRadius: `8px`,
          border: `1px solid #e0f2f1`,
          boxShadow: `0 2px 12px rgba(0,0,0,0.06)`,
          overflow: `hidden`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              display: `flex`,
              alignItems: `stretch`,
              borderBottom: `2px solid #0d9488`,
            },
            children: [
              e.settings?.logo &&
                (0, y.jsx)(`div`, {
                  style: {
                    width: `80px`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    padding: `10px`,
                    borderRight: `1px solid #e0f2f1`,
                  },
                  children: (0, y.jsx)(`img`, {
                    src: e.settings.logo,
                    alt: `Logo`,
                    style: {
                      maxWidth: `60px`,
                      maxHeight: `60px`,
                      objectFit: `contain`,
                      borderRadius: `4px`,
                    },
                  }),
                }),
              (0, y.jsxs)(`div`, {
                style: { flex: 1, padding: `14px 18px` },
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `22px`,
                      fontWeight: `800`,
                      color: `#0d9488`,
                      letterSpacing: `-0.3px`,
                      lineHeight: `1`,
                    },
                    children: s(n.companyName) || `TRANSPORT COMPANY`,
                  }),
                  (0, y.jsxs)(`div`, {
                    style: {
                      fontSize: `10px`,
                      color: `#6b7280`,
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
                    style: {
                      fontSize: `10px`,
                      color: `#6b7280`,
                      marginTop: `2px`,
                    },
                    children: [
                      n.phone && `Ph: ${n.phone}`,
                      ` `,
                      n.email && `| ${n.email}`,
                      ` `,
                      n.website && `| ${n.website}`,
                    ],
                  }),
                  n.gst &&
                    (0, y.jsxs)(`div`, {
                      style: {
                        fontSize: `10px`,
                        fontWeight: `700`,
                        color: `#0d9488`,
                        marginTop: `3px`,
                      },
                      children: [`GSTIN: `, n.gst],
                    }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  width: `220px`,
                  padding: `14px 18px`,
                  textAlign: `right`,
                  background: `#f0fdfa`,
                },
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `12px`,
                      fontWeight: `800`,
                      color: `#0d9488`,
                      letterSpacing: `1px`,
                      textTransform: `uppercase`,
                      marginBottom: `6px`,
                    },
                    children: `Transport Bill`,
                  }),
                  (0, y.jsxs)(`div`, {
                    style: { fontSize: `10px`, color: `#6b7280` },
                    children: [
                      `LR No: `,
                      (0, y.jsx)(`strong`, {
                        style: { color: `#1a1a2e` },
                        children: s(n.lrNo) || `________`,
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    style: {
                      fontSize: `10px`,
                      color: `#6b7280`,
                      marginTop: `2px`,
                    },
                    children: [
                      `Bill No: `,
                      (0, y.jsx)(`strong`, {
                        style: { color: `#1a1a2e` },
                        children: s(n.billNo) || `________`,
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    style: {
                      fontSize: `10px`,
                      color: `#6b7280`,
                      marginTop: `2px`,
                    },
                    children: [
                      `Date: `,
                      (0, y.jsx)(`strong`, {
                        style: { color: `#1a1a2e` },
                        children: s(n.bookingDate),
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    style: {
                      fontSize: `10px`,
                      color: `#6b7280`,
                      marginTop: `2px`,
                    },
                    children: [
                      `Delivery: `,
                      (0, y.jsx)(`strong`, {
                        style: { color: `#1a1a2e` },
                        children: s(n.deliveryDate),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              display: `flex`,
              background: `#0d9488`,
              color: `#fff`,
              padding: `8px 18px`,
              fontSize: `11px`,
              fontWeight: `700`,
              gap: `24px`,
            },
            children: [
              (0, y.jsxs)(`span`, {
                children: [`Vehicle: `, s(a.number) || `N/A`],
              }),
              (0, y.jsxs)(`span`, {
                children: [`Driver: `, s(a.driverName) || `N/A`],
              }),
              (0, y.jsxs)(`span`, {
                children: [`Driver Ph: `, s(a.driverMobile) || `N/A`],
              }),
              (0, y.jsxs)(`span`, {
                style: { marginLeft: `auto` },
                children: [`From: `, s(r.city), ` → To: `, s(i.city)],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { display: `flex`, borderBottom: `1px solid #e5e7eb` },
            children: [
              (0, y.jsxs)(`div`, {
                style: {
                  flex: 1,
                  padding: `12px 18px`,
                  borderRight: `1px solid #e5e7eb`,
                },
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `9px`,
                      fontWeight: `700`,
                      color: `#0d9488`,
                      letterSpacing: `0.8px`,
                      textTransform: `uppercase`,
                      marginBottom: `6px`,
                    },
                    children: `Consignor (Sender)`,
                  }),
                  (0, y.jsx)(`div`, {
                    style: { fontWeight: `700`, fontSize: `12px` },
                    children: s(r.name),
                  }),
                  (0, y.jsx)(`div`, {
                    style: { color: `#4b5563`, marginTop: `2px` },
                    children: s(r.address),
                  }),
                  (0, y.jsxs)(`div`, {
                    style: { color: `#4b5563` },
                    children: [s(r.city), ` `, s(r.state), ` `, s(r.pincode)],
                  }),
                  r.mobile &&
                    (0, y.jsxs)(`div`, {
                      style: { color: `#6b7280`, marginTop: `2px` },
                      children: [`Ph: `, s(r.mobile)],
                    }),
                  r.gst &&
                    (0, y.jsxs)(`div`, {
                      style: {
                        fontSize: `10px`,
                        fontWeight: `700`,
                        marginTop: `2px`,
                      },
                      children: [`GSTIN: `, s(r.gst)],
                    }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { flex: 1, padding: `12px 18px` },
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `9px`,
                      fontWeight: `700`,
                      color: `#0d9488`,
                      letterSpacing: `0.8px`,
                      textTransform: `uppercase`,
                      marginBottom: `6px`,
                    },
                    children: `Consignee (Receiver)`,
                  }),
                  (0, y.jsx)(`div`, {
                    style: { fontWeight: `700`, fontSize: `12px` },
                    children: s(i.name),
                  }),
                  (0, y.jsx)(`div`, {
                    style: { color: `#4b5563`, marginTop: `2px` },
                    children: s(i.address),
                  }),
                  (0, y.jsxs)(`div`, {
                    style: { color: `#4b5563` },
                    children: [s(i.city), ` `, s(i.state), ` `, s(i.pincode)],
                  }),
                  i.mobile &&
                    (0, y.jsxs)(`div`, {
                      style: { color: `#6b7280`, marginTop: `2px` },
                      children: [`Ph: `, s(i.mobile)],
                    }),
                  i.gst &&
                    (0, y.jsxs)(`div`, {
                      style: {
                        fontSize: `10px`,
                        fontWeight: `700`,
                        marginTop: `2px`,
                      },
                      children: [`GSTIN: `, s(i.gst)],
                    }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`table`, {
            style: { width: `100%`, borderCollapse: `collapse` },
            children: [
              (0, y.jsx)(`thead`, {
                children: (0, y.jsxs)(`tr`, {
                  style: { background: `#0d9488`, color: `#fff` },
                  children: [
                    (0, y.jsx)(`th`, {
                      style: {
                        padding: `8px 10px`,
                        textAlign: `center`,
                        fontSize: `9px`,
                        fontWeight: `700`,
                        letterSpacing: `0.5px`,
                      },
                      children: `#`,
                    }),
                    (0, y.jsx)(`th`, {
                      style: {
                        padding: `8px 10px`,
                        textAlign: `left`,
                        fontSize: `9px`,
                        fontWeight: `700`,
                        letterSpacing: `0.5px`,
                      },
                      children: `Description of Goods`,
                    }),
                    (0, y.jsx)(`th`, {
                      style: {
                        padding: `8px 10px`,
                        textAlign: `center`,
                        fontSize: `9px`,
                        fontWeight: `700`,
                        letterSpacing: `0.5px`,
                      },
                      children: `Pkgs`,
                    }),
                    (0, y.jsx)(`th`, {
                      style: {
                        padding: `8px 10px`,
                        textAlign: `center`,
                        fontSize: `9px`,
                        fontWeight: `700`,
                        letterSpacing: `0.5px`,
                      },
                      children: `Weight`,
                    }),
                    (0, y.jsx)(`th`, {
                      style: {
                        padding: `8px 10px`,
                        textAlign: `right`,
                        fontSize: `9px`,
                        fontWeight: `700`,
                        letterSpacing: `0.5px`,
                      },
                      children: `Rate (₹)`,
                    }),
                    (0, y.jsx)(`th`, {
                      style: {
                        padding: `8px 10px`,
                        textAlign: `right`,
                        fontSize: `9px`,
                        fontWeight: `700`,
                        letterSpacing: `0.5px`,
                      },
                      children: `Freight (₹)`,
                    }),
                    (0, y.jsx)(`th`, {
                      style: {
                        padding: `8px 10px`,
                        textAlign: `right`,
                        fontSize: `9px`,
                        fontWeight: `700`,
                        letterSpacing: `0.5px`,
                      },
                      children: `Hamali (₹)`,
                    }),
                    (0, y.jsx)(`th`, {
                      style: {
                        padding: `8px 10px`,
                        textAlign: `right`,
                        fontSize: `9px`,
                        fontWeight: `700`,
                        letterSpacing: `0.5px`,
                      },
                      children: `Total (₹)`,
                    }),
                  ],
                }),
              }),
              (0, y.jsxs)(`tbody`, {
                children: [
                  o.map((e, t) => {
                    let n = Number(e.freight) || 0,
                      r = (Number(e.loading) || 0) + (Number(e.unloading) || 0),
                      i =
                        (Number(e.insurance) || 0) +
                        (Number(e.otherCharges) || 0),
                      a = n + r + i;
                    return (0, y.jsxs)(
                      `tr`,
                      {
                        style: {
                          borderBottom: `1px solid #f3f4f6`,
                          background: t % 2 == 0 ? `#fff` : `#f9fafb`,
                        },
                        children: [
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `8px 10px`,
                              textAlign: `center`,
                              color: `#9ca3af`,
                              fontSize: `10px`,
                            },
                            children: t + 1,
                          }),
                          (0, y.jsxs)(`td`, {
                            style: { padding: `8px 10px` },
                            children: [
                              (0, y.jsx)(`div`, {
                                style: { fontWeight: `600` },
                                children: s(e.itemName),
                              }),
                              e.description &&
                                (0, y.jsx)(`div`, {
                                  style: {
                                    fontSize: `9px`,
                                    color: `#9ca3af`,
                                    marginTop: `1px`,
                                  },
                                  children: e.description,
                                }),
                            ],
                          }),
                          (0, y.jsx)(`td`, {
                            style: { padding: `8px 10px`, textAlign: `center` },
                            children: s(e.packages),
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `8px 10px`,
                              textAlign: `center`,
                              color: `#6b7280`,
                            },
                            children: e.weight
                              ? `${e.weight} ${s(e.unit)}`
                              : ``,
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `8px 10px`,
                              textAlign: `right`,
                              fontFamily: `monospace`,
                            },
                            children:
                              e.rate === `` ? `` : Number(e.rate).toFixed(2),
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `8px 10px`,
                              textAlign: `right`,
                              fontWeight: `700`,
                              fontFamily: `monospace`,
                            },
                            children: n ? n.toFixed(2) : ``,
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `8px 10px`,
                              textAlign: `right`,
                              fontFamily: `monospace`,
                            },
                            children: r ? r.toFixed(2) : ``,
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `8px 10px`,
                              textAlign: `right`,
                              fontWeight: `700`,
                              fontFamily: `monospace`,
                            },
                            children: a ? a.toFixed(2) : ``,
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
                          style: {
                            height: `28px`,
                            borderBottom: `1px solid #f3f4f6`,
                          },
                          children: Array(8)
                            .fill(null)
                            .map((e, t) =>
                              (0, y.jsx)(
                                `td`,
                                { style: { padding: `8px 10px` } },
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
            style: { display: `flex`, borderTop: `2px solid #e5e7eb` },
            children: [
              (0, y.jsxs)(`div`, {
                style: {
                  flex: 1,
                  padding: `10px 18px`,
                  borderRight: `1px solid #e5e7eb`,
                  fontSize: `10px`,
                  color: `#6b7280`,
                },
                children: [
                  (0, y.jsx)(`strong`, {
                    style: { color: `#1a1a2e` },
                    children: `Freight Payable To:`,
                  }),
                  ` `,
                  s(r.name) || s(n.companyName) || `________`,
                  (0, y.jsx)(`br`, {}),
                  (0, y.jsx)(`strong`, {
                    style: { color: `#1a1a2e` },
                    children: `Amount in Words:`,
                  }),
                  (0, y.jsx)(`br`, {}),
                  (0, y.jsx)(`span`, {
                    style: { fontStyle: `italic` },
                    children: ((e) =>
                      e
                        ? `Rupees ${Math.floor(e)} and ${Math.round((e % 1) * 100)}/100 Only`
                        : ``)(t.grandTotal),
                  }),
                ],
              }),
              (0, y.jsx)(`div`, {
                style: { width: `300px` },
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
                        [`Hamali (Loading/Unloading)`, u],
                        [`Insurance`, t.insurance],
                        [`Other Charges`, t.otherCharges],
                        [`Subtotal`, t.subtotal],
                      ].map(([e, t]) =>
                        (0, y.jsxs)(
                          `tr`,
                          {
                            style: { borderBottom: `1px solid #f3f4f6` },
                            children: [
                              (0, y.jsx)(`td`, {
                                style: {
                                  padding: `5px 12px`,
                                  color: `#6b7280`,
                                },
                                children: e,
                              }),
                              (0, y.jsx)(`td`, {
                                style: {
                                  padding: `5px 12px`,
                                  textAlign: `right`,
                                  fontFamily: `monospace`,
                                },
                                children: t ? t.toFixed(2) : ``,
                              }),
                            ],
                          },
                          e,
                        ),
                      ),
                      (0, y.jsxs)(`tr`, {
                        style: { borderBottom: `1px solid #f3f4f6` },
                        children: [
                          (0, y.jsx)(`td`, {
                            style: { padding: `5px 12px`, color: `#6b7280` },
                            children: `CGST @ 2.5%`,
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `5px 12px`,
                              textAlign: `right`,
                              fontFamily: `monospace`,
                            },
                            children: c ? c.toFixed(2) : ``,
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`tr`, {
                        style: { borderBottom: `1px solid #f3f4f6` },
                        children: [
                          (0, y.jsx)(`td`, {
                            style: { padding: `5px 12px`, color: `#6b7280` },
                            children: `SGST @ 2.5%`,
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `5px 12px`,
                              textAlign: `right`,
                              fontFamily: `monospace`,
                            },
                            children: l ? l.toFixed(2) : ``,
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`tr`, {
                        children: [
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `8px 12px`,
                              background: `#0d9488`,
                              color: `#fff`,
                              fontWeight: `800`,
                              fontSize: `12px`,
                            },
                            children: `GRAND TOTAL`,
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              padding: `8px 12px`,
                              background: `#0d9488`,
                              color: `#fff`,
                              textAlign: `right`,
                              fontWeight: `800`,
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
            style: {
              borderTop: `1px solid #e5e7eb`,
              display: `flex`,
              fontSize: `10px`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                style: {
                  flex: 1,
                  padding: `8px 18px`,
                  borderRight: `1px solid #e5e7eb`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { fontWeight: `700`, color: `#0d9488` },
                    children: `Payment Mode:`,
                  }),
                  ` `,
                  [`TO PAY`, `PAID`, `TO BE BILLED`].map((e) =>
                    (0, y.jsxs)(
                      `label`,
                      {
                        style: {
                          display: `inline-flex`,
                          alignItems: `center`,
                          gap: `4px`,
                          marginRight: `12px`,
                          fontWeight: `600`,
                        },
                        children: [
                          (0, y.jsx)(`span`, {
                            style: {
                              width: `12px`,
                              height: `12px`,
                              border: `2px solid #0d9488`,
                              display: `inline-block`,
                            },
                          }),
                          e,
                        ],
                      },
                      e,
                    ),
                  ),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  width: `200px`,
                  padding: `8px 18px`,
                  color: `#6b7280`,
                  fontSize: `8.5px`,
                },
                children: [
                  `Goods carried at owner's risk. Claims within 24 hrs. Subject to `,
                  s(n.city),
                  ` jurisdiction. E&OE.`,
                ],
              }),
            ],
          }),
          (0, y.jsx)(`div`, {
            style: { borderTop: `1px solid #e5e7eb`, display: `flex` },
            children: [
              `Consignor Signature`,
              `Driver`,
              `Receiver`,
              `For ${s(n.companyName) || `Company`}`,
            ].map((e) =>
              (0, y.jsxs)(
                `div`,
                {
                  style: {
                    flex: 1,
                    padding: `10px 14px`,
                    textAlign: `center`,
                    borderRight: `1px solid #f3f4f6`,
                  },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        height: `32px`,
                        borderBottom: `1px solid #d1d5db`,
                      },
                    }),
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `9px`,
                        fontWeight: `600`,
                        color: `#6b7280`,
                        marginTop: `4px`,
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
          height: `4px`,
          background: `linear-gradient(90deg, #0d9488, #14b8a6, #0d9488)`,
          margin: `0 20px 16px`,
          borderRadius: `0 0 8px 8px`,
        },
      }),
    ],
  });
}
