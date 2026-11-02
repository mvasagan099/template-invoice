import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const NAV_ITEMS = [
  { to: '/', label: 'Tax Invoice', end: true },
  { to: '/bulk-sequential', label: 'Bulk (Sequential)' },
  { to: '/bulk-random', label: 'Bulk (Random)' },
  { to: '/purchase-invoice', label: 'Purchase Invoice' },
  { to: '/bulk-purchase', label: 'Bulk Purchase' },
  { to: '/purchase-order', label: 'Purchase Order' },
  { to: '/bulk-purchase-order', label: 'Bulk PO' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/bill', label: '🚚 Bill' },
];

export function AppNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="app-nav">
      <div className="app-nav-inner">
        <NavLink to="/" className="app-nav-brand" title="Lords & Kings">
          <img src="/logo.png" alt="Lords & Kings" className="app-nav-logo" />
        </NavLink>

        <nav className="app-nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `app-nav-link${isActive ? ' app-nav-link-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="app-nav-toggle"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <nav className="app-nav-mobile" aria-label="Primary mobile">
          <NavLink
            to="/"
            className="app-nav-mobile-brand"
            onClick={() => setMobileOpen(false)}
          >
            <img src="/logo.png" alt="Lords & Kings" className="app-nav-mobile-logo" />
          </NavLink>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `app-nav-mobile-link${isActive ? ' app-nav-link-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
