const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/lehrerzitate.db');

// Stelle sicher, dass das Verzeichnis existiert
const fs = require('fs');
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Erstelle Datenbank-Verbindung
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Fehler beim Öffnen der Datenbank:', err);
  } else {
    console.log('✅ Mit SQLite Datenbank verbunden:', DB_PATH);
  }
});

// Promisified Wrapper für Datenbank-Operationen
const dbAsync = {
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },
  
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }
};

module.exports = { db, dbAsync };