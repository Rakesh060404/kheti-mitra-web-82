import { Router } from 'express';
import { query, body, validationResult } from 'express-validator';
import { marketPricesController } from '../controllers/marketPricesController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Validation middleware
const validateMarketQuery = [
  query('commodity').optional().isString(),
  query('market').optional().isString(),
  query('dateFrom').optional().isISO8601(),
  query('dateTo').optional().isISO8601(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
];

const validatePriceSubmission = [
  body('commodity').isString().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('unit').isIn(['kg', 'quintal', 'ton', 'piece', 'dozen']),
  body('market').isString().notEmpty(),
  body('quality').optional().isString(),
  body('notes').optional().isString().isLength({ max: 200 })
];

// Public routes (no authentication required)
router.get('/prices', validateMarketQuery, marketPricesController.getMarketPrices);
router.get('/commodities', marketPricesController.getAllCommodities);
router.get('/markets', marketPricesController.getAllMarkets);
router.get('/trends', marketPricesController.getPriceTrends);
router.get('/forecast', marketPricesController.getPriceForecast);

// Historical data
router.get('/history/:commodity', marketPricesController.getPriceHistory);
router.get('/comparison', marketPricesController.comparePrices);

// Protected routes (authentication required)
router.post('/submit-price', authenticateToken, validatePriceSubmission, marketPricesController.submitPrice);
router.get('/my-submissions', authenticateToken, marketPricesController.getMySubmissions);
router.put('/my-submissions/:id', authenticateToken, marketPricesController.updateMySubmission);
router.delete('/my-submissions/:id', authenticateToken, marketPricesController.deleteMySubmission);

// Price alerts
router.post('/alerts', authenticateToken, marketPricesController.createPriceAlert);
router.get('/alerts', authenticateToken, marketPricesController.getMyPriceAlerts);
router.put('/alerts/:id', authenticateToken, marketPricesController.updatePriceAlert);
router.delete('/alerts/:id', authenticateToken, marketPricesController.deletePriceAlert);

// Market analysis
router.get('/analysis/summary', marketPricesController.getMarketSummary);
router.get('/analysis/seasonal', marketPricesController.getSeasonalAnalysis);
router.get('/analysis/regional', marketPricesController.getRegionalAnalysis);

// Admin routes
router.get('/admin/submissions', authenticateToken, marketPricesController.getAllSubmissions);
router.put('/admin/submissions/:id/approve', authenticateToken, marketPricesController.approveSubmission);
router.put('/admin/submissions/:id/reject', authenticateToken, marketPricesController.rejectSubmission);
router.post('/admin/bulk-import', authenticateToken, marketPricesController.bulkImportPrices);

// Data export
router.get('/export/csv', marketPricesController.exportToCSV);
router.get('/export/json', marketPricesController.exportToJSON);

export default router;
