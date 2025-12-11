const app = require('./app');
const db = require('../database/db');
const initDB = require('../database/init');

const PORT = process.env.PORT || 3000;

// Datenbank initialisieren
console.log('📊 Initialisiere Datenbank...');
initDB.init()
  .then(() => {
    console.log('✅ Datenbank erfolgreich initialisiert');
    
    // Server starten
    app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════╗
║   🚀 Lehrerzitate Backend Server        ║
║   Port: ${PORT}                            
║   Umgebung: ${process.env.NODE_ENV || 'development'}                
║   Health Check: http://localhost:${PORT}/api/health
╚══════════════════════════════════════════╝
      `);
    });
  })
  .catch(err => {
    console.error('❌ Fehler beim Initialisieren der Datenbank:', err);
    process.exit(1);
  });