import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { userController } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Validation middleware
const validateProfileUpdate = [
  body('firstName').optional().trim().isLength({ min: 2 }),
  body('lastName').optional().trim().isLength({ min: 2 }),
  body('phone').optional().isMobilePhone(),
  body('address').optional().isString(),
  body('farmSize').optional().isFloat({ min: 0 }),
  body('crops').optional().isArray(),
  body('experience').optional().isInt({ min: 0, max: 50 }),
  body('education').optional().isString()
];

const validatePreferences = [
  body('notifications').optional().isObject(),
  body('language').optional().isIn(['en', 'hi', 'ta', 'te', 'bn']),
  body('currency').optional().isIn(['INR', 'USD', 'EUR']),
  body('timezone').optional().isString()
];

// Protected routes (authentication required)
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, validateProfileUpdate, userController.updateProfile);
router.delete('/profile', authenticateToken, userController.deleteProfile);

// User preferences
router.get('/preferences', authenticateToken, userController.getPreferences);
router.put('/preferences', authenticateToken, validatePreferences, userController.updatePreferences);

// User dashboard data
router.get('/dashboard', authenticateToken, userController.getDashboardData);
router.get('/stats', authenticateToken, userController.getUserStats);
router.get('/activity', authenticateToken, userController.getUserActivity);

// Farm management
router.get('/farm', authenticateToken, userController.getFarmDetails);
router.put('/farm', authenticateToken, userController.updateFarmDetails);
router.post('/farm/crops', authenticateToken, userController.addCrop);
router.put('/farm/crops/:id', authenticateToken, userController.updateCrop);
router.delete('/farm/crops/:id', authenticateToken, userController.deleteCrop);

// Documents and files
router.get('/documents', authenticateToken, userController.getUserDocuments);
router.post('/documents', authenticateToken, userController.uploadDocument);
router.delete('/documents/:id', authenticateToken, userController.deleteDocument);

// Notifications
router.get('/notifications', authenticateToken, userController.getNotifications);
router.put('/notifications/:id/read', authenticateToken, userController.markNotificationRead);
router.put('/notifications/read-all', authenticateToken, userController.markAllNotificationsRead);
router.delete('/notifications/:id', authenticateToken, userController.deleteNotification);

// Account settings
router.put('/password', authenticateToken, userController.changePassword);
router.put('/email', authenticateToken, userController.changeEmail);
router.post('/verify-email', authenticateToken, userController.verifyEmail);
router.post('/enable-2fa', authenticateToken, userController.enable2FA);
router.post('/disable-2fa', authenticateToken, userController.disable2FA);

// Data export and privacy
router.get('/export-data', authenticateToken, userController.exportUserData);
router.post('/request-deletion', authenticateToken, userController.requestAccountDeletion);
router.get('/privacy-settings', authenticateToken, userController.getPrivacySettings);
router.put('/privacy-settings', authenticateToken, userController.updatePrivacySettings);

// Admin routes
router.get('/admin/users', authenticateToken, userController.getAllUsers);
router.get('/admin/users/:id', authenticateToken, userController.getUserById);
router.put('/admin/users/:id/role', authenticateToken, userController.updateUserRole);
router.put('/admin/users/:id/status', authenticateToken, userController.updateUserStatus);
router.delete('/admin/users/:id', authenticateToken, userController.deleteUser);

// User analytics
router.get('/admin/analytics/users', authenticateToken, userController.getUserAnalytics);
router.get('/admin/analytics/activity', authenticateToken, userController.getActivityAnalytics);
router.get('/admin/analytics/engagement', authenticateToken, userController.getEngagementAnalytics);

export default router;
