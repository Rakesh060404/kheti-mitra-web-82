import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { schemesController } from '../controllers/schemesController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Validation middleware
const validateSchemeApplication = [
  body('schemeId').isString().notEmpty(),
  body('eligibilityCriteria').isArray({ min: 1 }),
  body('supportingDocuments').isArray({ min: 1 }),
  body('declarations').isArray({ min: 1 }),
  body('termsAccepted').isBoolean().equals(true)
];

const validateSchemeQuery = [
  query('category').optional().isIn(['subsidy', 'loan', 'training', 'infrastructure', 'technology']),
  query('status').optional().isIn(['active', 'inactive', 'upcoming']),
  query('state').optional().isString(),
  query('cropType').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
];

// Public routes (no authentication required)
router.get('/schemes', validateSchemeQuery, schemesController.getAllSchemes);
router.get('/schemes/:id', schemesController.getSchemeById);
router.get('/categories', schemesController.getSchemeCategories);
router.get('/states', schemesController.getSupportedStates);
router.get('/crops', schemesController.getSupportedCrops);
router.get('/eligibility-checker', schemesController.checkEligibility);
router.get('/calculator', schemesController.calculateBenefits);

// Scheme search and filters
router.get('/search', schemesController.searchSchemes);
router.get('/filter', schemesController.filterSchemes);
router.get('/trending', schemesController.getTrendingSchemes);
router.get('/deadlines', schemesController.getUpcomingDeadlines);

// Protected routes (authentication required)
router.post('/apply', authenticateToken, validateSchemeApplication, schemesController.applyForScheme);
router.get('/my-applications', authenticateToken, schemesController.getMyApplications);
router.get('/my-applications/:id', authenticateToken, schemesController.getMyApplicationById);
router.put('/my-applications/:id', authenticateToken, schemesController.updateApplication);
router.delete('/my-applications/:id', authenticateToken, schemesController.cancelApplication);

// Application tracking
router.get('/track/:id', authenticateToken, schemesController.trackApplication);
router.get('/status/:id', authenticateToken, schemesController.getApplicationStatus);

// Documents and compliance
router.post('/:id/documents', authenticateToken, schemesController.uploadDocuments);
router.get('/:id/documents', authenticateToken, schemesController.getApplicationDocuments);
router.delete('/:id/documents/:docId', authenticateToken, schemesController.deleteDocument);

// Notifications and updates
router.post('/:id/subscribe', authenticateToken, schemesController.subscribeToUpdates);
router.get('/notifications', authenticateToken, schemesController.getNotifications);
router.put('/notifications/:id/read', authenticateToken, schemesController.markNotificationRead);

// Admin routes
router.get('/admin/applications', authenticateToken, schemesController.getAllApplications);
router.get('/admin/applications/:id', authenticateToken, schemesController.getAdminApplicationById);
router.put('/admin/applications/:id/approve', authenticateToken, schemesController.approveApplication);
router.put('/admin/applications/:id/reject', authenticateToken, schemesController.rejectApplication);
router.put('/admin/applications/:id/status', authenticateToken, schemesController.updateApplicationStatus);

// Scheme management
router.post('/admin/schemes', authenticateToken, schemesController.createScheme);
router.put('/admin/schemes/:id', authenticateToken, schemesController.updateScheme);
router.delete('/admin/schemes/:id', authenticateToken, schemesController.deleteScheme);
router.put('/admin/schemes/:id/status', authenticateToken, schemesController.updateSchemeStatus);

// Reports and analytics
router.get('/admin/reports/applications', authenticateToken, schemesController.getApplicationsReport);
router.get('/admin/reports/beneficiaries', authenticateToken, schemesController.getBeneficiariesReport);
router.get('/admin/reports/impact', authenticateToken, schemesController.getImpactReport);

// Data export
router.get('/export/schemes', schemesController.exportSchemes);
router.get('/export/applications', authenticateToken, schemesController.exportApplications);

export default router;
