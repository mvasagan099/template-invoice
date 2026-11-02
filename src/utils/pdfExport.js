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
      cacheBust: true,
      skipFonts: true,
      fontEmbedCSS: '',
    });
    return canvas;
  } catch (primaryErr) {
    console.warn('html-to-image failed, falling back to html2canvas:', primaryErr);

    // Attempt 2: html2canvas with onclone font copying, letter-spacing reset to prevent word collapsing
    return await html2canvas(element, {
      scale: scale,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        // Reset letter-spacing on all elements to normal so html2canvas renders words as complete phrases instead of single letters
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el) => {
          if (el.style && el.style.letterSpacing && el.style.letterSpacing !== 'normal') {
            el.style.letterSpacing = 'normal';
          }
        });
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

  if (outer) {
    prevTransform = outer.style.transform;
    prevOrigin = outer.style.transformOrigin;
    prevMargin = outer.style.marginBottom;
    outer.style.transform = 'none';
    outer.style.transformOrigin = 'top left';
    outer.style.marginBottom = '0px';
  }

  // Double rAF to let browser complete unscaled layout
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  try {
    try {
      // Attempt 1: native html-to-image canvas with fixed A4 dimensions
      return await htmlToImage.toCanvas(element, {
        pixelRatio: 2.5,
        backgroundColor: '#ffffff',
        cacheBust: true,
        skipFonts: true,
        fontEmbedCSS: '',
        width: A4_WIDTH_PX,
        height: Math.max(element.scrollHeight, A4_HEIGHT_PX),
      });
    } catch (e) {
      console.warn('htmlToImage toCanvas failed, using captureElementToCanvas fallback:', e);
      return await captureElementToCanvas(element, 2.5);
    }
  } finally {
    if (outer) {
      outer.style.transform = prevTransform;
      outer.style.transformOrigin = prevOrigin;
      outer.style.marginBottom = prevMargin;
    }
  }
}

/**
 * Direct crystal-clear PNG export for bills
 */
export async function exportBillToPng(element, filename = 'Transport_Bill.png') {
  if (!element) throw new Error('Preview element not found');
  const outer = document.querySelector('.bill-a4-outer');
  let prevTransform = '';
  let prevOrigin = '';
  let prevMargin = '';

  if (outer) {
    prevTransform = outer.style.transform;
    prevOrigin = outer.style.transformOrigin;
    prevMargin = outer.style.marginBottom;
    outer.style.transform = 'none';
    outer.style.transformOrigin = 'top left';
    outer.style.marginBottom = '0px';
  }

  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  try {
    let dataUrl = '';
    try {
      if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      dataUrl = await htmlToImage.toPng(element, {
        pixelRatio: 2.5,
        backgroundColor: '#ffffff',
        cacheBust: true,
        skipFonts: true,
        fontEmbedCSS: '',
        width: A4_WIDTH_PX,
        height: Math.max(element.scrollHeight, A4_HEIGHT_PX),
      });
    } catch (err) {
      console.warn('htmlToImage toPng failed, falling back to canvas:', err);
      const canvas = await captureBillCanvas(element);
      dataUrl = canvas.toDataURL('image/png');
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } finally {
    if (outer) {
      outer.style.transform = prevTransform;
      outer.style.transformOrigin = prevOrigin;
      outer.style.marginBottom = prevMargin;
    }
  }
}

/**
 * Direct crystal-clear PDF export for bills
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
  const renderHeight = (canvas.height * pageWidth) / canvas.width;

  if (renderHeight <= pageHeight + 2) {
    // Single page: fits precisely on A4 full sheet
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
  } else {
    // Multi-page handling for very tall bills
    let remainingHeight = renderHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, pageWidth, renderHeight, undefined, 'FAST');
    remainingHeight -= pageHeight;
    while (remainingHeight > 0) {
      position = position - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, renderHeight, undefined, 'FAST');
      remainingHeight -= pageHeight;
    }
  }

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
