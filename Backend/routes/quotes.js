const express = require('express');
const router = express.Router();
const { dbAsync } = require('../database/db');

// ============================================
// GET /api/quotes - Alle Zitate abrufen
// ============================================
router.get('/', async (req, res) => {
  try {
    const { sort = 'newest', search = '' } = req.query;

    let query = 'SELECT * FROM quotes WHERE 1=1';
    const params = [];

    // Suchfilter
    if (search) {
      query += ` AND (text LIKE ? OR teacher LIKE ? OR subject LIKE ?)`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Sortierung
    switch (sort) {
      case 'popular':
        query += ' ORDER BY (upvotes - downvotes) DESC';
        break;
      case 'oldest':
        query += ' ORDER BY created_at ASC';
        break;
      case 'newest':
      default:
        query += ' ORDER BY created_at DESC';
        break;
    }

    const quotes = await dbAsync.all(query, params);

    res.json({
      success: true,
      count: quotes.length,
      data: quotes
    });

  } catch (error) {
    console.error('Fehler beim Abrufen von Zitaten:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Fehler beim Abrufen von Zitaten' 
    });
  }
});

// ============================================
// GET /api/quotes/:id - Einzelnes Zitat abrufen
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await dbAsync.get(
      'SELECT * FROM quotes WHERE id = ?',
      [id]
    );

    if (!quote) {
      return res.status(404).json({ 
        success: false, 
        error: 'Zitat nicht gefunden' 
      });
    }

    res.json({
      success: true,
      data: quote
    });

  } catch (error) {
    console.error('Fehler beim Abrufen des Zitats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Fehler beim Abrufen des Zitats' 
    });
  }
});

// ============================================
// POST /api/quotes - Neues Zitat einreichen
// ============================================
router.post('/', async (req, res) => {
  try {
    const { text, teacher, subject } = req.body;

    // Validierung
    if (!text || !teacher) {
      return res.status(400).json({
        success: false,
        error: 'Text und Lehrer sind erforderlich'
      });
    }

    if (text.length < 10 || text.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Zitat muss zwischen 10 und 500 Zeichen lang sein'
      });
    }

    if (teacher.length < 2 || teacher.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Lehrername muss zwischen 2 und 100 Zeichen lang sein'
      });
    }

    // Duplilkat-Check (vereinfacht - prüfe auf identische Zitate)
    const duplicate = await dbAsync.get(
      'SELECT id FROM quotes WHERE text = ? AND teacher = ?',
      [text, teacher]
    );

    if (duplicate) {
      return res.status(409).json({
        success: false,
        error: 'Dieses Zitat existiert bereits'
      });
    }

    // Zitat einfügen
    const result = await dbAsync.run(
      `INSERT INTO quotes (text, teacher, subject, upvotes, downvotes) 
       VALUES (?, ?, ?, 0, 0)`,
      [text, teacher, subject || null]
    );

    const newQuote = await dbAsync.get(
      'SELECT * FROM quotes WHERE id = ?',
      [result.id]
    );

    res.status(201).json({
      success: true,
      message: 'Zitat erfolgreich eingereicht',
      data: newQuote
    });

  } catch (error) {
    console.error('Fehler beim Einreichen des Zitats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Fehler beim Einreichen des Zitats' 
    });
  }
});

// ============================================
// POST /api/quotes/:id/vote - Abstimmen
// ============================================
router.post('/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType, userId } = req.body;

    // Validierung
    if (!voteType || !['up', 'down'].includes(voteType)) {
      return res.status(400).json({
        success: false,
        error: 'voteType muss "up" oder "down" sein'
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId ist erforderlich'
      });
    }

    // Prüfe ob Zitat existiert
    const quote = await dbAsync.get(
      'SELECT * FROM quotes WHERE id = ?',
      [id]
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        error: 'Zitat nicht gefunden'
      });
    }

    // Prüfe auf existierende Stimme
    const existingVote = await dbAsync.get(
      'SELECT * FROM votes WHERE quote_id = ? AND user_id = ?',
      [id, userId]
    );

    if (existingVote) {
      // Wenn gleicher Vote-Typ, entferne ihn (Toggle)
      if (existingVote.vote_type === voteType) {
        await dbAsync.run(
          'DELETE FROM votes WHERE quote_id = ? AND user_id = ?',
          [id, userId]
        );

        // Decrement Vote Count
        if (voteType === 'up') {
          await dbAsync.run(
            'UPDATE quotes SET upvotes = MAX(0, upvotes - 1) WHERE id = ?',
            [id]
          );
        } else {
          await dbAsync.run(
            'UPDATE quotes SET downvotes = MAX(0, downvotes - 1) WHERE id = ?',
            [id]
          );
        }

        const updatedQuote = await dbAsync.get(
          'SELECT * FROM quotes WHERE id = ?',
          [id]
        );

        return res.json({
          success: true,
          message: 'Stimme entfernt',
          data: updatedQuote,
          userVote: null
        });
      }

      // Wenn anderer Vote-Typ, ersetze ihn
      const oldVoteType = existingVote.vote_type;

      await dbAsync.run(
        'UPDATE votes SET vote_type = ? WHERE quote_id = ? AND user_id = ?',
        [voteType, id, userId]
      );

      // Update Vote Counts
      if (oldVoteType === 'up') {
        await dbAsync.run(
          'UPDATE quotes SET upvotes = MAX(0, upvotes - 1) WHERE id = ?',
          [id]
        );
      } else {
        await dbAsync.run(
          'UPDATE quotes SET downvotes = MAX(0, downvotes - 1) WHERE id = ?',
          [id]
        );
      }

      if (voteType === 'up') {
        await dbAsync.run(
          'UPDATE quotes SET upvotes = upvotes + 1 WHERE id = ?',
          [id]
        );
      } else {
        await dbAsync.run(
          'UPDATE quotes SET downvotes = downvotes + 1 WHERE id = ?',
          [id]
        );
      }

    } else {
      // Neue Stimme
      await dbAsync.run(
        'INSERT INTO votes (quote_id, user_id, vote_type) VALUES (?, ?, ?)',
        [id, userId, voteType]
      );

      // Increment Vote Count
      if (voteType === 'up') {
        await dbAsync.run(
          'UPDATE quotes SET upvotes = upvotes + 1 WHERE id = ?',
          [id]
        );
      } else {
        await dbAsync.run(
          'UPDATE quotes SET downvotes = downvotes + 1 WHERE id = ?',
          [id]
        );
      }
    }

    // Hole aktualisiertes Zitat
    const updatedQuote = await dbAsync.get(
      'SELECT * FROM quotes WHERE id = ?',
      [id]
    );

    // Hole aktuellen Vote des Users
    const userVote = await dbAsync.get(
      'SELECT vote_type FROM votes WHERE quote_id = ? AND user_id = ?',
      [id, userId]
    );

    res.json({
      success: true,
      message: 'Stimme verarbeitet',
      data: updatedQuote,
      userVote: userVote ? userVote.vote_type : null
    });

  } catch (error) {
    console.error('Fehler beim Abstimmen:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Fehler beim Abstimmen' 
    });
  }
});

// ============================================
// DELETE /api/quotes/:id/vote - Stimme entfernen
// ============================================
router.delete('/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId ist erforderlich'
      });
    }

    const vote = await dbAsync.get(
      'SELECT * FROM votes WHERE quote_id = ? AND user_id = ?',
      [id, userId]
    );

    if (!vote) {
      return res.status(404).json({
        success: false,
        error: 'Stimme nicht gefunden'
      });
    }

    const voteType = vote.vote_type;

    await dbAsync.run(
      'DELETE FROM votes WHERE quote_id = ? AND user_id = ?',
      [id, userId]
    );

    // Decrement Vote Count
    if (voteType === 'up') {
      await dbAsync.run(
        'UPDATE quotes SET upvotes = MAX(0, upvotes - 1) WHERE id = ?',
        [id]
      );
    } else {
      await dbAsync.run(
        'UPDATE quotes SET downvotes = MAX(0, downvotes - 1) WHERE id = ?',
        [id]
      );
    }

    const updatedQuote = await dbAsync.get(
      'SELECT * FROM quotes WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Stimme entfernt',
      data: updatedQuote,
      userVote: null
    });

  } catch (error) {
    console.error('Fehler beim Entfernen der Stimme:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Fehler beim Entfernen der Stimme' 
    });
  }
});

module.exports = router;