# Lehrerzitate Backend - API Dokumentation

## 🚀 Schnellstart

```bash
# 1. Dependencies installieren
npm install

# 2. Server starten
node src/server.js

# 3. Health Check
curl http://localhost:3000/api/health
```

**Server läuft auf:** `http://localhost:3000`

---

## 📊 Datenbank-Schema

### Tabelle: `quotes`
```sql
CREATE TABLE quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,                    -- Zitat-Text (10-500 Zeichen)
  teacher TEXT NOT NULL,                 -- Lehrer-Name (2-100 Zeichen)
  subject TEXT,                          -- Fach (optional, max 50 Zeichen)
  upvotes INTEGER DEFAULT 0,             -- Positive Bewertungen
  downvotes INTEGER DEFAULT 0,           -- Negative Bewertungen
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabelle: `votes`
Verfolgt Nutzer-Abstimmungen um Mehrfach-Voting zu verhindern
```sql
CREATE TABLE votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,                 -- Browser-basierte User-ID
  vote_type TEXT CHECK(vote_type IN ('up', 'down')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(quote_id, user_id),             -- Ein Vote pro User pro Quote
  FOREIGN KEY(quote_id) REFERENCES quotes(id) ON DELETE CASCADE
);
```

---

## 🔌 API Endpoints

### ✅ GET `/api/health`
Health Check Endpoint
```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Backend ist online"
}
```

---

### 📋 GET `/api/quotes`
Alle Zitate abrufen mit optionalem Filter und Sortierung

**Query Parameter:**
- `sort` (optional): `newest` (default), `popular`, `oldest`
- `search` (optional): Suchtext (sucht in text, teacher, subject)

**Beispiele:**
```bash
# Alle Zitate (neueste zuerst)
curl http://localhost:3000/api/quotes

# Populärste Zitate
curl "http://localhost:3000/api/quotes?sort=popular"

# Nach Lehrer "Müller" suchen
curl "http://localhost:3000/api/quotes?search=Müller"

# Kombiniert: Suchen + Sortierung
curl "http://localhost:3000/api/quotes?search=Mathematik&sort=popular"
```

**Response:**
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": 1,
      "text": "Wenn ihr nicht schweigen könnt...",
      "teacher": "Herr Müller",
      "subject": "Mathematik",
      "upvotes": 342,
      "downvotes": 15,
      "created_at": "2025-01-10T12:00:00.000Z",
      "updated_at": "2025-01-10T12:00:00.000Z"
    }
    // ... mehr Zitate
  ]
}
```

---

### 📖 GET `/api/quotes/:id`
Ein einzelnes Zitat abrufen

```bash
curl http://localhost:3000/api/quotes/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Wenn ihr nicht schweigen könnt...",
    "teacher": "Herr Müller",
    "subject": "Mathematik",
    "upvotes": 342,
    "downvotes": 15,
    "created_at": "2025-01-10T12:00:00.000Z",
    "updated_at": "2025-01-10T12:00:00.000Z"
  }
}
```

---

### ✍️ POST `/api/quotes`
Neues Zitat einreichen

**Body:**
```json
{
  "text": "Mindestens 10, maximal 500 Zeichen",
  "teacher": "Lehrer Name (2-100 Zeichen)",
  "subject": "Optionales Fach (max 50 Zeichen)"
}
```

**Beispiel:**
```bash
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Das ist ein neues Zitat von einem Lehrer!",
    "teacher": "Herr Beispiel",
    "subject": "Deutsch"
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Zitat erfolgreich eingereicht",
  "data": {
    "id": 13,
    "text": "Das ist ein neues Zitat von einem Lehrer!",
    "teacher": "Herr Beispiel",
    "subject": "Deutsch",
    "upvotes": 0,
    "downvotes": 0,
    "created_at": "2025-01-15T14:30:00.000Z",
    "updated_at": "2025-01-15T14:30:00.000Z"
  }
}
```

**Error Responses:**
```json
// Validierungsfehler (400)
{
  "success": false,
  "error": "Zitat muss zwischen 10 und 500 Zeichen lang sein"
}

// Duplikat (409)
{
  "success": false,
  "error": "Dieses Zitat existiert bereits"
}
```

---

### 👍 POST `/api/quotes/:id/vote`
Für/gegen ein Zitat abstimmen (Upvote/Downvote)

**Body:**
```json
{
  "userId": "eindeutige_user_id",
  "voteType": "up" | "down"
}
```

**Verhalten:**
- **Gleicher Vote-Typ:** Entfernt die Stimme (Toggle)
- **Anderer Vote-Typ:** Ersetzt die alte Stimme
- **Neue Stimme:** Fügt Stimme hinzu

**Beispiel:**
```bash
curl -X POST http://localhost:3000/api/quotes/1/vote \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_abc123xyz",
    "voteType": "up"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Stimme verarbeitet",
  "data": {
    "id": 1,
    "text": "Wenn ihr nicht schweigen könnt...",
    "teacher": "Herr Müller",
    "subject": "Mathematik",
    "upvotes": 343,
    "downvotes": 15,
    "created_at": "2025-01-10T12:00:00.000Z",
    "updated_at": "2025-01-15T14:35:00.000Z"
  },
  "userVote": "up"
}
```

---

### 🗑️ DELETE `/api/quotes/:id/vote`
Stimme entfernen

**Body:**
```json
{
  "userId": "eindeutige_user_id"
}
```

**Beispiel:**
```bash
curl -X DELETE http://localhost:3000/api/quotes/1/vote \
  -H "Content-Type: application/json" \
  -d '{"userId": "user_abc123xyz"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Stimme entfernt",
  "data": {
    "id": 1,
    "upvotes": 342,
    "downvotes": 15
  },
  "userVote": null
}
```

---

## 🔐 CORS Konfiguration

Der Server erlaubt Anfragen von:
- `http://localhost:3000` (lokales Backend)
- `http://localhost:8000` (lokales Frontend)
- `http://localhost:5173` (Vite Development Server)
- `https://*.github.io` (GitHub Pages Deployment)

Für Production: Setze `FRONTEND_URL` in `.env`

---

## 🌍 Frontend Integration

### API URL konfigurieren

Das Frontend liest die API URL aus `localStorage`:
```javascript
// Frontend liest von hier (in dieser Reihenfolge):
1. localStorage.getItem('apiUrl')      // Falls manuell gesetzt
2. 'http://localhost:3000/api'         // Fallback für Entwicklung
```

**Beispiel: API URL ändern im Browser Console**
```javascript
localStorage.setItem('apiUrl', 'https://api.lehrerzitate.com');
location.reload();
```

### User-ID Tracking

Jeder Benutzer bekommt eine eindeutige ID:
```javascript
// Frontend generiert automatisch:
localStorage.getItem('userId')
// oder
'user_' + Math.random().toString(36).substr(2, 9)
```

---

## 📝 Datei-Struktur

```
Backend/
├── src/
│   ├── app.js              # Express App & Middleware
│   └── server.js           # Server Start & DB Init
├── database/
│   ├── db.js               # SQLite Verbindung
│   └── init.js             # Schema & Beispieldaten
├── routes/
│   └── quotes.js           # Alle Quote Endpoints
├── package.json            # Dependencies
├── .env                    # Konfiguration (nicht in Git)
├── .env.example            # Template für .env
├── .gitignore              # Git-Ignore Regeln
└── README.md               # Diese Datei
```

---

## 🗄️ Datenbank-Speicherort

SQLite Datenbank wird gespeichert unter:
```
Backend/data/lehrerzitate.db
```

Wird automatisch erstellt bei erstem Start!

---

## 🛠️ Development

### Umgebungsvariablen (.env)

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:8000
```

### Dependencies

```json
{
  "express": "^5.2.1",
  "cors": "^2.8.5",
  "sqlite3": "^5.1.7",
  "dotenv": "^17.2.3",
  "bcryptjs": "^3.0.3",
  "jsonwebtoken": "^9.0.3"
}
```

---

## 🚀 Production Deployment (Cloudflare Tunnel)

### 1. Cloudflare Account Setup
```bash
# Installiere Cloudflare CLI
npm install -g @cloudflare/wrangler

# Oder verwende cloudflared:
# https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/
```

### 2. Starte Backend auf Raspberry Pi
```bash
ssh pi@raspberry.local
cd lehrerzitate/Backend
NODE_ENV=production node src/server.js
```

### 3. Erstelle Cloudflare Tunnel
```bash
cloudflared tunnel create lehrerzitate
cloudflared tunnel route dns lehrerzitate api.lehrerzitate.com
cloudflared tunnel config
```

### 4. Konfiguriere für Production
```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://yourusername.github.io/Lehrerzitate
```

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Alle Zitate laden
```bash
curl http://localhost:3000/api/quotes
```

### Zitat einreichen
```bash
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Ein neues Testquote!",
    "teacher": "Test Teacher",
    "subject": "Test"
  }'
```

### Abstimmen
```bash
curl -X POST http://localhost:3000/api/quotes/1/vote \
  -H "Content-Type: application/json" \
  -d '{"userId": "test_user", "voteType": "up"}'
```

---

## 📊 Logging

Der Server loggt alle Requests:
```
2025-01-15T14:30:00.000Z - GET /api/quotes
2025-01-15T14:30:01.000Z - POST /api/quotes/1/vote
```

---

## ❌ Error Handling

Alle Endpoints folgen dieser Struktur:

**Success (2xx):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": "Fehlermeldung",
  "status": 400
}
```

---

## 🔍 Debugging

### Browser Console
```javascript
// API URL prüfen
console.log(localStorage.getItem('apiUrl'));

// User ID prüfen
console.log(localStorage.getItem('userId'));

// Votes prüfen
console.log(JSON.parse(localStorage.getItem('userVotes')));
```

### Server Logs anschauen
```bash
node src/server.js  # Logs werden auf Console ausgegeben
```

---

## 🚨 Häufige Probleme

| Problem | Lösung |
|---------|--------|
| CORS Error | Prüfe FRONTEND_URL in .env |
| Datenbank leer | Server wurde nicht korrekt gestartet |
| Port 3000 in Benutzung | `lsof -i :3000` (Mac/Linux) oder wechsle PORT in .env |
| Zitate laden nicht | Öffne Browser Console (F12) und prüfe API URL |

---

**Status:** ✅ Produktionsreif für lokales Testing  
**Nächster Schritt:** Cloudflare Tunnel Setup für Production
