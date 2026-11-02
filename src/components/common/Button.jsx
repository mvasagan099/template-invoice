import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  icon = null,
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}${loading ? ' btn-loading' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {icon && !loading && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">{children}</span>
    </button>
  );
}
