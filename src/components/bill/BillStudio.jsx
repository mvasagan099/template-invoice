import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_BILL_DATA } from '../../constants/billPresets.js';
import { BillToolbar } from './BillToolbar.jsx';
import { BillForms } from './BillForms.jsx';
import { BillA4Preview } from './BillA4Preview.jsx';

export function useBillData() {
  const [data, setData] = useState(() => {
    try {
      const draft = localStorage.getItem('invoicepro_bill_draft');
      if (draft) return JSON.parse(draft);
    } catch (err) {
      console.error('Error loading draft', err);
    }
    return DEFAULT_BILL_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem('invoicepro_bill_draft', JSON.stringify(data));
    } catch (err) {
      console.error('Error saving draft', err);
    }
  }, [data]);

  const totals = useMemo(() => {
    let freight = 0;
    let loading = 0;
    let unloading = 0;
    let insurance = 0;
    let otherCharges = 0;
    let gstAmount = 0;

    data.goods.forEach((item) => {
      const fr = Number(item.freight) || 0;
      const ld = Number(item.loading) || 0;
      const un = Number(item.unloading) || 0;
      const ins = Number(item.insurance) || 0;
      const oth = Number(item.otherCharges) || 0;

      freight += fr;
      loading += ld;
      unloading += un;
      insurance += ins;
      otherCharges += oth;

      const lineSub = fr + ld + un + ins + oth;
      const gstPct = Number(item.gstPercent) || 0;
      gstAmount += (gstPct / 100) * lineSub;
    });

    const subtotal = freight + loading + unloading + insurance + otherCharges;
    const grandTotal = subtotal + gstAmount;

    return {
      freight,
      loading,
      unloading,
      insurance,
      otherCharges,
      subtotal,
      gstAmount,
      grandTotal,
    };
  }, [data.goods]);

  const updateSection = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateGoods = (index, field, value) => {
    setData((prev) => {
      const newGoods = [...prev.goods];
      const updated = { ...newGoods[index], [field]: value };
      if (field === 'quantity' || field === 'rate') {
        const q = Number(field === 'quantity' ? value : updated.quantity) || 0;
        const r = Number(field === 'rate' ? value : updated.rate) || 0;
        updated.freight = q * r;
      }
      newGoods[index] = updated;
      return { ...prev, goods: newGoods };
    });
  };

  const addGoodsRow = () => {
    setData((prev) => ({
      ...prev,
      goods: [
        ...prev.goods,
        {
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`,
          itemName: '',
          description: '',
          quantity: '',
          packages: '',
          weight: '',
          unit: '',
          rate: '',
          freight: '',
          loading: '',
          unloading: '',
          insurance: '',
          otherCharges: '',
          gstPercent: '',
          remarks: '',
        },
      ],
    }));
  };

  const removeGoodsRow = (index) => {
    setData((prev) => ({
      ...prev,
      goods: prev.goods.filter((_, idx) => idx !== index),
    }));
  };

  const duplicateGoodsRow = (index) => {
    setData((prev) => {
      const cloned = {
        ...prev.goods[index],
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`,
      };
      const newGoods = [...prev.goods];
      newGoods.splice(index + 1, 0, cloned);
      return { ...prev, goods: newGoods };
    });
  };

  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all entered data?')) {
      setData(DEFAULT_BILL_DATA);
    }
  };

  return {
    data,
    totals,
    updateSection,
    updateGoods,
    addGoodsRow,
    removeGoodsRow,
    duplicateGoodsRow,
    resetData,
    setData,
  };
}

export function BillStudio() {
  const {
    data,
    totals,
    updateSection,
    updateGoods,
    addGoodsRow,
    removeGoodsRow,
    duplicateGoodsRow,
    resetData,
    setData,
  } = useBillData();

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const leftCol = document.querySelector('.bill-studio-left');
      if (!leftCol) return;
      const width = leftCol.clientWidth - 64;
      const s = Math.min(1, width / 794);
      setScale(s);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bill-studio">
      <div className="bill-studio-left">
        <div
          className="bill-a4-outer"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            marginBottom: `${(1 - scale) * -1123 * 0.8}px`,
          }}
        >
          <BillA4Preview data={data} totals={totals} />
        </div>
      </div>
      <div className="bill-studio-right">
        <BillToolbar
          settings={data.settings}
          updateSection={updateSection}
          resetData={resetData}
        />
        <BillForms
          data={data}
          totals={totals}
          updateSection={updateSection}
          updateGoods={updateGoods}
          addGoodsRow={addGoodsRow}
          removeGoodsRow={removeGoodsRow}
          duplicateGoodsRow={duplicateGoodsRow}
          setData={setData}
        />
      </div>
    </div>
  );
}
