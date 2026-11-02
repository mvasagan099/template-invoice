import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };

const Ak = (e) => {
  if (!e) return "";
  try {
    return new Date(e).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return e;
  }
};

export function TripChallan({ data: e, totals: t }) {
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
          display: `inline-block`,
          minWidth: t,
          paddingLeft: `4px`,
          verticalAlign: `bottom`,
        },
        children: s(e),
      }),
    l = t.grandTotal || 0;
  return (0, y.jsxs)(`div`, {
    id: `bill-a4-preview`,
    style: {
      width: `100%`,
      minHeight: `100%`,
      background: `#fff`,
      fontFamily: `Arial, Helvetica, sans-serif`,
      color: `#000`,
      fontSize: `11px`,
      border: `2px solid #000`,
    },
    children: [
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          alignItems: `stretch`,
          borderBottom: `3px solid #000`,
        },
        children: [
          e.settings?.logo &&
            (0, y.jsx)(`div`, {
              style: {
                width: `80px`,
                flexShrink: 0,
                borderRight: `2px solid #000`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                padding: `8px`,
              },
              children: (0, y.jsx)(`img`, {
                src: e.settings.logo,
                alt: `Logo`,
                style: {
                  maxWidth: `64px`,
                  maxHeight: `64px`,
                  objectFit: `contain`,
                },
              }),
            }),
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              textAlign: `center`,
              padding: `10px 8px`,
              borderRight: `2px solid #000`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `22px`,
                  fontWeight: `900`,
                  textTransform: `uppercase`,
                  letterSpacing: `1px`,
                },
                children: s(n.companyName) || `TRANSPORT COMPANY`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, marginTop: `3px` },
                children: `Fleet Owner & Transport Contractor`,
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `2px` },
                children: [
                  s(n.branch),
                  n.city ? `, ${n.city}` : ``,
                  n.phone ? `  |  Ph: ${n.phone}` : ``,
                ],
              }),
              n.gst &&
                (0, y.jsxs)(`div`, {
                  style: {
                    fontWeight: `700`,
                    fontSize: `10px`,
                    marginTop: `2px`,
                  },
                  children: [`GSTIN: `, n.gst],
                }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `160px`,
              flexShrink: 0,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              justifyContent: `center`,
              background: `#1a1a1a`,
              color: `#fff`,
              padding: `8px`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  letterSpacing: `2px`,
                  opacity: 0.7,
                  marginBottom: `4px`,
                },
                children: `DOCUMENT`,
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  fontWeight: `900`,
                  fontSize: `13px`,
                  textAlign: `center`,
                  letterSpacing: `1px`,
                },
                children: [`VEHICLE TRIP`, (0, y.jsx)(`br`, {}), `CHALLAN`],
              }),
              (0, y.jsx)(`div`, {
                style: { marginTop: `6px`, fontSize: `9px`, opacity: 0.7 },
                children: `DRIVER'S COPY`,
              }),
            ],
          }),
        ],
      }),
      (0, y.jsx)(`div`, {
        style: { display: `flex`, borderBottom: `2px solid #000` },
        children: [
          { label: `LR Number`, value: s(n.lrNo) || `\xA0` },
          { label: `Bill No.`, value: s(n.billNo) || `\xA0` },
          { label: `Date of Booking`, value: Ak(n.bookingDate) },
          {
            label: `Expected Delivery`,
            value: n.deliveryDate ? Ak(n.deliveryDate) : `\xA0`,
          },
        ].map(({ label: e, value: t }) =>
          (0, y.jsxs)(
            `div`,
            {
              style: {
                flex: 1,
                padding: `5px 8px`,
                borderRight: `1px solid #000`,
                textAlign: `center`,
              },
              children: [
                (0, y.jsx)(`div`, {
                  style: {
                    fontSize: `8px`,
                    fontWeight: `700`,
                    color: `#555`,
                    letterSpacing: `0.5px`,
                    textTransform: `uppercase`,
                  },
                  children: e,
                }),
                (0, y.jsx)(`div`, {
                  style: {
                    fontSize: `14px`,
                    fontWeight: `900`,
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
      (0, y.jsx)(`div`, {
        style: {
          background: `#1a1a1a`,
          color: `#fff`,
          padding: `4px 10px`,
          fontSize: `9px`,
          fontWeight: `700`,
          letterSpacing: `1px`,
          borderBottom: `1px solid #000`,
        },
        children: `▶ VEHICLE & DRIVER DETAILS`,
      }),
      (0, y.jsx)(`table`, {
        style: {
          width: `100%`,
          borderCollapse: `collapse`,
          borderBottom: `2px solid #000`,
        },
        children: (0, y.jsxs)(`tbody`, {
          children: [
            (0, y.jsxs)(`tr`, {
              children: [
                (0, y.jsxs)(`td`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `6px 10px`,
                    width: `25%`,
                  },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `8px`,
                        fontWeight: `700`,
                        color: `#555`,
                      },
                      children: `VEHICLE NUMBER`,
                    }),
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `16px`,
                        fontWeight: `900`,
                        marginTop: `2px`,
                      },
                      children: s(a.number) || `\xA0`,
                    }),
                  ],
                }),
                (0, y.jsxs)(`td`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `6px 10px`,
                    width: `25%`,
                  },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `8px`,
                        fontWeight: `700`,
                        color: `#555`,
                      },
                      children: `DRIVER NAME`,
                    }),
                    (0, y.jsx)(`div`, {
                      style: { fontWeight: `700`, marginTop: `2px` },
                      children: s(a.driverName) || `\xA0`,
                    }),
                  ],
                }),
                (0, y.jsxs)(`td`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `6px 10px`,
                    width: `25%`,
                  },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `8px`,
                        fontWeight: `700`,
                        color: `#555`,
                      },
                      children: `DRIVER MOBILE`,
                    }),
                    (0, y.jsx)(`div`, {
                      style: { fontWeight: `700`, marginTop: `2px` },
                      children: s(a.driverMobile) || `\xA0`,
                    }),
                  ],
                }),
                (0, y.jsxs)(`td`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `6px 10px`,
                    width: `25%`,
                  },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `8px`,
                        fontWeight: `700`,
                        color: `#555`,
                      },
                      children: `LICENCE NO.`,
                    }),
                    (0, y.jsx)(`div`, {
                      style: { fontWeight: `700`, marginTop: `2px` },
                      children: s(a.driverLicense) || `\xA0`,
                    }),
                  ],
                }),
              ],
            }),
            (0, y.jsxs)(`tr`, {
              children: [
                (0, y.jsxs)(`td`, {
                  style: { border: `1px solid #ccc`, padding: `6px 10px` },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `8px`,
                        fontWeight: `700`,
                        color: `#555`,
                      },
                      children: `ODOMETER START`,
                    }),
                    (0, y.jsxs)(`div`, {
                      style: { fontWeight: `700`, marginTop: `2px` },
                      children: [c(``, `90px`), ` Km`],
                    }),
                  ],
                }),
                (0, y.jsxs)(`td`, {
                  style: { border: `1px solid #ccc`, padding: `6px 10px` },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `8px`,
                        fontWeight: `700`,
                        color: `#555`,
                      },
                      children: `ODOMETER END`,
                    }),
                    (0, y.jsxs)(`div`, {
                      style: { fontWeight: `700`, marginTop: `2px` },
                      children: [c(``, `90px`), ` Km`],
                    }),
                  ],
                }),
                (0, y.jsxs)(`td`, {
                  style: { border: `1px solid #ccc`, padding: `6px 10px` },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `8px`,
                        fontWeight: `700`,
                        color: `#555`,
                      },
                      children: `SEAL NO.`,
                    }),
                    (0, y.jsx)(`div`, {
                      style: { fontWeight: `700`, marginTop: `2px` },
                      children: c(``, `90px`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`td`, {
                  style: { border: `1px solid #ccc`, padding: `6px 10px` },
                  children: [
                    (0, y.jsx)(`div`, {
                      style: {
                        fontSize: `8px`,
                        fontWeight: `700`,
                        color: `#555`,
                      },
                      children: `LOCK NO.`,
                    }),
                    (0, y.jsx)(`div`, {
                      style: { fontWeight: `700`, marginTop: `2px` },
                      children: c(``, `90px`),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      (0, y.jsx)(`div`, {
        style: {
          background: `#1a1a1a`,
          color: `#fff`,
          padding: `4px 10px`,
          fontSize: `9px`,
          fontWeight: `700`,
          letterSpacing: `1px`,
          borderBottom: `1px solid #000`,
        },
        children: `▶ ROUTE INFORMATION`,
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          borderBottom: `2px solid #000`,
          alignItems: `stretch`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `8px 12px`,
              borderRight: `2px solid #000`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8px`,
                  fontWeight: `700`,
                  color: `#555`,
                  marginBottom: `3px`,
                },
                children: `LOADING POINT (FROM)`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `900`, fontSize: `14px` },
                children: s(r.city) || `\xA0`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, color: `#333`, marginTop: `2px` },
                children: s(r.name),
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, color: `#555` },
                children: s(r.address),
              }),
              r.mobile &&
                (0, y.jsxs)(`div`, {
                  style: { fontSize: `10px` },
                  children: [`Ph: `, s(r.mobile)],
                }),
            ],
          }),
          (0, y.jsx)(`div`, {
            style: {
              width: `60px`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              fontSize: `28px`,
              color: `#aaa`,
              borderRight: `2px solid #000`,
            },
            children: `→`,
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `200px`,
              flexShrink: 0,
              padding: `4px 8px`,
              borderRight: `2px solid #000`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8px`,
                  fontWeight: `700`,
                  color: `#555`,
                  marginBottom: `4px`,
                },
                children: `VIA / CHECKPOINTS`,
              }),
              [1, 2, 3].map((e) =>
                (0, y.jsxs)(
                  `div`,
                  {
                    style: {
                      display: `flex`,
                      alignItems: `center`,
                      gap: `6px`,
                      marginBottom: `5px`,
                    },
                    children: [
                      (0, y.jsx)(`div`, {
                        style: {
                          width: `16px`,
                          height: `16px`,
                          border: `1px solid #000`,
                          borderRadius: `50%`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `center`,
                          fontSize: `8px`,
                          fontWeight: `700`,
                          flexShrink: 0,
                        },
                        children: e,
                      }),
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #ccc`,
                          flex: 1,
                          display: `inline-block`,
                          minHeight: `14px`,
                        },
                      }),
                    ],
                  },
                  e,
                ),
              ),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, padding: `8px 12px` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `8px`,
                  fontWeight: `700`,
                  color: `#555`,
                  marginBottom: `3px`,
                },
                children: `UNLOADING POINT (TO)`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `900`, fontSize: `14px` },
                children: s(i.city) || `\xA0`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, color: `#333`, marginTop: `2px` },
                children: s(i.name),
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, color: `#555` },
                children: s(i.address),
              }),
              i.mobile &&
                (0, y.jsxs)(`div`, {
                  style: { fontSize: `10px` },
                  children: [`Ph: `, s(i.mobile)],
                }),
            ],
          }),
        ],
      }),
      (0, y.jsx)(`div`, {
        style: {
          background: `#1a1a1a`,
          color: `#fff`,
          padding: `4px 10px`,
          fontSize: `9px`,
          fontWeight: `700`,
          letterSpacing: `1px`,
          borderBottom: `1px solid #000`,
        },
        children: `▶ GOODS PARTICULARS (Said to Contain)`,
      }),
      (0, y.jsxs)(`table`, {
        style: {
          width: `100%`,
          borderCollapse: `collapse`,
          borderBottom: `2px solid #000`,
        },
        children: [
          (0, y.jsx)(`thead`, {
            children: (0, y.jsxs)(`tr`, {
              children: [
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `5px 8px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    background: `#f5f5f5`,
                    width: `5%`,
                  },
                  children: `Sr.`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `5px 8px`,
                    textAlign: `left`,
                    fontSize: `9px`,
                    background: `#f5f5f5`,
                    width: `28%`,
                  },
                  children: `Description of Goods`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `5px 8px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    background: `#f5f5f5`,
                    width: `8%`,
                  },
                  children: `Pkgs`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `5px 8px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    background: `#f5f5f5`,
                    width: `10%`,
                  },
                  children: `Weight`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `5px 8px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    background: `#f5f5f5`,
                    width: `10%`,
                  },
                  children: `Unit`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `5px 8px`,
                    textAlign: `right`,
                    fontSize: `9px`,
                    background: `#f5f5f5`,
                    width: `10%`,
                  },
                  children: `Rate`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `5px 8px`,
                    textAlign: `right`,
                    fontSize: `9px`,
                    background: `#f5f5f5`,
                    width: `12%`,
                  },
                  children: `Freight (₹)`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `5px 8px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    background: `#f5f5f5`,
                    width: `17%`,
                  },
                  children: `Remarks`,
                }),
              ],
            }),
          }),
          (0, y.jsxs)(`tbody`, {
            children: [
              o.map((e, t) =>
                (0, y.jsxs)(
                  `tr`,
                  {
                    style: { height: `28px` },
                    children: [
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `4px 8px`,
                          textAlign: `center`,
                          color: `#666`,
                        },
                        children: t + 1,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `4px 8px`,
                          fontWeight: `700`,
                        },
                        children: s(e.itemName),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `4px 8px`,
                          textAlign: `center`,
                        },
                        children: s(e.packages),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `4px 8px`,
                          textAlign: `center`,
                        },
                        children: s(e.weight),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `4px 8px`,
                          textAlign: `center`,
                          color: `#555`,
                        },
                        children: s(e.unit),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `4px 8px`,
                          textAlign: `right`,
                        },
                        children:
                          e.rate === `` ? `` : Number(e.rate).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `4px 8px`,
                          textAlign: `right`,
                          fontWeight: `700`,
                        },
                        children:
                          e.freight === `` ? `` : Number(e.freight).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #ccc`,
                          padding: `4px 8px`,
                          fontSize: `9px`,
                        },
                        children: s(e.remarks),
                      }),
                    ],
                  },
                  e.id || t,
                ),
              ),
              Array.from({ length: Math.max(0, 4 - o.length) }).map((e, t) =>
                (0, y.jsx)(
                  `tr`,
                  {
                    style: { height: `24px` },
                    children: [...Array(8)].map((e, t) =>
                      (0, y.jsx)(
                        `td`,
                        { style: { border: `1px solid #ccc` } },
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
        style: { display: `flex`, borderBottom: `2px solid #000` },
        children: [
          (0, y.jsxs)(`div`, {
            style: { flex: 1, borderRight: `2px solid #000`, padding: `0` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  background: `#f5f5f5`,
                  padding: `4px 10px`,
                  fontSize: `8px`,
                  fontWeight: `700`,
                  borderBottom: `1px solid #ccc`,
                  letterSpacing: `0.5px`,
                },
                children: `FREIGHT CHARGES`,
              }),
              [
                [`Basic Freight`, t.freight],
                [
                  `Hamali (Loading/Unloading)`,
                  (t.loading || 0) + (t.unloading || 0),
                ],
                [`Insurance`, t.insurance],
                [`Other Charges`, t.otherCharges],
                [`GST Amount`, t.gstAmount],
              ].map(([e, t]) =>
                (0, y.jsxs)(
                  `div`,
                  {
                    style: {
                      display: `flex`,
                      justifyContent: `space-between`,
                      padding: `3px 10px`,
                      borderBottom: `1px solid #f0f0f0`,
                      fontSize: `10px`,
                    },
                    children: [
                      (0, y.jsx)(`span`, { children: e }),
                      (0, y.jsx)(`span`, {
                        style: { fontFamily: `monospace` },
                        children: t ? `₹ ${Number(t).toFixed(2)}` : ``,
                      }),
                    ],
                  },
                  e,
                ),
              ),
              (0, y.jsxs)(`div`, {
                style: {
                  display: `flex`,
                  justifyContent: `space-between`,
                  padding: `6px 10px`,
                  background: `#1a1a1a`,
                  color: `#fff`,
                  fontWeight: `900`,
                  fontSize: `12px`,
                },
                children: [
                  (0, y.jsx)(`span`, { children: `GRAND TOTAL` }),
                  (0, y.jsx)(`span`, {
                    children: l ? `₹ ${l.toFixed(2)}` : ``,
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `240px`,
              flexShrink: 0,
              padding: `8px 10px`,
              display: `flex`,
              flexDirection: `column`,
              gap: `8px`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                children: [
                  (0, y.jsx)(`div`, {
                    style: {
                      fontSize: `8px`,
                      fontWeight: `700`,
                      color: `#555`,
                      marginBottom: `4px`,
                      letterSpacing: `0.5px`,
                      textTransform: `uppercase`,
                    },
                    children: `Payment Mode`,
                  }),
                  [`TO PAY`, `PAID`, `TO BE BILLED`].map((e) =>
                    (0, y.jsxs)(
                      `label`,
                      {
                        style: {
                          display: `flex`,
                          alignItems: `center`,
                          gap: `6px`,
                          marginBottom: `5px`,
                          fontSize: `10px`,
                          fontWeight: `700`,
                          cursor: `default`,
                        },
                        children: [
                          (0, y.jsx)(`span`, {
                            style: {
                              width: `13px`,
                              height: `13px`,
                              border: `2px solid #000`,
                              display: `inline-block`,
                              flexShrink: 0,
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
                  borderTop: `1px solid #ccc`,
                  paddingTop: `6px`,
                  fontSize: `9px`,
                },
                children: [
                  (0, y.jsx)(`div`, {
                    style: { fontWeight: `700`, marginBottom: `3px` },
                    children: `SPECIAL INSTRUCTIONS:`,
                  }),
                  [1, 2, 3].map((e) =>
                    (0, y.jsx)(
                      `div`,
                      {
                        style: {
                          borderBottom: `1px dotted #ccc`,
                          minHeight: `16px`,
                          marginBottom: `3px`,
                        },
                      },
                      e,
                    ),
                  ),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  borderTop: `1px solid #ccc`,
                  paddingTop: `6px`,
                  fontSize: `9px`,
                },
                children: [
                  (0, y.jsx)(`div`, { children: `E-way Bill No.:` }),
                  (0, y.jsx)(`div`, {
                    style: {
                      borderBottom: `1px solid #000`,
                      minHeight: `16px`,
                      marginTop: `2px`,
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsx)(`table`, {
        style: { width: `100%`, borderCollapse: `collapse` },
        children: (0, y.jsx)(`tbody`, {
          children: (0, y.jsx)(`tr`, {
            children: [
              { label: `Loaded by / Sender`, sub: s(r.name) },
              {
                label: `Received by Driver`,
                sub: [s(a.driverName), s(a.number)].filter(Boolean).join(` | `),
              },
              { label: `Delivered by`, sub: `` },
              {
                label: `For ${s(n.companyName) || `Transport Co.`}`,
                sub: `Authorised Signatory`,
              },
            ].map(({ label: e, sub: t }) =>
              (0, y.jsx)(
                `td`,
                {
                  style: {
                    border: `1px solid #ccc`,
                    padding: `8px 10px`,
                    textAlign: `center`,
                    height: `60px`,
                    verticalAlign: `bottom`,
                  },
                  children: (0, y.jsxs)(`div`, {
                    style: { borderTop: `1px solid #000`, paddingTop: `4px` },
                    children: [
                      (0, y.jsx)(`div`, {
                        style: { fontWeight: `700`, fontSize: `9px` },
                        children: e,
                      }),
                      t &&
                        (0, y.jsx)(`div`, {
                          style: {
                            fontSize: `8px`,
                            color: `#555`,
                            marginTop: `2px`,
                          },
                          children: t,
                        }),
                    ],
                  }),
                },
                e,
              ),
            ),
          }),
        }),
      }),
      (0, y.jsxs)(`div`, {
        style: {
          padding: `4px 10px`,
          fontSize: `8px`,
          color: `#555`,
          borderTop: `1px solid #ccc`,
          lineHeight: `1.5`,
        },
        children: [
          (0, y.jsx)(`strong`, { children: `Terms & Conditions:` }),
          ` 1. Goods are transported at Owner's Risk unless otherwise stated. 2. Claims for loss/damage must be reported within 24 hours of delivery. 3. Company not liable for delays due to breakdown, accidents, or Acts of God. 4. Delivery against original challan only. 5. Subject to jurisdiction of booking station. 6. E&OE.`,
        ],
      }),
    ],
  });
}
