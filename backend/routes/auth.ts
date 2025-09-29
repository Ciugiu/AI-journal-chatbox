import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/database.js';
import { User, AuthResponse } from '../types/index.js';

const router = express.Router();

interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

// Register endpoint
router.post('/register', async (req: RegisterRequest, res: Response<AuthResponse | { error: string; message?: string }>): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Check if user already exists
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err: Error | null, row: any) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }

      if (row) {
        res.status(400).json({ error: 'User already exists' });
        return;
      }

      try {
        // Hash password
        const saltRounds: number = 10;
        const hashedPassword: string = await bcrypt.hash(password, saltRounds);

        // Insert new user
        db.run('INSERT INTO users (email, password) VALUES (?, ?)',
          [email, hashedPassword],
          function (err: Error | null) {
            if (err) {
              res.status(500).json({ error: 'Failed to create user' });
              return;
            }

            const jwtSecret: string = process.env.JWT_SECRET || '';
            if (!jwtSecret) {
              res.status(500).json({ error: 'Server configuration error' });
              return;
            }

            // Generate JWT token
            const token: string = jwt.sign(
              { userId: this.lastID, email },
              jwtSecret,
              { expiresIn: '24h' }
            );

            res.status(201).json({
              message: 'User created successfully',
              token,
              user: { id: this.lastID, email }
            });
          }
        );
      } catch (hashError) {
        res.status(500).json({ error: 'Failed to hash password' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login endpoint
router.post('/login', (req: LoginRequest, res: Response<AuthResponse | { error: string; message?: string }>): void => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Find user by email
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err: Error | null, user: User | undefined) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }

      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      try {
        // Compare password
        const validPassword: boolean = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          res.status(401).json({ error: 'Invalid credentials' });
          return;
        }

        const jwtSecret: string = process.env.JWT_SECRET || '';
        if (!jwtSecret) {
          res.status(500).json({ error: 'Server configuration error' });
          return;
        }

        // Generate JWT token
        const token: string = jwt.sign(
          { userId: user.id, email: user.email },
          jwtSecret,
          { expiresIn: '24h' }
        );

        res.json({
          message: 'Login successful',
          token,
          user: { id: user.id, email: user.email }
        });
      } catch (compareError) {
        res.status(500).json({ error: 'Authentication error' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;