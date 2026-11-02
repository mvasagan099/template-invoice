import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };

const xk = (e) => {
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

export function ConsignmentNote({ data: e, totals: t }) {
  let {
      transportDetails: n,
      consignor: r,
      consignee: i,
      vehicle: a,
      goods: o,
    } = e,
    s = (e) => e ?? ``,
    c = t.freight || 0,
    l = (t.loading || 0) + (t.unloading || 0),
    u = Number(t.otherCharges) || 0,
    d = t.grandTotal || 0;
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
      lineHeight: `1.4`,
    },
    children: [
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          justifyContent: `space-between`,
          borderBottom: `1px solid #000`,
          padding: `3px 8px`,
          fontSize: `9px`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            children: [
              (0, y.jsx)(`strong`, { children: `PAN NO.` }),
              ` `,
              n.gst ? n.gst.substring(2, 12) : ``,
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              textAlign: `center`,
              fontWeight: `900`,
              fontSize: `10px`,
              letterSpacing: `1px`,
            },
            children: [
              `॥ JAI SIDH BABA ॥`,
              (0, y.jsx)(`br`, {}),
              (0, y.jsx)(`span`, {
                style: { fontSize: `8px`, fontWeight: `normal` },
                children: `Subject to Jurisdiction only`,
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { textAlign: `right`, fontSize: `9px` },
            children: [
              n.phone && (0, y.jsxs)(`div`, { children: [`Ph.: `, n.phone] }),
              n.email && (0, y.jsx)(`div`, { children: n.email }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          borderBottom: `2px solid #000`,
          alignItems: `center`,
        },
        children: [
          e.settings?.logo &&
            (0, y.jsx)(`div`, {
              style: {
                width: `80px`,
                padding: `6px`,
                flexShrink: 0,
                textAlign: `center`,
              },
              children: (0, y.jsx)(`img`, {
                src: e.settings.logo,
                alt: `Logo`,
                style: {
                  maxWidth: `70px`,
                  maxHeight: `70px`,
                  objectFit: `contain`,
                },
              }),
            }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, textAlign: `center`, padding: `6px` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `30px`,
                  fontWeight: `900`,
                  textTransform: `uppercase`,
                  letterSpacing: `1px`,
                  fontFamily: `Impact, Arial Black, sans-serif`,
                  lineHeight: `1`,
                },
                children: s(n.companyName),
              }),
              (0, y.jsx)(`div`, {
                style: {
                  background: `#000`,
                  color: `#fff`,
                  fontSize: `10px`,
                  fontWeight: `700`,
                  padding: `2px 16px`,
                  display: `inline-block`,
                  marginTop: `3px`,
                  letterSpacing: `2px`,
                },
                children: `FLEET OWNER'S & TRANSPORT CONTRACTOR`,
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `3px` },
                children: [s(n.branch), ` `, n.city ? `, ${n.city}` : ``],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `90px`,
              padding: `6px`,
              flexShrink: 0,
              textAlign: `center`,
              borderLeft: `1px solid #000`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: { fontSize: `10px`, fontWeight: `700` },
                children: `No.`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `18px`,
                  fontWeight: `900`,
                  color: `#000`,
                  borderBottom: `2px solid #000`,
                  paddingBottom: `4px`,
                },
                children: s(n.lrNo),
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderBottom: `1px solid #000` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              width: `220px`,
              borderRight: `1px solid #000`,
              padding: `5px`,
              fontSize: `7.5px`,
              lineHeight: `1.4`,
              flexShrink: 0,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontWeight: `700`,
                  fontSize: `9px`,
                  textDecoration: `underline`,
                  marginBottom: `3px`,
                  textAlign: `center`,
                },
                children: `Notice`,
              }),
              `The Consignment covered by this set of special Lorry receipt from shall be stored at the destination under the control of the transport operator & shall be delivered to or the order of the Consignee bank whose name is mentioned in the lorry receipt. It will under no circumstances be delivered to any one without written authority from the Consignee Bank or its order enclosed on the Consignee Copy or on separate letter of authority.`,
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              borderRight: `1px solid #000`,
              padding: `5px`,
              fontSize: `9px`,
              textAlign: `center`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                style: {
                  fontWeight: `700`,
                  fontSize: `10px`,
                  textDecoration: `underline`,
                  marginBottom: `4px`,
                },
                children: [
                  `AT OWNER'S RISK / CARRIER'S RISK`,
                  (0, y.jsx)(`br`, {}),
                  `INSURANCE`,
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `9px`, marginBottom: `6px` },
                children: [
                  `The Customer has stated that`,
                  (0, y.jsx)(`br`, {}),
                  `he has not insured the consignment`,
                  (0, y.jsx)(`br`, {}),
                  (0, y.jsx)(`strong`, { children: `OR` }),
                  (0, y.jsx)(`br`, {}),
                  `he has insured the consignment`,
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `9px`, textAlign: `left` },
                children: [
                  (0, y.jsxs)(`div`, {
                    children: [
                      `Company `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `120px`,
                        },
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    style: { marginTop: `3px` },
                    children: [
                      `Policy No. `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `60px`,
                        },
                      }),
                      ` Date `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `60px`,
                        },
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    style: { marginTop: `3px` },
                    children: [
                      `Amount `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `50px`,
                        },
                      }),
                      ` Risk `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `60px`,
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { width: `180px`, flexShrink: 0, fontSize: `9px` },
            children: [
              (0, y.jsxs)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  padding: `4px 6px`,
                  display: `flex`,
                  gap: `4px`,
                },
                children: [
                  (0, y.jsx)(`strong`, { children: `Date :` }),
                  (0, y.jsx)(`span`, {
                    style: {
                      borderBottom: `1px solid #000`,
                      flex: 1,
                      paddingLeft: `4px`,
                    },
                    children: s(n.bookingDate) || xk(``),
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  padding: `4px 6px`,
                  display: `flex`,
                  gap: `4px`,
                },
                children: [
                  (0, y.jsx)(`strong`, { children: `From` }),
                  (0, y.jsx)(`span`, {
                    style: {
                      borderBottom: `1px solid #000`,
                      flex: 1,
                      fontWeight: `700`,
                      paddingLeft: `4px`,
                    },
                    children: s(r.city),
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  padding: `4px 6px`,
                  display: `flex`,
                  gap: `4px`,
                },
                children: [
                  (0, y.jsx)(`strong`, { children: `To` }),
                  (0, y.jsx)(`span`, {
                    style: {
                      borderBottom: `1px solid #000`,
                      flex: 1,
                      fontWeight: `700`,
                      paddingLeft: `4px`,
                    },
                    children: s(i.city),
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { borderBottom: `1px solid #000`, padding: `4px 6px` },
                children: [
                  (0, y.jsx)(`strong`, { children: `Truck Trailer No.` }),
                  (0, y.jsx)(`br`, {}),
                  (0, y.jsx)(`span`, {
                    style: { fontWeight: `700` },
                    children: s(a.number),
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { padding: `4px 6px` },
                children: [
                  (0, y.jsx)(`div`, {
                    style: { fontWeight: `700`, fontSize: `9px` },
                    children: `Delivery Address`,
                  }),
                  (0, y.jsx)(`div`, {
                    style: { fontWeight: `900`, fontSize: `14px` },
                    children: `Door Delivery`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderBottom: `1px solid #000` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `5px 8px`,
              borderRight: `1px solid #000`,
              minHeight: `60px`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `10px`,
                  fontWeight: `700`,
                  marginBottom: `4px`,
                },
                children: `Consignor :`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `700` },
                children: s(r.name),
              }),
              (0, y.jsxs)(`div`, { children: [s(r.address), `, `, s(r.city)] }),
              r.mobile &&
                (0, y.jsxs)(`div`, { children: [`Ph: `, s(r.mobile)] }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, padding: `5px 8px`, minHeight: `60px` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `10px`,
                  fontWeight: `700`,
                  marginBottom: `4px`,
                },
                children: `Consignee :`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `700` },
                children: s(i.name),
              }),
              (0, y.jsxs)(`div`, { children: [s(i.address), `, `, s(i.city)] }),
              i.mobile &&
                (0, y.jsxs)(`div`, { children: [`Ph: `, s(i.mobile)] }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          borderBottom: `1px solid #000`,
          fontSize: `10px`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `3px 8px`,
              borderRight: `1px solid #000`,
            },
            children: [`TIN No. `, s(r.gst)],
          }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, padding: `3px 8px` },
            children: [`TIN No. `, s(i.gst)],
          }),
        ],
      }),
      (0, y.jsxs)(`table`, {
        style: {
          width: `100%`,
          borderCollapse: `collapse`,
          borderBottom: `1px solid #000`,
        },
        children: [
          (0, y.jsxs)(`thead`, {
            children: [
              (0, y.jsxs)(`tr`, {
                children: [
                  (0, y.jsxs)(`th`, {
                    rowSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      width: `8%`,
                      fontSize: `9px`,
                    },
                    children: [`No. of`, (0, y.jsx)(`br`, {}), `Pkgs.`],
                  }),
                  (0, y.jsx)(`th`, {
                    rowSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      width: `30%`,
                      fontSize: `9px`,
                    },
                    children: `DESCRIPTION (Said to contain)`,
                  }),
                  (0, y.jsx)(`th`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      width: `14%`,
                      fontSize: `9px`,
                    },
                    children: `WEIGHT`,
                  }),
                  (0, y.jsx)(`th`, {
                    rowSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      width: `8%`,
                      fontSize: `9px`,
                    },
                    children: `Rate`,
                  }),
                  (0, y.jsx)(`th`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      width: `18%`,
                      fontSize: `9px`,
                    },
                    children: `TO PAY`,
                  }),
                  (0, y.jsx)(`th`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      width: `18%`,
                      fontSize: `9px`,
                    },
                    children: `PAID`,
                  }),
                ],
              }),
              (0, y.jsxs)(`tr`, {
                children: [
                  (0, y.jsx)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px`,
                      textAlign: `center`,
                      fontSize: `8px`,
                    },
                    children: `Actual`,
                  }),
                  (0, y.jsx)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px`,
                      textAlign: `center`,
                      fontSize: `8px`,
                    },
                    children: `Charged`,
                  }),
                  (0, y.jsx)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px`,
                      textAlign: `center`,
                      fontSize: `8px`,
                    },
                    children: `Rs.`,
                  }),
                  (0, y.jsx)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px`,
                      textAlign: `center`,
                      fontSize: `8px`,
                    },
                    children: `Ps.`,
                  }),
                  (0, y.jsx)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px`,
                      textAlign: `center`,
                      fontSize: `8px`,
                    },
                    children: `Rs.`,
                  }),
                  (0, y.jsx)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px`,
                      textAlign: `center`,
                      fontSize: `8px`,
                    },
                    children: `Ps.`,
                  }),
                ],
              }),
            ],
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
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `center`,
                          verticalAlign: `top`,
                        },
                        children: s(e.packages),
                      }),
                      (0, y.jsxs)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          verticalAlign: `top`,
                        },
                        children: [
                          (0, y.jsx)(`div`, {
                            style: { fontWeight: `700` },
                            children: s(e.itemName),
                          }),
                          e.description &&
                            (0, y.jsx)(`div`, {
                              style: { fontSize: `9px` },
                              children: e.description,
                            }),
                        ],
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `center`,
                        },
                        children: s(e.weight),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `center`,
                        },
                        children: s(e.weight),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `right`,
                        },
                        children:
                          e.rate === `` ? `` : Number(e.rate).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `right`,
                          fontWeight: `700`,
                        },
                        children:
                          e.freight === `` ? `` : Math.floor(Number(e.freight)),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `center`,
                        },
                        children: e.freight === `` ? `` : `00`,
                      }),
                      (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                      (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                    ],
                  },
                  e.id || t,
                ),
              ),
              (0, y.jsxs)(`tr`, {
                style: { height: `26px` },
                children: [
                  (0, y.jsxs)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      fontSize: `9px`,
                    },
                    children: [
                      `Bill No. `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `80px`,
                        },
                        children: s(n.billNo),
                      }),
                    ],
                  }),
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      fontSize: `9px`,
                      textAlign: `right`,
                    },
                    children: `G. Wt.`,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                      fontSize: `9px`,
                      fontWeight: `700`,
                    },
                    children: `Freight`,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                    },
                    children: c ? Math.floor(c) : ``,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                    },
                    children: c ? `00` : ``,
                  }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                ],
              }),
              (0, y.jsxs)(`tr`, {
                style: { height: `22px` },
                children: [
                  (0, y.jsxs)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      fontSize: `9px`,
                    },
                    children: [
                      `T. P. No. `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `80px`,
                        },
                      }),
                    ],
                  }),
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      fontSize: `9px`,
                      textAlign: `right`,
                    },
                    children: `T. Wt.`,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                      fontSize: `9px`,
                      fontWeight: `700`,
                    },
                    children: `Service Tax`,
                  }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                ],
              }),
              (0, y.jsxs)(`tr`, {
                style: { height: `22px` },
                children: [
                  (0, y.jsxs)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      fontSize: `9px`,
                    },
                    children: [
                      `Sr. Tax `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `80px`,
                        },
                      }),
                    ],
                  }),
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      fontSize: `9px`,
                      textAlign: `right`,
                    },
                    children: `N. Wt.`,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                      fontSize: `9px`,
                      fontWeight: `700`,
                    },
                    children: `Hamali`,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                    },
                    children: l ? Math.floor(l) : ``,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                    },
                    children: l ? `00` : ``,
                  }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                ],
              }),
              (0, y.jsxs)(`tr`, {
                style: { height: `22px` },
                children: [
                  (0, y.jsxs)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      fontSize: `9px`,
                    },
                    children: [
                      `Advance `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `80px`,
                        },
                      }),
                    ],
                  }),
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: { border: `1px solid #000` },
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                      fontSize: `9px`,
                      fontWeight: `700`,
                    },
                    children: `Advance`,
                  }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                ],
              }),
              (0, y.jsxs)(`tr`, {
                style: { height: `22px` },
                children: [
                  (0, y.jsxs)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      fontSize: `9px`,
                    },
                    children: [
                      `Value Rs. `,
                      (0, y.jsx)(`span`, {
                        style: {
                          borderBottom: `1px solid #000`,
                          display: `inline-block`,
                          minWidth: `80px`,
                        },
                      }),
                    ],
                  }),
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: { border: `1px solid #000` },
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                      fontSize: `9px`,
                      fontWeight: `700`,
                    },
                    children: `S.T. Charges`,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                    },
                    children: u ? Math.floor(u) : ``,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                    },
                    children: u ? `00` : ``,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                    },
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                    },
                  }),
                ],
              }),
              (0, y.jsxs)(`tr`, {
                children: [
                  (0, y.jsx)(`td`, {
                    colSpan: `5`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                      fontWeight: `900`,
                      fontSize: `11px`,
                    },
                    children: `TOTAL`,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `2px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                      fontWeight: `900`,
                    },
                    children: d ? Math.floor(d) : ``,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `2px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      fontWeight: `900`,
                    },
                    children: d ? `00` : ``,
                  }),
                  (0, y.jsx)(`td`, {
                    style: { border: `2px solid #000`, padding: `4px` },
                  }),
                  (0, y.jsx)(`td`, {
                    style: { border: `2px solid #000`, padding: `4px` },
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
          borderTop: `1px solid #000`,
          fontSize: `9px`,
          alignItems: `stretch`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `5px 8px`,
              borderRight: `1px solid #000`,
            },
            children: [
              (0, y.jsx)(`div`, {
                children: `The consignment note issued subject to terms and condition Printed overleaf`,
              }),
              (0, y.jsx)(`div`, {
                children: `We are responsible for the Leakage & Breakage`,
              }),
              (0, y.jsxs)(`div`, {
                style: { marginTop: `5px`, fontWeight: `700` },
                children: [
                  `To Pay Rs. `,
                  (0, y.jsx)(`span`, {
                    style: {
                      borderBottom: `1px solid #000`,
                      display: `inline-block`,
                      minWidth: `80px`,
                    },
                    children: d ? `₹${d.toFixed(2)}` : ``,
                  }),
                  ` Only`,
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `200px`,
              padding: `5px 8px`,
              borderRight: `1px solid #000`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontWeight: `700`,
                  marginBottom: `4px`,
                  textAlign: `center`,
                },
                children: `Person Liable for Paying Service Tax`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  display: `flex`,
                  gap: `12px`,
                  justifyContent: `center`,
                },
                children: [`Consignor`, `Consignee`, `Transport`].map((e) =>
                  (0, y.jsxs)(
                    `label`,
                    {
                      style: {
                        display: `flex`,
                        alignItems: `center`,
                        gap: `3px`,
                      },
                      children: [
                        (0, y.jsx)(`span`, {
                          style: {
                            width: `10px`,
                            height: `10px`,
                            border: `1px solid #000`,
                            display: `inline-block`,
                          },
                        }),
                        ` `,
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
            style: {
              width: `160px`,
              textAlign: `center`,
              padding: `5px 8px`,
              display: `flex`,
              alignItems: `flex-end`,
              justifyContent: `center`,
            },
            children: (0, y.jsxs)(`div`, {
              style: {
                fontWeight: `900`,
                fontSize: `10px`,
                textTransform: `uppercase`,
              },
              children: [`For `, s(n.companyName)],
            }),
          }),
        ],
      }),
    ],
  });
}
