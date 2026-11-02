import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };

const Ok = (e) => {
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

export function Bilty({ data: e, totals: t }) {
  let {
      transportDetails: n,
      consignor: r,
      consignee: i,
      vehicle: a,
      goods: o,
    } = e,
    s = (e) => e || ``,
    c = (e, t = `140px`) =>
      (0, y.jsx)(`span`, {
        style: {
          borderBottom: `1px solid #b8540a`,
          display: `inline-block`,
          minWidth: t,
          paddingLeft: `4px`,
          verticalAlign: `bottom`,
          fontWeight: `700`,
        },
        children: s(e),
      }),
    l = t.grandTotal || 0,
    u = (t.loading || 0) + (t.unloading || 0);
  return (0, y.jsxs)(`div`, {
    id: `bill-a4-preview`,
    style: {
      width: `100%`,
      minHeight: `100%`,
      background: `#fff`,
      fontFamily: `Arial, Helvetica, sans-serif`,
      color: `#000`,
      fontSize: `11px`,
      border: `3px solid #b8540a`,
    },
    children: [
      (0, y.jsx)(`div`, {
        style: {
          height: `8px`,
          background: `linear-gradient(90deg, #e67e22, #d35400, #e67e22)`,
          borderBottom: `1px solid #b8540a`,
        },
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          alignItems: `stretch`,
          borderBottom: `2px solid #b8540a`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              width: `140px`,
              flexShrink: 0,
              borderRight: `2px solid #b8540a`,
              background: `#fef3e2`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              justifyContent: `center`,
              padding: `10px 8px`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  fontWeight: `700`,
                  letterSpacing: `1px`,
                  color: `#b8540a`,
                  textTransform: `uppercase`,
                  marginBottom: `4px`,
                },
                children: `LR NUMBER`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `30px`,
                  fontWeight: `900`,
                  color: `#d35400`,
                  lineHeight: `1`,
                  letterSpacing: `-1px`,
                },
                children: s(n.lrNo) || `\xA0`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  width: `100%`,
                  height: `1px`,
                  background: `#b8540a`,
                  margin: `6px 0`,
                },
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `9px`, color: `#666` },
                children: `Date`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `700`, fontSize: `11px`, color: `#333` },
                children: Ok(n.bookingDate),
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, textAlign: `center`, padding: `12px 10px` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  fontWeight: `700`,
                  color: `#b8540a`,
                  letterSpacing: `2px`,
                  textTransform: `uppercase`,
                  marginBottom: `4px`,
                },
                children: `॥ श्री गणेशाय नमः ॥`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `26px`,
                  fontWeight: `900`,
                  textTransform: `uppercase`,
                  letterSpacing: `0.5px`,
                  color: `#1a1a1a`,
                  lineHeight: `1.1`,
                },
                children: s(n.companyName) || `TRANSPORT COMPANY`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  display: `inline-block`,
                  background: `#d35400`,
                  color: `#fff`,
                  padding: `2px 14px`,
                  fontSize: `9px`,
                  fontWeight: `700`,
                  letterSpacing: `2px`,
                  marginTop: `4px`,
                  textTransform: `uppercase`,
                },
                children: `Transport Contractor & Fleet Owner`,
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `5px`, color: `#444` },
                children: [
                  s(n.branch),
                  n.city ? `, ${n.city}` : ``,
                  ` `,
                  n.state ? `— ${n.state}` : ``,
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `2px`, color: `#555` },
                children: [
                  n.phone && `Ph: ${n.phone}`,
                  ` `,
                  n.email && ` | ${n.email}`,
                ],
              }),
              n.gst &&
                (0, y.jsxs)(`div`, {
                  style: {
                    fontSize: `10px`,
                    fontWeight: `700`,
                    marginTop: `2px`,
                    color: `#b8540a`,
                  },
                  children: [`GSTIN: `, n.gst],
                }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `130px`,
              flexShrink: 0,
              borderLeft: `2px solid #b8540a`,
              background: `#fef3e2`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              justifyContent: `center`,
              padding: `8px`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  background: `#d35400`,
                  color: `#fff`,
                  fontWeight: `900`,
                  fontSize: `11px`,
                  letterSpacing: `1px`,
                  padding: `3px 12px`,
                  marginBottom: `8px`,
                  textAlign: `center`,
                },
                children: `BILTY`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `9px`, color: `#666` },
                children: `Bill No.`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `700`, fontSize: `14px`, color: `#333` },
                children: s(n.billNo) || `\xA0`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  width: `100%`,
                  height: `1px`,
                  background: `#b8540a`,
                  margin: `6px 0`,
                },
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `9px`, color: `#666` },
                children: `Vehicle No.`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `700`, fontSize: `12px`, color: `#333` },
                children: s(a.number) || `\xA0`,
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          background: `#fef3e2`,
          borderBottom: `2px solid #b8540a`,
          display: `flex`,
          alignItems: `center`,
          padding: `6px 12px`,
          gap: `8px`,
          fontSize: `11px`,
        },
        children: [
          (0, y.jsx)(`span`, {
            style: {
              fontWeight: `700`,
              color: `#b8540a`,
              whiteSpace: `nowrap`,
            },
            children: `FROM:`,
          }),
          c(r.city, `120px`),
          (0, y.jsx)(`span`, {
            style: {
              color: `#d35400`,
              fontSize: `18px`,
              fontWeight: `900`,
              padding: `0 6px`,
            },
            children: `→`,
          }),
          (0, y.jsx)(`span`, {
            style: {
              fontWeight: `700`,
              color: `#b8540a`,
              whiteSpace: `nowrap`,
            },
            children: `TO:`,
          }),
          c(i.city, `120px`),
          (0, y.jsx)(`span`, {
            style: {
              marginLeft: `auto`,
              fontWeight: `700`,
              color: `#b8540a`,
              whiteSpace: `nowrap`,
            },
            children: `Delivery Date:`,
          }),
          c(n.deliveryDate ? Ok(n.deliveryDate) : ``, `90px`),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderBottom: `2px solid #b8540a` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              borderRight: `2px solid #b8540a`,
              padding: `8px 12px`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontWeight: `700`,
                  fontSize: `9px`,
                  color: `#b8540a`,
                  letterSpacing: `1px`,
                  textTransform: `uppercase`,
                  marginBottom: `5px`,
                  borderBottom: `1px solid #e8c9a0`,
                  paddingBottom: `3px`,
                },
                children: `Consignor (Sender) M/s`,
              }),
              (0, y.jsxs)(`div`, {
                style: { lineHeight: `1.9`, fontSize: `11px` },
                children: [
                  (0, y.jsx)(`div`, { children: c(r.name, `250px`) }),
                  (0, y.jsx)(`div`, { children: c(r.address, `250px`) }),
                  (0, y.jsxs)(`div`, {
                    children: [
                      `City: `,
                      c(r.city, `90px`),
                      ` \xA0 State: `,
                      c(r.state, `80px`),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    children: [
                      `Mobile: `,
                      c(r.mobile, `100px`),
                      ` \xA0 GSTIN: `,
                      c(r.gst, `140px`),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, padding: `8px 12px` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontWeight: `700`,
                  fontSize: `9px`,
                  color: `#b8540a`,
                  letterSpacing: `1px`,
                  textTransform: `uppercase`,
                  marginBottom: `5px`,
                  borderBottom: `1px solid #e8c9a0`,
                  paddingBottom: `3px`,
                },
                children: `Consignee (Receiver) M/s`,
              }),
              (0, y.jsxs)(`div`, {
                style: { lineHeight: `1.9`, fontSize: `11px` },
                children: [
                  (0, y.jsx)(`div`, { children: c(i.name, `250px`) }),
                  (0, y.jsx)(`div`, { children: c(i.address, `250px`) }),
                  (0, y.jsxs)(`div`, {
                    children: [
                      `City: `,
                      c(i.city, `90px`),
                      ` \xA0 State: `,
                      c(i.state, `80px`),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    children: [
                      `Mobile: `,
                      c(i.mobile, `100px`),
                      ` \xA0 GSTIN: `,
                      c(i.gst, `140px`),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`table`, {
        style: {
          width: `100%`,
          borderCollapse: `collapse`,
          borderBottom: `2px solid #b8540a`,
        },
        children: [
          (0, y.jsx)(`thead`, {
            children: (0, y.jsxs)(`tr`, {
              style: { background: `#d35400`, color: `#fff` },
              children: [
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #b8540a`,
                    padding: `5px 8px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    width: `5%`,
                  },
                  children: `Sr.`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #b8540a`,
                    padding: `5px 8px`,
                    textAlign: `left`,
                    fontSize: `9px`,
                    width: `28%`,
                  },
                  children: `Description of Goods`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #b8540a`,
                    padding: `5px 8px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    width: `8%`,
                  },
                  children: `Pkgs`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #b8540a`,
                    padding: `5px 8px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    width: `10%`,
                  },
                  children: `Act. Wt.`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #b8540a`,
                    padding: `5px 8px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    width: `10%`,
                  },
                  children: `Chg. Wt.`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #b8540a`,
                    padding: `5px 8px`,
                    textAlign: `right`,
                    fontSize: `9px`,
                    width: `10%`,
                  },
                  children: `Rate`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #b8540a`,
                    padding: `5px 8px`,
                    textAlign: `right`,
                    fontSize: `9px`,
                    width: `12%`,
                  },
                  children: `Freight (₹)`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #b8540a`,
                    padding: `5px 8px`,
                    textAlign: `right`,
                    fontSize: `9px`,
                    width: `10%`,
                  },
                  children: `Hamali`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #b8540a`,
                    padding: `5px 8px`,
                    textAlign: `right`,
                    fontSize: `9px`,
                    width: `12%`,
                  },
                  children: `Total (₹)`,
                }),
              ],
            }),
          }),
          (0, y.jsxs)(`tbody`, {
            children: [
              o.map((e, t) => {
                let n = (Number(e.loading) || 0) + (Number(e.unloading) || 0),
                  r = Number(e.freight) || 0,
                  i =
                    (Number(e.insurance) || 0) + (Number(e.otherCharges) || 0),
                  a = r + n + i;
                return (0, y.jsxs)(
                  `tr`,
                  {
                    style: { background: t % 2 == 0 ? `#fff` : `#fef9f3` },
                    children: [
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #e8c9a0`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                          color: `#888`,
                        },
                        children: t + 1,
                      }),
                      (0, y.jsxs)(`td`, {
                        style: {
                          border: `1px solid #e8c9a0`,
                          padding: `5px 8px`,
                        },
                        children: [
                          (0, y.jsx)(`div`, {
                            style: { fontWeight: `700` },
                            children: s(e.itemName),
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
                          border: `1px solid #e8c9a0`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                        },
                        children: s(e.packages),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #e8c9a0`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                        },
                        children: s(e.weight),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #e8c9a0`,
                          padding: `5px 8px`,
                          textAlign: `center`,
                        },
                        children: s(e.weight),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #e8c9a0`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                        },
                        children:
                          e.rate === `` ? `` : Number(e.rate).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #e8c9a0`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                          fontWeight: `700`,
                        },
                        children: r ? r.toFixed(2) : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #e8c9a0`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                        },
                        children: n ? n.toFixed(2) : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #e8c9a0`,
                          padding: `5px 8px`,
                          textAlign: `right`,
                          fontWeight: `700`,
                          color: `#d35400`,
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
                    style: {
                      height: `26px`,
                      background: (o.length + t) % 2 == 0 ? `#fff` : `#fef9f3`,
                    },
                    children: [...Array(9)].map((e, t) =>
                      (0, y.jsx)(
                        `td`,
                        { style: { border: `1px solid #e8c9a0` } },
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
        style: { display: `flex`, borderBottom: `2px solid #b8540a` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              borderRight: `2px solid #b8540a`,
              padding: `8px 12px`,
              fontSize: `10px`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                style: { marginBottom: `6px` },
                children: [
                  `Value of Goods: Rs. `,
                  (0, y.jsx)(`span`, {
                    style: {
                      borderBottom: `1px solid #b8540a`,
                      display: `inline-block`,
                      minWidth: `120px`,
                    },
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { marginBottom: `6px` },
                children: [
                  `Driver: `,
                  c(a.driverName, `100px`),
                  ` \xA0 Ph: `,
                  c(a.driverMobile, `90px`),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { marginBottom: `8px` },
                children: [`Lic. No.: `, c(a.driverLicense, `130px`)],
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontWeight: `700`,
                  fontSize: `9px`,
                  color: `#b8540a`,
                  marginBottom: `4px`,
                },
                children: `PAYMENT MODE:`,
              }),
              (0, y.jsx)(`div`, {
                style: { display: `flex`, gap: `12px` },
                children: [`TO PAY`, `PAID`, `TO BE BILLED`].map((e) =>
                  (0, y.jsxs)(
                    `label`,
                    {
                      style: {
                        display: `flex`,
                        alignItems: `center`,
                        gap: `5px`,
                        fontWeight: `700`,
                        fontSize: `10px`,
                      },
                      children: [
                        (0, y.jsx)(`span`, {
                          style: {
                            width: `13px`,
                            height: `13px`,
                            border: `2px solid #b8540a`,
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
              }),
            ],
          }),
          (0, y.jsx)(`div`, {
            style: { width: `220px`, flexShrink: 0 },
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
                    [`Hamali (Ld/Uld)`, u],
                    [`Insurance`, t.insurance],
                    [`Other Charges`, t.otherCharges],
                    [`GST`, t.gstAmount],
                  ].map(([e, t]) =>
                    (0, y.jsxs)(
                      `tr`,
                      {
                        children: [
                          (0, y.jsx)(`td`, {
                            style: {
                              border: `1px solid #e8c9a0`,
                              padding: `4px 8px`,
                              width: `60%`,
                            },
                            children: e,
                          }),
                          (0, y.jsx)(`td`, {
                            style: {
                              border: `1px solid #e8c9a0`,
                              padding: `4px 8px`,
                              textAlign: `right`,
                              fontFamily: `monospace`,
                              width: `40%`,
                            },
                            children: t ? `₹ ${Number(t).toFixed(2)}` : ``,
                          }),
                        ],
                      },
                      e,
                    ),
                  ),
                  (0, y.jsxs)(`tr`, {
                    style: { background: `#d35400`, color: `#fff` },
                    children: [
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #b8540a`,
                          padding: `6px 8px`,
                          fontWeight: `900`,
                          fontSize: `11px`,
                          width: `60%`,
                        },
                        children: `GRAND TOTAL`,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #b8540a`,
                          padding: `6px 8px`,
                          textAlign: `right`,
                          fontWeight: `900`,
                          fontSize: `13px`,
                          fontFamily: `monospace`,
                          width: `40%`,
                        },
                        children: l ? `₹ ${l.toFixed(2)}` : ``,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      (0, y.jsx)(`table`, {
        style: { width: `100%`, borderCollapse: `collapse` },
        children: (0, y.jsx)(`tbody`, {
          children: (0, y.jsx)(`tr`, {
            children: [
              `Consignor Signature`,
              `Receiver Signature`,
              `Booking Clerk`,
              `For ${s(n.companyName) || `Transport Co.`}`,
            ].map((e) =>
              (0, y.jsx)(
                `td`,
                {
                  style: {
                    border: `1px solid #e8c9a0`,
                    padding: `8px 10px`,
                    textAlign: `center`,
                    height: `55px`,
                    verticalAlign: `bottom`,
                  },
                  children: (0, y.jsxs)(`div`, {
                    style: {
                      borderTop: `1px solid #b8540a`,
                      paddingTop: `4px`,
                      fontSize: `9px`,
                      fontWeight: `700`,
                      color: e.startsWith(`For`) ? `#d35400` : `#333`,
                    },
                    children: [
                      e,
                      e.startsWith(`For`) &&
                        (0, y.jsx)(`div`, {
                          style: {
                            fontSize: `8px`,
                            color: `#666`,
                            fontWeight: `normal`,
                          },
                          children: `Authorised Signatory`,
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
          color: `#666`,
          borderTop: `1px solid #e8c9a0`,
          lineHeight: `1.5`,
        },
        children: [
          (0, y.jsx)(`strong`, {
            style: { color: `#b8540a` },
            children: `Terms & Conditions:`,
          }),
          ` 1. Goods carried at Owner's Risk. 2. Claims within 24 hrs of delivery. 3. Delivery against original bilty only. 4. Subject to jurisdiction of booking station. 5. E&OE.`,
        ],
      }),
      (0, y.jsx)(`div`, {
        style: {
          height: `6px`,
          background: `linear-gradient(90deg, #e67e22, #d35400, #e67e22)`,
        },
      }),
    ],
  });
}
