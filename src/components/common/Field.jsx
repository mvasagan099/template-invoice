import React from 'react';

export function Field({
  label,
  required = false,
  help,
  error,
  type = 'text',
  as = 'input',
  icon = null,
  children,
  className = '',
  ...props
}) {
  const id = props.id || props.name;
  return (
    <div className={`field ${className}`}>
      {label && (
        <label className="field-label" htmlFor={id}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      {as === 'select' ? (
        <select id={id} className="select" {...props}>
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          id={id}
          className={`textarea${error ? ' has-error' : ''}`}
          {...props}
        />
      ) : icon ? (
        <div className="input-with-icon">
          <span className="field-icon">{icon}</span>
          <input
            id={id}
            type={type}
            className={`input${error ? ' has-error' : ''}`}
            {...props}
          />
        </div>
      ) : (
        <input
          id={id}
          type={type}
          className={`input${error ? ' has-error' : ''}`}
          {...props}
        />
      )}
      {error ? (
        <span className="field-error">{error}</span>
      ) : help ? (
        <span className="field-help">{help}</span>
      ) : null}
    </div>
  );
}
