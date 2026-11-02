import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { BILL_PAGE, prepareBillSnapshot, frameBillCanvas, printBillCanvas } from './billRendering.js';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

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

/** Capture once at fixed geometry; all bill delivery formats use this A4 frame. */
export async function captureBillCanvas(element) {
  const snapshot = await prepareBillSnapshot(element);
  try {
    let canvas;
    try {
      canvas = await htmlToImage.toCanvas(snapshot.element, {
        pixelRatio: BILL_PAGE.pixelRatio, backgroundColor: '#ffffff',
        width: BILL_PAGE.width, height: BILL_PAGE.height, cacheBust: false,
      });
    } catch (error) {
      console.warn('Native bill capture failed; rendering the frozen layout:', error);
      canvas = await html2canvas(snapshot.element, {
        scale: BILL_PAGE.pixelRatio, useCORS: true, backgroundColor: '#ffffff',
        logging: false, width: BILL_PAGE.width, height: BILL_PAGE.height,
        windowWidth: 1280, windowHeight: 1280,
      });
    }
    return frameBillCanvas(canvas, element.ownerDocument);
  } finally {
    snapshot.dispose();
  }
}

export async function exportBillToPng(element, filename = 'Transport_Bill.png') {
  const canvas = await captureBillCanvas(element);
  const link = element.ownerDocument.createElement('a');
  link.download = filename; link.href = canvas.toDataURL('image/png'); link.click();
}

export function createBillPdf(canvas) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, BILL_PAGE.widthMm, BILL_PAGE.heightMm, undefined, 'FAST');
  return pdf;
}

export async function exportBillToPdf(element, filename = 'Transport_Bill.pdf') {
  createBillPdf(await captureBillCanvas(element)).save(filename);
}

export async function exportBillToPrint(element) {
  const canvas = await captureBillCanvas(element);
  await printBillCanvas(canvas, element.ownerDocument);
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
