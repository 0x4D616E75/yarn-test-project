import { build } from "esbuild";
import swc from "esbuild-plugin-swc";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fs.rmSync(path.join(__dirname, "dist"), { recursive: true, force: true });

await build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  format: "esm",
  platform: "node",
  target: "es2022",
  sourcemap: true,
  bundle: true, // bei kleinen Libs angenehm → eine Datei, keine Relativimporte
  packages: "external", // lässt deps extern; hier meistens ok
  plugins: [
    swc({
      jsc: {
        target: "es2022",
        parser: { syntax: "typescript", decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
      },
      module: { type: "es6" },
    }),
  ],
});

console.log("✓ shared-lib built (ESM)");
