# Prompt für die Preiswache-App · Mercedes C-Klasse T-Modell (S204)

Diesen Text zusammen mit dem Inserat (PDF, Screenshots oder kopierter Text, Fotos inklusive)
an eine KI schicken. Die Antwort komplett kopieren und in der App ins Import-Feld einfügen
→ „Prüfen" → Fragen beantworten → „Importieren".

Codeblock-Zeichen oder Text drumherum stören nicht — die App schneidet sich das JSON selbst
heraus und bügelt abweichende Schreibweisen glatt.

**Vier Angaben macht die KI nicht.** Nach „Prüfen" fragt die App dich selbst:

| Frage | Wann |
|---|---|
| Ausstattungslinie | nur, wenn die KI sie nicht sicher benennen konnte |
| Exterieur — was zeigen die Fotos außen | immer |
| Interieur — was zeigen die Fotos innen | immer |
| Was wurde repariert | immer, mit dem Wortlaut aus dem Inserat darüber |

Dazu der Link zum Inserat als Pflichtfeld und optional der Stern für Vorzeigefahrzeuge.
Alle vier Antworten sind Analyse-Kategorien: du kannst danach filtern, gruppieren und
Durchschnittspreise vergleichen.

**Den Link kannst du dir sparen:** Schickst du der KI den Link zusammen mit den
Fahrzeugdaten mit, steht er im Feld `url` und die App füllt das Link-Feld schon aus.
Vergisst die KI ihn trotzdem, füg ihn beim Import einfach über oder unter dem
JSON-Block mit ein — bei einem einzelnen Fahrzeug holt die App ihn sich von dort.
Verpackungen wie `[Inserat](https://…)` oder `<https://…>` schneidet sie weg.

---

```
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
  "date": "2026-08-06"
}

SO FÜLLST DU JEDES FELD AUS:

1. "id"
   Zwei Angaben direkt hintereinander, ohne Leerzeichen und ohne Bindestrich:
   erst Monat und Jahr der Erstzulassung als MM/JJJJ,
   danach sofort der Kilometerstand als reine Zahl.
   Beispiel: Erstzulassung 05/2011 und 142.500 km  ->  "05/2011142500"

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
   Das Jahr der Erstzulassung, vierstellig. Beispiel: "2011".

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

12. "owners"
    Die genaue Anzahl der Fahrzeughalter als Zahl in Anführungszeichen,
    zum Beispiel "2". Suche in der Datentabelle UND im Beschreibungstext —
    dort steht sie oft nur nebenbei ("aus zweiter Hand", "Erstbesitz").
    Findest du nichts: "".

13. "hu"
    Wie lange die Hauptuntersuchung noch gültig ist, als MM/JJJJ.
    Beispiel: "04/2027". Steht "Neu bei Übergabe" oder gar nichts: "".

14. "color"  --  NUR EINES DIESER WÖRTER:
        Schwarz | Weiß | Grau | Silber | Blau | Rot | Grün
        Gelb | Orange | Braun | Beige | Gold | Violett
    Zusätze wie "Metallic", "Perleffekt" oder Fantasienamen lässt du weg.
    Aus "Iridiumsilber Metallic" wird also "Silber".

15. "location"
    Postleitzahl und Ort des Fahrzeugs. Beispiel: "50667 Köln".

16. "sellerType"  --  NUR EINES DIESER ZWEI WÖRTER:
        Händler  |  Privat

17. "dealerName"
    Der Name des Händlers. Bei Privatverkauf: "".

18. "listedSince"
    Seit wann das Inserat online ist, als JJJJ-MM-TT.
    Steht auf mobile.de oft als "Online seit" oder "Inseriert am".
    Findest du kein Datum: "".

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
    Deine eigene kurze Einschätzung als Käufer in ein bis zwei Sätzen:
    Was fällt auf, wo ist Vorsicht geboten, passt der Preis?
    Nenne hier auch Einschränkungen wie "Verkauf nur an Gewerbe oder Export",
    "Bastlerfahrzeug", "ohne Gewährleistung", "nicht fahrbereit".

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

25. "date"
    Das heutige Datum im Format JJJJ-MM-TT.
```

---

## Wenn du denselben Wagen später erneut erfasst

Hänge an den Prompt an:

```
Das Auto kenne ich schon, seine id lautet "05/2011142500".
Nimm exakt diese id und trage nur den neuen Preis mit dem heutigen Datum ein.
```

Die App erkennt das Auto an der `id` wieder und hängt den Preis an den Verlauf an,
statt einen zweiten Eintrag anzulegen. Deine Antworten zu Exterieur, Interieur,
Reparaturen und Ausstattungslinie bleiben dabei erhalten.

---

## Was aus den Angaben in der App wird

**Sonderausstattung** entsteht automatisch aus der Länge von `equipment`:

| gefundene Punkte | Eintrag |
|---|---|
| 0 | Serienausstattung |
| 1–2 | Besondere Ausstattung |
| 3 oder mehr | Exzellente Ausstattung |

**Deine vier Antworten** sind vollwertige Analyse-Kategorien — Filter mit
Mehrfachauswahl, Gruppierung bei „Ø Preis nach", und sie fließen in die
Zustandspunkte des Masterchart ein:

| Merkmal | Abzug von 100 Punkten |
|---|---|
| Exterieur | 0 / −6 / −14 / −24 |
| Interieur | 0 / −5 / −12 / −20 |
| Reparaturen | 0 / −3 (Verschleiß) / −14 (Kernteile) / −26 (Prozessteile) |
| Unfallschaden angegeben | −18 |
| Sonderausstattung | +5 (besondere) / +10 (exzellente) |
| Vorzeigefahrzeug (Stern) | +8 |

---

## Warum die id so aufgebaut ist

`MM/JJJJ` plus Kilometerstand ist die Kombination, die zwei sonst gleiche Fahrzeuge
zuverlässig auseinanderhält — zwei C 220 T von 05/2011 haben praktisch nie denselben
Kilometerstand.

Ändert der Händler den angezeigten Kilometerstand, ändert sich die `id` mit. Dann
entsteht ein neuer Eintrag statt eines Preis-Updates. In dem Fall die alte `id`
von Hand in den Prompt schreiben.
