# Lehrerzitate Frontend - Deployment Guide

Dieser Guide zeigt dir, wie du das Frontend auf GitHub Pages deployest.

## 📋 Voraussetzungen

- GitHub Account
- Git installiert
- Frontend-Code lokal

## 🚀 Step-by-Step Anleitung

### 1️⃣ GitHub Repository erstellen

1. Gehe zu [github.com/new](https://github.com/new)
2. Repository Name: `Lehrerzitate`
3. Beschreibung: "A modern web app for sharing funny teacher quotes"
4. Public (damit GitHub Pages funktioniert)
5. **Nicht** "Add a README file" - wir haben bereits einen
6. Klicke "Create repository"

### 2️⃣ Lokales Git Repository initialisieren

```bash
# Navigiere zum Projekt-Root
cd c:\Users\nevio\Desktop\Dokumente\Programming\Lehrerzitate

# Initialisiere Git Repository
git init

# Füge alle Dateien hinzu
git add .

# Ersten Commit
git commit -m "Initial commit: Add frontend and backend"

# Verbinde mit GitHub (ersetze USERNAME mit deinem GitHub-Namen)
git remote add origin https://github.com/USERNAME/Lehrerzitate.git

# Push auf GitHub
git branch -M main
git push -u origin main
```

### 3️⃣ GitHub Pages aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf **Settings** (oben rechts)
3. Links: Klicke auf **Pages**
4. **Source**: Wähle "Deploy from a branch"
5. **Branch**: Wähle `main`
6. **Folder**: Wähle `/Frontend/html`
7. Klicke **Save**

GitHub wird jetzt dein Frontend automatisch deployen!

### 4️⃣ GitHub Pages URL finden

Nach ca. 1-2 Minuten wird dein Frontend unter dieser URL verfügbar sein:

```
https://USERNAME.github.io/Lehrerzitate
```

Ersetze `USERNAME` mit deinem echten GitHub-Namen.

## 🔧 Konfiguration für Deployment

### Wenn du ein Backend hast:

1. Öffne die App im Browser: `https://USERNAME.github.io/Lehrerzitate`
2. Drücke **F12** um die Konsole zu öffnen
3. Führe diesen Code aus:

```javascript
localStorage.setItem('apiUrl', 'https://api.yourdomain.com');
location.reload();
```

(Ersetze `https://api.yourdomain.com` mit deiner echten Backend-URL)

## 📱 Testen

Nach dem Deployment:

- [ ] Öffne `https://USERNAME.github.io/Lehrerzitate`
- [ ] Zitate sollen geladen werden
- [ ] Dark Mode funktioniert
- [ ] Farben lassen sich ändern
- [ ] Responsive auf Handy
- [ ] Suche/Filter funktioniert
- [ ] (Wenn Backend verbunden) Voting funktioniert

## ❌ Probleme beheben

### "GitHub Pages is not currently being served"

→ Gehe zu Settings > Pages und prüfe:
- Branch ist auf `main` gesetzt
- Folder ist auf `/Frontend/html` gesetzt

### "404 Not Found"

→ Prüfe, dass der URL korrekt ist:
- Sollte sein: `https://USERNAME.github.io/Lehrerzitate`
- Nicht: `https://USERNAME.github.io/Lehrerzitate/Frontend/html`

### "CORS Error" oder "Zitate laden nicht"

→ Backend ist nicht verbunden:
1. Drücke F12 im Browser
2. Öffne Console
3. Prüfe: `console.log(localStorage.getItem('apiUrl'))`
4. Sollte deine Backend-URL sein

### Änderungen werden nicht angezeigt

→ GitHub Pages braucht 1-2 Minuten zum Deploy:
1. Warte 2 Minuten
2. Leere Browser-Cache (Ctrl+Shift+Delete)
3. Lade die Seite neu (Ctrl+Shift+R)

## 🔄 Updates pushen

Wenn du Änderungen am Frontend machst:

```bash
# Änderungen hinzufügen
git add .

# Committen
git commit -m "Beschreibung der Änderungen"

# Auf GitHub pushen
git push origin main
```

GitHub Pages wird automatisch in 1-2 Minuten aktualisiert.

## 📚 Weitere Ressourcen

- [GitHub Pages Dokumentation](https://docs.github.com/en/pages)
- [Git Cheat Sheet](https://github.github.com/training-kit/)
- [Frontend README](../Frontend/README.md)

## 🎯 Nächste Schritte

1. ✅ Frontend auf GitHub Pages deployen
2. 📦 Backend auf Raspberry Pi deployen
3. 🔗 Cloudflare Tunnel einrichten
4. 🌐 Backend-URL im Frontend konfigurieren

---

**Fertig! Dein Frontend ist jetzt live unter `https://USERNAME.github.io/Lehrerzitate`** 🎉
