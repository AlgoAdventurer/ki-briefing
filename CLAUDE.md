# KI Briefing — Tägliche Routine

## Deine Aufgabe
Du bist eine automatische Claude Code Routine. Jeden Morgen um 05:00 Uhr recherchierst
du die aktuellen KI- und Tech-News und schreibst neue JSON-Datendateien ins `content/`
Verzeichnis dieses Repos. Danach committest und pushst du direkt auf main.

Vercel deployed automatisch sobald der Push ankommt.

## Was du NICHT tun musst
- Kein npm install
- Kein npm run build
- Kein Python-Script ausführen
- Keine API aufrufen
- Nur JSON-Dateien schreiben + git commit + git push

## Dateinamen-Schema
Heute ist: YYYY-MM-DD (ermittle das aktuelle Datum mit `date +%Y-%m-%d`)

Schreibe exakt diese 7 Dateien:
- content/top-news-YYYY-MM-DD.json
- content/tool-YYYY-MM-DD.json
- content/releases-YYYY-MM-DD.json
- content/dev-corner-YYYY-MM-DD.json
- content/funding-YYYY-MM-DD.json
- content/regulierung-YYYY-MM-DD.json
- content/contoura-YYYY-MM-DD.json

## Inhalt recherchieren
Recherchiere selbst (du hast Zugriff auf das Web) nach den aktuellsten News der
letzten 24-48 Stunden zu folgenden Themen:
- Neue KI-Modelle, Releases, Updates (OpenAI, Anthropic, Google, Meta, Mistral, etc.)
- Neue KI-Tools und Apps
- Tech-Startups und Funding-Runden
- Big Tech News (Google, Apple, Meta, Microsoft, Amazon)
- EU AI Act, KI-Regulierung, Politik
- Open Source KI (Hugging Face, neue Modelle auf GitHub, etc.)
- Developer-News (neue APIs, SDKs, MCP-Server, GitHub-Highlights)
- Business-Chancen und Monetarisierung mit KI

Suche nach Bildern (Logos, Screenshots, Illustrationen) die zu den Themen passen.
Verwende nur Bilder die frei verfügbar sind (Firmen-Logos von offiziellen Seiten,
Wikimedia Commons, offizielle Pressematerialien).

## JSON-Formate

### content/top-news-YYYY-MM-DD.json
```json
{
  "datum": "YYYY-MM-DD",
  "items": [
    {
      "id": 1,
      "titel": "Vollständiger Titel der News",
      "quelle": "z.B. TechCrunch",
      "quelleUrl": "https://...",
      "zusammenfassung": "2-3 Sätze Zusammenfassung auf Deutsch",
      "kategorie": "z.B. KI-Modelle",
      "bild": "https://... (URL zu einem passenden Bild, oder leer lassen)",
      "wichtigkeit": "hoch"
    }
  ]
}
```
Mindestens 3, maximal 5 Items. Wähle die wirklich wichtigsten News.

### content/tool-YYYY-MM-DD.json
```json
{
  "datum": "YYYY-MM-DD",
  "name": "Tool-Name",
  "tagline": "Kurze Beschreibung in einem Satz",
  "beschreibung": "3-4 Sätze was das Tool macht und warum es relevant ist",
  "useCase": "Konkretes Anwendungsbeispiel",
  "url": "https://...",
  "kategorie": "z.B. Coding / Design / Productivity / API",
  "bild": "https://... (Logo oder Screenshot, oder leer lassen)",
  "kostenlos": true,
  "tags": ["tag1", "tag2", "tag3"]
}
```

### content/releases-YYYY-MM-DD.json
```json
{
  "datum": "YYYY-MM-DD",
  "items": [
    {
      "id": 1,
      "name": "Modell- oder Produktname",
      "version": "z.B. 2.0 oder leer",
      "anbieter": "Firmenname",
      "detail": "Was ist neu, was hat sich geändert, warum relevant",
      "url": "https://...",
      "bild": "https://... oder leer"
    }
  ]
}
```
Mindestens 2, maximal 5 Items.

### content/dev-corner-YYYY-MM-DD.json
```json
{
  "datum": "YYYY-MM-DD",
  "items": [
    {
      "id": 1,
      "titel": "Technisches Thema",
      "typ": "z.B. API / SDK / Open Source / Tutorial / Tool",
      "detail": "Was ist es, warum ist es für Entwickler relevant, wie nutzt man es",
      "url": "https://...",
      "codebeispiel": "Optional: kurzes Code-Snippet wenn sinnvoll"
    }
  ]
}
```
Mindestens 2, maximal 4 Items.

### content/funding-YYYY-MM-DD.json
```json
{
  "datum": "YYYY-MM-DD",
  "items": [
    {
      "id": 1,
      "firma": "Firmenname",
      "betrag": "z.B. $50M",
      "runde": "z.B. Series B",
      "investoren": "Wichtigste Investoren",
      "beschreibung": "Was macht die Firma, warum ist die Runde relevant",
      "bild": "https://... oder leer"
    }
  ]
}
```
Mindestens 1, maximal 3 Items. Nur wenn wirklich relevante Deals passiert sind.

### content/regulierung-YYYY-MM-DD.json
```json
{
  "datum": "YYYY-MM-DD",
  "items": [
    {
      "id": 1,
      "titel": "Titel der Regulierungs-News",
      "region": "z.B. EU / USA / Global / Schweiz",
      "detail": "Was wurde beschlossen, was bedeutet es, wer ist betroffen",
      "url": "https://...",
      "auswirkung": "hoch / mittel / niedrig"
    }
  ]
}
```
Mindestens 1, maximal 3 Items. Leer lassen wenn nichts Relevantes passiert ist (dann schreibe `"items": []`).

### content/contoura-YYYY-MM-DD.json
```json
{
  "datum": "YYYY-MM-DD",
  "items": [
    {
      "id": 1,
      "titel": "Konkrete Chance oder Idee",
      "kontext": "Welcher aktuelle KI-Trend macht das möglich",
      "umsetzung": "Wie könnte Contoura das konkret implementieren",
      "aufwand": "niedrig / mittel / hoch",
      "prioritaet": "hoch / mittel / niedrig"
    }
  ]
}
```

Contoura ist eine Performance-Plattform für Orientierungslauf-Athleten mit:
- Trainingsdokumentation
- Split-Zeit-Analyse
- Fehlerstatistiken
- Performance-Index
- Athleten können ihre Leistung über Zeit tracken

Denke konkret: z.B. "Neues GPT-4o Vision könnte Kartenanalyse ermöglichen", "Claude API
könnte automatische Trainingskommentare generieren", "Neue open-source Zeitreihendatenbank
perfekt für Performance-Tracking". Mindestens 2 Items.

## Git-Befehle nach dem Schreiben
```bash
DATE=$(date +%Y-%m-%d)
git config user.email "briefing@ki-briefing.app"
git config user.name "KI Briefing Bot"
git add content/
git commit -m "briefing: ${DATE} — tägliche KI & Tech News"
git push origin main
```

## Qualitätskontrolle vor dem Push
- Sind alle 7 Dateien vorhanden?
- Ist das Datum in allen Dateien korrekt (heutiges Datum)?
- Ist jede JSON-Datei valides JSON? (Prüfe mit: `python3 -m json.tool content/top-news-${DATE}.json`)
- Haben alle Items sinnvolle Inhalte (keine Platzhalter)?

Wenn eine Prüfung fehlschlägt: korrigiere die Datei und prüfe nochmal. Erst dann pushen.
