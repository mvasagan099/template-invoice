import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export function renderInvisibleTextLayer(doc, element, scale) {
  try {
    const rootRect = element.getBoundingClientRect();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let textNode;
    while ((textNode = walker.nextNode())) {
      const text = textNode.nodeValue.trim();
      if (!text) continue;
      const parent = textNode.parentElement;
      if (!parent) continue;
      const style = window.getComputedStyle(parent);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        continue;
      }
      const rect = parent.getBoundingClientRect();
      const x = (rect.left - rootRect.left) * scale;
      const y = (rect.top - rootRect.top + rect.height * 0.75) * scale;
      const fontSize = (parseFloat(style.fontSize) || 12) * scale * 2.83465;
      doc.setFontSize(fontSize);
      try {
        doc.text(text, x, y, { renderingMode: 'invisible' });
      } catch {
        doc.setTextColor(255, 255, 255);
        doc.text(text, x, y);
      }
    }
  } catch (err) {
    // Non-fatal if text layer generation fails
    console.warn('Text layer generation skipped:', err);
  }
}

/**
 * Robustly normalizes cloned DOM styles before html2canvas rasterization
 * to completely eliminate character overlaps, line collisions, and font misalignments (especially in Safari).
 */
function normalizeClonedDocForCanvas(clonedDoc) {
  const allElements = clonedDoc.querySelectorAll('*');
  allElements.forEach((el) => {
    try {
      if (el.nodeType !== 1) return;
      const cs = window.getComputedStyle(el);

      // 1. Force explicit numeric pixel line-height so wrapped lines never collide at y=0
      const lh = cs.lineHeight;
      if (!lh || lh === 'normal' || !lh.endsWith('px')) {
        const fs = parseFloat(cs.fontSize) || 12;
        el.style.lineHeight = `${Math.round(fs * 1.35)}px`;
      } else {
        el.style.lineHeight = lh;
      }

      // 2. Normalise letter and word spacing to prevent character stacking
      if (cs.letterSpacing && cs.letterSpacing !== 'normal') {
        el.style.letterSpacing = 'normal';
      }
      if (cs.wordSpacing && cs.wordSpacing !== 'normal') {
        el.style.wordSpacing = 'normal';
      }

      // 3. For table cells and headers, ensure natural wrapping without clipping
      if (el.tagName === 'TH' || el.tagName === 'TD') {
        el.style.verticalAlign = cs.verticalAlign || 'middle';
      }
    } catch {
      // ignore
    }
  });
}

/**
 * Capture an element using html-to-image (native browser SVG foreignObject rasterizer),
 * with rock-solid fallback to html2canvas with letter-spacing normalisation.
 */
export async function captureElementToCanvas(element, scale = 2.5) {
  if (!element) throw new Error('Target element not found');

  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // ignore
    }
  }

  // Attempt 1: html-to-image (flawless native font rendering, no overlapping text)
  try {
    const canvas = await htmlToImage.toCanvas(element, {
      pixelRatio: scale,
      backgroundColor: '#ffffff',
      cacheBust: false,
      skipFonts: true,
      fontEmbedCSS: '',
    });
    return canvas;
  } catch (primaryErr) {
    console.warn('html-to-image failed, falling back to html2canvas:', primaryErr);

    // Attempt 2: html2canvas with full DOM normalisation
    return await html2canvas(element, {
      scale: scale,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        normalizeClonedDocForCanvas(clonedDoc);
      },
    });
  }
}

/**
 * Capture bill preview element to canvas while removing preview zoom scaling
 */
export async function captureBillCanvas(element) {
  if (!element) throw new Error('Preview element not found');
  const outer = document.querySelector('.bill-a4-outer');
  let prevTransform = '';
  let prevOrigin = '';
  let prevMargin = '';
  let prevShadow = '';

  if (outer) {
    prevTransform = outer.style.transform;
    prevOrigin = outer.style.transformOrigin;
    prevMargin = outer.style.marginBottom;
    prevShadow = outer.style.boxShadow;
    outer.style.transform = 'none';
    outer.style.transformOrigin = 'top left';
    outer.style.marginBottom = '0px';
    outer.style.boxShadow = 'none';
  }

  // Double rAF to let browser complete unscaled layout
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  try {
    try {
      // Attempt 1: native html-to-image canvas with fixed A4 dimensions
      return await htmlToImage.toCanvas(element, {
        pixelRatio: 2.5,
        backgroundColor: '#ffffff',
        cacheBust: false,
        skipFonts: true,
        fontEmbedCSS: '',
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
      });
    } catch (e) {
      console.warn('htmlToImage toCanvas failed, using captureElementToCanvas fallback:', e);
      return await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
        onclone: (clonedDoc) => {
          normalizeClonedDocForCanvas(clonedDoc);
        },
      });
    }
  } finally {
    if (outer) {
      outer.style.transform = prevTransform;
      outer.style.transformOrigin = prevOrigin;
      outer.style.marginBottom = prevMargin;
      outer.style.boxShadow = prevShadow;
    }
  }
}

/**
 * Direct crystal-clear PNG export for bills
 * Adds a clean white margin around the captured canvas so borders and signatures are 100% complete and unclipped.
 */
export async function exportBillToPng(element, filename = 'Transport_Bill.png') {
  if (!element) throw new Error('Preview element not found');
  const canvas = await captureBillCanvas(element);
  console.log('CAPTURED CANVAS DIMS:', canvas.width, 'x', canvas.height);

  // Add 16px white padding (at 2.5x scale = 40px) around canvas so borders are completely intact
  const pad = Math.round(16 * 2.5);
  const framedCanvas = document.createElement('canvas');
  framedCanvas.width = canvas.width + pad * 2;
  framedCanvas.height = canvas.height + pad * 2;
  const ctx = framedCanvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, framedCanvas.width, framedCanvas.height);
  ctx.drawImage(canvas, pad, pad);

  const dataUrl = framedCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Direct crystal-clear PDF export for bills
 * Uses a safe 6mm document margin so all borders are crisp, visible, and never clipped by printers.
 */
export async function exportBillToPdf(element, filename = 'Transport_Bill.pdf') {
  if (!element) throw new Error('Preview element not found');
  const canvas = await captureBillCanvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

  // Standard 6mm print margins for professional, unclipped A4 presentation
  const marginMm = 6;
  const printWidth = pageWidth - marginMm * 2; // 198mm
  const printHeight = pageHeight - marginMm * 2; // 285mm

  const scale = Math.min(printWidth / canvas.width, printHeight / canvas.height);
  const renderWidth = canvas.width * scale;
  const renderHeight = canvas.height * scale;

  const posX = (pageWidth - renderWidth) / 2;
  const posY = (pageHeight - renderHeight) / 2;

  pdf.addImage(imgData, 'PNG', posX, posY, renderWidth, renderHeight, undefined, 'FAST');
  pdf.save(filename);
}

/**
 * Export invoice or document sheet to PDF with perfect text and dimensions
 */
export async function exportSheetToPdf(element, filename = 'invoice.pdf') {
  if (!element) throw new Error('No sheet node provided for PDF export.');
  const prevTransform = element.style.transform;
  element.style.transform = 'none';

  try {
    const canvas = await captureElementToCanvas(element, 2.5);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, Math.min(imgHeight, A4_HEIGHT_MM), undefined, 'FAST');
    renderInvisibleTextLayer(pdf, element, A4_WIDTH_MM / element.getBoundingClientRect().width);
    pdf.save(filename);
  } finally {
    element.style.transform = prevTransform;
  }
}
