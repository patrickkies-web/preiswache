/* ------------------------------------------------------------------ *
 *  Ablage für die Fahrzeugliste
 *
 *  GET   /api/garage   ->  { vehicles, quooker, savedAt }
 *  PUT   /api/garage   <-  { vehicles, quooker, base }   ->  { savedAt }
 *
 *  "quooker" ist die zweite Warengruppe. Sie liegt im selben Datensatz,
 *  damit ein Gerät beide Bestände in einem Zug bekommt; fehlt sie, ist
 *  sie leer -- ältere Stände bleiben damit gültig.
 *
 *  Zugriff nur mit dem Schlüssel aus PREISWACHE_KEY (Header
 *  "authorization: Bearer <schlüssel>").
 *
 *  Gespeichert wird in Upstash Redis über dessen REST-Schnittstelle —
 *  ohne npm-Pakete, damit das Projekt eine statische Seite bleibt.
 *  Erwartete Umgebungsvariablen (beide Schreibweisen werden akzeptiert):
 *    KV_REST_API_URL / KV_REST_API_TOKEN
 *    UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 * ------------------------------------------------------------------ */

const REDIS_KEY = "preiswache:garage";

// Groß- und Kleinschreibung des Variablennamens ist beim Anlegen leicht
// zu übersehen, für die Funktion aber ohne Bedeutung — also egal.
function passwort() {
  const name = Object.keys(process.env).find((n) => n.toLowerCase() === "preiswache_key");
  return name ? String(process.env[name]).trim() : "";
}

function speicherZugang() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

async function redis(befehl) {
  const zugang = speicherZugang();
  const antwort = await fetch(zugang.url, {
    method: "POST",
    headers: { authorization: `Bearer ${zugang.token}`, "content-type": "application/json" },
    body: JSON.stringify(befehl),
  });
  if (!antwort.ok) throw new Error(`Speicher antwortete mit ${antwort.status}`);
  const daten = await antwort.json();
  return daten.result;
}

async function lesen() {
  const roh = await redis(["GET", REDIS_KEY]);
  if (!roh) return { vehicles: {}, quooker: {}, savedAt: null };
  try {
    const daten = typeof roh === "string" ? JSON.parse(roh) : roh;
    return { vehicles: daten.vehicles || {}, quooker: daten.quooker || {}, savedAt: daten.savedAt || null };
  } catch (_) {
    return { vehicles: {}, quooker: {}, savedAt: null };
  }
}

function schluesselAusAnfrage(req) {
  const kopf = req.headers.authorization || req.headers.Authorization || "";
  const treffer = /^Bearer\s+(.+)$/i.exec(String(kopf).trim());
  return treffer ? treffer[1].trim() : "";
}

module.exports = async function handler(req, res) {
  res.setHeader("cache-control", "no-store");

  // Beide Voraussetzungen zusammen melden, damit beim Einrichten
  // nicht ein Problem das andere verdeckt.
  const erwartet = passwort();
  const fehlt = [];
  if (!erwartet) fehlt.push("PREISWACHE_KEY");
  if (!speicherZugang()) fehlt.push("Speicher");
  if (fehlt.length) {
    const texte = {
      PREISWACHE_KEY: "das Passwort PREISWACHE_KEY (Settings → Environment Variables)",
      Speicher: "die Verbindung zum Speicher, also KV_REST_API_URL und KV_REST_API_TOKEN (Storage → Upstash for Redis, mit dem Projekt verbinden)",
    };
    // Hilfe beim Einrichten: Namen ähnlicher Variablen nennen (nie Werte),
    // damit Tippfehler auffallen, und die Kennung des Deployments zeigen —
    // ändert sie sich nicht, wurde nach dem Speichern nicht neu ausgerollt.
    return res.status(503).json({
      error: `Auf dem Server fehlt noch ${fehlt.map((f) => texte[f]).join(" sowie ")}. Nach dem Anlegen einmal neu ausrollen, sonst kennen die Funktionen die Werte nicht.`,
      missing: fehlt,
      aehnlicheNamen: Object.keys(process.env).filter((n) => /preis|wache/i.test(n)),
      deployment: (process.env.VERCEL_DEPLOYMENT_ID || "unbekannt").slice(-12),
    });
  }
  if (schluesselAusAnfrage(req) !== erwartet) {
    return res.status(401).json({ error: "Falscher Schlüssel." });
  }

  try {
    if (req.method === "GET") {
      return res.status(200).json(await lesen());
    }

    if (req.method === "PUT" || req.method === "POST") {
      let koerper = req.body;
      if (typeof koerper === "string") { try { koerper = JSON.parse(koerper); } catch (_) { koerper = null; } }
      if (!koerper || typeof koerper !== "object" || typeof koerper.vehicles !== "object" || koerper.vehicles === null) {
        return res.status(400).json({ error: "Es wurde keine Fahrzeugliste mitgeschickt." });
      }

      // Schutz vor stillem Überschreiben: Wer auf einem veralteten Stand
      // aufsetzt, bekommt den aktuellen Stand zurück statt ihn zu ersetzen.
      const vorhanden = await lesen();
      if (vorhanden.savedAt && koerper.base !== undefined && koerper.base !== vorhanden.savedAt) {
        return res.status(409).json({
          error: "Auf dem Server liegt ein neuerer Stand.",
          savedAt: vorhanden.savedAt,
          vehicles: vorhanden.vehicles,
          quooker: vorhanden.quooker,
        });
      }

      const savedAt = new Date().toISOString();
      // Eine Warengruppe, die nicht mitgeschickt wurde, bleibt unangetastet.
      const quooker = koerper.quooker && typeof koerper.quooker === "object"
        ? koerper.quooker : vorhanden.quooker;
      await redis(["SET", REDIS_KEY, JSON.stringify({ vehicles: koerper.vehicles, quooker, savedAt })]);
      return res.status(200).json({ savedAt });
    }

    res.setHeader("allow", "GET, PUT");
    return res.status(405).json({ error: "Nicht unterstützte Methode." });
  } catch (fehler) {
    return res.status(502).json({ error: `Der Speicher ist gerade nicht erreichbar: ${fehler.message}` });
  }
};
