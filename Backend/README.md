# 🚀 Lehrerzitate Backend Quick Start

## Installation & Start

```bash
# Terminal 1: Backend starten
cd Backend
npm install  # Nur beim ersten Mal
npm start    # oder: node src/server.js

# Terminal 2: Frontend starten
cd Frontend/html
python -m http.server 8000
```

**URLs:**
- Frontend: http://localhost:8000
- Backend API: http://localhost:3000/api
- Health Check: http://localhost:3000/api/health

---

## Was wurde implementiert?

✅ **Backend (Node.js + Express)**
- RESTful API mit CRUD Operations
- SQLite Datenbank mit 2 Tabellen (quotes, votes)
- Search, Filter, Sorting
- Voting System (Mehrfach-Vote Prevention)
- CORS konfiguriert
- Input Validation
- Error Handling

✅ **Frontend Integration**
- API Calls statt Dummy-Daten
- User-ID Tracking (localStorage)
- Quote Submission an API
- Voting via API
- Auto-Reload nach Submit

✅ **Dokumentation**
- API_DOCUMENTATION.md - Vollständige API Referenz
- BACKEND_SETUP_GUIDE.md - Projekt-Übersicht
- Inline Code Comments

---

## 🔑 Wichtige Features

### Quote Management
- GET /api/quotes - Alle Zitate mit Filter/Sort
- POST /api/quotes - Zitat einreichen
- GET /api/quotes/:id - Einzelnes Zitat

### Voting System
- POST /api/quotes/:id/vote - Abstimmen
- DELETE /api/quotes/:id/vote - Stimme entfernen
- Verhindert Mehrfach-Votes per User

### Search & Filter
```bash
# Nach Lehrer suchen
curl "http://localhost:3000/api/quotes?search=Müller"

# Populärste Zitate
curl "http://localhost:3000/api/quotes?sort=popular"

# Kombiniert
curl "http://localhost:3000/api/quotes?search=Mathematik&sort=popular"
```

---

## 📊 Datenbank

**Automatisch erstellt beim Start:**
```
Backend/data/lehrerzitate.db
```

**Mit Beispieldaten:**
- 12 Sample Quotes von verschiedenen Lehrern
- Zufällige Up/Downvotes

---

## 🛠️ Konfiguration

**Backend (.env):**
```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:8000
```

**Frontend (localStorage):**
```javascript
// Wird automatisch gesetzt, kann aber überschrieben werden:
localStorage.setItem('apiUrl', 'http://localhost:3000/api');
localStorage.setItem('userId', 'unique_user_id');
```

---

## 🧪 Schnell testen

```bash
# Health Check
curl http://localhost:3000/api/health

# Alle Zitate
curl http://localhost:3000/api/quotes

# Abstimmen
curl -X POST http://localhost:3000/api/quotes/1/vote \
  -H "Content-Type: application/json" \
  -d '{"userId":"test_user","voteType":"up"}'
```

---

## 📚 Dokumentation

- **Backend/API_DOCUMENTATION.md** - Alle API Endpoints
- **BACKEND_SETUP_GUIDE.md** - Projekt-Übersicht & Deployment
- **Frontend/README.md** - Frontend Dokumentation
- **Frontend/QUICKSTART.md** - 1-Minuten Setup

---

## 🚀 Deployment Schritte

### 1️⃣ GitHub Pages (Frontend)
```bash
git push origin main
# Settings → Pages → Deploy from main branch
```

### 2️⃣ Raspberry Pi (Backend)
```bash
ssh pi@raspberry.local
git clone <repo>
cd Backend
npm install
NODE_ENV=production node src/server.js
```

### 3️⃣ Cloudflare Tunnel
```bash
cloudflared tunnel create lehrerzitate
cloudflared tunnel route dns lehrerzitate api.lehrerzitate.com
# Config in Backend/.env: FRONTEND_URL=https://yourusername.github.io/...
```

### 4️⃣ Frontend URL Update
```javascript
localStorage.setItem('apiUrl', 'https://api.lehrerzitate.com');
```

---

## ⚠️ Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Port 3000 in Benutzung | Ändere PORT in .env |
| CORS Error | Prüfe FRONTEND_URL in .env |
| Zitate laden nicht | Öffne Browser Console (F12), prüfe apiUrl |
| Datenbank-Fehler | Lösche data/lehrerzitate.db und neustart |

---

## ✨ Was ist alles implementiert?

- ✅ Backend mit Express
- ✅ SQLite Datenbank
- ✅ Alle API Endpoints
- ✅ Voting System
- ✅ Search & Filter
- ✅ CORS
- ✅ Frontend API Integration
- ✅ Input Validation
- ✅ Error Handling
- ✅ Beispieldaten
- ✅ Dokumentation
- ✅ .env Konfiguration
- ✅ Deployment Guide

---

**Status:** ✅ Komplett implementiert und bereit zum Testen!
