# Prompt für die Preiswache-App

Diesen Text zusammen mit dem Inserat (PDF oder Screenshots, Fotos inklusive) an eine KI schicken.
Die Antwort komplett kopieren und in der App oben ins Import-Feld einfügen → „Prüfen" → „Importieren".

Codeblock-Zeichen oder Text drumherum stören nicht — die App schneidet sich das JSON selbst heraus
und bügelt abweichende Schreibweisen glatt.

**Drei Angaben macht die KI nicht:** Nach „Prüfen" fragt die App dich selbst,
ob auf den Fotos Beschädigungen zu erkennen sind, wie das Fahrzeug im Inserat
dargestellt ist, und nach dem Link zum Inserat. Die ersten beiden sind
Analyse-Kategorien wie alle anderen — du kannst danach filtern und
Durchschnittspreise vergleichen. Alle drei sind Pflicht.

---

```
Du bekommst ein Fahrzeug-Inserat von mobile.de (Text, Tabelle und Fotos).
Erstelle daraus einen JSON-Block. Antworte NUR mit dem JSON, ohne Kommentar.

WICHTIG VORAB:
- Nutze ALLE Quellen: die Datentabelle, den Beschreibungstext UND die Fotos.
  Manches steht nur im Fließtext und nicht in der Tabelle.
- Wo ich unten eine Liste erlaubter Wörter vorgebe, darfst du AUSSCHLIESSLICH
  diese Wörter verwenden. Keine eigenen Formulierungen, keine Zusätze.
- Wo keine Liste steht, schreibst du ab, was im Inserat steht.
- Was du nicht findest: "" (leerer Text). Niemals raten oder erfinden.

{
  "id": "03/2014188373",
  "title": "Mercedes-Benz C 220 T CDI BlueEfficiency Automatik",
  "make": "Mercedes-Benz",
  "model": "C 220",
  "series": "C-Klasse",
  "trimline": "Avantgarde",
  "category": "Kombi",
  "year": "2014",
  "month": "03",
  "mileage": 188373,
  "power": "125 kW (170 PS)",
  "displacement": "2143 cm³",
  "fuel": "Diesel",
  "gearbox": "Automatik",
  "drivetrain": "Heckantrieb",
  "owners": "3",
  "hu": "03/2026",
  "color": "Grau",
  "condition": "Gebraucht",
  "location": "09116 Chemnitz",
  "sellerType": "Händler",
  "dealerName": "AutoKaramba",
  "stars": "4.2",
  "address": "Musterstraße 1, 09116 Chemnitz",
  "accidentStatus": "Unfallfrei",
  "currentIssueStatus": "Keine",
  "previousDamageStatus": "Keine",
  "repairScope": "Keine",
  "repairCount": 0,
  "damageCurrent": "",
  "damagePrevious": "",
  "damageRepaired": "",
  "note": "",
  "url": "",
  "price": 5390,
  "date": "2026-08-03"
}

SO FÜLLST DU JEDES FELD AUS:

1. "id"
   Zwei Angaben direkt hintereinander, ohne Leerzeichen und ohne Bindestrich:
   erst der Monat und das Jahr der Erstzulassung als MM/JJJJ,
   danach sofort der Kilometerstand als reine Zahl.
   Beispiel: Erstzulassung 03/2014 und 188.373 km  ->  "03/2014188373"

2. "title"
   Die Überschrift des Inserats, genau so abgeschrieben wie sie dasteht.

3. "make"
   Die Automarke. Beispiel: "Mercedes-Benz", "BMW", "Volkswagen".

4. "model"
   Die Handelsbezeichnung, so wie mobile.de sie im Feld "Modell" führt.
   Beispiel: "C 220", "320d", "Golf". Ohne Zusätze wie Ausstattung oder Motor.

5. "series"
   Die Baureihe, zu der das Modell gehört.
   Beispiel: C 220 -> "C-Klasse", 320d -> "3er", A4 -> "A4".

6. "trimline"
   Die Ausstattungslinie, falls genannt. Beispiel: "AMG Line", "M Sport",
   "Avantgarde", "Elegance". Steht keine da: "".

7. "category"  --  NUR EINES DIESER FÜNF WÖRTER:
      Limousine  |  Coupé  |  Kombi  |  Kleinwagen  |  SUV
   So entscheidest du:
     Coupé      = genau ZWEI Türen (auch Cabrio und Roadster zählen hierzu)
     Kombi      = langes Dach bis zum Heck, große Heckklappe
                  (T-Modell, Touring, Avant, Variant, Turnier heißen alle Kombi)
     Limousine  = vier Türen mit abgesetztem Kofferraum (Stufenheck)
     Kleinwagen = vier Türen mit Schrägheck, kurzes Auto
     SUV        = hoch gebaut, Geländewagen-Form
   Schau dir dazu die FOTOS an und zähle die Türen und die Dachform.
   Wenn Foto und Text sich widersprechen, gilt das FOTO.

8. "year"
   Das Jahr der Erstzulassung, vierstellig. Beispiel: "2014".

9. "month"
   Der Monat der Erstzulassung, zweistellig mit führender Null.
   Beispiel: März -> "03", November -> "11".

10. "mileage"
    Der Kilometerstand aus dem Inserat als reine Zahl,
    ohne Punkt, ohne Komma, ohne "km". Beispiel: 188373

11. "fuel"  --  NUR EINES DIESER ZWEI WÖRTER:
       Benzin  |  Diesel
    Alles was Benzin braucht (Super, Super Plus, E10, TSI, TFSI) -> "Benzin".
    Alles Dieselartige (TDI, CDI, HDI, BlueTEC) -> "Diesel".
    Andere Antriebsarten interessieren mich nicht.

12. "gearbox"  --  NUR EINES DIESER ZWEI WÖRTER:
       Automatik  |  Manuell
    Automatik = jede Art von Automatik (DSG, Tiptronic, S-tronic, 7G-TRONIC,
    Doppelkupplung, Wandler). Manuell = Schaltgetriebe von Hand.
    Die Anzahl der Gänge interessiert mich nicht.

13. "owners"
    Die genaue Anzahl der Vorbesitzer als Zahl in Anführungszeichen,
    zum Beispiel "3". Suche danach in der Tabelle UND im Beschreibungstext,
    dort steht sie oft nur nebenbei. Findest du nichts: "".

14. "power"
    Die Motorleistung im Format "kW (PS)". Beispiel: "125 kW (170 PS)".

15. "displacement"
    Der Hubraum mit Einheit. Beispiel: "2143 cm³".

16. "drivetrain"  --  NUR EINES DIESER DREI WÖRTER:
       Heckantrieb  |  Frontantrieb  |  Allrad
    Allrad heißt bei den Marken auch 4MATIC, quattro, xDrive, 4motion, 4x4.
    Steht nichts dazu im Inserat: "".

17. "hu"
    Wie lange die Hauptuntersuchung (TÜV) noch gültig ist, als MM/JJJJ.
    Beispiel: "03/2026". Steht "Neu bei Übergabe" oder nichts: "".

18. "color"  --  NUR EINES DIESER WÖRTER:
       Schwarz | Weiß | Grau | Silber | Blau | Rot | Grün
       Gelb | Orange | Braun | Beige | Gold | Violett
    Zusätze wie "Metallic", "Perleffekt" oder Fantasienamen lässt du weg.
    Aus "Obsidianschwarz Metallic" wird also "Schwarz".

19. "condition"  --  NUR EINES DIESER VIER WÖRTER:
       Gebraucht  |  Neu  |  Vorführwagen  |  Jahreswagen

20. "location"
    Postleitzahl und Ort des Fahrzeugs. Beispiel: "09116 Chemnitz".

21. "sellerType"  --  NUR EINES DIESER ZWEI WÖRTER:
       Händler  |  Privat

22. "dealerName"
    Der Name des Händlers. Bei Privatverkauf: "".

23. "stars"
    Die Sternebewertung des Händlers als Zahl, zum Beispiel "4.2".
    Keine Bewertung vorhanden: "".

24. "address"
    Die Straßenanschrift des Händlers, falls angegeben. Sonst "".

25. "accidentStatus"  --  NUR EINES DIESER DREI WÖRTER:
       Unfallfrei  |  Unfallwagen  |  Unbekannt
    Unfallfrei = das Inserat sagt ausdrücklich unfallfrei.
    Unfallwagen = das Inserat nennt einen Unfall.
    Unbekannt = dazu steht nichts.

26. "currentIssueStatus"  --  NUR EINES DIESER DREI WÖRTER:
       Keine  |  Vorhanden  |  Unbekannt
    Gemeint sind Mängel, die das Auto JETZT hat.
    Vorhanden = es werden aktuelle Mängel oder Defekte genannt.
    Keine = das Inserat sagt ausdrücklich, dass alles in Ordnung ist.
    Unbekannt = dazu steht nichts.

27. "previousDamageStatus"  --  NUR EINES DIESER DREI WÖRTER:
       Keine  |  Vorhanden  |  Unbekannt
    Gemeint sind FRÜHERE Schäden, egal ob repariert oder nicht.

28. "repairScope"  --  NUR EINES DIESER FÜNF WÖRTER:
       Keine  |  Gering  |  Mittel  |  Umfangreich  |  Unbekannt
    Wie viel muss am Auto gemacht werden?
      Keine       = nichts zu tun
      Gering      = Kleinkram: Kratzer, Verschleißteile, Bremsbeläge
      Mittel      = spürbare Arbeiten: Kupplung, Bremsanlage, Steuerkette
      Umfangreich = Motor, Getriebe oder Unfallschaden
      Unbekannt   = niemand weiß es
    WICHTIG: Steht im Inserat "nicht geprüft", "ohne Gewährleistung",
    "Bastlerfahrzeug", "nur an Gewerbe" oder "nur Export",
    dann schreibst du "Unbekannt" -- niemals "Keine".

29. "repairCount"
    Anzahl der einzeln genannten nötigen Reparaturen als Zahl.
    Werden keine genannt: 0

30. "damageCurrent"
    Die aktuellen Mängel in ein bis zwei Sätzen, mit deinen Worten
    zusammengefasst. Keine Mängel genannt: "".

31. "damagePrevious"
    Frühere Schäden in ein bis zwei Sätzen. Nichts genannt: "".

32. "damageRepaired"
    Bereits reparierte Schäden in ein bis zwei Sätzen. Nichts genannt: "".

33. "note"
    Deine eigene kurze Einschätzung als Käufer in ein bis zwei Sätzen:
    Was fällt auf, wo ist Vorsicht geboten, passt der Preis?
    Nenne hier auch Einschränkungen wie "Verkauf nur an Gewerbe oder Export".

34. "url"
    Immer "" lassen. Die Links trage ich selbst in der App ein — schick mir
    also keine mit und versuche nicht, welche zuzuordnen.

35. "price"
    Der geforderte Preis in Euro als reine Zahl, ohne Punkt und ohne "€".
    Beispiel: 5390

36. "date"
    Das heutige Datum im Format JJJJ-MM-TT.
```

---

## Wenn du denselben Wagen später erneut erfasst

Hänge an den Prompt an:

```
Das Auto kenne ich schon, seine id lautet "03/2014188373".
Nimm exakt diese id und trage nur den neuen Preis mit dem heutigen Datum ein.
```

Die App erkennt das Auto an der `id` wieder und hängt den Preis an den Verlauf an,
statt einen zweiten Eintrag anzulegen.

## Mehrere Inserate auf einmal

```
Mehrere Inserate: gib ein JSON-Array aus, also [ {...}, {...} ].
Behalte dabei die Reihenfolge der Anhänge bei.
```

Das spart Anfragen und ist der schnellste Weg: Sammle tagsüber Screenshots oder
PDFs, schicke abends fünf bis zehn auf einmal.

**Links gehören nicht in den Chat.** Die KI kann fünf Anhänge und fünf Adressen
nicht zuverlässig einander zuordnen. Kopiere die Adressen stattdessen untereinander
in eine Notiz und füge sie beim Import in das Feld „Alle Links auf einmal einfügen"
ein — die App verteilt sie der Reihe nach auf die Fahrzeuge.

---

## Warum die id so aufgebaut ist

`MM/JJJJ` plus Kilometerstand ist die Kombination, die zwei sonst gleiche
Fahrzeuge zuverlässig auseinanderhält — zwei C 220 Kombis von 2014 haben
praktisch nie denselben Kilometerstand. Vorher bestand die `id` nur aus
Marke, Modell und Baujahr; dabei wären solche Fahrzeuge zu einem einzigen
Eintrag verschmolzen und ihre Preise als Preisverlauf eines Autos erschienen.

Ändert der Händler den angezeigten Kilometerstand, ändert sich die `id` mit.
Dann entsteht ein neuer Eintrag statt eines Preis-Updates. In dem Fall die
alte `id` von Hand in den Prompt schreiben.
