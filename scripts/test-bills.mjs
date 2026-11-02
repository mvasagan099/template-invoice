import { build } from 'vite';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const outDir = 'node_modules/.cache/bill-tests';
await build({
  logLevel: 'error',
  build: {
    ssr: 'tests/bill-templates.jsx', outDir, emptyOutDir: true,
    rolldownOptions: { output: { entryFileNames: '[name].mjs' } },
  },
});
await import(pathToFileURL(resolve(outDir, 'bill-templates.mjs')).href);
