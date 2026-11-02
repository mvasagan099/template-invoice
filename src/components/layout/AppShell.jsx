import React from 'react';
import { AppNav } from './AppNav.jsx';

export function AppShell({ children }) {
  return (
    <div className="app-shell">
      <AppNav />
      <main className="app-main">{children}</main>
    </div>
  );
}
