/* Baut aus "New" die ausgelieferte index.html.
 *
 *   node bauen.mjs            (braucht esbuild, react, react-dom, lucide-react)
 *
 * Jeder Build bekommt einen Stempel. Er steht an zwei Stellen: als
 * <meta name="pw-build"> im Rahmen und als __BUILD__ im Programm. Die App
 * vergleicht beide miteinander und merkt so, wenn im Browser noch eine
 * ältere Fassung liegt — sonst sieht man tagelang eine Seite, die es so
 * nicht mehr gibt.
 */
import { writeFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";

/* esbuild, react und lucide-react werden dort gesucht, wo der Befehl
   ausgeführt wird — das Repo selbst trägt keine Abhängigkeiten. */
const hier = createRequire(join(process.cwd(), "noop.js"));
let build;
try { ({ build } = hier("esbuild")); }
catch (_) {
  console.error("esbuild nicht gefunden. Im Ordner mit node_modules ausführen:\n  node /pfad/zu/bauen.mjs");
  process.exit(1);
}

const STEMPEL = new Date().toISOString().replace(/\.\d+Z$/, "Z");

const tmp = mkdtempSync(join(tmpdir(), "preiswache-"));
const einstieg = join(tmp, "entry.jsx");
writeFileSync(einstieg, `import React from "react";
import { createRoot } from "react-dom/client";
import App from ${JSON.stringify(new URL("./New", import.meta.url).pathname)};
createRoot(document.getElementById("root")).render(<App />);
`);

const ergebnis = await build({
  entryPoints: [einstieg],
  bundle: true,
  minify: true,
  write: false,
  target: "es2019",
  legalComments: "eof",
  // "New" trägt keine Endung — dafür steht der leere Schlüssel.
  loader: { ".jsx": "jsx", ".mjs": "jsx", "": "jsx" },
  define: { __BUILD__: JSON.stringify(STEMPEL) },
  nodePaths: [join(process.cwd(), "node_modules")],
});

const js = ergebnis.outputFiles[0].text;
const seite = `<meta charset="utf-8" />
<title>Preiswache</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="pw-build" content="${STEMPEL}" />
<style>
  html, body { margin: 0; padding: 0; background: #F2FAF9; }
  html { color-scheme: light; }
</style>
<div id="root"></div>
<script>
${js}
</script>
`;
writeFileSync(new URL("./index.html", import.meta.url), seite);
console.log(`gebaut · ${STEMPEL} · ${seite.length} Zeichen`);
