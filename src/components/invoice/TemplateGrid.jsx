import React from 'react';

export function TemplateGrid({ templates, selectedId, onSelect }) {
  return (
    <div className="template-grid" role="listbox" aria-label="Choose a template">
      {templates.map((template) => {
        const isSelected = template.id === selectedId;
        return (
          <button
            key={template.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            className={`template-card${isSelected ? ' template-card-active' : ''}`}
            onClick={() => onSelect(template.id)}
          >
            <span
              className="template-swatch"
              style={{ background: template.accent }}
              aria-hidden="true"
            >
              <span className="template-swatch-lines">
                <span />
                <span />
                <span />
              </span>
            </span>
            <span className="template-card-body">
              <span className="template-card-name">{template.name}</span>
              <span className="template-card-desc">{template.description}</span>
            </span>
            {isSelected && (
              <span className="template-check" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.5 4.5L6 12L2.5 8.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
