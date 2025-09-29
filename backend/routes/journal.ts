import express, { Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import db from '../models/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { AuthRequest, JournalEntry } from '../types/index.js';

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface CreateJournalRequest extends AuthRequest {
  body: {
    entry_text: string;
  };
}

interface JournalEntryResponse {
  message: string;
  entry: {
    id: number;
    entry_text: string;
    ai_response: string;
    created_at: string;
  };
}

interface JournalEntriesResponse {
  entries: JournalEntry[];
}

// Create journal entry
router.post('/', authenticateToken, async (req: CreateJournalRequest, res: Response<JournalEntryResponse | { error: string }>): Promise<void> => {
  try {
    const { entry_text } = req.body;
    const userId: number | undefined = req.userId;

    if (!entry_text) {
      res.status(400).json({ error: 'Entry text is required' });
      return;
    }

    if (!userId) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    try {
      // Get AI response from Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt: string = `You are a helpful journaling assistant. Reply to the user's journal entry with insights, reflections, or encouragement. Keep your response supportive and thoughtful.

User's journal entry: "${entry_text}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse: string = response.text();

      // Save entry and AI response to database
      db.run(
        'INSERT INTO journal_entries (user_id, entry_text, ai_response) VALUES (?, ?, ?)',
        [userId, entry_text, aiResponse],
        function (err: Error | null) {
          if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Failed to save journal entry' });
            return;
          }

          res.status(201).json({
            message: 'Journal entry created successfully',
            entry: {
              id: this.lastID,
              entry_text,
              ai_response: aiResponse,
              created_at: new Date().toISOString()
            }
          });
        }
      );
    } catch (aiError) {
      console.error('AI service error:', aiError);

      // Save entry without AI response if AI fails
      const fallbackResponse: string = 'AI response temporarily unavailable. Please try again later.';

      db.run(
        'INSERT INTO journal_entries (user_id, entry_text, ai_response) VALUES (?, ?, ?)',
        [userId, entry_text, fallbackResponse],
        function (err: Error | null) {
          if (err) {
            res.status(500).json({ error: 'Failed to save journal entry' });
            return;
          }

          res.status(201).json({
            message: 'Journal entry created (AI response unavailable)',
            entry: {
              id: this.lastID,
              entry_text,
              ai_response: fallbackResponse,
              created_at: new Date().toISOString()
            }
          });
        }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's journal entries
router.get('/', authenticateToken, (req: AuthRequest, res: Response<JournalEntriesResponse | { error: string }>): void => {
  try {
    const userId: number | undefined = req.userId;

    if (!userId) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    db.all(
      'SELECT * FROM journal_entries WHERE user_id = ? ORDER BY created_at DESC',
      [userId],
      (err: Error | null, entries: JournalEntry[]) => {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ error: 'Failed to fetch journal entries' });
          return;
        }

        res.json({ entries });
      }
    );
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;