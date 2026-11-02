import assert from 'node:assert/strict';
import { deflateSync } from 'node:zlib';
import { BILL_PAGE, BILL_PRINT_DOCUMENT, frameBillCanvas, prepareBillSnapshot, printBillCanvas } from '../src/utils/billRendering.js';
import { createBillPdf } from '../src/utils/pdfExport.js';

// A real, valid one-pixel PNG for exercising jsPDF's image encoder and page tree.
function chunk(type, bytes) {
  const name = Buffer.from(type), data = Buffer.concat([name, bytes]);
  let crc = 0xffffffff;
  for (const byte of data) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0); }
  const size = Buffer.alloc(4), checksum = Buffer.alloc(4);
  size.writeUInt32BE(bytes.length); checksum.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
  return Buffer.concat([size, data, checksum]);
}
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(1, 0); ihdr.writeUInt32BE(1, 4); ihdr[8] = 8; ihdr[9] = 6;
const png = Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(Buffer.from([0,0,0,0,255]))), chunk('IEND', Buffer.alloc(0))]);
const imageUrl = `data:image/png;base64,${png.toString('base64')}`;
const pdf = createBillPdf({ toDataURL: () => imageUrl });
assert.equal(pdf.getNumberOfPages(), 1);
assert.ok(Math.abs(pdf.internal.pageSize.getWidth() - 210) < .01);
assert.ok(Math.abs(pdf.internal.pageSize.getHeight() - 297) < .01);
assert.match(pdf.output(), /\/Count 1\b/);

let draw;
const context = { fillRect() {}, drawImage(...args) { draw = args; } };
const canvasDoc = { createElement: () => ({ getContext: () => context }) };
const sourceCanvas = { width: 2382, height: 3369 };
const framed = frameBillCanvas(sourceCanvas, canvasDoc);
assert.equal(framed.width, BILL_PAGE.width * BILL_PAGE.pixelRatio);
assert.equal(framed.height, BILL_PAGE.height * BILL_PAGE.pixelRatio);
assert.equal(draw[0], sourceCanvas);
assert.ok(draw[1] >= framed.width * 6 / 210 - .01);
assert.ok(draw[2] >= framed.height * 6 / 297 - .01);
assert.ok(Math.abs(draw[3] / draw[4] - sourceCanvas.width / sourceCanvas.height) < 1e-9);
assert.ok(Math.abs(draw[1] * 2 + draw[3] - framed.width) < .01);
assert.ok(Math.abs(draw[2] * 2 + draw[4] - framed.height) < .01);

// Print has one fixed image and one pixel of flow content: app layout cannot paginate.
assert.match(BILL_PRINT_DOCUMENT, /@page\s*\{\s*size: A4 portrait; margin: 0;/);
assert.match(BILL_PRINT_DOCUMENT, /position: fixed/);
assert.match(BILL_PRINT_DOCUMENT, /height: 1px/);
let printed = false, removed = false, afterprint, printHtml, printedImage;
const printBody = { appendChild(img) { printedImage = img; queueMicrotask(() => img.onload()); } };
const printDocument = { open() {}, write(html) { printHtml = html; }, close() {}, body: printBody, createElement: () => ({}) };
const frame = { style: {}, setAttribute() {}, remove() { removed = true; }, contentDocument: printDocument,
  contentWindow: { requestAnimationFrame(callback) { callback(); }, addEventListener(type, callback) { assert.equal(type, 'afterprint'); afterprint = callback; }, focus() {}, print() { printed = true; } } };
await printBillCanvas({ toDataURL: () => imageUrl }, { createElement: () => frame, body: { appendChild() {} }, defaultView: { requestAnimationFrame: (callback) => callback() } });
assert.equal(printed, true); assert.equal(printedImage.src, imageUrl); assert.equal(printHtml, BILL_PRINT_DOCUMENT);
assert.equal(removed, false); afterprint(); assert.equal(removed, true);

// A measured grid in a zoomed preview must keep fractional sizes and typography.
function style(values = {}) {
  const keys = Object.keys(values);
  return Object.assign({ length: keys.length, getPropertyValue: (key) => values[key] ?? '', removeProperty(key) { delete values[key]; }, setProperty(key, value) { values[key] = value; }, read: (key) => values[key] }, values, Object.fromEntries(keys.map((key, i) => [i, key])));
}
let hostRemoved = false;
const doc = { fonts: { ready: Promise.resolve() }, defaultView: { getComputedStyle: (node) => node.computed, requestAnimationFrame: (callback) => callback() }, body: { appendChild() {} }, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {}, remove() { hostRemoved = true; } }) };
function node(computed, children = []) {
  const result = { nodeType: 1, children, childNodes: children, ownerDocument: doc, computed: style(computed), style: style(), offsetLeft: 0, offsetTop: 0, clientLeft: 0, clientTop: 0, offsetParent: null,
    querySelector() { return null; }, querySelectorAll(selector) { return selector === 'img' ? [] : this.children.flatMap((child) => [child, ...child.querySelectorAll('*')]); }, removeAttribute() {},
    cloneNode() { return node(computed, this.children.map((child) => child.cloneNode())); } };
  return result;
}
const child = node({ display: 'block', position: 'static', width: '150.25px', height: '40.5px', 'letter-spacing': '1.25px', 'line-height': '13.7px' });
const source = node({ display: 'grid', position: 'relative', width: '794px', height: '1123px' }, [child]);
source.offsetLeft = 42; source.clientLeft = 2; source.clientTop = 2;
child.offsetParent = source; child.offsetLeft = 12.5; child.offsetTop = 20.25;
const snapshot = await prepareBillSnapshot(source);
assert.equal(snapshot.element.style.read('display'), 'block');
const copiedChild = snapshot.element.children[0];
assert.equal(copiedChild.style.read('position'), 'absolute');
assert.equal(copiedChild.style.read('left'), '12.5px');
assert.equal(copiedChild.style.read('top'), '20.25px');
assert.equal(copiedChild.style.read('width'), '150.25px');
assert.equal(copiedChild.style.read('letter-spacing'), '1.25px');
assert.equal(copiedChild.style.read('line-height'), '13.7px');
assert.equal(source.computed.display, 'grid'); snapshot.dispose(); assert.equal(hostRemoved, true);
await assert.rejects(prepareBillSnapshot({ ownerDocument: doc, querySelectorAll: () => [{ decode: async () => { throw new Error('Bad image'); } }] }), /Bad image/);
console.log('Passed single-page PDF, A4 framing, isolated print image, snapshot geometry/typography and cleanup checks.');
