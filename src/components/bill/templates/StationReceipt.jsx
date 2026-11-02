import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };


export function StationReceipt({ data: e, totals: t }) {
  let {
      transportDetails: n,
      consignor: r,
      consignee: i,
      vehicle: a,
      goods: o,
    } = e,
    s = (e) => e ?? ``;
  return (0, y.jsxs)(`div`, {
    id: `bill-a4-preview`,
    style: {
      width: `100%`,
      minHeight: `100%`,
      background: `#fff`,
      fontFamily: `'Courier New', Courier, monospace`,
      color: `#1a1a1a`,
      fontSize: `11px`,
      border: `3px solid #1a1a2e`,
    },
    children: [
      (0, y.jsx)(`div`, {
        style: {
          height: `10px`,
          background: `repeating-linear-gradient(90deg, #f59e0b 0 10px, #1a1a2e 10px 20px)`,
        },
      }),
      (0, y.jsxs)(`div`, {
        style: {
          background: `#1a1a2e`,
          color: `#fff`,
          padding: `10px 16px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: { display: `flex`, alignItems: `center`, gap: `12px` },
            children: [
              e.settings?.logo &&
                (0, y.jsx)(`img`, {
                  src: e.settings.logo,
                  alt: `Logo`,
                  style: {
                    width: `48px`,
                    height: `48px`,
                    objectFit: `contain`,
                    borderRadius: `4px`,
                    border: `1px solid #374151`,
                  },
                }),
              (0, y.jsxs)(`div`, {
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `20px`,
                      fontWeight: `900`,
                      letterSpacing: `2px`,
                      textTransform: `uppercase`,
                    },
                    children: s(n.companyName),
                  }),
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `9px`,
                      color: `#9ca3af`,
                      letterSpacing: `1px`,
                    },
                    children: `GOODS RECEIPT — STATION COPY`,
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { textAlign: `right` },
            children: [
              n.phone &&
                (0, y.jsxs)(`div`, {
                  style: { fontSize: `9px`, color: `#9ca3af` },
                  children: [`Ph: `, n.phone],
                }),
              n.gst &&
                (0, y.jsxs)(`div`, {
                  style: {
                    fontSize: `9px`,
                    color: `#f59e0b`,
                    fontWeight: `700`,
                  },
                  children: [`GSTIN: `, n.gst],
                }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          borderBottom: `2px solid #1a1a2e`,
          alignItems: `stretch`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              textAlign: `center`,
              padding: `10px`,
              borderRight: `2px solid #1a1a2e`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8px`,
                  fontWeight: `700`,
                  color: `#6b7280`,
                  letterSpacing: `1px`,
                },
                children: `BOOKING STATION`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `28px`,
                  fontWeight: `900`,
                  color: `#1a1a2e`,
                  lineHeight: `1`,
                  marginTop: `2px`,
                },
                children: s(r.city),
              }),
            ],
          }),
          (0, y.jsx)(`div`, {
            style: {
              width: `60px`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              background: `#f59e0b`,
              fontSize: `24px`,
              fontWeight: `900`,
              color: `#1a1a2e`,
              borderRight: `2px solid #1a1a2e`,
            },
            children: `→`,
          }),
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              textAlign: `center`,
              padding: `10px`,
              borderRight: `2px solid #1a1a2e`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8px`,
                  fontWeight: `700`,
                  color: `#6b7280`,
                  letterSpacing: `1px`,
                },
                children: `DESTINATION STATION`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `28px`,
                  fontWeight: `900`,
                  color: `#1a1a2e`,
                  lineHeight: `1`,
                  marginTop: `2px`,
                },
                children: s(i.city),
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { width: `200px`, padding: `8px 12px`, fontSize: `9px` },
            children: [
              (0, y.jsxs)(`div`, {
                style: {
                  display: `flex`,
                  justifyContent: `space-between`,
                  marginBottom: `3px`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { color: `#6b7280` },
                    children: `GR No.`,
                  }),
                  (0, y.jsx)(`strong`, { children: s(n.lrNo) }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  display: `flex`,
                  justifyContent: `space-between`,
                  marginBottom: `3px`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { color: `#6b7280` },
                    children: `Date`,
                  }),
                  (0, y.jsx)(`strong`, { children: s(n.bookingDate) }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  display: `flex`,
                  justifyContent: `space-between`,
                  marginBottom: `3px`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { color: `#6b7280` },
                    children: `Time`,
                  }),
                  (0, y.jsx)(`strong`, {
                    children: s(n.bookingTime),
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { display: `flex`, justifyContent: `space-between` },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { color: `#6b7280` },
                    children: `Bill No.`,
                  }),
                  (0, y.jsx)(`strong`, { children: s(n.billNo) }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderBottom: `2px solid #1a1a2e` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `8px 12px`,
              borderRight: `1px solid #d1d5db`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8px`,
                  fontWeight: `700`,
                  color: `#6b7280`,
                  letterSpacing: `1px`,
                  marginBottom: `4px`,
                },
                children: `CONSIGNOR`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `900`, fontSize: `12px` },
                children: s(r.name),
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, color: `#4b5563` },
                children: s(r.address),
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, color: `#4b5563` },
                children: [s(r.city), ` `, s(r.state), ` - `, s(r.pincode)],
              }),
              r.mobile &&
                (0, y.jsxs)(`div`, {
                  style: { fontSize: `10px`, marginTop: `2px` },
                  children: [
                    `Ph: `,
                    (0, y.jsx)(`strong`, { children: s(r.mobile) }),
                  ],
                }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, padding: `8px 12px` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8px`,
                  fontWeight: `700`,
                  color: `#6b7280`,
                  letterSpacing: `1px`,
                  marginBottom: `4px`,
                },
                children: `CONSIGNEE`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `900`, fontSize: `12px` },
                children: s(i.name),
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, color: `#4b5563` },
                children: s(i.address),
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, color: `#4b5563` },
                children: [s(i.city), ` `, s(i.state), ` - `, s(i.pincode)],
              }),
              i.mobile &&
                (0, y.jsxs)(`div`, {
                  style: { fontSize: `10px`, marginTop: `2px` },
                  children: [
                    `Ph: `,
                    (0, y.jsx)(`strong`, { children: s(i.mobile) }),
                  ],
                }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          background: `#1a1a2e`,
          color: `#f59e0b`,
          padding: `4px 12px`,
          fontSize: `9px`,
          fontWeight: `700`,
          letterSpacing: `1px`,
          display: `flex`,
          justifyContent: `space-between`,
        },
        children: [
          (0, y.jsxs)(`span`, {
            children: [`VEHICLE: `, s(a.number)],
          }),
          (0, y.jsxs)(`span`, {
            children: [`DRIVER: `, s(a.driverName)],
          }),
          (0, y.jsxs)(`span`, { children: [`DELIVERY: `, s(n.deliveryDate)] }),
        ],
      }),
      (0, y.jsxs)(`table`, {
        style: { width: `100%`, borderCollapse: `collapse` },
        children: [
          (0, y.jsx)(`thead`, {
            children: (0, y.jsxs)(`tr`, {
              children: [
                (0, y.jsx)(`th`, {
                  style: {
                    background: `#f5f5f5`,
                    border: `1px solid #1a1a2e`,
                    padding: `5px 6px`,
                    textAlign: `center`,
                    fontSize: `8px`,
                    fontWeight: `900`,
                    letterSpacing: `0.5px`,
                    width: `6%`,
                  },
                  children: `No.`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    background: `#f5f5f5`,
                    border: `1px solid #1a1a2e`,
                    padding: `5px 6px`,
                    textAlign: `left`,
                    fontSize: `8px`,
                    fontWeight: `900`,
                    letterSpacing: `0.5px`,
                    width: `32%`,
                  },
                  children: `DESCRIPTION OF GOODS`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    background: `#f5f5f5`,
                    border: `1px solid #1a1a2e`,
                    padding: `5px 6px`,
                    textAlign: `center`,
                    fontSize: `8px`,
                    fontWeight: `900`,
                    letterSpacing: `0.5px`,
                    width: `10%`,
                  },
                  children: `PKGS`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    background: `#f5f5f5`,
                    border: `1px solid #1a1a2e`,
                    padding: `5px 6px`,
                    textAlign: `center`,
                    fontSize: `8px`,
                    fontWeight: `900`,
                    letterSpacing: `0.5px`,
                    width: `12%`,
                  },
                  children: `WEIGHT`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    background: `#f5f5f5`,
                    border: `1px solid #1a1a2e`,
                    padding: `5px 6px`,
                    textAlign: `right`,
                    fontSize: `8px`,
                    fontWeight: `900`,
                    letterSpacing: `0.5px`,
                    width: `12%`,
                  },
                  children: `RATE (₹)`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    background: `#f5f5f5`,
                    border: `1px solid #1a1a2e`,
                    padding: `5px 6px`,
                    textAlign: `right`,
                    fontSize: `8px`,
                    fontWeight: `900`,
                    letterSpacing: `0.5px`,
                    width: `14%`,
                  },
                  children: `FREIGHT (₹)`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    background: `#f5f5f5`,
                    border: `1px solid #1a1a2e`,
                    padding: `5px 6px`,
                    textAlign: `right`,
                    fontSize: `8px`,
                    fontWeight: `900`,
                    letterSpacing: `0.5px`,
                    width: `14%`,
                  },
                  children: `TOTAL (₹)`,
                }),
              ],
            }),
          }),
          (0, y.jsxs)(`tbody`, {
            children: [
              o.map((e, t) => {
                let n = (Number(e.loading) || 0) + (Number(e.unloading) || 0),
                  r =
                    (Number(e.insurance) || 0) + (Number(e.otherCharges) || 0),
                  i = Number(e.freight) || 0,
                  a = i + n + r;
                return (0, y.jsxs)(
                  `tr`,
                  {
                    style: { height: `26px` },
                    children: [
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #d1d5db`,
                          padding: `4px 6px`,
                          textAlign: `center`,
                          fontSize: `10px`,
                          color: `#6b7280`,
                        },
                        children: t + 1,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #d1d5db`,
                          padding: `4px 6px`,
                          fontWeight: `900`,
                        },
                        children: s(e.itemName),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #d1d5db`,
                          padding: `4px 6px`,
                          textAlign: `center`,
                        },
                        children: s(e.packages),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #d1d5db`,
                          padding: `4px 6px`,
                          textAlign: `center`,
                        },
                        children: e.weight ? `${e.weight} ${s(e.unit)}` : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #d1d5db`,
                          padding: `4px 6px`,
                          textAlign: `right`,
                        },
                        children:
                          e.rate === `` ? `` : Number(e.rate).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #d1d5db`,
                          padding: `4px 6px`,
                          textAlign: `right`,
                          fontWeight: `700`,
                        },
                        children: i ? i.toFixed(2) : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #d1d5db`,
                          padding: `4px 6px`,
                          textAlign: `right`,
                          fontWeight: `900`,
                          color: `#1a1a2e`,
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
                    style: { height: `26px` },
                    children: Array(7)
                      .fill(null)
                      .map((e, t) =>
                        (0, y.jsx)(
                          `td`,
                          { style: { border: `1px solid #d1d5db` } },
                          t,
                        ),
                      ),
                  },
                  `f${t}`,
                ),
              ),
              (0, y.jsxs)(`tr`, {
                children: [
                  (0, y.jsx)(`td`, {
                    colSpan: `5`,
                    style: {
                      border: `2px solid #1a1a2e`,
                      padding: `6px`,
                      textAlign: `right`,
                      fontWeight: `900`,
                      fontSize: `11px`,
                      letterSpacing: `1px`,
                    },
                    children: `TOTAL FREIGHT →`,
                  }),
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `2px solid #1a1a2e`,
                      padding: `6px`,
                      textAlign: `right`,
                      background: `#1a1a2e`,
                      color: `#f59e0b`,
                      fontWeight: `900`,
                      fontSize: `13px`,
                    },
                    children: t.grandTotal
                      ? `₹ ${t.grandTotal.toFixed(2)}`
                      : ``,
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
          borderTop: `2px solid #1a1a2e`,
          fontSize: `9px`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `8px 12px`,
              borderRight: `1px solid #d1d5db`,
              lineHeight: `1.6`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontWeight: `900`,
                  color: `#1a1a2e`,
                  marginBottom: `2px`,
                },
                children: `REMARKS:`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  borderBottom: `1px dotted #d1d5db`,
                  minHeight: `14px`,
                },
              }),
              (0, y.jsx)(`div`, {
                style: {
                  borderBottom: `1px dotted #d1d5db`,
                  minHeight: `14px`,
                },
              }),
              (0, y.jsxs)(`div`, {
                style: { marginTop: `4px`, fontSize: `8px`, color: `#9ca3af` },
                children: [
                  `Subject to `,
                  s(n.city),
                  ` Jurisdiction. Goods carried at Owner's Risk. Claims within 24 hrs. E&OE.`,
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `160px`,
              padding: `8px 12px`,
              borderRight: `1px solid #d1d5db`,
              textAlign: `center`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8px`,
                  color: `#6b7280`,
                  marginBottom: `4px`,
                },
                children: `STATION INCHARGE`,
              }),
              (0, y.jsx)(`div`, {
                style: { height: `30px`, borderBottom: `1px solid #1a1a2e` },
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `8px`, color: `#6b7280`, marginTop: `2px` },
                children: `Signature & Stamp`,
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { width: `160px`, padding: `8px 12px`, textAlign: `center` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8px`,
                  color: `#6b7280`,
                  marginBottom: `4px`,
                },
                children: `BOOKING CLERK`,
              }),
              (0, y.jsx)(`div`, {
                style: { height: `30px`, borderBottom: `1px solid #1a1a2e` },
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `8px`, color: `#6b7280`, marginTop: `2px` },
                children: `Signature`,
              }),
            ],
          }),
        ],
      }),
      (0, y.jsx)(`div`, {
        style: {
          height: `10px`,
          background: `repeating-linear-gradient(90deg, #f59e0b 0 10px, #1a1a2e 10px 20px)`,
        },
      }),
    ],
  });
}
