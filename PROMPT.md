# Prompt für die Preiswache-App

Diesen Text zusammen mit dem Inserat (PDF, Foto oder kopierter Text) an eine KI schicken.
Die Antwort dann komplett kopieren und in der App oben ins Import-Feld einfügen → „Prüfen" → „Importieren".

Funktioniert auch mit den günstigen/kleinen Modellen (ChatGPT gratis, GPT-4o mini, Claude Haiku, Gemini Flash).
Codeblock-Zeichen oder Text drumherum stören nicht — die App schneidet sich das JSON selbst heraus.

---

## Kurzfassung (empfohlen)

```
Lies das Fahrzeug-Inserat im Anhang und fülle diese JSON-Vorlage aus. Antworte NUR mit dem JSON.

{
  "id": "bmw-320d-2018",
  "title": "BMW 320d M Sport",
  "make": "BMW",
  "model": "320d",
  "series": "3er F30",
  "category": "Limousine",
  "year": "2018",
  "mileage": 125000,
  "power": "140 kW (190 PS)",
  "fuel": "Diesel",
  "gearbox": "Automatik",
  "drivetrain": "Heckantrieb",
  "owners": "2",
  "hu": "06/2027",
  "color": "Schwarz",
  "condition": "Gebraucht",
  "location": "50667 Köln",
  "sellerType": "Händler",
  "dealerName": "Autohaus Muster",
  "accidentStatus": "Unfallfrei",
  "currentIssueStatus": "Keine",
  "previousDamageStatus": "Keine bekannt",
  "repairScope": "Keine",
  "damageCurrent": "",
  "damagePrevious": "",
  "damageRepaired": "",
  "note": "Scheckheftgepflegt, Preis leicht über Marktschnitt.",
  "url": "",
  "price": 15990,
  "date": "2026-08-03"
}

Regeln:
1. Ersetze ALLE Beispielwerte durch die echten Werte aus dem Inserat.
2. "mileage" und "price" sind reine Zahlen ohne Punkt, Komma und Einheit.
3. Diese vier Felder dürfen NUR diese Werte haben:
   accidentStatus: Unfallfrei ODER Unfallwagen ODER Unklar
   currentIssueStatus: Keine ODER Vorhanden
   previousDamageStatus: Keine bekannt ODER Bekannt
   repairScope: Keine ODER Gering ODER Mittel ODER Umfangreich ODER Unbekannt
4. Steht etwas nicht im Inserat: "" schreiben. Nichts erfinden.
5. Wenn im Inserat steht, dass das Auto nicht geprüft wurde, ohne
   Gewährleistung verkauft wird oder "an Bastler / Export / Gewerbe" geht:
   repairScope = "Unbekannt" (NICHT "Keine") und currentIssueStatus = "Vorhanden".
6. "id": marke-modell-baujahr in Kleinbuchstaben mit Bindestrichen.
7. "date": das heutige Datum als JJJJ-MM-TT.
```

---

## Zusatzzeile für ein Preis-Update

Wenn du dasselbe Auto später mit neuem Preis erfassen willst, hänge an den Prompt an:

```
Das Auto hatte ich schon mit der id "bmw-320d-2018". Nimm exakt diese id wieder und trage nur den neuen Preis mit heutigem Datum ein.
```

Die App erkennt das Auto an der `id` wieder und hängt den Preis an den Verlauf an, statt ein zweites Auto anzulegen.

---

## Mehrere Autos auf einmal

```
Mehrere Inserate: gib ein JSON-Array aus, also [ {...}, {...} ].
```

---

## Bedeutung der vier Analyse-Felder

| Feld | Bedeutung |
| --- | --- |
| `accidentStatus` | Unfallhistorie laut Inserat |
| `currentIssueStatus` | Hat das Auto jetzt Mängel? |
| `previousDamageStatus` | Sind frühere Schäden bekannt? |
| `repairScope` | Umfang nötiger Reparaturen: `Keine` = nichts zu tun · `Gering` = Kleinkram wie Kratzer oder Verschleißteile · `Mittel` = spürbare Arbeiten wie Bremsen oder Kupplung · `Umfangreich` = Motor, Getriebe oder Unfallschaden · `Unbekannt` = nicht geprüft, ohne Gewährleistung, Bastler-/Exportverkauf |

Nach diesen Feldern filtert und vergleicht die App — deshalb müssen sie immer gesetzt sein.
Im Zweifel: `Unklar`, `Keine`, `Keine bekannt`, `Unbekannt`.

`Unbekannt` ist wichtig: Ein ungeprüftes Auto unter `Keine` einzusortieren
verfälscht den Preisvergleich, weil es dort wie ein mängelfreies Fahrzeug wirkt.
