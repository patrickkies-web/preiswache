# Prompt für die Preiswache-App · Mercedes C-Klasse T-Modell (S204)

Diesen Text zusammen mit dem Inserat (PDF, Screenshots oder kopierter Text, Fotos inklusive)
an eine KI schicken. Die Antwort komplett kopieren und in der App ins Import-Feld einfügen
→ „Prüfen" → Fragen beantworten → „Importieren".

Codeblock-Zeichen oder Text drumherum stören nicht — die App schneidet sich das JSON selbst
heraus und bügelt abweichende Schreibweisen glatt.

**Das heutige Datum unbedingt mitschicken.** Eine KI kennt es nicht zuverlässig. Sie braucht
es aber, um „vor drei Wochen online" in ein Datum umzurechnen — und dieses Datum ist Tag 0
für jede Zeitrechnung in der App. Deshalb steht ganz oben im Prompt eine Zeile, die du vor
dem Abschicken ausfüllst.

**Vier Angaben macht die KI nicht.** Nach „Prüfen" fragt die App dich selbst:

| Frage | Wann |
|---|---|
| Ausstattungslinie | nur, wenn die KI sie nicht sicher benennen konnte |
| Exterieur — was zeigen die Fotos außen | immer |
| Interieur — was zeigen die Fotos innen | immer |
| Was wurde repariert | immer, mit dem Wortlaut aus dem Inserat darüber |

Dazu der Link zum Inserat als Pflichtfeld. Alle vier Antworten sind Analyse-Kategorien: du
kannst danach filtern, gruppieren und Durchschnittspreise vergleichen.

**Den Link kannst du dir sparen:** Schickst du der KI den Link zusammen mit den
Fahrzeugdaten mit, steht er im Feld `url` und die App füllt das Link-Feld schon aus.
Vergisst die KI ihn trotzdem, füg ihn beim Import einfach über oder unter dem
JSON-Block mit ein — bei einem einzelnen Fahrzeug holt die App ihn sich von dort.
Verpackungen wie `[Inserat](https://…)` oder `<https://…>` schneidet sie weg.

---

```
Heute ist der: 2026-08-21          <-- VOR DEM ABSCHICKEN AUF DAS HEUTIGE DATUM SETZEN

Du bekommst ein Fahrzeug-Inserat für eine Mercedes C-Klasse T-Modell der Baureihe S204
(Kombi, Baujahre 2007 bis 2014). Erstelle daraus einen JSON-Block.
Antworte NUR mit dem JSON, ohne Kommentar davor oder danach.

WICHTIG VORAB:
- Nutze ALLE Quellen: die Datentabelle, den Beschreibungstext UND die Fotos.
  Vieles steht nur im Fließtext und nicht in der Tabelle.
- Wo ich unten eine Liste erlaubter Wörter vorgebe, darfst du AUSSCHLIESSLICH
  diese Wörter verwenden. Keine eigenen Formulierungen, keine Zusätze.
- Wo keine Liste steht, schreibst du ab, was im Inserat steht.
- Was du nicht findest: "" (leerer Text). Niemals raten, niemals erfinden.
- Du bewertest nichts. Du schreibst ab und ordnest nur dort ein, wo ich es
  ausdrücklich verlange. Den Zustand beurteile ich selbst anhand der Fotos.
- Mehrere Inserate auf einmal: gib ein JSON-Array aus, also [ {...}, {...} ].

ZEITANGABEN -- HIER WIRD AM MEISTEN FALSCH GEMACHT:
  Es gibt in einem Inserat vier verschiedene Zeitangaben. Verwechsle sie nicht:

  a) Erstzulassung        -> Felder "year" und "month". Wann das Auto neu war.
  b) Hauptuntersuchung    -> Feld "hu". Bis wann der TÜV gilt, in der Zukunft.
  c) Online seit          -> Feld "listedSince". Wann DAS INSERAT eingestellt wurde.
  d) Heute                -> Feld "date". Steht oben in der ersten Zeile.

  Die wichtigste davon ist (c). Sie ist der Tag 0 für alle Zeitrechnungen und
  darf niemals geraten werden.

  Relative Angaben rechnest du in ein Datum um, ausgehend vom heutigen Datum
  aus der ersten Zeile:
     "vor 3 Wochen online gestellt"  ->  heute minus 21 Tage
     "seit 2 Monaten inseriert"      ->  heute minus 60 Tage
     "gestern eingestellt"           ->  heute minus 1 Tag
  Schreib die Originalformulierung zusätzlich ans Ende von "note", damit ich
  die Umrechnung nachprüfen kann. Beispiel: "Inserat: vor 3 Wochen online."

  Was du NICHT als "listedSince" nehmen darfst:
     - das heutige Datum
     - eine Uhrzeit oder ein Datum aus der Handy-Statusleiste eines Screenshots
     - das Datum der Erstzulassung
     - das Datum der Hauptuntersuchung
  Findest du keine Angabe dazu, wann das Inserat online ging: "" (leer).
  Leer ist richtig. Geraten ist falsch und verfälscht meine Auswertung.

{
  "id": "05/2011142500",
  "title": "Mercedes-Benz C 220 CDI T Avantgarde BlueEfficiency",
  "make": "Mercedes-Benz",
  "model": "C 220",
  "series": "C-Klasse",
  "trimline": "Avantgarde",
  "year": "2011",
  "month": "05",
  "mileage": 142500,
  "fuel": "Diesel",
  "gearbox": "Automatik",
  "owners": "2",
  "hu": "04/2027",
  "color": "Silber",
  "location": "50667 Köln",
  "sellerType": "Händler",
  "dealerName": "Autohaus Muster",
  "listedSince": "2026-07-02",
  "repairNote": "Steuerkette und Spanner 2023 erneuert, Bremsscheiben vorne neu.",
  "accidentRepaired": "Nein",
  "equipment": ["AMG Sport-Paket", "Panorama-Schiebedach", "Standheizung", "KEYLESS-GO"],
  "note": "",
  "url": "",
  "price": 8900,
  "date": "2026-08-21"
}

SO FÜLLST DU JEDES FELD AUS:

1. "id"
   Zwei Angaben direkt hintereinander, ohne Leerzeichen und ohne Bindestrich:
   erst Monat und Jahr der Erstzulassung als MM/JJJJ,
   danach sofort der Kilometerstand als reine Zahl.
   Beispiel: Erstzulassung 05/2011 und 142.500 km  ->  "05/2011142500"
   Habe ich dir oben eine id vorgegeben, nimmst du exakt diese und rechnest
   keine neue aus.

2. "title"
   Die Überschrift des Inserats, genau so abgeschrieben wie sie dasteht.

3. "make"
   Immer "Mercedes-Benz".

4. "model"
   Die Handelsbezeichnung, so wie mobile.de sie im Feld "Modell" führt.
   Beim S204 sind das zum Beispiel: "C 180", "C 200", "C 220", "C 250",
   "C 300", "C 350", "C 63 AMG". Ohne Zusätze wie CDI, Kompressor,
   BlueEfficiency, T-Modell oder Ausstattungslinie.

5. "series"
   Immer "C-Klasse".

6. "trimline"  --  NUR EINES DIESER DREI WÖRTER, ODER LEER:
       Classic  |  Elegance  |  Avantgarde
   Mehr Ausstattungslinien gab es beim S204 nicht. "Unbekannt" gibt es
   deshalb nicht und darfst du auch nicht schreiben.
   So erkennst du sie:
     Avantgarde = Sportgrill mit großem Zentralstern in der Kühlermaske,
                  kein Stern auf der Motorhaube, dunkle oder Aluminium-Zierteile
     Elegance   = Chrom-Lamellengrill, Stern steht aufrecht auf der Motorhaube,
                  Holzzierteile im Innenraum
     Classic    = Basislinie, schlichte Zierteile, Stoffsitze, wenig Chrom
   Reihenfolge beim Suchen:
     a) steht die Linie im Titel oder in der Ausstattungsliste? -> übernehmen
     b) sonst: ist sie auf den Fotos eindeutig zu erkennen? -> übernehmen
     c) sonst: "" (leer). Dann frage die App mich, und ich sehe selbst nach.
   Rate NICHT. Lieber leer als falsch.

7. "year"
   Das Jahr der ERSTZULASSUNG, vierstellig. Beispiel: "2011".
   Nicht das Baujahr aus der Beschreibung, wenn beides genannt wird --
   maßgeblich ist die Erstzulassung.

8. "month"
   Der Monat der Erstzulassung, zweistellig mit führender Null.
   Beispiel: Mai -> "05", November -> "11".

9. "mileage"
   Der Kilometerstand als reine Zahl, ohne Punkt, ohne Komma, ohne "km".
   Beispiel: 142500

10. "fuel"  --  NUR EINES DIESER ZWEI WÖRTER:
        Benzin  |  Diesel
    Alles Dieselartige (CDI, BlueTEC) -> "Diesel".
    Alles andere beim S204 (Kompressor, CGI, BlueEfficiency-Benziner) -> "Benzin".

11. "gearbox"  --  NUR EINES DIESER ZWEI WÖRTER:
        Automatik  |  Manuell
    Automatik = jede Art von Automatik (7G-TRONIC, 5G-TRONIC, Wandler).
    Manuell = Schaltgetriebe von Hand.
    Die Anzahl der Gänge interessiert mich nicht.
    Dieses Feld hilft der App, ein wieder eingestelltes Inserat als denselben
    Wagen zu erkennen -- lass es also nicht leer, wenn es irgendwo steht.

12. "owners"
    Die genaue Anzahl der Fahrzeughalter als Zahl in Anführungszeichen,
    zum Beispiel "2". Suche in der Datentabelle UND im Beschreibungstext --
    dort steht sie oft nur nebenbei ("aus zweiter Hand", "Erstbesitz").
    Findest du nichts: "".

13. "hu"
    Wie lange die Hauptuntersuchung noch gültig ist, als MM/JJJJ.
    Beispiel: "04/2027". Das liegt in der Zukunft.
    Steht "Neu bei Übergabe", "HU neu" oder gar nichts: "".

14. "color"  --  NUR EINES DIESER WÖRTER:
        Schwarz | Weiß | Grau | Silber | Blau | Rot | Grün
        Gelb | Orange | Braun | Beige | Gold | Violett
    Zusätze wie "Metallic", "Perleffekt" oder Fantasienamen lässt du weg.
    Aus "Iridiumsilber Metallic" wird also "Silber".

15. "location"
    Postleitzahl und Ort des Fahrzeugs. Beispiel: "50667 Köln".
    Auch dieses Feld hilft beim Wiedererkennen -- schreib es ab, wo immer
    es steht, notfalls nur den Ort ohne Postleitzahl.

16. "sellerType"  --  NUR EINES DIESER ZWEI WÖRTER:
        Händler  |  Privat

17. "dealerName"
    Der Name des Händlers. Bei Privatverkauf: "".

18. "listedSince"
    Wann das INSERAT online gestellt wurde, als JJJJ-MM-TT.
    Auf mobile.de steht das als "Online seit", "Inseriert am" oder als
    Angabe wie "vor 3 Wochen". Such danach gründlich: in der Datentabelle,
    im Kopf des Inserats und auf allen Screenshots.
    Relative Angaben rechnest du nach der Regel oben um.
    Ohne dieses Datum kann die App die Standzeit erst ab dem Tag rechnen, an
    dem ich das Inserat gefunden habe -- dann ist jede Linie in meinen
    Auswertungen falsch kurz.
    Findest du wirklich nichts: "" -- und niemals das heutige Datum.

19. "repairNote"
    Was das Inserat über BEREITS ERFOLGTE Reparaturen und Erneuerungen sagt --
    im Wortlaut, gekürzt auf das Wesentliche. Zum Beispiel:
    "Steuerkette und Spanner 2023 erneuert, Bremsscheiben vorne neu."
    Nimm alles auf, was ausgetauscht, erneuert, überholt oder gemacht wurde,
    mit Jahreszahl und Kilometerstand, falls genannt.
    Bewerte es NICHT und ordne es NICHT ein -- das mache ich in der App.
    Steht nichts über erfolgte Reparaturen: "".

20. "accidentRepaired"  --  NUR EINES DIESER ZWEI WÖRTER:
        Ja  |  Nein
    Ja = das Inserat gibt AUSDRÜCKLICH einen Unfall oder einen reparierten
      Unfallschaden an. Also Formulierungen wie "Unfallwagen", "Unfallschaden",
      "Unfallfahrzeug", "reparierter Unfallschaden", "Vorschaden durch Unfall",
      "Unfall: ja" in der Datentabelle.
    Nein = ALLES ANDERE.
    WICHTIG: Du sollst NICHT vermuten. Kratzer, Dellen, Parkschrammen,
    nachlackierte Teile, ein erneuerter Kotflügel oder ein Bericht über eine
    Reparatur sind KEIN Unfall, solange das Inserat keinen nennt. Auch wenn
    es naheliegt: ohne ausdrückliche Angabe schreibst du "Nein".

21. "equipment"
    Eine Liste. Prüfe die folgenden VIERZEHN Punkte einzeln und nimm jeden
    auf, den das Inserat nennt -- exakt in dieser Schreibweise:
       "AMG Sport-Paket"            (auch AMG Sport-Paket Plus, AMG-Line, AMG-Styling)
       "Panorama-Schiebedach"       (Panoramadach)
       "Lederausstattung"           (Leder, Volllederausstattung)
       "designo-Lederausstattung"   (designo Leder, designo-Ausstattung)
       "Standheizung"               (auch Zusatzheizung mit Fernbedienung)
       "Sitzklimatisierung"         (Sitzbelüftung, aktive Sitzbelüftung)
       "Memory-Paket"               (elektrische Sitze mit Memory, Memory-Funktion)
       "Fahrassistenz-Paket Plus"   (Distronic Plus, Totwinkel-Assistent im Paket)
       "Intelligent Light System"   (ILS, Bi-Xenon, Kurvenlicht)
       "Anhängerkupplung"           (AHK, abnehmbar oder schwenkbar)
       "KEYLESS-GO"                 (schlüsselloser Zugang, Start-Stopp-Knopf)
       "Harman Kardon Logic 7"      (Harman Kardon Soundsystem)
       "Glasschiebedach"            (NUR wenn es KEIN Panoramadach ist)
       "Spur-Paket"                 (Spurhalte-Assistent, Spurwechsel-Assistent)
    Nichts davon gefunden: [] (leere Liste).
    Zähle nichts doppelt: Panorama-Schiebedach und Glasschiebedach schließen
    sich gegenseitig aus. Nimm nur auf, was tatsächlich dasteht -- nicht, was
    du beim Modell vermutest.

22. "note"
    Auffälligkeiten und Einschränkungen, die im Inserat stehen, in ein bis
    zwei Sätzen. Schreib ab, bewerte nicht. Zum Beispiel:
      "Verkauf nur an Gewerbe oder Export", "Bastlerfahrzeug",
      "ohne Gewährleistung", "nicht fahrbereit", "Motorschaden",
      "Abholung nur bis Freitag", "Preis VB", "Besichtigung nach Absprache".
    Hier kommt auch die Originalformulierung einer relativen Zeitangabe hin,
    falls du eine umgerechnet hast.
    Nichts Auffälliges: "".

23. "url"
    Der Link zum Inserat. Nimm ihn aus jeder Quelle, die du hast: aus dem
    Dokument selbst, aus der Fußzeile eines PDFs -- und vor allem dann, wenn
    ich dir den Link zusammen mit den Fahrzeugdaten mitgeschickt habe.
    Schicke ich mehrere Fahrzeuge auf einmal, ordne jedem Fahrzeug den Link
    zu, der zu ihm gehört. Schreibe ihn vollständig ab, ohne zu kürzen.
    Nur die nackte Adresse -- keine Markdown-Schreibweise [Text](Adresse),
    keine spitzen Klammern, kein Punkt dahinter, kein Satz drumherum.
    Findest du keinen: "".

24. "price"
    Der geforderte Preis in Euro als reine Zahl, ohne Punkt und ohne "€".
    Beispiel: 8900
    "VB" oder "Verhandlungsbasis" ändert nichts an der Zahl -- vermerke es
    in "note".

25. "date"
    Das heutige Datum aus der ersten Zeile dieses Prompts, als JJJJ-MM-TT.
    Denk dir hier nichts aus.
```

---

## Wenn du denselben Wagen später erneut erfasst

Hänge an den Prompt an:

```
Das Auto kenne ich schon, seine id lautet "05/2011142500".
Nimm exakt diese id und trage nur den neuen Preis mit dem heutigen Datum ein.
Steht im Inserat inzwischen ein anderer Kilometerstand, schreib den neuen --
die id bleibt trotzdem die alte.
```

Die App erkennt das Auto an der `id` wieder und hängt den Preis an den Verlauf an,
statt einen zweiten Eintrag anzulegen. Deine Antworten zu Exterieur, Interieur,
Reparaturen und Ausstattungslinie bleiben dabei erhalten.

**Vergisst du die id, ist das kein Beinbruch:** Stimmen Erstzulassung, Getriebe und
Ort mit einem bereits erfassten Wagen überein, fragt die App beim Prüfen nach, ob es
derselbe ist — und zwar auch dann, wenn der Wagen längst im Archiv liegt. Deshalb
lohnt es sich, `gearbox` und `location` immer auszufüllen.

---

## Was aus den Angaben in der App wird

**Sonderausstattung** entsteht automatisch aus der Länge von `equipment`:

| gefundene Punkte | Eintrag |
|---|---|
| 0 | Serienausstattung |
| 1–2 | Besondere Ausstattung |
| 3 oder mehr | Exzellente Ausstattung |

**Diese vier Felder füttern die Schaubilder:**

| Feld | wird dort gebraucht |
|---|---|
| `price` + `date` | Preisverteilung, Orderbuch, alle Preisverläufe |
| `listedSince` | Tag 0 jeder Linie, Standzeit, Absorptionskarte |
| `mileage` | „Was der Kilometer kostet" |

Alles Übrige — Modell, Linie, Farbe, Getriebe, Kraftstoff, Anbieter, Ort — steuert
die Filter über den Schaubildern und die Angaben in den Fahrzeugkacheln.

---

## Warum die id so aufgebaut ist

`MM/JJJJ` plus Kilometerstand ist die Kombination, die zwei sonst gleiche Fahrzeuge
zuverlässig auseinanderhält — zwei C 220 T von 05/2011 haben praktisch nie denselben
Kilometerstand.

Ändert der Händler den angezeigten Kilometerstand, ändert sich die `id` mit. Dann
greift die Rückfrage über Erstzulassung, Getriebe und Ort — oder du schreibst die
alte `id` von Hand in den Prompt.
