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

Die App hat vier Reiter:

- **Erfassen** — Import, mögliche Doppel-Inserate, Preisverlauf aller Fahrzeuge, Laufzeiten
- **Analyse A** und **Analyse B** — zwei vollständig getrennte Auswertungen mit je
  eigenen Filtern. Beide lassen sich unabhängig einstellen und behalten ihre
  Einstellung beim Wechsel; über einen Schalter kann die jeweils andere
  Durchschnittslinie zum Vergleich eingeblendet werden.
- **Verzeichnis** — die Fahrzeugliste. Jedes Auto steht als Zeile mit sechs Kennzahlen
  (Preis, Veränderung, Kilometer, Erstzulassung, Ort, Reparatur-Umfang) und klappt auf
  Klick zu allen Angaben auf. Ein Klick auf einen Spaltenkopf sortiert danach, ein
  zweiter dreht die Richtung um; Texte alphabetisch, Zahlen und Daten der Größe nach.
  Auf schmalen Schirmen, wo die Spaltenköpfe entfallen, übernimmt das Auswahlfeld
  „Sortieren nach" dieselbe Aufgabe. Fehlende Angaben stehen immer am Ende.

### Doppelte und neu eingestellte Inserate

Verkäufer löschen Anzeigen und stellen sie neu ein, damit die Standzeit von vorn
zählt. Die App vergleicht deshalb jedes neue Fahrzeug mit dem gesamten Bestand —
ausdrücklich auch mit bereits abgeschlossenen Inseraten, denn genau dort steckt
der Vorgänger.

Verglichen wird über **Marke, Modell, Farbe, Erstzulassung und Ort**: Merkmale,
die eine Neueinstellung überdauern. Der Kilometerstand ist bewusst keine
Bedingung, weil der Verkäufer ihn beim zweiten Mal neu einträgt; ebenso wenig der
Anbietername, weil bei Privatanzeigen überall dasselbe steht. Beide zählen nur
als zusätzliches Indiz — ebenso wie ein Preis, der über dem zuletzt gesehenen
liegt.

Gemeldet wird, nie automatisch zusammengeführt. Ist der Vorgänger abgeschlossen,
weist die App auf eine mutmaßliche Neueinstellung hin und nennt die echte
Standzeit; läuft er noch, warnt sie vor einer doppelten Eingabe.

### Einzelpreise im Vergleich

Eine Preisleiter: jedes Fahrzeug ein Punkt, der Reihe nach nebeneinander,
waagerecht die laufende Nummer, senkrecht der Preis. Wahlweise nach Preis
sortiert — dann entsteht eine Treppe, in der Ausreißer sofort auffallen — oder in
der Reihenfolge der Erfassung. Eine gestrichelte Linie markiert den Median.

Die Farbe der Punkte steht für den Reparatur-Umfang, sodass sichtbar wird, ob ein
günstiges Angebot günstig ist oder nur billig. Beim Zeigen auf einen Punkt
erscheint die Karteikarte des Fahrzeugs mit Erstzulassung, Kilometerstand, Ort,
Anbieter und Fotobeurteilung; ein Klick öffnet das Inserat.

### Inserate über Zeit

Ein Punkt je Inserat: waagerecht das Datum der Erfassung, senkrecht der Preis, zu
dem es damals stand. Eine Ausgleichsgerade nach kleinsten Quadraten zeigt, ob das
**Niveau neuer Angebote** steigt oder fällt, ausgewiesen als Euro je Monat.

Das beantwortet eine andere Frage als der Abschnitt darunter: Hier geht es um den
Markt insgesamt — lohnt sich Warten? —, dort um das Verhalten einzelner Verkäufer
nach der Schaltung. Die Trendangabe erscheint erst ab einem beobachteten Zeitraum
von einer Woche, darunter wäre sie beliebig.

### Preisentwicklung ab Inserat

Der Abschnitt beantwortet die Frage, **wann Verkäufer üblicherweise nachgeben**.
Senkrecht steht der Fahrzeugpreis, waagerecht die Zeit in Tagen seit dem Inserat.
Jedes Auto beginnt links bei Tag 0 — unabhängig davon, wann es tatsächlich online
ging. Ein gestern eingestelltes Inserat ergibt eine kurze Linie, ein drei Monate
altes eine lange; alle liegen übereinander und lassen sich so vergleichen.

Über **Zeitraum ab Inserat** lässt sich der Ausschnitt begrenzen, etwa auf die
ersten 14 Tage. Die **Y-Achse** steht wahlweise auf Euro oder auf Prozent des
eigenen Startpreises. Euro zeigt die tatsächlichen Beträge; Prozent eignet sich
besser, wenn die Fahrzeuge sehr unterschiedlich teuer sind, weil dann jedes bei
100 % beginnt und nur die Bewegung zählt.

In der Euro-Ansicht kann die Durchschnittslinie steigen, ohne dass jemand den
Preis erhöht hat — nämlich wenn ein günstiges Inserat aus der Beobachtung fällt
und der Durchschnitt nur noch aus den teureren gebildet wird. Der Tooltip nennt
deshalb die Anzahl der Fahrzeuge je Tag, und die App weist darauf hin.

Jedes Fahrzeug ist eine **durchgehende Linie von Tag 0 bis heute** — auch eines,
zu dem erst ein einziger Preis erfasst ist; es läuft dann waagerecht. Gezeichnet
wird der Verlauf, nicht die einzelnen Eintragungen: Ein Preis gilt fort, bis der
Verkäufer ihn ändert.

Die Auswertung folgt den Filtern des jeweiligen Analyse-Reiters. Filterst du in
Analyse A auf Baujahr 2013, zeigen Kurve und Kennzahlen dort nur diese Fahrzeuge —
Analyse B bleibt davon unberührt.

Um die Durchschnittslinie liegt ein **Streuungsband** (Mittelwert ± eine
Standardabweichung, dem Gedanken der Bollinger-Bänder entlehnt). Ein schmales
Band heißt: Die Inserate verhalten sich ähnlich, der Durchschnitt ist belastbar.
Ein breites Band heißt: Die Einzelfälle gehen weit auseinander. Über die
**Glättung** lässt sich zusätzlich ein gleitender Durchschnitt über ein, zwei
oder vier Wochen legen, was bei wenigen Daten die Sprünge herausnimmt.

**Zwei Auswahlen im Vergleich:** Analyse A und Analyse B sind getrennte Reiter mit
eigenen Filtern. Innerhalb eines Reiters lässt sich die Durchschnittslinie des
anderen zusätzlich einblenden — durchgezogen die eigene, gestrichelt die
eingeblendete, beide mit ihrem Band. Eine Tabelle stellt die Kennzahlen
gegenüber. So lässt sich etwa Händler gegen Privat oder ein Baujahr gegen ein
anderes prüfen. Solange etwas eingeblendet ist, treten die Einzellinien zurück,
sonst wird das Bild unlesbar.

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
