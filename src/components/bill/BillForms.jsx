import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { BILL_PRESETS } from "../../constants/billPresets.js";
import { BillExtraFields } from './BillExtraFields.jsx';

const y = { jsx, jsxs, Fragment };

export function BillForms({
  data: e,
  totals: t,
  updateSection: n,
  updateGoods: r,
  addGoodsRow: i,
  removeGoodsRow: a,
  duplicateGoodsRow: o,
  setData: s,
}) {
  let c = (e, t) => (r) => {
      n(e, t, r.target.value);
    },
    l = (e, t) => (n) => {
      r(e, t, n.target.value);
    };
  return (0, y.jsxs)(`div`, {
    className: `bill-forms`,
    children: [
      (0, y.jsxs)(`div`, {
        className: `bill-section`,
        style: { marginBottom: `12px` },
        children: [
          (0, y.jsx)(`h3`, {
            className: `bill-section-title`,
            children: `Company Logo`,
          }),
          (0, y.jsxs)(`div`, {
            style: {
              display: `flex`,
              alignItems: `center`,
              gap: `14px`,
              padding: `10px 14px`,
            },
            children: [
              (0, y.jsx)(`div`, {
                style: {
                  width: `80px`,
                  height: `80px`,
                  border: `2px dashed #d1d5db`,
                  borderRadius: `8px`,
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `center`,
                  overflow: `hidden`,
                  flexShrink: 0,
                  background: `#f9fafb`,
                },
                children: e.settings.logo
                  ? (0, y.jsx)(`img`, {
                      src: e.settings.logo,
                      alt: `Logo`,
                      style: {
                        width: `100%`,
                        height: `100%`,
                        objectFit: `contain`,
                      },
                    })
                  : (0, y.jsxs)(`span`, {
                      style: {
                        fontSize: `9px`,
                        color: `#9ca3af`,
                        textAlign: `center`,
                        lineHeight: `1.3`,
                      },
                      children: [`No`, (0, y.jsx)(`br`, {}), `Logo`],
                    }),
              }),
              (0, y.jsxs)(`div`, {
                style: { display: `flex`, flexDirection: `column`, gap: `8px` },
                children: [
                  (0, y.jsxs)(`label`, {
                    style: {
                      display: `inline-flex`,
                      alignItems: `center`,
                      gap: `6px`,
                      background: `#3b82f6`,
                      color: `#fff`,
                      borderRadius: `6px`,
                      padding: `7px 14px`,
                      fontSize: `12px`,
                      fontWeight: `600`,
                      cursor: `pointer`,
                      userSelect: `none`,
                      whiteSpace: `nowrap`,
                    },
                    children: [
                      `📁 Upload Logo`,
                      (0, y.jsx)(`input`, {
                        type: `file`,
                        accept: `image/*`,
                        style: { display: `none` },
                        onChange: (e) => {
                          let t = e.target.files[0];
                          if (!t) return;
                          if (!t.type.startsWith(`image/`)) {
                            alert(
                              `Please select an image file (PNG, JPG, SVG, etc.)`,
                            );
                            return;
                          }
                          let r = new FileReader();
                          ((r.onload = (e) => {
                            n(`settings`, `logo`, e.target.result);
                          }),
                            r.readAsDataURL(t));
                        },
                      }),
                    ],
                  }),
                  e.settings.logo &&
                    (0, y.jsx)(`button`, {
                      onClick: () => {
                        n(`settings`, `logo`, ``);
                      },
                      style: {
                        background: `#fee2e2`,
                        color: `#dc2626`,
                        border: `1px solid #fca5a5`,
                        borderRadius: `6px`,
                        padding: `6px 14px`,
                        fontSize: `12px`,
                        fontWeight: `600`,
                        cursor: `pointer`,
                      },
                      children: `✕ Remove Logo`,
                    }),
                  (0, y.jsxs)(`span`, {
                    style: {
                      fontSize: `10px`,
                      color: `#9ca3af`,
                      lineHeight: `1.3`,
                    },
                    children: [
                      `PNG, JPG, SVG supported.`,
                      (0, y.jsx)(`br`, {}),
                      `Shown in all bill templates.`,
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        className: `bill-section`,
        children: [
          (0, y.jsxs)(`h3`, {
            className: `bill-section-title`,
            children: [
              `Transport Details`,
              (0, y.jsxs)(`select`, {
                className: `bill-input`,
                style: { width: `auto`, fontSize: `12px`, padding: `4px 8px` },
                onChange: (e) => {
                  let t = Number(e.target.value);
                  if (!t) return;
                  let n = BILL_PRESETS.find((e) => e.id === t);
                  n &&
                    s((e) => ({
                      ...e,
                      transportDetails: {
                        ...e.transportDetails,
                        companyName: n.companyName,
                        branch: n.branch,
                        city: n.city,
                        state: n.state,
                        phone: n.phone,
                        email: n.email,
                        website: n.website,
                        gst: n.gst,
                      },
                    }));
                },
                defaultValue: ``,
                children: [
                  (0, y.jsx)(`option`, {
                    value: ``,
                    disabled: !0,
                    children: `Select Preset Company`,
                  }),
                  BILL_PRESETS.map((e) =>
                    (0, y.jsx)(
                      `option`,
                      { value: e.id, children: e.companyName },
                      e.id,
                    ),
                  ),
                ],
              }),
            ],
          }),
          (0, y.jsx)(`div`, {
            className: `bill-section-body`,
            children: (0, y.jsxs)(`div`, {
              className: `bill-grid`,
              children: [
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Company Name`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.companyName,
                      onChange: c(`transportDetails`, `companyName`),
                      placeholder: `e.g. Speed Logistics`,
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Branch`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.branch,
                      onChange: c(`transportDetails`, `branch`),
                      placeholder: `e.g. Mumbai Head Office`,
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `GST Number`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.gst,
                      onChange: c(`transportDetails`, `gst`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Phone`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.phone,
                      onChange: c(`transportDetails`, `phone`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Email`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.email,
                      onChange: c(`transportDetails`, `email`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Website`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.website,
                      onChange: c(`transportDetails`, `website`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `City`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.city,
                      onChange: c(`transportDetails`, `city`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `State`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.state,
                      onChange: c(`transportDetails`, `state`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `LR Number`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.lrNo,
                      onChange: c(`transportDetails`, `lrNo`),
                      placeholder: `LR-12345`,
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Bill Number`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.transportDetails.billNo,
                      onChange: c(`transportDetails`, `billNo`),
                      placeholder: `BILL-998`,
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Booking Date`,
                    }),
                    (0, y.jsx)(`input`, {
                      type: `date`,
                      className: `bill-input`,
                      value: e.transportDetails.bookingDate,
                      onChange: c(`transportDetails`, `bookingDate`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Delivery Date`,
                    }),
                    (0, y.jsx)(`input`, {
                      type: `date`,
                      className: `bill-input`,
                      value: e.transportDetails.deliveryDate,
                      onChange: c(`transportDetails`, `deliveryDate`),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      <BillExtraFields key="booking-instructions" data={e} updateSection={n} />,
      (0, y.jsxs)(`div`, {
        className: `bill-grid`,
        children: [
          (0, y.jsxs)(`div`, {
            className: `bill-section`,
            children: [
              (0, y.jsx)(`h3`, {
                className: `bill-section-title`,
                children: `Consignor (Sender)`,
              }),
              (0, y.jsxs)(`div`, {
                className: `bill-section-body`,
                children: [
                  (0, y.jsxs)(`div`, {
                    className: `bill-field`,
                    children: [
                      (0, y.jsx)(`label`, {
                        className: `bill-label`,
                        children: `Name`,
                      }),
                      (0, y.jsx)(`input`, {
                        className: `bill-input`,
                        value: e.consignor.name,
                        onChange: c(`consignor`, `name`),
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    className: `bill-field`,
                    children: [
                      (0, y.jsx)(`label`, {
                        className: `bill-label`,
                        children: `GSTIN`,
                      }),
                      (0, y.jsx)(`input`, {
                        className: `bill-input`,
                        value: e.consignor.gst,
                        onChange: c(`consignor`, `gst`),
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    className: `bill-field`,
                    children: [
                      (0, y.jsx)(`label`, {
                        className: `bill-label`,
                        children: `Address`,
                      }),
                      (0, y.jsx)(`input`, {
                        className: `bill-input`,
                        value: e.consignor.address,
                        onChange: c(`consignor`, `address`),
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    className: `bill-grid`,
                    children: [
                      (0, y.jsxs)(`div`, {
                        className: `bill-field`,
                        children: [
                          (0, y.jsx)(`label`, {
                            className: `bill-label`,
                            children: `City`,
                          }),
                          (0, y.jsx)(`input`, {
                            className: `bill-input`,
                            value: e.consignor.city,
                            onChange: c(`consignor`, `city`),
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`div`, {
                        className: `bill-field`,
                        children: [
                          (0, y.jsx)(`label`, {
                            className: `bill-label`,
                            children: `State`,
                          }),
                          (0, y.jsx)(`input`, {
                            className: `bill-input`,
                            value: e.consignor.state,
                            onChange: c(`consignor`, `state`),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    className: `bill-grid`,
                    children: [
                      (0, y.jsxs)(`div`, {
                        className: `bill-field`,
                        children: [
                          (0, y.jsx)(`label`, {
                            className: `bill-label`,
                            children: `Mobile`,
                          }),
                          (0, y.jsx)(`input`, {
                            className: `bill-input`,
                            value: e.consignor.mobile,
                            onChange: c(`consignor`, `mobile`),
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`div`, {
                        className: `bill-field`,
                        children: [
                          (0, y.jsx)(`label`, {
                            className: `bill-label`,
                            children: `Pincode`,
                          }),
                          (0, y.jsx)(`input`, {
                            className: `bill-input`,
                            value: e.consignor.pincode,
                            onChange: c(`consignor`, `pincode`),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, y.jsxs)(`div`, {
            className: `bill-section`,
            children: [
              (0, y.jsx)(`h3`, {
                className: `bill-section-title`,
                children: `Consignee (Receiver)`,
              }),
              (0, y.jsxs)(`div`, {
                className: `bill-section-body`,
                children: [
                  (0, y.jsxs)(`div`, {
                    className: `bill-field`,
                    children: [
                      (0, y.jsx)(`label`, {
                        className: `bill-label`,
                        children: `Name`,
                      }),
                      (0, y.jsx)(`input`, {
                        className: `bill-input`,
                        value: e.consignee.name,
                        onChange: c(`consignee`, `name`),
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    className: `bill-field`,
                    children: [
                      (0, y.jsx)(`label`, {
                        className: `bill-label`,
                        children: `GSTIN`,
                      }),
                      (0, y.jsx)(`input`, {
                        className: `bill-input`,
                        value: e.consignee.gst,
                        onChange: c(`consignee`, `gst`),
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    className: `bill-field`,
                    children: [
                      (0, y.jsx)(`label`, {
                        className: `bill-label`,
                        children: `Address`,
                      }),
                      (0, y.jsx)(`input`, {
                        className: `bill-input`,
                        value: e.consignee.address,
                        onChange: c(`consignee`, `address`),
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    className: `bill-grid`,
                    children: [
                      (0, y.jsxs)(`div`, {
                        className: `bill-field`,
                        children: [
                          (0, y.jsx)(`label`, {
                            className: `bill-label`,
                            children: `City`,
                          }),
                          (0, y.jsx)(`input`, {
                            className: `bill-input`,
                            value: e.consignee.city,
                            onChange: c(`consignee`, `city`),
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`div`, {
                        className: `bill-field`,
                        children: [
                          (0, y.jsx)(`label`, {
                            className: `bill-label`,
                            children: `State`,
                          }),
                          (0, y.jsx)(`input`, {
                            className: `bill-input`,
                            value: e.consignee.state,
                            onChange: c(`consignee`, `state`),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, y.jsxs)(`div`, {
                    className: `bill-grid`,
                    children: [
                      (0, y.jsxs)(`div`, {
                        className: `bill-field`,
                        children: [
                          (0, y.jsx)(`label`, {
                            className: `bill-label`,
                            children: `Mobile`,
                          }),
                          (0, y.jsx)(`input`, {
                            className: `bill-input`,
                            value: e.consignee.mobile,
                            onChange: c(`consignee`, `mobile`),
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`div`, {
                        className: `bill-field`,
                        children: [
                          (0, y.jsx)(`label`, {
                            className: `bill-label`,
                            children: `Pincode`,
                          }),
                          (0, y.jsx)(`input`, {
                            className: `bill-input`,
                            value: e.consignee.pincode,
                            onChange: c(`consignee`, `pincode`),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        className: `bill-section`,
        children: [
          (0, y.jsx)(`h3`, {
            className: `bill-section-title`,
            children: `Vehicle Details`,
          }),
          (0, y.jsx)(`div`, {
            className: `bill-section-body`,
            children: (0, y.jsxs)(`div`, {
              className: `bill-grid`,
              children: [
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Vehicle Number`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.vehicle.number,
                      onChange: c(`vehicle`, `number`),
                      placeholder: `MH 04 AB 1234`,
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Driver Name`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.vehicle.driverName,
                      onChange: c(`vehicle`, `driverName`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Driver Mobile`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.vehicle.driverMobile,
                      onChange: c(`vehicle`, `driverMobile`),
                    }),
                  ],
                }),
                (0, y.jsxs)(`div`, {
                  className: `bill-field`,
                  children: [
                    (0, y.jsx)(`label`, {
                      className: `bill-label`,
                      children: `Driver License`,
                    }),
                    (0, y.jsx)(`input`, {
                      className: `bill-input`,
                      value: e.vehicle.driverLicense,
                      onChange: c(`vehicle`, `driverLicense`),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, y.jsxs)(`div`, {
        className: `bill-section`,
        children: [
          (0, y.jsx)(`h3`, {
            className: `bill-section-title`,
            children: `Goods & Charges`,
          }),
          (0, y.jsxs)(`div`, {
            className: `bill-section-body`,
            children: [
              e.goods.map((t, n) =>
                (0, y.jsxs)(
                  `div`,
                  {
                    className: `bill-goods-row`,
                    children: [
                      (0, y.jsxs)(`div`, {
                        className: `bill-goods-row-header`,
                        children: [
                          (0, y.jsxs)(`span`, {
                            className: `bill-goods-row-num`,
                            children: [`Item #`, n + 1],
                          }),
                          (0, y.jsxs)(`div`, {
                            className: `bill-goods-row-actions`,
                            children: [
                              (0, y.jsx)(`button`, {
                                className: `bill-btn`,
                                style: { padding: `3px 8px`, fontSize: `11px` },
                                onClick: () => o(n),
                                children: `⧉ Dup`,
                              }),
                              e.goods.length > 1 &&
                                (0, y.jsx)(`button`, {
                                  className: `bill-btn bill-btn-danger`,
                                  style: {
                                    padding: `3px 8px`,
                                    fontSize: `11px`,
                                  },
                                  onClick: () => a(n),
                                  children: `✕`,
                                }),
                            ],
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`div`, {
                        className: `bill-grid bill-grid-3`,
                        style: { gridTemplateColumns: `2fr 1fr 1fr` },
                        children: [
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Item Name`,
                              }),
                              (0, y.jsx)(`input`, {
                                className: `bill-input`,
                                value: t.itemName,
                                onChange: l(n, `itemName`),
                              }),
                            ],
                          }),
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Packages`,
                              }),
                              (0, y.jsx)(`input`, {
                                type: `number`,
                                className: `bill-input`,
                                value: t.packages,
                                onChange: l(n, `packages`),
                              }),
                            ],
                          }),
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Weight`,
                              }),
                              (0, y.jsx)(`input`, {
                                className: `bill-input`,
                                value: t.weight,
                                onChange: l(n, `weight`),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`div`, {
                        className: `bill-grid`,
                        style: {
                          marginTop: `10px`,
                          gridTemplateColumns: `1fr 1fr 1fr`,
                        },
                        children: [
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Quantity`,
                              }),
                              (0, y.jsx)(`input`, {
                                type: `number`,
                                className: `bill-input`,
                                value: t.quantity,
                                onChange: l(n, `quantity`),
                              }),
                            ],
                          }),
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Rate (₹)`,
                              }),
                              (0, y.jsx)(`input`, {
                                type: `number`,
                                className: `bill-input`,
                                value: t.rate,
                                onChange: l(n, `rate`),
                              }),
                            ],
                          }),
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Freight (Auto)`,
                              }),
                              (0, y.jsx)(`input`, {
                                type: `number`,
                                className: `bill-input`,
                                value: t.freight,
                                readOnly: !0,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`div`, {
                        className: `bill-grid-5`,
                        style: { marginTop: `10px` },
                        children: [
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Loading`,
                              }),
                              (0, y.jsx)(`input`, {
                                type: `number`,
                                className: `bill-input`,
                                value: t.loading,
                                onChange: l(n, `loading`),
                              }),
                            ],
                          }),
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Unloading`,
                              }),
                              (0, y.jsx)(`input`, {
                                type: `number`,
                                className: `bill-input`,
                                value: t.unloading,
                                onChange: l(n, `unloading`),
                              }),
                            ],
                          }),
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Insurance`,
                              }),
                              (0, y.jsx)(`input`, {
                                type: `number`,
                                className: `bill-input`,
                                value: t.insurance,
                                onChange: l(n, `insurance`),
                              }),
                            ],
                          }),
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `Other`,
                              }),
                              (0, y.jsx)(`input`, {
                                type: `number`,
                                className: `bill-input`,
                                value: t.otherCharges,
                                onChange: l(n, `otherCharges`),
                              }),
                            ],
                          }),
                          (0, y.jsxs)(`div`, {
                            className: `bill-field`,
                            children: [
                              (0, y.jsx)(`label`, {
                                className: `bill-label`,
                                children: `GST %`,
                              }),
                              (0, y.jsx)(`input`, {
                                type: `number`,
                                className: `bill-input`,
                                value: t.gstPercent,
                                onChange: l(n, `gstPercent`),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, y.jsxs)(`div`, {
                        className: `bill-field`,
                        style: { marginTop: `10px` },
                        children: [
                          (0, y.jsx)(`label`, {
                            className: `bill-label`,
                            children: `Description / Remarks`,
                          }),
                          (0, y.jsx)(`input`, {
                            className: `bill-input`,
                            value: t.remarks || t.description || ``,
                            onChange: l(n, `remarks`),
                          }),
                        ],
                      }),
                    ],
                  },
                  t.id,
                ),
              ),
              (0, y.jsx)(`button`, {
                className: `bill-btn bill-btn-primary`,
                style: {
                  width: `100%`,
                  justifyContent: `center`,
                  padding: `10px`,
                  marginTop: `4px`,
                },
                onClick: i,
                children: `+ Add Item`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
