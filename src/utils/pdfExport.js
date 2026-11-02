import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export function renderInvisibleTextLayer(doc, element, scale) {
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
}

export async function exportSheetToPdf(element, filename = 'invoice.pdf') {
  if (!element) throw new Error('No sheet node provided for PDF export.');
  const prevTransform = element.style.transform;
  element.style.transform = 'none';

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#FFFFFF',
      logging: false,
    });
    const imgData = canvas.toDataURL('image/jpeg', 0.85);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, Math.min(imgHeight, A4_HEIGHT_MM));
    renderInvisibleTextLayer(pdf, element, A4_WIDTH_MM / element.getBoundingClientRect().width);
    pdf.save(filename);
  } finally {
    element.style.transform = prevTransform;
  }
}

export async function captureBillCanvas(element) {
  if (!element) throw new Error('Preview element not found');
  const outer = document.querySelector('.bill-a4-outer');
  let prevTransform = '';
  let prevOrigin = '';
  if (outer) {
    prevTransform = outer.style.transform;
    prevOrigin = outer.style.transformOrigin;
    outer.style.transform = 'none';
    outer.style.transformOrigin = 'top left';
  }
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  try {
    return await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });
  } finally {
    if (outer) {
      outer.style.transform = prevTransform;
      outer.style.transformOrigin = prevOrigin;
    }
  }
}
