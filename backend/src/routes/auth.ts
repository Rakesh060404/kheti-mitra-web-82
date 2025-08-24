import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Validation middleware
const validateRegistration = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').trim().isLength({ min: 2 }),
    body('lastName').trim().isLength({ min: 2 }),
    body('phone').optional().isMobilePhone('any'),
    body('role').optional().isIn(['farmer', 'expert', 'admin'])
];

const validateLogin = [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
];

// Routes
router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);

// Profile management
router.get('/profile', authenticateToken, authController.getProfile);

// Health check
router.get('/health', authController.health);

export default router;
