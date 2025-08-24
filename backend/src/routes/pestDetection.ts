import express from 'express';
import { body, query, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import { pestDetectionController } from '../controllers/pestDetectionController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/pest-images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Validation middleware
const validatePestDetection = [
    body('cropType').optional().isString(),
    body('location').optional().isString(),
    body('notes').optional().isString().isLength({ max: 500 })
];

const validatePestQuery = [
    query('cropType').optional().isString(),
    query('pestType').optional().isString(),
    query('dateFrom').optional().isISO8601(),
    query('dateTo').optional().isISO8601(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
];

// Public routes (no authentication required)
router.get('/pests', validatePestQuery, pestDetectionController.getAllPests);
router.get('/pests/:id', pestDetectionController.getPestById);
router.get('/crops', pestDetectionController.getSupportedCrops);

// Protected routes (authentication required)
router.post('/detect',
    authenticateToken,
    upload.single('image'),
    validatePestDetection,
    pestDetectionController.detectPest
);

router.get('/history', authenticateToken, validatePestQuery, pestDetectionController.getDetectionHistory);
router.get('/my-detections', authenticateToken, validatePestQuery, pestDetectionController.getMyDetections);

// Pest management
router.post('/pests', authenticateToken, pestDetectionController.createPestRecord);
router.put('/pests/:id', authenticateToken, pestDetectionController.updatePestRecord);
router.delete('/pests/:id', authenticateToken, pestDetectionController.deletePestRecord);

// Treatment recommendations
router.get('/treatments/:pestId', pestDetectionController.getTreatmentRecommendations);
router.post('/treatments', authenticateToken, pestDetectionController.addTreatmentRecord);

// Expert consultation
router.post('/consultations', authenticateToken, pestDetectionController.requestConsultation);
router.get('/consultations', authenticateToken, pestDetectionController.getConsultations);
router.put('/consultations/:id', authenticateToken, pestDetectionController.updateConsultation);

// Admin routes
router.get('/admin/detections', authenticateToken, pestDetectionController.getAllDetections);
router.put('/admin/detections/:id/status', authenticateToken, pestDetectionController.updateDetectionStatus);

export default router;

// Example fetch request (to be used in the client-side code, not in this file)
// fetch("https://your-pest-api.com/detect", { ... })
