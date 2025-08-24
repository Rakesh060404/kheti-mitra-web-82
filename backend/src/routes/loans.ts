import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { loansController } from '../controllers/loansController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Validation middleware
const validateLoanApplication = [
    body('loanType').isIn(['crop', 'equipment', 'infrastructure', 'emergency']),
    body('amount').isFloat({ min: 1000, max: 1000000 }),
    body('purpose').isString().isLength({ min: 10, max: 500 }),
    body('repaymentPeriod').isInt({ min: 6, max: 60 }),
    body('collateral').optional().isString(),
    body('cropDetails').optional().isObject(),
    body('equipmentDetails').optional().isObject()
];

const validateLoanQuery = [
    query('status').optional().isIn(['pending', 'approved', 'rejected', 'active', 'completed']),
    query('loanType').optional().isIn(['crop', 'equipment', 'infrastructure', 'emergency']),
    query('dateFrom').optional().isISO8601(),
    query('dateTo').optional().isISO8601(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
];

const validateRepayment = [
    body('amount').isFloat({ min: 0.01 }),
    body('paymentMethod').isIn(['bank_transfer', 'cash', 'check', 'mobile_money']),
    body('reference').optional().isString()
];

// Public routes (no authentication required)
router.get('/types', loansController.getLoanTypes);
router.get('/requirements', loansController.getLoanRequirements);
router.get('/calculators', loansController.getLoanCalculators);
router.post('/calculate-emi', loansController.calculateEMI);
router.get('/eligibility-check', loansController.checkEligibility);

// Protected routes (authentication required)
router.post('/apply', authenticateToken, validateLoanApplication, loansController.applyForLoan);
router.get('/my-loans', authenticateToken, validateLoanQuery, loansController.getMyLoans);
router.get('/my-loans/:id', authenticateToken, loansController.getMyLoanById);
router.put('/my-loans/:id', authenticateToken, loansController.updateLoanApplication);
router.delete('/my-loans/:id', authenticateToken, loansController.cancelLoanApplication);

// Loan documents
router.post('/:id/documents', authenticateToken, loansController.uploadDocuments);
router.get('/:id/documents', authenticateToken, loansController.getLoanDocuments);
router.delete('/:id/documents/:docId', authenticateToken, loansController.deleteDocument);

// Repayments
router.post('/:id/repayments', authenticateToken, validateRepayment, loansController.makeRepayment);
router.get('/:id/repayments', authenticateToken, loansController.getRepaymentHistory);
router.get('/:id/schedule', authenticateToken, loansController.getRepaymentSchedule);

// Loan status and tracking
router.get('/:id/status', authenticateToken, loansController.getLoanStatus);
router.post('/:id/track', authenticateToken, loansController.trackLoanProgress);

// Admin routes
router.get('/admin/applications', authenticateToken, loansController.getAllApplications);
router.get('/admin/applications/:id', authenticateToken, loansController.getApplicationById);
router.put('/admin/applications/:id/approve', authenticateToken, loansController.approveLoan);
router.put('/admin/applications/:id/reject', authenticateToken, loansController.rejectLoan);
router.put('/admin/applications/:id/status', authenticateToken, loansController.updateLoanStatus);

// Loan disbursement
router.post('/admin/:id/disburse', authenticateToken, loansController.disburseLoan);
router.post('/admin/:id/close', authenticateToken, loansController.closeLoan);

// Reports and analytics
router.get('/admin/reports/summary', authenticateToken, loansController.getLoanSummary);
router.get('/admin/reports/performance', authenticateToken, loansController.getLoanPerformance);
router.get('/admin/reports/risk', authenticateToken, loansController.getRiskAnalysis);

export default router;
