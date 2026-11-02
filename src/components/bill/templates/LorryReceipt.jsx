import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };

const yk = (e) => {
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

export function LorryReceipt({ data: e, totals: t }) {
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
      fontFamily: `Arial, Helvetica, sans-serif`,
      color: `#000`,
      fontSize: `11px`,
      border: `2px solid #000`,
    },
    children: [
      (0, y.jsxs)(`div`, {
        style: {
          borderBottom: `2px solid #000`,
          display: `flex`,
          alignItems: `stretch`,
        },
        children: [
          e.settings?.logo &&
            (0, y.jsx)(`div`, {
              style: {
                width: `70px`,
                borderRight: `2px solid #000`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                flexShrink: 0,
                background: `#fff`,
                padding: `4px`,
              },
              children: (0, y.jsx)(`img`, {
                src: e.settings.logo,
                alt: `Logo`,
                style: {
                  maxWidth: `60px`,
                  maxHeight: `60px`,
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
                  fontFamily: `Times New Roman, serif`,
                  fontSize: `28px`,
                  fontWeight: `900`,
                  color: `#1a3a7c`,
                  letterSpacing: `0.5px`,
                  textTransform: `uppercase`,
                  lineHeight: `1`,
                },
                children: s(n.companyName),
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `4px` },
                children: [
                  s(n.branch),
                  n.city ? ` — ${n.city}` : ``,
                  ` `,
                  n.phone ? `Ph: ${n.phone}` : ``,
                ],
              }),
              n.gst &&
                (0, y.jsxs)(`div`, {
                  style: {
                    fontSize: `10px`,
                    fontWeight: `700`,
                    marginTop: `2px`,
                  },
                  children: [`GSTIN : `, n.gst],
                }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `150px`,
              flexShrink: 0,
              fontSize: `9px`,
              padding: `6px 8px`,
              textAlign: `right`,
              lineHeight: `1.6`,
            },
            children: [
              n.phone &&
                (0, y.jsxs)(y.Fragment, {
                  children: [
                    (0, y.jsx)(`strong`, { children: `OFFICE :` }),
                    (0, y.jsx)(`br`, {}),
                    n.phone,
                    (0, y.jsx)(`br`, {}),
                  ],
                }),
              n.email &&
                (0, y.jsxs)(y.Fragment, {
                  children: [n.email, (0, y.jsx)(`br`, {})],
                }),
              n.website && (0, y.jsx)(y.Fragment, { children: n.website }),
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
              width: `120px`,
              borderRight: `1px solid #000`,
              padding: `4px 6px`,
              flexShrink: 0,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  fontWeight: `700`,
                  letterSpacing: `0.5px`,
                },
                children: `G. C. No.`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `18px`,
                  fontWeight: `900`,
                  color: `#1a3a7c`,
                  lineHeight: `1`,
                },
                children: s(n.lrNo),
              }),
              (0, y.jsx)(`div`, {
                style: {
                  borderTop: `1px solid #000`,
                  borderBottom: `1px solid #000`,
                  padding: `4px`,
                },
                children:
                  n.lrNo &&
                  (0, y.jsx)(`span`, {
                    style: { fontFamily: `monospace`, letterSpacing: `2px` },
                    children: n.lrNo,
                  }),
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `9px`, padding: `3px` },
                children: [`Dated: `, yk(n.bookingDate)],
              }),
            ],
          }),
          (0, y.jsx)(`div`, {
            style: {
              flex: 1,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              borderRight: `1px solid #000`,
            },
            children: (0, y.jsx)(`div`, {
              style: {
                background: `#1a3a7c`,
                color: `#fff`,
                fontSize: `16px`,
                fontWeight: `900`,
                padding: `5px 24px`,
                letterSpacing: `3px`,
              },
              children: `DRIVER'S COPY`,
            }),
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `100px`,
              borderRight: `1px solid #000`,
              padding: `4px 6px`,
              flexShrink: 0,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: { fontSize: `9px`, padding: `3px` },
                children: `DATE`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontWeight: `700`,
                  fontSize: `12px`,
                  marginTop: `4px`,
                },
                children: yk(n.bookingDate),
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `70px`,
              borderRight: `1px solid #000`,
              padding: `4px 6px`,
              flexShrink: 0,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  fontWeight: `700`,
                  textAlign: `center`,
                  borderBottom: `1px solid #000`,
                  paddingBottom: `2px`,
                },
                children: `TO PAY`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  fontWeight: `700`,
                  textAlign: `center`,
                  paddingTop: `2px`,
                },
                children: `PAID`,
              }),
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
              flex: 1,
              padding: `4px 6px`,
              borderRight: `1px solid #000`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  fontWeight: `700`,
                  marginBottom: `3px`,
                },
                children: `CONSIGNOR'S NAME & ADDRESS`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  minHeight: `16px`,
                  fontWeight: `700`,
                },
                children: s(r.name),
              }),
              (0, y.jsx)(`div`, {
                style: { borderBottom: `1px solid #000`, minHeight: `16px` },
                children: s(r.address),
              }),
              (0, y.jsxs)(`div`, {
                style: { borderBottom: `1px solid #000`, minHeight: `16px` },
                children: [s(r.city), ` `, s(r.state), ` `, s(r.pincode)],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `160px`,
              flexShrink: 0,
              display: `flex`,
              flexDirection: `column`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  padding: `3px 6px`,
                  fontSize: `9px`,
                  display: `flex`,
                  justifyContent: `space-between`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { fontWeight: `700` },
                    children: `DATE`,
                  }),
                  (0, y.jsx)(`span`, { children: s(n.bookingDate) }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  padding: `3px 6px`,
                  fontSize: `9px`,
                  display: `flex`,
                  justifyContent: `space-between`,
                },
                children: [
                  (0, y.jsxs)(`span`, {
                    style: { fontWeight: `700` },
                    children: [`NO. OF`, (0, y.jsx)(`br`, {}), `ARTICLE`],
                  }),
                  (0, y.jsx)(`span`, {
                    style: {
                      fontWeight: `700`,
                      fontSize: `14px`,
                      alignSelf: `center`,
                    },
                    children: o[0]?.packages || ``,
                  }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  padding: `3px 6px`,
                  fontSize: `9px`,
                  display: `flex`,
                  justifyContent: `space-between`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { fontWeight: `700` },
                    children: `P.M. NO.`,
                  }),
                  (0, y.jsx)(`span`, { children: s(n.billNo) }),
                ],
              }),
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
              flex: 1,
              padding: `4px 6px`,
              borderRight: `1px solid #000`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `9px`,
                  fontWeight: `700`,
                  marginBottom: `3px`,
                },
                children: `CONSIGNEE'S NAME & ADDRESS`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  minHeight: `16px`,
                  fontWeight: `700`,
                },
                children: s(i.name),
              }),
              (0, y.jsx)(`div`, {
                style: { borderBottom: `1px solid #000`, minHeight: `16px` },
                children: s(i.address),
              }),
              (0, y.jsxs)(`div`, {
                style: { borderBottom: `1px solid #000`, minHeight: `16px` },
                children: [s(i.city), ` `, s(i.state), ` `, s(i.pincode)],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `160px`,
              flexShrink: 0,
              display: `flex`,
              flexDirection: `column`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  padding: `3px 6px`,
                  fontSize: `9px`,
                  display: `flex`,
                  justifyContent: `space-between`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { fontWeight: `700` },
                    children: `Vehicle No.`,
                  }),
                  (0, y.jsx)(`span`, { children: s(a.number) }),
                ],
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  padding: `3px 6px`,
                  fontSize: `9px`,
                },
                children: [
                  (0, y.jsx)(`span`, {
                    style: { fontWeight: `700` },
                    children: `ACTUAL WEIGHT`,
                  }),
                  (0, y.jsx)(`span`, {
                    style: { float: `right` },
                    children: o[0]?.weight ? `${o[0].weight} ${o[0].unit}` : ``,
                  }),
                ],
              }),
              (0, y.jsx)(`div`, {
                style: { padding: `3px 6px`, fontSize: `9px` },
                children: (0, y.jsx)(`span`, {
                  style: { fontWeight: `700` },
                  children: `CHARGED WEIGHT`,
                }),
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
              children: [
                (0, y.jsxs)(`th`, {
                  style: {
                    border: `1px solid #000`,
                    padding: `4px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    fontWeight: `700`,
                    background: `#f0f0f0`,
                  },
                  children: [`NO. OF`, (0, y.jsx)(`br`, {}), `PKGS`],
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #000`,
                    padding: `4px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    fontWeight: `700`,
                    background: `#f0f0f0`,
                    width: `40%`,
                  },
                  children: `DESCRIPTION / SAID TO CONTAIN`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #000`,
                    padding: `4px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    fontWeight: `700`,
                    background: `#f0f0f0`,
                  },
                  children: `RATE`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #000`,
                    padding: `4px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    fontWeight: `700`,
                    background: `#f0f0f0`,
                  },
                  children: `FREIGHT (Rs.)`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #000`,
                    padding: `4px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    fontWeight: `700`,
                    background: `#f0f0f0`,
                  },
                  children: `HAMALI`,
                }),
                (0, y.jsx)(`th`, {
                  style: {
                    border: `1px solid #000`,
                    padding: `4px`,
                    textAlign: `center`,
                    fontSize: `9px`,
                    fontWeight: `700`,
                    background: `#f0f0f0`,
                  },
                  children: `OTHER`,
                }),
              ],
            }),
          }),
          (0, y.jsxs)(`tbody`, {
            children: [
              o.map((e, t) => {
                let n = (Number(e.loading) || 0) + (Number(e.unloading) || 0),
                  r =
                    (Number(e.insurance) || 0) + (Number(e.otherCharges) || 0);
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
                          (0, y.jsx)(`strong`, { children: s(e.itemName) }),
                          e.description &&
                            (0, y.jsx)(`div`, {
                              style: { fontSize: `10px` },
                              children: e.description,
                            }),
                        ],
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `right`,
                          verticalAlign: `top`,
                        },
                        children:
                          e.rate === `` ? `` : Number(e.rate).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `right`,
                          verticalAlign: `top`,
                          fontWeight: `700`,
                        },
                        children:
                          e.freight === `` ? `` : Number(e.freight).toFixed(2),
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `right`,
                          verticalAlign: `top`,
                        },
                        children: n ? n.toFixed(2) : ``,
                      }),
                      (0, y.jsx)(`td`, {
                        style: {
                          border: `1px solid #000`,
                          padding: `4px`,
                          textAlign: `right`,
                          verticalAlign: `top`,
                        },
                        children: r ? r.toFixed(2) : ``,
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
                    children: [...[, , , , , ,]].map((e, t) =>
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
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          borderTop: `2px solid #000`,
          alignItems: `stretch`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `5px 8px`,
              borderRight: `1px solid #000`,
              fontSize: `11px`,
            },
            children: [
              (0, y.jsx)(`strong`, { children: `GSTIN :` }),
              ` `,
              (0, y.jsx)(`span`, {
                style: { letterSpacing: `1px` },
                children: s(r.gst),
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `180px`,
              flexShrink: 0,
              background: `#1a3a7c`,
              color: `#fff`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
              padding: `5px 10px`,
            },
            children: [
              (0, y.jsx)(`span`, {
                style: {
                  fontWeight: `700`,
                  fontSize: `13px`,
                  letterSpacing: `1px`,
                },
                children: `G. TOTAL`,
              }),
              (0, y.jsx)(`span`, {
                style: { fontWeight: `900`, fontSize: `14px` },
                children: t.grandTotal ? `₹ ${t.grandTotal.toFixed(2)}` : ``,
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          borderTop: `1px solid #000`,
          alignItems: `stretch`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `5px 8px`,
              borderRight: `1px solid #000`,
              fontSize: `9px`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                children: [
                  `Service Tax Registered No.: `,
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
                style: { marginTop: `4px`, fontSize: `8px`, color: `#444` },
                children: [
                  `Subject to `,
                  n.city,
                  ` Jurisdiction only. Goods are carried at owner's risk. Claims within 24 hrs. E&OE.`,
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `180px`,
              flexShrink: 0,
              textAlign: `right`,
              padding: `5px 8px`,
            },
            children: [
              (0, y.jsx)(`div`, { style: { height: `30px` } }),
              (0, y.jsx)(`div`, {
                style: {
                  borderTop: `1px solid #000`,
                  paddingTop: `3px`,
                  fontSize: `10px`,
                  fontWeight: `700`,
                  textAlign: `center`,
                },
                children: `Signature`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
