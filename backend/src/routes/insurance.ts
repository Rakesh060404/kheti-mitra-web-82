import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { insuranceController } from '../controllers/insuranceController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Validation middleware
const validateInsuranceApplication = [
  body('policyType').isIn(['crop', 'livestock', 'equipment', 'health']),
  body('coverageAmount').isFloat({ min: 1000, max: 1000000 }),
  body('premiumAmount').isFloat({ min: 0 }),
  body('startDate').isISO8601(),
  body('endDate').isISO8601(),
  body('insuredItems').isArray({ min: 1 }),
  body('termsAccepted').isBoolean().equals(true)
];

const validateClaimSubmission = [
  body('policyId').isString().notEmpty(),
  body('incidentDate').isISO8601(),
  body('incidentType').isIn(['natural_disaster', 'disease', 'accident', 'theft', 'other']),
  body('description').isString().isLength({ min: 10, max: 1000 }),
  body('estimatedLoss').isFloat({ min: 0 }),
  body('supportingDocuments').optional().isArray()
];

const validateInsuranceQuery = [
  query('status').optional().isIn(['active', 'expired', 'cancelled', 'pending']),
  query('policyType').optional().isIn(['crop', 'livestock', 'equipment', 'health']),
  query('dateFrom').optional().isISO8601(),
  query('dateTo').optional().isISO8601()
];

// Public routes (no authentication required)
router.get('/policies', insuranceController.getAvailablePolicies);
router.get('/policy-types', insuranceController.getPolicyTypes);
router.get('/coverage-options', insuranceController.getCoverageOptions);
router.post('/calculate-premium', insuranceController.calculatePremium);
router.get('/terms', insuranceController.getPolicyTerms);

// Protected routes (authentication required)
router.post('/apply', authenticateToken, validateInsuranceApplication, insuranceController.applyForInsurance);
router.get('/my-policies', authenticateToken, validateInsuranceQuery, insuranceController.getMyPolicies);
router.get('/my-policies/:id', authenticateToken, insuranceController.getMyPolicyById);
router.put('/my-policies/:id', authenticateToken, insuranceController.updatePolicy);
router.delete('/my-policies/:id', authenticateToken, insuranceController.cancelPolicy);

// Claims management
router.post('/claims', authenticateToken, validateClaimSubmission, insuranceController.submitClaim);
router.get('/my-claims', authenticateToken, insuranceController.getMyClaims);
router.get('/my-claims/:id', authenticateToken, insuranceController.getMyClaimById);
router.put('/my-claims/:id', authenticateToken, insuranceController.updateClaim);
router.delete('/my-claims/:id', authenticateToken, insuranceController.cancelClaim);

// Policy documents
router.get('/:id/documents', authenticateToken, insuranceController.getPolicyDocuments);
router.post('/:id/documents', authenticateToken, insuranceController.uploadPolicyDocuments);

// Renewals and modifications
router.post('/:id/renew', authenticateToken, insuranceController.renewPolicy);
router.post('/:id/modify', authenticateToken, insuranceController.modifyPolicy);

// Admin routes
router.get('/admin/applications', authenticateToken, insuranceController.getAllApplications);
router.put('/admin/applications/:id/approve', authenticateToken, insuranceController.approveApplication);
router.put('/admin/applications/:id/reject', authenticateToken, insuranceController.rejectApplication);

// Claims processing
router.get('/admin/claims', authenticateToken, insuranceController.getAllClaims);
router.put('/admin/claims/:id/process', authenticateToken, insuranceController.processClaim);
router.put('/admin/claims/:id/approve', authenticateToken, insuranceController.approveClaim);
router.put('/admin/claims/:id/reject', authenticateToken, insuranceController.rejectClaim);

// Reports and analytics
router.get('/admin/reports/summary', authenticateToken, insuranceController.getInsuranceSummary);
router.get('/admin/reports/claims', authenticateToken, insuranceController.getClaimsReport);
router.get('/admin/reports/risk', authenticateToken, insuranceController.getRiskAssessment);

export default router;
