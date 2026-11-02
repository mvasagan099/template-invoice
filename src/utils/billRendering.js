export const BILL_PAGE = Object.freeze({ width: 794, height: 1123, widthMm: 210, heightMm: 297, pixelRatio: 3, marginMm: 6 });

export function fitBillContents(page) {
  const content = page?.querySelector('.bd-sheet-content');
  if (!content) return;
  const style = page.ownerDocument.defaultView.getComputedStyle(page);
  const available = page.clientHeight - parseFloat(style.paddingTop || 0) - parseFloat(style.paddingBottom || 0);
  if (available <= 0) return;
  content.style.transform = 'none';
  content.style.height = `${available}px`;
  const scale = Math.min(1, available / Math.max(1, content.scrollHeight));
  content.style.transform = `scale(${scale})`;
  page.dataset.fitScale = String(scale);
}

// Layout offsets deliberately ignore the responsive preview zoom and the inner
// fit transform. Those transforms are preserved on the cloned elements instead.
function layoutOffset(element) {
  let left = 0, top = 0;
  for (let node = element; node; node = node.offsetParent) {
    left += node.offsetLeft;
    top += node.offsetTop;
    if (node.offsetParent) {
      left += node.offsetParent.clientLeft;
      top += node.offsetParent.clientTop;
    }
  }
  return { left, top };
}

function force(element, property, value) {
  // Append overrides after logical aliases such as inset-inline-start/inline-size.
  // Updating an existing physical property in place can leave the alias winning.
  element.style.removeProperty(property);
  element.style.setProperty(property, value, 'important');
}

export async function prepareBillSnapshot(element) {
  if (!element) throw new Error('Preview element not found');
  const doc = element.ownerDocument;
  await doc.fonts?.ready;
  await Promise.all(Array.from(element.querySelectorAll('img')).map(async (img) => {
    if (img.decode) await img.decode();
    else if (!img.complete) await new Promise((resolve, reject) => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', () => reject(new Error('Bill logo could not be loaded')), { once: true });
    });
    if (!img.naturalWidth) throw new Error('Bill logo could not be loaded');
  }));
  await new Promise((resolve) => doc.defaultView.requestAnimationFrame(() => doc.defaultView.requestAnimationFrame(resolve)));
  fitBillContents(element);

  const clone = element.cloneNode(true);
  const originals = [element, ...element.querySelectorAll('*')];
  const copies = [clone, ...clone.querySelectorAll('*')];
  const nodeIndices = new Map(originals.map((node, index) => [node, index]));
  const styles = originals.map((node) => doc.defaultView.getComputedStyle(node));
  // Freeze the screen's resolved typography, dimensions, colours and spacing.
  // Do not normalise line height or letter spacing during export.
  originals.forEach((node, index) => {
    const copy = copies[index], style = styles[index];
    for (let i = 0; i < style.length; i++) {
      const key = style[i];
      force(copy, key, style.getPropertyValue(key));
    }
    copy.removeAttribute('id');
    force(copy, 'animation', 'none');
    force(copy, 'transition', 'none');
  });
  // html2canvas cannot lay out CSS grids reliably. Pin the already measured
  // children of grid/flex containers, so BOTH renderers use the same geometry.
  originals.forEach((node, index) => {
    const style = styles[index];
    if (!/^(inline-)?(grid|flex)$/.test(style.display)) return;
    // Preserve anonymous text flex items in the older eleven templates.
    if (Array.from(node.childNodes).some((child) => child.nodeType === 3 && child.textContent.trim())) return;
    const copy = copies[index], origin = layoutOffset(node);
    force(copy, 'display', 'block');
    if (copy.style.getPropertyValue('position') === 'static') force(copy, 'position', 'relative');
    Array.from(node.children).forEach((child) => {
      const childIndex = nodeIndices.get(child), childCopy = copies[childIndex], childStyle = styles[childIndex];
      const offset = layoutOffset(child);
      force(childCopy, 'position', 'absolute');
      force(childCopy, 'left', `${offset.left - origin.left - node.clientLeft}px`);
      force(childCopy, 'top', `${offset.top - origin.top - node.clientTop}px`);
      force(childCopy, 'right', 'auto');
      force(childCopy, 'bottom', 'auto');
      force(childCopy, 'margin', '0');
      force(childCopy, 'width', childStyle.width);
      force(childCopy, 'height', childStyle.height);
      force(childCopy, 'min-width', '0');
      force(childCopy, 'min-height', '0');
      force(childCopy, 'max-width', 'none');
      force(childCopy, 'max-height', 'none');
    });
  });
  force(clone, 'position', 'relative');
  force(clone, 'left', '0'); force(clone, 'top', '0');
  force(clone, 'width', `${BILL_PAGE.width}px`); force(clone, 'height', `${BILL_PAGE.height}px`);
  force(clone, 'min-height', '0'); force(clone, 'max-height', 'none');
  force(clone, 'margin', '0'); force(clone, 'transform', 'none');
  force(clone, 'box-shadow', 'none'); force(clone, 'overflow', 'hidden');
  const host = doc.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText = `position:fixed;left:-100000px;top:0;width:${BILL_PAGE.width}px;height:${BILL_PAGE.height}px;pointer-events:none;`;
  host.appendChild(clone);
  doc.body.appendChild(host);
  return { element: clone, dispose: () => host.remove() };
}

export function frameBillCanvas(canvas, doc = document) {
  const framed = doc.createElement('canvas');
  framed.width = BILL_PAGE.width * BILL_PAGE.pixelRatio;
  framed.height = BILL_PAGE.height * BILL_PAGE.pixelRatio;
  const ctx = framed.getContext('2d');
  if (!ctx) throw new Error('Unable to create the bill image');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, framed.width, framed.height);
  const marginX = framed.width * BILL_PAGE.marginMm / BILL_PAGE.widthMm;
  const marginY = framed.height * BILL_PAGE.marginMm / BILL_PAGE.heightMm;
  const scale = Math.min((framed.width - 2 * marginX) / canvas.width, (framed.height - 2 * marginY) / canvas.height);
  const width = canvas.width * scale, height = canvas.height * scale;
  ctx.drawImage(canvas, (framed.width - width) / 2, (framed.height - height) / 2, width, height);
  return framed;
}

export const BILL_PRINT_DOCUMENT = `<!doctype html><html><head><meta charset="utf-8"><title>Transport Bill</title><style>
  @page { size: A4 portrait; margin: 0; }
  html, body { margin: 0; padding: 0; border: 0; width: 100%; height: 1px; line-height: 0; background: #fff; }
  img { display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; object-position: center; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
</style></head><body></body></html>`;

export async function printBillCanvas(canvas, doc = document) {
  const frame = doc.createElement('iframe');
  frame.title = 'Print transport bill'; frame.setAttribute('aria-hidden', 'true');
  // Give Safari a real layout viewport. A zero-size/display:none iframe can print blank.
  frame.style.cssText = 'position:fixed;left:-100000px;top:0;width:794px;height:1123px;border:0;';
  doc.body.appendChild(frame);
  const cleanup = () => frame.remove();
  try {
    const printDoc = frame.contentDocument;
    printDoc.open(); printDoc.write(BILL_PRINT_DOCUMENT); printDoc.close();
    const img = printDoc.createElement('img'); img.alt = 'Transport bill';
    await new Promise((resolve, reject) => {
      img.onload = resolve; img.onerror = () => reject(new Error('Unable to load the bill for printing'));
      img.src = canvas.toDataURL('image/png'); printDoc.body.appendChild(img);
    });
    await new Promise((resolve) => doc.defaultView.requestAnimationFrame(() => doc.defaultView.requestAnimationFrame(resolve)));
    frame.contentWindow.addEventListener('afterprint', cleanup, { once: true });
    frame.contentWindow.focus(); frame.contentWindow.print();
  } catch (error) { cleanup(); throw error; }
}
