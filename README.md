# Preiswache

Fahrzeug-Preistracker: Inserate erfassen, Preisverläufe verfolgen, Fahrzeuge nach
festen Analyse-Begriffen filtern und vergleichen.

**Live:** https://preiswache.vercel.app

## Wie es benutzt wird

1. Inserat (PDF, Foto oder Text) zusammen mit dem Prompt aus [`PROMPT.md`](PROMPT.md)
   an eine KI schicken.
2. Die Antwort komplett kopieren und in der App oben ins Import-Feld einfügen →
   „Prüfen". Codeblock-Zeichen und Text drumherum stören nicht.
3. Die App stellt zwei Fragen, die keine KI beantworten kann: ob auf den Fotos
   Beschädigungen zu erkennen sind und wie das Fahrzeug im Inserat dargestellt ist.
   Beides sind vollwertige Analyse-Kategorien. Danach „Importieren".
4. Späterer Preis desselben Autos: gleiche `id` verwenden, dann wächst der
   Preisverlauf statt eines zweiten Eintrags.
5. Verschwindet ein Inserat, am Fahrzeug „Inserat abschließen" wählen und Datum
   angeben. Daraus entstehen die Laufzeiten: wie lange stand das Auto drin, wann
   wurde der Preis gesenkt, wann war es weg.

Die App hat zwei Reiter: **Erfassen &amp; Analysieren** mit Import, Preisverlauf,
Filtern und Laufzeiten, sowie **Verzeichnis** mit der Fahrzeugliste. Dort steht jedes
Auto als Zeile mit fünf Kennzahlen — Preis, Veränderung, Kilometer, Erstzulassung,
Reparatur-Umfang — und klappt auf Klick zu allen Angaben auf.

Der Preisverlauf lässt sich auf „Tage seit Inserat" umschalten. Dann beginnen alle
Kurven bei Tag 0 und liegen übereinander — so sind die Verläufe direkt vergleichbar,
unabhängig davon, wann ein Auto inseriert wurde.

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
