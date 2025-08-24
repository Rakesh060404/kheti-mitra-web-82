import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mockDb } from '../lib/mockDb.js';
import { AuthRequest } from '../middleware/auth.js';

const JWT_SECRET = 'your-secret-key-change-in-production';

export const authController = {
  // User registration
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, phone, role = 'farmer' } = req.body;

      // Check if user already exists
      const existingUser = await mockDb.findUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'User already exists'
          }
        });
      }

      // Create user using mock database
      const newUser = await mockDb.createUser({
        email,
        password: await bcrypt.hash(password, 10),
        first_name: firstName,
        last_name: lastName,
        phone,
        role
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: newUser.id, 
          email, 
          role 
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: newUser,
          token
        }
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Registration failed',
          details: error.message
        }
      });
    }
  },

  // User login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await mockDb.findUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Invalid credentials'
          }
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user,
          token
        }
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Login failed',
          details: error.message
        }
      });
    }
  },

  // Get user profile
  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'User not authenticated'
          }
        });
      }

      const user = await mockDb.findUserById(Number(req.user.id));

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'User not found'
          }
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error: any) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to get profile',
          details: error.message
        }
      });
    }
  },

  // Simple health check for auth
  async health(req: Request, res: Response) {
    res.json({
      success: true,
      message: 'Auth controller is working',
      timestamp: new Date().toISOString()
    });
  }
};
