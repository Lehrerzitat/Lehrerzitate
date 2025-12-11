# Lehrerzitate

Eine vollständige Full-Stack Anwendung zum Sammeln, Bewerten und Teilen von lustigen Zitaten von Lehrern.

## 🎯 Projekt Übersicht

**Lehrerzitate** ist ein modernes Web-Projekt mit:
- **Frontend:** Vanilla HTML/CSS/JavaScript (Responsive Design, Dark Mode)
- **Backend:** Node.js + Express + SQLite
- **Deployment:** GitHub Pages (Frontend) + Raspberry Pi + Cloudflare Tunnel (Backend)

## 🚀 Quick Start

### Frontend starten (Entwicklung)
```bash
cd Frontend/html
python -m http.server 8000
# Öffne: http://localhost:8000
```

### Backend starten (Entwicklung)
```bash
cd Backend
npm install  # Nur beim ersten Mal
npm start
# API läuft auf: http://localhost:3000/api
```

## 📁 Struktur

```
Lehrerzitate/
├── Frontend/               # Vue/React/Static Frontend
│   ├── html/              # HTML Dateien
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript
│   ├── img/               # Images
│   └── README.md          # Frontend Docs
│
├── Backend/               # Node.js API Server
│   ├── src/               # Express App
│   ├── database/          # SQLite Datenbank
│   ├── routes/            # API Endpoints
│   ├── package.json
│   └── README.md          # Backend Docs
│
├── README.md              # Dieses File (Main)
├── GITHUB_PAGES_SETUP.md  # Deployment Guide
└── IMPLEMENTATION_STATUS.md
```

## ✨ Features

### Frontend
- ✅ Quote Browser mit Search & Filter
- ✅ Voting System (Upvote/Downvote)
- ✅ Quote Submission Form
- ✅ Dark Mode + 5 Accent Colors
- ✅ Responsive Design (Mobile-friendly)
- ✅ Zero External Dependencies

### Backend
- ✅ RESTful API (CRUD)
- ✅ SQLite Datenbank
- ✅ Search & Filtering
- ✅ Voting System
- ✅ Input Validation
- ✅ CORS Support

## 🌐 Deployment

### Frontend (GitHub Pages)
```bash
# 1. GitHub Repository erstellen
# 2. Code pushen
git push origin main

# 3. Settings > Pages > Deploy from /Frontend/html
# Fertig! Verfügbar unter: https://yourusername.github.io/Lehrerzitate
```

### Backend (Raspberry Pi)
```bash
cd Backend
NODE_ENV=production npm start
# Läuft auf Port 3000 lokal
```

### Cloudflare Tunnel (Security)
```bash
cloudflared tunnel create lehrerzitate
cloudflared tunnel route dns lehrerzitate api.lehrerzitate.com
# Kein Port-Forwarding nötig!
```

## 📚 Dokumentation

| Datei | Inhalt |
|-------|--------|
| [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) | Frontend Deployment Guide |
| [Frontend/README.md](Frontend/README.md) | Frontend Dokumentation |
| [Frontend/QUICKSTART.md](Frontend/QUICKSTART.md) | 1-Minuten Setup |
| [Backend/README.md](Backend/README.md) | Backend Quick Start |
| [Backend/API_DOCUMENTATION.md](Backend/API_DOCUMENTATION.md) | API Referenz |
| [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) | Completion Report |

## 🔧 Konfiguration

### Frontend API URL
```javascript
// Im Browser Console ändern:
localStorage.setItem('apiUrl', 'https://api.lehrerzitate.com');
location.reload();
```

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js, SQLite3
- **Deployment:** GitHub Pages, Cloudflare Tunnel
- **Server:** Raspberry Pi

## 🧪 Testing

```bash
# Frontend Test
cd Frontend/html && python -m http.server 8000
# Öffne: http://localhost:8000

# Backend Test
cd Backend && npm start
# Health Check: curl http://localhost:3000/api/health
```

## ✅ Status

| Komponente | Status |
|-----------|--------|
| Frontend | ✅ Complete |
| Backend | ✅ Complete |
| Datenbank | ✅ Complete |
| Dokumentation | ✅ Complete |
| Local Testing | ✅ Ready |
| GitHub Pages | ⏳ Setup erforderlich |
| Production | ⏳ Deployment erforderlich |

## 🎯 Nächste Schritte

1. ✅ Code lokal testen (`npm start` Backend + Frontend HTTP Server)
2. ⏳ GitHub Repository erstellen
3. ⏳ Frontend zu GitHub Pages deployen
4. ⏳ Backend auf Raspberry Pi deployen
5. ⏳ Cloudflare Tunnel einrichten

## 📞 Support

1. **Logs anschauen:** Terminal / Browser Console (F12)
2. **Doku lesen:** [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)
3. **API testen:** [Backend/API_DOCUMENTATION.md](Backend/API_DOCUMENTATION.md)

---

**Status:** ✅ Ready for Deployment  
**Created:** December 12, 2025  
**Stack:** Node.js | Express | SQLite | Vanilla JS
