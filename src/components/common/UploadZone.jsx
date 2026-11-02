import React, { useState, useRef, useCallback } from 'react';

export function UploadZone({
  onFile,
  accept = '.csv,.xlsx,.xls',
  busy = false,
  fileName = '',
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (files) => {
      if (files && files[0]) {
        onFile(files[0]);
      }
    },
    [onFile]
  );

  return (
    <div
      className={`upload-zone${isDragOver ? ' upload-zone-drag' : ''}${busy ? ' upload-zone-busy' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          inputRef.current?.click();
        }
      }}
      aria-label="Upload CSV or Excel file"
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="visually-hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="upload-zone-icon" aria-hidden="true">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3v12m0-12l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {busy ? (
        <>
          <div className="upload-zone-title">Processing {fileName}…</div>
          <div className="upload-zone-progress">
            <span />
          </div>
        </>
      ) : fileName ? (
        <>
          <div className="upload-zone-title">{fileName}</div>
          <div className="upload-zone-help">
            Click or drop a new file to replace it
          </div>
        </>
      ) : (
        <>
          <div className="upload-zone-title">Drop your CSV or Excel file here</div>
          <div className="upload-zone-help">
            or click to browse — up to 50 rows per batch
          </div>
        </>
      )}
    </div>
  );
}
