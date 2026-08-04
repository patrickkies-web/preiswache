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

### Preisentwicklung ab Inserat

Der Abschnitt beantwortet die Frage, **wann Verkäufer üblicherweise nachgeben**.
Jedes Inserat beginnt bei Tag 0 und 100 % des eigenen Startpreises, sodass die
Verläufe übereinanderliegen — unabhängig davon, wann ein Auto online ging.
Prozent statt Euro deshalb, weil sich ein Fahrzeug für 5.000 € und eines für
21.000 € in absoluten Beträgen nicht vergleichen lassen.

Die Auswertung folgt den Filtern aus „Analyse & Suche". Filterst du auf Baujahr
2013, zeigen Kurve und Kennzahlen nur diese Fahrzeuge.

Um die Durchschnittslinie liegt ein **Streuungsband** (Mittelwert ± eine
Standardabweichung, dem Gedanken der Bollinger-Bänder entlehnt). Ein schmales
Band heißt: Die Inserate verhalten sich ähnlich, der Durchschnitt ist belastbar.
Ein breites Band heißt: Die Einzelfälle gehen weit auseinander. Über die
**Glättung** lässt sich zusätzlich ein gleitender Durchschnitt über ein, zwei
oder vier Wochen legen, was bei wenigen Daten die Sprünge herausnimmt.

**Zwei Auswahlen im Vergleich:** Über „+ vergleichen" erscheint eine zweite
Filtergarnitur. Die Umschalter A und B bestimmen, welche gerade bearbeitet wird;
im Diagramm liegen beide Durchschnittslinien samt Bändern übereinander, darunter
stellt eine Tabelle die Kennzahlen gegenüber. So lässt sich etwa Händler gegen
Privat oder ein Baujahr gegen ein anderes prüfen.

Ausgewiesen werden der Median der Tage bis zur ersten Senkung, der Anteil der
Inserate mit Senkung, die durchschnittliche Gesamtsenkung und der typische
Abstand zwischen zwei Senkungen. Ein Balkendiagramm zeigt, in welchem Zeitfenster
die erste Senkung fiel; daraus leitet die App einen Vorschlag ab, ab wann sich
das Anschreiben lohnt.

Zwei Einschränkungen stehen auch in der App: Tag 0 ist der erste selbst erfasste
Preis, nicht zwingend der echte Inseratsbeginn, und die Auflösung entspricht dem
Abstand der eigenen Preis-Updates.

Der Preisverlauf lässt sich zusätzlich auf „Tage seit Inserat" umschalten. Dann beginnen alle
Kurven bei Tag 0 und liegen übereinander — so sind die Verläufe direkt vergleichbar,
unabhängig davon, wann ein Auto inseriert wurde.

## Synchronisierung einrichten

Ohne Server liegen die Daten nur im jeweiligen Browser. Auf dem iPhone löscht
Safari diesen Speicher nach etwa sieben Tagen ohne Besuch der Seite. Mit den
folgenden Schritten liegen sie zusätzlich auf einem Server und stehen auf jedem
Gerät zur Verfügung.

1. **Speicher anlegen.** In Vercel im Projekt auf *Storage* → *Create Database*
   → **Upstash for Redis** → mit diesem Projekt verbinden. Vercel legt die
   Variablen `KV_REST_API_URL` und `KV_REST_API_TOKEN` selbst an.
2. **Schlüssel festlegen.** Unter *Settings* → *Environment Variables* eine
   Variable `PREISWACHE_KEY` mit einem selbst gewählten Passwort anlegen.
3. **Neu ausrollen**, damit die Variablen ankommen (*Deployments* → beim
   obersten Eintrag *Redeploy*).
4. **In der App verbinden.** Oben rechts auf das Feld neben den Kennzahlen
   tippen, das Passwort eintragen, *Verbinden*. Das wiederholst du einmal je
   Gerät; der Schlüssel bleibt dort gespeichert.

Ohne diese Einrichtung läuft die App unverändert weiter — sie bleibt dann
einfach im lokalen Modus.

### Wie das Zusammenspiel funktioniert

Gespeichert wird immer zuerst lokal und danach auf dem Server, damit nichts
verloren geht, wenn gerade kein Netz da ist. Beim Öffnen erscheint sofort der
lokale Stand, anschließend zieht der Server nach.

Hat ein anderes Gerät zwischenzeitlich gespeichert, überschreibt die App nichts
stillschweigend: Sie meldet einen Konflikt und lässt dich wählen, ob der Stand
vom Server oder dein eigener gelten soll.

Der Schlüssel liegt bewusst auf dem Gerät und nicht im ausgelieferten Programm —
die Seite ist öffentlich erreichbar, ein eingebauter Schlüssel wäre keiner.

## Daten und Sicherung

Ohne Synchronisierung liegen die Daten im lokalen Speicher des Browsers.
Über „Exportieren" im Verzeichnis lässt sich alles als JSON-Datei sichern.
Zurückspielen geht auf zwei Wegen: „Datei laden" im Import-Bereich, oder den
Dateiinhalt ins Import-Feld einfügen. Beides funktioniert auch auf einem
anderen Gerät.

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `New` | React-Quellcode der App |
| `entry.jsx` | Einstiegspunkt für den Build |
| `index.html` | ausgelieferte Seite: `New` mit React, Recharts und Lucide gebündelt |
| `api/garage.js` | Server-Funktion für die Synchronisierung, ohne npm-Pakete |
| `PROMPT.md` | Prompt, der aus einem Inserat den passenden JSON-Block erzeugt |

## Veröffentlichen

Vercel ist mit diesem Repository verbunden und veröffentlicht jeden Push nach
`main` automatisch. `index.html` ist eine eigenständige Seite ohne externe
Abhängigkeiten, ein Build-Schritt auf dem Server ist nicht nötig.

Nach einer Änderung an `New` muss `index.html` neu gebaut werden. `New` wird dazu
als `App.jsx` neben `entry.jsx` gelegt:

```sh
npm install esbuild react react-dom recharts lucide-react
cp New App.jsx
npx esbuild entry.jsx --bundle --minify --format=iife --target=es2019 \
  --define:process.env.NODE_ENV='"production"' --outfile=bundle.js
```

Anschließend `bundle.js` in `index.html` zwischen die `<script>`-Tags setzen.
Die Seite braucht `<meta charset="utf-8">` — ohne die Angabe werden die
Sonderzeichen in den Reparatur-Mustern des Imports falsch dekodiert.
