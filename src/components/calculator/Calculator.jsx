import React from 'react';

export function Calculator() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
      <iframe
        src="/calculator.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="Ledger Calculator"
      />
    </div>
  );
}
