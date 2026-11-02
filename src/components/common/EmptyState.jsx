import React from 'react';

export function EmptyState({ icon, title, text, action }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <div className="empty-state-title">{title}</div>
      {text && <p className="empty-state-text">{text}</p>}
      {action}
    </div>
  );
}
