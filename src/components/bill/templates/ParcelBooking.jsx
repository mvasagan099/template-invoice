import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };

const Tk = (e) => {
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

export function ParcelBooking({ data: e, totals: t }) {
  let {
      transportDetails: n,
      consignor: r,
      consignee: i,
      vehicle: a,
      goods: o,
    } = e,
    s = (e) => e || ``,
    c = (e, t = `200px`) =>
      (0, y.jsx)(`span`, {
        style: {
          borderBottom: `1px solid #000`,
          display: `inline-block`,
          minWidth: t,
          paddingLeft: `4px`,
          verticalAlign: `bottom`,
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
    },
    children: [
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          alignItems: `center`,
          paddingBottom: `6px`,
          borderBottom: `2px solid #000`,
        },
        children: [
          e.settings?.logo &&
            (0, y.jsx)(`div`, {
              style: {
                width: `75px`,
                flexShrink: 0,
                padding: `6px`,
                textAlign: `center`,
              },
              children: (0, y.jsx)(`img`, {
                src: e.settings.logo,
                alt: `Logo`,
                style: {
                  maxWidth: `65px`,
                  maxHeight: `65px`,
                  objectFit: `contain`,
                },
              }),
            }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, textAlign: `center` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `30px`,
                  fontWeight: `900`,
                  color: `red`,
                  textTransform: `uppercase`,
                  letterSpacing: `1px`,
                  fontFamily: `Impact, Arial Black, sans-serif`,
                  lineHeight: `1`,
                },
                children: s(n.companyName) || `BABA TRANSPORT COMPANY`,
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `11px`, marginTop: `3px` },
                children: `Transport Contractor & Leading Road Carrier`,
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `2px` },
                children: [
                  s(n.branch),
                  n.city ? `, ${n.city}` : ``,
                  ` `,
                  n.state ? `— ${n.state}` : ``,
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `2px` },
                children: [
                  n.phone && `Mob: ${n.phone}`,
                  ` `,
                  n.email && `| ${n.email}`,
                ],
              }),
              (0, y.jsx)(`div`, {
                style: {
                  marginTop: `6px`,
                  fontSize: `14px`,
                  fontWeight: `700`,
                  color: `red`,
                  letterSpacing: `1px`,
                  textDecoration: `underline`,
                },
                children: `CONSIGNEE COPY`,
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `130px`,
              flexShrink: 0,
              textAlign: `right`,
              fontSize: `9px`,
              padding: `4px 8px`,
            },
            children: [
              n.phone && (0, y.jsx)(`div`, { children: n.phone }),
              n.website && (0, y.jsx)(`div`, { children: n.website }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          borderBottom: `1px solid #000`,
          alignItems: `stretch`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              width: `200px`,
              flexShrink: 0,
              borderRight: `1px solid #000`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  padding: `3px 6px`,
                  fontSize: `9px`,
                  fontWeight: `700`,
                  letterSpacing: `0.5px`,
                },
                children: `CONSIGNMENT NOTE NO.`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `28px`,
                  fontWeight: `900`,
                  color: `red`,
                  padding: `2px 8px 4px`,
                  lineHeight: `1.1`,
                },
                children: s(n.lrNo) || `______`,
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  borderTop: `1px solid #000`,
                  padding: `3px 6px`,
                  fontSize: `10px`,
                },
                children: [`Date : `, c(Tk(n.bookingDate), `90px`)],
              }),
            ],
          }),
          (0, y.jsx)(`div`, {
            style: {
              flex: 1,
              borderRight: `1px solid #000`,
              padding: `6px 10px`,
              fontSize: `10px`,
            },
            children:
              n.gst &&
              (0, y.jsxs)(`div`, {
                style: { fontWeight: `700`, fontSize: `9px` },
                children: [`GSTIN: `, n.gst],
              }),
          }),
          (0, y.jsxs)(`div`, {
            style: { width: `180px`, flexShrink: 0 },
            children: [
              (0, y.jsxs)(`div`, {
                style: {
                  border: `1px solid #000`,
                  margin: `4px`,
                  padding: `4px 8px`,
                  fontSize: `10px`,
                  display: `flex`,
                  gap: `6px`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { whiteSpace: `nowrap`, fontWeight: `700` },
                    children: `Vehicle No.`,
                  }),
                  (0, y.jsx)(`span`, {
                    style: { fontWeight: `700`, minWidth: `70px` },
                    children: s(a.number),
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  border: `1px solid #000`,
                  margin: `4px`,
                  padding: `4px 8px`,
                  fontSize: `10px`,
                  display: `flex`,
                  gap: `6px`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { whiteSpace: `nowrap`, fontWeight: `700` },
                    children: `From :`,
                  }),
                  (0, y.jsx)(`span`, {
                    style: { fontWeight: `700`, minWidth: `70px` },
                    children: s(r.city),
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  border: `1px solid #000`,
                  margin: `4px`,
                  padding: `4px 8px`,
                  fontSize: `10px`,
                  display: `flex`,
                  gap: `6px`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { whiteSpace: `nowrap`, fontWeight: `700` },
                    children: `To :`,
                  }),
                  (0, y.jsx)(`span`, {
                    style: { fontWeight: `700`, minWidth: `70px` },
                    children: s(i.city),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          padding: `4px 8px`,
          borderBottom: `1px solid #000`,
          fontSize: `11px`,
        },
        children: [
          `Consignor's Name & Address M/S. `,
          c(r.name ? `${s(r.name)}, ${s(r.address)}` : ``, `450px`),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          padding: `4px 8px`,
          borderBottom: `1px solid #000`,
          fontSize: `10px`,
          display: `flex`,
          gap: `20px`,
        },
        children: [
          (0, y.jsxs)(`span`, { children: [`GST No. : `, c(r.gst, `200px`)] }),
          (0, y.jsxs)(`span`, {
            children: [`Invoice No. : `, c(n.billNo, `100px`)],
          }),
          (0, y.jsxs)(`span`, {
            children: [`Date : `, c(Tk(n.bookingDate), `80px`)],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          padding: `4px 8px`,
          borderBottom: `1px solid #000`,
          fontSize: `11px`,
        },
        children: [
          `Consignee's Bank's Name & Address M/S. `,
          c(i.name ? `${s(i.name)}, ${s(i.address)}` : ``, `420px`),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          padding: `4px 8px`,
          borderBottom: `2px solid #000`,
          fontSize: `10px`,
        },
        children: [
          `GST No. : `,
          c(i.gst, `200px`),
          ` \xA0\xA0 Ph : `,
          c(i.mobile, `120px`),
        ],
      }),
      (0, y.jsxs)(`table`, {
        style: {
          width: `100%`,
          borderCollapse: `collapse`,
          borderBottom: `2px solid #000`,
        },
        children: [
          (0, y.jsxs)(`thead`, {
            children: [
              (0, y.jsxs)(`tr`, {
                children: [
                  (0, y.jsx)(`th`, {
                    rowSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      width: `9%`,
                      fontSize: `10px`,
                    },
                    children: `Packages`,
                  }),
                  (0, y.jsx)(`th`, {
                    rowSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      width: `35%`,
                      fontSize: `10px`,
                    },
                    children: `Description (Said to Contain)`,
                  }),
                  (0, y.jsx)(`th`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      fontSize: `10px`,
                    },
                    children: `weight`,
                  }),
                  (0, y.jsx)(`th`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      fontSize: `10px`,
                    },
                    children: `Amount to Pay / Paid`,
                  }),
                  (0, y.jsxs)(`th`, {
                    rowSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      width: `9%`,
                      fontSize: `10px`,
                    },
                    children: [`To be`, (0, y.jsx)(`br`, {}), `billed`],
                  }),
                ],
              }),
              (0, y.jsxs)(`tr`, {
                children: [
                  (0, y.jsxs)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px 4px`,
                      textAlign: `center`,
                      fontSize: `9px`,
                      width: `10%`,
                    },
                    children: [`Actual`, (0, y.jsx)(`br`, {}), `Kgs.`],
                  }),
                  (0, y.jsxs)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px 4px`,
                      textAlign: `center`,
                      fontSize: `9px`,
                      width: `10%`,
                    },
                    children: [`Charged`, (0, y.jsx)(`br`, {}), `Kgs.`],
                  }),
                  (0, y.jsx)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px 4px`,
                      textAlign: `center`,
                      fontSize: `9px`,
                      width: `12%`,
                    },
                    children: `Rs.`,
                  }),
                  (0, y.jsx)(`th`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px 4px`,
                      textAlign: `center`,
                      fontSize: `9px`,
                      width: `5%`,
                    },
                    children: `P.`,
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`tbody`, {
            children: [
              o.map((e, t) => {
                let n =
                  (Number(e.freight) || 0) +
                  (Number(e.loading) || 0) +
                  (Number(e.unloading) || 0) +
                  (Number(e.insurance) || 0) +
                  (Number(e.otherCharges) || 0);
                return (0, y.jsxs)(
                  `tr`,
                  {
                    style: { height: `30px` },
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
                          fontFamily: `monospace`,
                          fontWeight: `700`,
                        },
                        children: n ? Math.floor(n) : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `center`,
                          fontFamily: `monospace`,
                        },
                        children: n ? `00` : ``,
                      }),
                      (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                    ],
                  },
                  e.id || t,
                );
              }),
              Array.from({ length: Math.max(0, 5 - o.length) }).map((e, t) =>
                (0, y.jsx)(
                  `tr`,
                  {
                    style: { height: `26px` },
                    children: [...Array(7)].map((e, t) =>
                      (0, y.jsx)(
                        `td`,
                        { style: { border: `1px solid #000` } },
                        t,
                      ),
                    ),
                  },
                  `f${t}`,
                ),
              ),
              (0, y.jsxs)(`tr`, {
                style: { height: `22px` },
                children: [
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: { border: `1px solid #000` },
                  }),
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `3px 6px`,
                      textAlign: `right`,
                      fontSize: `10px`,
                    },
                    children: `Hammali`,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px`,
                      textAlign: `right`,
                      fontFamily: `monospace`,
                    },
                    children: u ? Math.floor(u) : ``,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `1px solid #000`,
                      padding: `3px`,
                      textAlign: `center`,
                      fontFamily: `monospace`,
                    },
                    children: u ? `00` : ``,
                  }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                ],
              }),
              (0, y.jsxs)(`tr`, {
                style: { fontWeight: `700` },
                children: [
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: { border: `1px solid #000` },
                  }),
                  (0, y.jsx)(`td`, {
                    colSpan: `2`,
                    style: {
                      border: `1px solid #000`,
                      padding: `4px 6px`,
                      textAlign: `right`,
                      fontWeight: `900`,
                    },
                    children: `Total`,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `2px solid #000`,
                      padding: `4px`,
                      textAlign: `right`,
                      fontWeight: `900`,
                      fontFamily: `monospace`,
                    },
                    children: l ? Math.floor(l) : ``,
                  }),
                  (0, y.jsx)(`td`, {
                    style: {
                      border: `2px solid #000`,
                      padding: `4px`,
                      textAlign: `center`,
                      fontWeight: `900`,
                      fontFamily: `monospace`,
                    },
                    children: l ? `00` : ``,
                  }),
                  (0, y.jsx)(`td`, { style: { border: `1px solid #000` } }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
          padding: `6px 10px`,
          borderBottom: `1px solid #000`,
          flexWrap: `wrap`,
          gap: `8px`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: { fontSize: `11px` },
            children: [`Value of Goods : Rs. `, c(``, `100px`)],
          }),
          (0, y.jsx)(`div`, {
            style: { display: `flex`, gap: `10px`, alignItems: `center` },
            children: [`TO PAY`, `TO BE BILLED`, `PAID`].map((e) =>
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
                        width: `14px`,
                        height: `14px`,
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
          }),
          (0, y.jsxs)(`div`, {
            style: {
              fontWeight: `900`,
              fontSize: `11px`,
              color: `red`,
              fontStyle: `italic`,
            },
            children: [
              `for `,
              (0, y.jsx)(`span`, {
                style: { textTransform: `uppercase` },
                children: s(n.companyName) || `BABA TRANSPORT COMPANY`,
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          justifyContent: `space-between`,
          padding: `6px 12px 6px`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: { fontSize: `10px` },
            children: [
              (0, y.jsxs)(`div`, {
                style: { marginBottom: `4px` },
                children: [`Driver: `, c(a.driverName, `120px`)],
              }),
              (0, y.jsxs)(`div`, {
                children: [`Driver Lic.: `, c(a.driverLicense, `110px`)],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { textAlign: `right` },
            children: [
              (0, y.jsx)(`div`, { style: { height: `36px` } }),
              (0, y.jsx)(`div`, {
                style: { fontWeight: `700`, fontSize: `10px` },
                children: `Authorised Signatory`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
