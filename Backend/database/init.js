const { dbAsync } = require('./db');

const dummyQuotes = [
  {
    text: "Wenn ihr nicht schweigen könnt, müsst ihr mindestens leise sein!",
    teacher: "Herr Müller",
    subject: "Mathematik"
  },
  {
    text: "Das ist kein Kindergarten, das ist eine Schule!",
    teacher: "Frau Schmidt",
    subject: "Deutsch"
  },
  {
    text: "Ich habe euch 20 Minuten Zeit gegeben, und ihr seid noch nicht mal fertig mit lesen!",
    teacher: "Herr Weber",
    subject: "Geschichte"
  },
  {
    text: "Das ist die letzte Chance, sonst gibt es Hausaufgaben!",
    teacher: "Frau Müller",
    subject: "Englisch"
  },
  {
    text: "Wenn ich euch nochmal erwische, rufe ich eure Eltern an!",
    teacher: "Herr Fischer",
    subject: "Biologie"
  },
  {
    text: "Das wird die wichtigste Stunde dieses Schuljahres!",
    teacher: "Frau Kaufmann",
    subject: "Chemie"
  },
  {
    text: "Mathematik ist wie Atmen – man kann nicht ohne atmen!",
    teacher: "Herr Müller",
    subject: "Mathematik"
  },
  {
    text: "Das hätte jeder von euch wissen müssen!",
    teacher: "Frau Wagner",
    subject: "Physik"
  },
  {
    text: "Im Winter fahren wir nicht ins Freibad!",
    teacher: "Herr Winter",
    subject: "Sport"
  },
  {
    text: "Bitte konzentriert euch auf die Aufgabe!",
    teacher: "Frau Bauer",
    subject: "Kunst"
  },
  {
    text: "Das ist keine Pizza-Pause, das ist Unterricht!",
    teacher: "Herr Schneider",
    subject: "Musik"
  },
  {
    text: "Wer das nicht versteht, sollte zuhören!",
    teacher: "Frau Hoffmann",
    subject: "Deutsch"
  }
];

const init = async () => {
  try {
    // 1. Erstelle QUOTES Tabelle
    await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        teacher TEXT NOT NULL,
        subject TEXT,
        upvotes INTEGER DEFAULT 0,
        downvotes INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Quotes Tabelle erstellt/vorhanden');

    // 2. Erstelle VOTES Tabelle
    await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote_id INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        vote_type TEXT CHECK(vote_type IN ('up', 'down')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(quote_id, user_id),
        FOREIGN KEY(quote_id) REFERENCES quotes(id) ON DELETE CASCADE
      );
    `);

    console.log('✅ Votes Tabelle erstellt/vorhanden');

    // 3. Füge Beispieldaten hinzu (nur wenn Tabelle leer ist)
    const count = await dbAsync.get('SELECT COUNT(*) as count FROM quotes');
    
    if (count.count === 0) {
      console.log('📝 Füge Beispieldaten hinzu...');
      
      for (const quote of dummyQuotes) {
        await dbAsync.run(
          `INSERT INTO quotes (text, teacher, subject, upvotes, downvotes) 
           VALUES (?, ?, ?, ?, ?)`,
          [quote.text, quote.teacher, quote.subject, Math.floor(Math.random() * 500), Math.floor(Math.random() * 50)]
        );
      }
      
      console.log(`✅ ${dummyQuotes.length} Beispielzitate eingefügt`);
    } else {
      console.log(`✅ Datenbank bereits mit ${count.count} Zitaten gefüllt`);
    }

  } catch (err) {
    console.error('❌ Fehler bei Datenbank-Initialisierung:', err);
    throw err;
  }
};

module.exports = { init };