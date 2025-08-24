import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import { weatherController } from '../controllers/weatherController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Validation middleware
const validateWeatherQuery = [
    query('lat').isFloat({ min: -90, max: 90 }),
    query('lon').isFloat({ min: -180, max: 180 }),
    query('units').optional().isIn(['metric', 'imperial', 'kelvin']),
    query('lang').optional().isLength({ min: 2, max: 5 })
];

const validateForecastQuery = [
    query('lat').isFloat({ min: -90, max: 90 }),
    query('lon').isFloat({ min: -180, max: 180 }),
    query('days').optional().isInt({ min: 1, max: 7 }),
    query('units').optional().isIn(['metric', 'imperial', 'kelvin'])
];

// Public routes (no authentication required)
router.get('/current', validateWeatherQuery, weatherController.getCurrentWeather);
router.get('/forecast', validateForecastQuery, weatherController.getWeatherForecast);
router.get('/alerts', weatherController.getWeatherAlerts);

// Protected routes (authentication required)
router.get('/history', authenticateToken, weatherController.getWeatherHistory);
router.post('/favorites', authenticateToken, weatherController.addFavoriteLocation);
router.get('/favorites', authenticateToken, weatherController.getFavoriteLocations);
router.delete('/favorites/:id', authenticateToken, weatherController.removeFavoriteLocation);

// Weather alerts and notifications
router.post('/alerts/subscribe', authenticateToken, weatherController.subscribeToAlerts);
router.delete('/alerts/unsubscribe', authenticateToken, weatherController.unsubscribeFromAlerts);
router.get('/alerts/subscriptions', authenticateToken, weatherController.getAlertSubscriptions);

// Weather data for specific crops
router.get('/crop-recommendations', authenticateToken, weatherController.getCropRecommendations);
router.get('/irrigation-schedule', authenticateToken, weatherController.getIrrigationSchedule);

export default router;
