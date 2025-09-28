import { build } from 'esbuild';
import swc from 'esbuild-plugin-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dependencies standardmäßig extern halten (schneller Build, kleinere Bundles).
// Alternativ: alles bundlen -> entferne "packages: 'external'".
/** @type {import('esbuild').BuildOptions} */
const common = {
  platform: 'node',
  format: 'esm',
  target: 'es2022',               // oder 'node20' / 'esnext'
  sourcemap: true,
  outdir: 'dist',
  bundle: true,
  packages: 'external',
  metafile: true,
  plugins: [
    swc({
      jsc: {
        target: 'es2022',
        parser: { syntax: 'typescript', decorators: true },
        // ▶︎ Wichtig: Decorators + Metadata für Nest
        transform: { legacyDecorator: true, decoratorMetadata: true }
      },
      module: { type: 'es6' }
    })
  ],
};

// Optional: Dist säubern
fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });

// Hauptbuild (dein Entry zeigt auf die Nest-Bootstrap-Datei)
await build({
  ...common,
  entryPoints: ['src/main.ts'],
  outbase: 'src',
});

// (Optional) zusätzliche Entrypoints bauen, falls du z. B. CLI/Worker hast
// await build({ ...common, entryPoints: ['src/worker.ts'] });

console.log('✓ esbuild ESM build finished');
