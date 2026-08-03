# Preiswache

Fahrzeug-Preistracker: Inserate erfassen, Preisverläufe verfolgen, Fahrzeuge nach
festen Analyse-Begriffen filtern und vergleichen.

**Live:** https://preiswache.vercel.app

## Wie es benutzt wird

1. Inserat (PDF, Foto oder Text) zusammen mit dem Prompt aus [`PROMPT.md`](PROMPT.md)
   an eine KI schicken.
2. Die Antwort komplett kopieren und in der App oben ins Import-Feld einfügen →
   „Prüfen" → „Importieren". Codeblock-Zeichen und Text drumherum stören nicht.
3. Späterer Preis desselben Autos: gleiche `id` verwenden, dann wächst der
   Preisverlauf statt eines zweiten Eintrags.

Die Daten liegen im lokalen Speicher des Browsers — kein Server, kein Konto.
Über „Exportieren" im Verzeichnis lässt sich alles als JSON-Datei sichern und
über dasselbe Import-Feld wieder einspielen, auch auf einem anderen Gerät.

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `New` | React-Quellcode der App |
| `index.html` | ausgelieferte Seite: `New` mit React, Recharts und Lucide gebündelt |
| `PROMPT.md` | Prompt, der aus einem Inserat den passenden JSON-Block erzeugt |

## Veröffentlichen

Vercel ist mit diesem Repository verbunden und veröffentlicht jeden Push nach
`main` automatisch. `index.html` ist eine eigenständige Seite ohne externe
Abhängigkeiten, ein Build-Schritt auf dem Server ist nicht nötig.

Nach einer Änderung an `New` muss `index.html` neu gebaut werden:

```sh
npm install esbuild react react-dom recharts lucide-react
npx esbuild entry.jsx --bundle --minify --format=iife --target=es2019 \
  --define:process.env.NODE_ENV='"production"' --outfile=bundle.js
```

Anschließend `bundle.js` in `index.html` zwischen die `<script>`-Tags setzen.
Die Seite braucht `<meta charset="utf-8">` — ohne die Angabe werden die
Sonderzeichen in den Reparatur-Mustern des Imports falsch dekodiert.
