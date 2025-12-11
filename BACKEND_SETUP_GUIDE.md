# Lehrerzitate - Gesamtprojekt Dokumentation

## 📋 Projekt-Übersicht

**Lehrerzitate** ist eine vollständige Full-Stack Anwendung zum Sammeln, Bewerten und Teilen von lustigen Sprüchen von Lehrern.

### 🏗️ Architektur

```
┌─────────────────────────────────────────────────┐
│         Frontend (GitHub Pages)                 │
│  Vanilla HTML, CSS, JavaScript (0 Dependencies) │
│         - Responsive Design                     │
│         - Dark Mode & Farbkustomisierung       │
│         - Quote Browser, Submit, Settings       │
└──────────────┬──────────────────────────────────┘
               │ API Calls (Fetch)
               │ (http://localhost:3000/api)
               ▼
┌─────────────────────────────────────────────────┐
│         Backend (Node.js + Express)             │
│         - SQLite Datenbank                      │
│         - Quote CRUD Operations                 │
│         - Voting System                         │
│         - Search & Filter                       │
└──────────────┬──────────────────────────────────┘
               │ Database Queries
               ▼
┌─────────────────────────────────────────────────┐
│    SQLite Database (Backend/data/)              │
│         - Quotes Table                          │
│         - Votes Table                           │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Backend starten

```bash
cd Backend
npm install  # Nur beim ersten Mal
node src/server.js
```

**Output:**
```
╔══════════════════════════════════════════╗
║   🚀 Lehrerzitate Backend Server        ║
║   Port: 3000                            
║   Umgebung: development                 
║   Health Check: http://localhost:3000/api/health
╚══════════════════════════════════════════╝
```

### Frontend starten

```bash
cd Frontend/html
python -m http.server 8000
# oder: npm install -g http-server && http-server -p 8000
```

**Öffne:** `http://localhost:8000`

---

## 📁 Projekt-Struktur

```
Lehrerzitate/
├── Backend/
│   ├── src/
│   │   ├── app.js              ✅ Express App Setup
│   │   └── server.js           ✅ Server Startup
│   ├── database/
│   │   ├── db.js               ✅ SQLite Connection
│   │   └── init.js             ✅ Schema & Seed Data
│   ├── routes/
│   │   └── quotes.js           ✅ All API Endpoints
│   ├── package.json            ✅ Dependencies
│   ├── .env                    ✅ Configuration
│   └── API_DOCUMENTATION.md    ✅ API Docs
│
├── Frontend/
│   ├── html/
│   │   ├── index.html          ✅ Main App
│   │   ├── submit.html         ✅ Quote Form
│   │   ├── settings.html       ✅ User Settings
│   │   ├── about.html          ✅ About Page
│   │   ├── info.html           ✅ Info Page
│   │   ├── header.html         ✅ Navigation
│   │   └── footer.html         ✅ Footer
│   ├── css/
│   │   ├── style.css           ✅ Main Styles
│   │   ├── settings.css        ✅ Settings Page
│   │   └── submit.css          ✅ Form Styles
│   ├── js/
│   │   ├── app.js              ✅ Main Logic & API Calls
│   │   ├── submit.js           ✅ Form Submission
│   │   ├── settings.js         ✅ Settings Logic
│   │   └── loader.js           ✅ Component Loading
│   ├── README.md               ✅ Frontend Docs
│   ├── QUICKSTART.md           ✅ Getting Started
│   └── DEVELOPER_REFERENCE.html ✅ Code Reference
│
└── FRONTEND_SUMMARY.md         ✅ Project Overview
```

---

## ✨ Features

### Frontend
- ✅ Quote Browser mit Search & Filter
- ✅ Voting System (Upvote/Downvote)
- ✅ Quote Submission Form
- ✅ Dark Mode Toggle
- ✅ Accent Color Customization (5 Farben)
- ✅ Responsive Design (Mobile-friendly)
- ✅ LocalStorage Persistence
- ✅ Zero External Dependencies

### Backend
- ✅ RESTful API (CRUD)
- ✅ SQLite Datenbank
- ✅ Search & Filtering
- ✅ Sorting (newest, popular, oldest)
- ✅ Vote Tracking (per User)
- ✅ CORS Support
- ✅ Input Validation
- ✅ Error Handling

---

## 🔌 API Endpoints

### Quotes
```
GET    /api/quotes              # Alle Zitate laden
GET    /api/quotes/:id          # Einzelnes Zitat
POST   /api/quotes              # Zitat einreichen
```

### Voting
```
POST   /api/quotes/:id/vote     # Abstimmen
DELETE /api/quotes/:id/vote     # Stimme entfernen
```

### Health
```
GET    /api/health              # Server Status
```

**Vollständige Dokumentation:** [Backend/API_DOCUMENTATION.md](Backend/API_DOCUMENTATION.md)

---

## 🛠️ Development Workflow

### 1. Backend entwickeln
```bash
cd Backend
node src/server.js
```

### 2. Frontend entwickeln
```bash
cd Frontend/html
python -m http.server 8000
```

### 3. Testen
- Öffne `http://localhost:8000` im Browser
- Öffne DevTools (F12) für Logs
- Teste alle Features (Browse, Submit, Vote, Settings)

---

## 🚀 Deployment

### Schritt 1: Frontend auf GitHub Pages
```bash
# Repository pushen mit /Frontend als Root
git push origin main
```

**Settings → Pages → Deploy from main branch**

### Schritt 2: Backend auf Raspberry Pi
```bash
# SSH in Pi
ssh pi@raspberry.local

# Clone & Start
git clone <repo>
cd Lehrerzitate/Backend
npm install
NODE_ENV=production node src/server.js
```

### Schritt 3: Cloudflare Tunnel Setup
```bash
# Installiere cloudflared
# (https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/)

# Tunnel erstellen
cloudflared tunnel create lehrerzitate
cloudflared tunnel route dns lehrerzitate api.lehrerzitate.com

# Konfiguriere in Backend/.env
FRONTEND_URL=https://yourusername.github.io/Lehrerzitate
```

### Schritt 4: Frontend URL aktualisieren
```javascript
// Im Browser Console:
localStorage.setItem('apiUrl', 'https://api.lehrerzitate.com');
location.reload();
```

---

## 🔐 Sicherheit

- ✅ CORS konfiguriert (nur erlaubte Origins)
- ✅ Input Validation (Text-Länge, Zeichen)
- ✅ SQL Injection Protection (Parameterized Queries)
- ✅ XSS Protection (HTML Escaping)
- ✅ No external dependencies (kleinere Attack Surface)

---

## 📊 Datenbank

### Initiale Beispieldaten
12 Zitate von verschiedenen Lehrern sind enthalten

### Datenbank-Datei
```
Backend/data/lehrerzitate.db
```

### Datenbank zurücksetzen
```bash
# Lösche die Datei (wird beim nächsten Start neu erstellt)
rm Backend/data/lehrerzitate.db
node Backend/src/server.js
```

---

## 🧪 Testing

### Backend Endpoints testen
```bash
# Health Check
curl http://localhost:3000/api/health

# Alle Zitate
curl http://localhost:3000/api/quotes

# Neues Zitat
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{"text":"Test zitat","teacher":"Test Lehrer","subject":"Test"}'

# Abstimmen
curl -X POST http://localhost:3000/api/quotes/1/vote \
  -H "Content-Type: application/json" \
  -d '{"userId":"test_user","voteType":"up"}'
```

### Frontend testen
- Browse Zitate
- Suche nach Lehrer/Fach
- Sortiere (newest, popular, oldest)
- Abstimmen (Upvote/Downvote)
- Dark Mode Toggle
- Farbauswahl
- Zitat einreichen
- Responsive Test (F12 Device Toolbar)

---

## 📚 Dokumentation

| Datei | Inhalt |
|-------|--------|
| [Backend/API_DOCUMENTATION.md](Backend/API_DOCUMENTATION.md) | Vollständige API Referenz |
| [Frontend/README.md](Frontend/README.md) | Frontend Dokumentation |
| [Frontend/QUICKSTART.md](Frontend/QUICKSTART.md) | 1-Minuten Setup Guide |
| [FRONTEND_SUMMARY.md](FRONTEND_SUMMARY.md) | Frontend Project Overview |

---

## 🐛 Troubleshooting

### Backend startet nicht
```bash
# Port 3000 in Benutzung?
# Windows:
netstat -ano | findstr :3000

# Wechsle Port in .env:
PORT=3001
```

### Frontend zeigt keine Zitate
```javascript
// Browser Console (F12):
console.log(localStorage.getItem('apiUrl'));
// Sollte sein: http://localhost:3000/api
```

### CORS Error
```
Prüfe FRONTEND_URL in Backend/.env
Sollte die URL des Frontends sein, z.B.:
FRONTEND_URL=http://localhost:8000
```

### Datenbank-Fehler
```bash
# Lösche alte DB und starte neu
rm Backend/data/lehrerzitate.db
node Backend/src/server.js
```

---

## 🎯 Nächste Schritte

- [ ] Backend mit `npm start` starten
- [ ] Frontend öffnen und testen
- [ ] Alle Features durchprobieren
- [ ] GitHub Repository erstellen
- [ ] Cloudflare Tunnel Setup
- [ ] Auf GitHub Pages deployen
- [ ] Auf Raspberry Pi deployen

---

## 📞 Support

1. **Logs anschauen**: Terminal / Browser Console (F12)
2. **API testen**: curl Commands ausprobieren
3. **Dokumentation lesen**: [API_DOCUMENTATION.md](Backend/API_DOCUMENTATION.md)
4. **Code anschauen**: Alle Funktionen sind dokumentiert

---

**Status:** ✅ Vollständig implementiert und bereit zum Deployment  
**Stack:** Node.js + Express | SQLite | Vanilla JavaScript  
**Deployment:** GitHub Pages + Raspberry Pi + Cloudflare Tunnel