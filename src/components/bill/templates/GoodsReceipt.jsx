import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

const y = { jsx, jsxs, Fragment };

const Ck = (e) => {
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

export function GoodsReceipt({ data: e, totals: t }) {
  let {
      transportDetails: n,
      consignor: r,
      consignee: i,
      vehicle: a,
      goods: o,
    } = e,
    s = (e) => e ?? ``,
    c = (e, t = `160px`) =>
      (0, y.jsx)(`span`, {
        style: {
          borderBottom: `1px dotted #000`,
          display: `inline-block`,
          minWidth: t,
          paddingLeft: `4px`,
          verticalAlign: `bottom`,
        },
        children: s(e),
      });
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
          justifyContent: `space-between`,
          padding: `5px 10px`,
          borderBottom: `1px solid #000`,
          fontSize: `10px`,
        },
        children: [
          (0, y.jsxs)(`div`, {
            style: { fontStyle: `italic` },
            children: [
              `All Disputes Subject to `,
              n.city,
              ` Jurisdiction`,
            ],
          }),
          (0, y.jsx)(`div`, {
            style: {
              fontWeight: `900`,
              fontSize: `12px`,
              letterSpacing: `1px`,
            },
            children: `CONSIGNEE COPY`,
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          display: `flex`,
          alignItems: `center`,
          borderBottom: `2px solid #000`,
          padding: `8px 10px`,
        },
        children: [
          e.settings?.logo &&
            (0, y.jsx)(`div`, {
              style: { width: `90px`, flexShrink: 0, marginRight: `10px` },
              children: (0, y.jsx)(`img`, {
                src: e.settings.logo,
                alt: `Logo`,
                style: {
                  maxWidth: `80px`,
                  maxHeight: `60px`,
                  objectFit: `contain`,
                },
              }),
            }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, textAlign: `center` },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  fontSize: `28px`,
                  fontWeight: `900`,
                  color: `#e07820`,
                  textTransform: `uppercase`,
                  letterSpacing: `1px`,
                  fontFamily: `Impact, Arial Black, sans-serif`,
                  lineHeight: `1`,
                },
                children: s(n.companyName),
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `4px` },
                children: [s(n.branch), n.city ? `, ${n.city}` : ``],
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `9px`, marginTop: `2px` },
                children: [
                  n.phone && `Phone: ${n.phone}`,
                  ` `,
                  n.email && `  E-mail: ${n.email}`,
                ],
              }),
              (0, y.jsx)(`div`, {
                style: { fontSize: `9px`, marginTop: `2px`, fontWeight: `700` },
                children: n.gst && `GSTIN: ${n.gst}`,
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `120px`,
              flexShrink: 0,
              textAlign: `right`,
              fontSize: `10px`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: { fontWeight: `700` },
                children: `S. No. EXIM`,
              }),
              (0, y.jsx)(`div`, {
                style: {
                  borderBottom: `1px solid #000`,
                  minHeight: `18px`,
                  marginTop: `4px`,
                },
                children: s(n.lrNo),
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: {
          padding: `6px 10px`,
          borderBottom: `1px solid #000`,
          fontSize: `11px`,
        },
        children: [
          `From `,
          c(r.city, `140px`),
          ` To `,
          c(i.city, `140px`),
          ` Date `,
          (0, y.jsx)(`span`, {
            style: {
              borderBottom: `1px dotted #000`,
              display: `inline-block`,
              minWidth: `100px`,
              paddingLeft: `4px`,
              verticalAlign: `bottom`,
            },
            children: Ck(n.bookingDate),
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderBottom: `1px solid #000` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `6px 10px`,
              borderRight: `1px solid #000`,
            },
            children: [
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px` },
                children: [`Consignor M/s `, c(r.name, `160px`)],
              }),
              (0, y.jsx)(`div`, {
                style: {
                  borderBottom: `1px dotted #000`,
                  minHeight: `18px`,
                  marginTop: `6px`,
                },
                children: s(r.address),
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  borderBottom: `1px dotted #000`,
                  minHeight: `18px`,
                  marginTop: `4px`,
                },
                children: [s(r.city), ` `, s(r.state)],
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `4px` },
                children: [`GSTIN `, c(r.gst, `160px`)],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: { flex: 1, padding: `6px 10px` },
            children: [
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px` },
                children: [`Consignee M/s `, c(i.name, `150px`)],
              }),
              (0, y.jsx)(`div`, {
                style: {
                  borderBottom: `1px dotted #000`,
                  minHeight: `18px`,
                  marginTop: `6px`,
                },
                children: s(i.address),
              }),
              (0, y.jsxs)(`div`, {
                style: {
                  borderBottom: `1px dotted #000`,
                  minHeight: `18px`,
                  marginTop: `4px`,
                },
                children: [s(i.city), ` `, s(i.state)],
              }),
              (0, y.jsxs)(`div`, {
                style: { fontSize: `10px`, marginTop: `4px` },
                children: [`GSTIN `, c(i.gst, `150px`)],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, borderBottom: `1px solid #000` },
        children: [
          (0, y.jsxs)(`div`, {
            style: { flex: `1 1 65%`, borderRight: `1px solid #000` },
            children: [
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
                            width: `12%`,
                            fontSize: `9px`,
                          },
                          children: [
                            `No. of`,
                            (0, y.jsx)(`br`, {}),
                            `Articles`,
                          ],
                        }),
                        (0, y.jsx)(`th`, {
                          style: {
                            border: `1px solid #000`,
                            padding: `4px`,
                            textAlign: `center`,
                            width: `40%`,
                            fontSize: `9px`,
                          },
                          children: `ITEM`,
                        }),
                        (0, y.jsx)(`th`, {
                          style: {
                            border: `1px solid #000`,
                            padding: `4px`,
                            textAlign: `center`,
                            width: `20%`,
                            fontSize: `9px`,
                          },
                          children: `WEIGHT`,
                        }),
                        (0, y.jsx)(`th`, {
                          style: {
                            border: `1px solid #000`,
                            padding: `4px`,
                            textAlign: `center`,
                            width: `28%`,
                            fontSize: `9px`,
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
                            style: { height: `26px` },
                            children: [
                              (0, y.jsx)(`td`, {
                                style: {
                                  border: `1px solid #000`,
                                  padding: `4px`,
                                  textAlign: `center`,
                                },
                                children: s(e.packages),
                              }),
                              (0, y.jsx)(`td`, {
                                style: {
                                  border: `1px solid #000`,
                                  padding: `4px`,
                                  fontWeight: e.itemName ? `700` : `normal`,
                                },
                                children: s(e.itemName),
                              }),
                              (0, y.jsx)(`td`, {
                                style: {
                                  border: `1px solid #000`,
                                  padding: `4px`,
                                  textAlign: `center`,
                                },
                                children: e.weight
                                  ? `${s(e.weight)} ${s(e.unit)}`
                                  : ``,
                              }),
                              (0, y.jsx)(`td`, {
                                style: {
                                  border: `1px solid #000`,
                                  padding: `4px`,
                                  fontSize: `9px`,
                                },
                                children: s(e.remarks),
                              }),
                            ],
                          },
                          e.id || t,
                        ),
                      ),
                      Array.from({ length: Math.max(0, 4 - o.length) }).map(
                        (e, t) =>
                          (0, y.jsxs)(
                            `tr`,
                            {
                              style: { height: `26px` },
                              children: [
                                (0, y.jsx)(`td`, {
                                  style: { border: `1px solid #000` },
                                }),
                                (0, y.jsx)(`td`, {
                                  style: { border: `1px solid #000` },
                                }),
                                (0, y.jsx)(`td`, {
                                  style: { border: `1px solid #000` },
                                }),
                                (0, y.jsx)(`td`, {
                                  style: { border: `1px solid #000` },
                                }),
                              ],
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
                  padding: `4px 8px`,
                  fontSize: `10px`,
                  lineHeight: `1.9`,
                  borderTop: `1px solid #000`,
                },
                children: [
                  (0, y.jsxs)(`div`, {
                    children: [`Truck No. `, c(a.number, `160px`)],
                  }),
                  (0, y.jsxs)(`div`, {
                    children: [`Container No. `, c(``, `140px`)],
                  }),
                  (0, y.jsxs)(`div`, {
                    children: [`Party Invoice `, c(n.billNo, `140px`)],
                  }),
                  (0, y.jsxs)(`div`, {
                    children: [`BE No/Ch. No. `, c(``, `130px`)],
                  }),
                  (0, y.jsxs)(`div`, {
                    children: [
                      `BE Date `,
                      c(``, `80px`),
                      ` Seal No. `,
                      c(``, `70px`),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    children: [`E-way Bill No. `, c(``, `130px`)],
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsx)(`div`, {
            style: { flex: `1 1 35%` },
            children: (0, y.jsxs)(`table`, {
              style: {
                width: `100%`,
                borderCollapse: `collapse`,
                height: `100%`,
              },
              children: [
                (0, y.jsxs)(`thead`, {
                  children: [
                    (0, y.jsxs)(`tr`, {
                      children: [
                        (0, y.jsx)(`th`, {
                          style: {
                            border: `1px solid #000`,
                            padding: `4px`,
                            textAlign: `center`,
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
                            fontSize: `9px`,
                          },
                          children: `Paid`,
                        }),
                        (0, y.jsx)(`th`, {
                          colSpan: `2`,
                          style: {
                            border: `1px solid #000`,
                            padding: `4px`,
                            textAlign: `center`,
                            fontSize: `9px`,
                          },
                          children: `To Pay`,
                        }),
                      ],
                    }),
                    (0, y.jsxs)(`tr`, {
                      children: [
                        (0, y.jsx)(`th`, {
                          style: {
                            border: `1px solid #000`,
                            padding: `3px`,
                            fontSize: `8px`,
                          },
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
                          children: `P.`,
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
                          children: `P.`,
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
                          style: { height: `26px` },
                          children: [
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
                                e.freight === ``
                                  ? ``
                                  : Math.floor(Number(e.freight)),
                            }),
                            (0, y.jsx)(`td`, {
                              style: {
                                border: `1px solid #000`,
                                padding: `4px`,
                                textAlign: `center`,
                              },
                              children: e.freight === `` ? `` : `00`,
                            }),
                            (0, y.jsx)(`td`, {
                              style: { border: `1px solid #000` },
                            }),
                            (0, y.jsx)(`td`, {
                              style: { border: `1px solid #000` },
                            }),
                          ],
                        },
                        e.id || t,
                      ),
                    ),
                    Array.from({ length: Math.max(0, 4 - o.length) }).map(
                      (e, t) =>
                        (0, y.jsx)(
                          `tr`,
                          {
                            style: { height: `26px` },
                            children: [...[, , , , ,]].map((e, t) =>
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
                      style: { height: `26px` },
                      children: [
                        (0, y.jsx)(`td`, {
                          style: {
                            border: `1px solid #000`,
                            padding: `4px`,
                            textAlign: `right`,
                            fontSize: `9px`,
                            fontWeight: `700`,
                          },
                          children: `GST`,
                        }),
                        (0, y.jsx)(`td`, {
                          style: {
                            border: `1px solid #000`,
                            padding: `4px`,
                            textAlign: `right`,
                          },
                          children: t.gstAmount ? Math.floor(t.gstAmount) : ``,
                        }),
                        (0, y.jsx)(`td`, {
                          style: {
                            border: `1px solid #000`,
                            padding: `4px`,
                            textAlign: `center`,
                          },
                          children: t.gstAmount ? `00` : ``,
                        }),
                        (0, y.jsx)(`td`, {
                          style: { border: `1px solid #000` },
                        }),
                        (0, y.jsx)(`td`, {
                          style: { border: `1px solid #000` },
                        }),
                      ],
                    }),
                    (0, y.jsxs)(`tr`, {
                      children: [
                        (0, y.jsx)(`td`, {
                          style: {
                            border: `2px solid #000`,
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
                          children: t.grandTotal
                            ? Math.floor(t.grandTotal)
                            : ``,
                        }),
                        (0, y.jsx)(`td`, {
                          style: {
                            border: `2px solid #000`,
                            padding: `4px`,
                            textAlign: `center`,
                            fontWeight: `900`,
                          },
                          children: t.grandTotal ? `00` : ``,
                        }),
                        (0, y.jsx)(`td`, {
                          style: { border: `2px solid #000` },
                        }),
                        (0, y.jsx)(`td`, {
                          style: { border: `2px solid #000` },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        style: { display: `flex`, fontSize: `8.5px`, alignItems: `stretch` },
        children: [
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `5px 8px`,
              borderRight: `1px solid #000`,
              lineHeight: `1.4`,
            },
            children: [
              (0, y.jsx)(`strong`, { children: `P. Marks` }),
              ` PERSON LIABLE TO PAY GST IS CONSIGNOR/`,
              (0, y.jsx)(`br`, {}),
              `CONSIGNEE/TRANSPORTER/NOT APPLICABLE`,
              (0, y.jsx)(`br`, {}),
              (0, y.jsx)(`em`, {
                style: { fontSize: `8px` },
                children: `(This G.C. Note is issued to the condition printed overleaf carriers Act III of 1865)`,
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              flex: 1,
              padding: `5px 8px`,
              borderRight: `1px solid #000`,
              lineHeight: `1.4`,
              fontSize: `8px`,
              color: `#333`,
            },
            children: [
              `खराब कंडीशन पर जमीन नज़र बिन पैसे लिखे सील के नम्बर से मिलान कर लें। यदि नम्बर में गड़बड़ हो तो सील खोलने से पहले `,
              n.phone,
              ` पर सम्पर्क करें।`,
            ],
          }),
          (0, y.jsxs)(`div`, {
            style: {
              width: `160px`,
              flexShrink: 0,
              textAlign: `center`,
              padding: `5px 8px`,
              display: `flex`,
              alignItems: `flex-end`,
              justifyContent: `center`,
              fontWeight: `900`,
              fontSize: `9px`,
            },
            children: [`For `, s(n.companyName)],
          }),
        ],
      }),
    ],
  });
}
