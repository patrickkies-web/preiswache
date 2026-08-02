# Prompt für Claude oder ChatGPT: Inserat → Preiswache-JSON

Diesen Prompt zusammen mit dem Inserat (PDF, Screenshot oder kopierter Text) an die KI schicken.
Den JSON-Block aus der Antwort dann in der Preiswache-App oben in das Import-Feld einfügen → „Prüfen" → „Importieren".

---

Analysiere das angehängte Fahrzeug-Inserat und erstelle daraus GENAU EINEN JSON-Block für meine Preiswache-App. Gib NUR den JSON-Block aus, keinen weiteren Text.

Verwende exakt dieses Schema:

```json
{
  "id": "marke-modell-baujahr (kurz, nur Kleinbuchstaben und Bindestriche, z. B. bmw-320d-2018 — bei einem Preis-Update zum selben Auto exakt dieselbe id wie beim ersten Mal verwenden)",
  "title": "Titel des Inserats",
  "subtitle": "Untertitel/Zusatzzeile, falls vorhanden",
  "make": "Marke, z. B. BMW",
  "model": "Modell, z. B. 320d",
  "series": "Baureihe, z. B. 3er / F30",
  "trimline": "Ausstattungslinie, z. B. M Sport",
  "condition": "Zustand laut Inserat, z. B. Gebraucht",
  "category": "Fahrzeugtyp, z. B. Limousine, Kombi, SUV, Kleinwagen",
  "year": "Erstzulassung als Jahr, z. B. 2018",
  "mileage": 125000,
  "displacement": "Hubraum, z. B. 1995 cm³",
  "power": "Leistung, z. B. 140 kW (190 PS)",
  "drivetrain": "Antrieb, z. B. Heckantrieb, Allrad",
  "fuel": "Kraftstoff, z. B. Diesel, Benzin, Elektro, Hybrid",
  "gearbox": "Getriebe, z. B. Automatik, Schaltgetriebe",
  "owners": "Anzahl Vorbesitzer als Zahl, z. B. 2",
  "hu": "HU/TÜV gültig bis, z. B. 06/2027",
  "color": "Farbe",
  "location": "Ort/PLZ des Fahrzeugs",
  "sellerType": "Privatanbieter oder Händler",
  "dealerName": "Name des Händlers, falls Händler",
  "stars": "Händler-Bewertung, z. B. 4.6, falls angegeben",
  "address": "Adresse des Händlers, falls angegeben",
  "accidentStatus": "GENAU einer dieser Werte: Unfallfrei | Unfallwagen | Unklar",
  "currentIssueStatus": "GENAU einer dieser Werte: Keine | Vorhanden",
  "previousDamageStatus": "GENAU einer dieser Werte: Keine bekannt | Bekannt",
  "repairScope": "GENAU einer dieser Werte: Keine | Gering | Mittel | Umfangreich",
  "repairCount": 0,
  "damageCurrent": "Aktuelle Mängel/Schäden in 1–2 Sätzen, sonst leer lassen",
  "damagePrevious": "Frühere Schäden/Vorschäden in 1–2 Sätzen, sonst leer lassen",
  "damageRepaired": "Bereits reparierte Schäden in 1–2 Sätzen, sonst leer lassen",
  "note": "Deine kurze Einschätzung als Käufer-Hinweis in 1–2 Sätzen (Auffälligkeiten, Preiswürdigkeit, Warnzeichen)",
  "url": "Link zum Inserat, falls bekannt",
  "priceHistory": [
    { "date": "JJJJ-MM-TT (heutiges Datum, falls kein anderes bekannt)", "price": 15990 }
  ]
}
```

Wichtige Regeln:

1. `mileage`, `repairCount` und `price` sind reine Zahlen ohne Punkte, Kommas oder Einheiten (z. B. 125000, nicht "125.000 km").
2. Für `accidentStatus`, `currentIssueStatus`, `previousDamageStatus` und `repairScope` NUR die oben genannten erlaubten Werte verwenden — nichts anderes, keine eigenen Formulierungen.
3. `repairScope` bewertet den Umfang nötiger/erkennbarer Reparaturen: Keine = nichts zu tun, Gering = Kleinigkeiten (z. B. Kratzer, Verschleißteile), Mittel = spürbare Arbeiten (z. B. Kupplung, Bremsen komplett), Umfangreich = größere Instandsetzung (z. B. Motor, Getriebe, Unfallschaden).
4. Was im Inserat nicht steht, als leeren String "" lassen — nichts erfinden. Nur `accidentStatus`, `currentIssueStatus`, `previousDamageStatus` und `repairScope` immer ausfüllen (im Zweifel: Unklar / Keine / Keine bekannt / Keine).
5. Ist das ein Preis-Update zu einem Auto, das ich dir schon einmal geschickt habe, verwende exakt dieselbe `id` und trage in `priceHistory` nur den neuen Preis mit Datum ein.
6. Mehrere Inserate auf einmal: als JSON-Array `[ {...}, {...} ]` ausgeben.
