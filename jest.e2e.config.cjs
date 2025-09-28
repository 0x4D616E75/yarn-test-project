// jest.config.cjs
/** @type {import('jest').Config} */

module.exports = {
  testEnvironment: "node",
  rootDir: ".",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/?(*.)+(test|spec).ts"],
  moduleFileExtensions: ["ts", "js", "json"],

  // WICHTIG: TS-Dateien als ESM behandeln
  extensionsToTreatAsEsm: [".ts"],

  // SWC: ESM-Ausgabe + Decorators/Metadata (Nest)
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          target: "es2022", // oder 'esnext' – je nach Wunsch
          parser: { syntax: "typescript", decorators: true },
          transform: { legacyDecorator: true, decoratorMetadata: true },
        },
        module: { type: "es6" }, // << ESM-Ausgabe
      },
    ],
  },
  // 🔧 WICHTIG: relative .js-Importe in TS-Quellen → .ts umschreiben
  // moduleNameMapper: {
  //   "^(\\.{1,2}/.*)\\.js$": "$1.ts",
  // },
  // reflect-metadata vor allen Tests laden
  setupFiles: ["<rootDir>/tests/setup-e2e.ts"],
};
