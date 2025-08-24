import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'demo_key';

export const weatherController = {
  // Get current weather
  async getCurrentWeather(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed',
            details: errors.array()
          }
        });
      }

      const { lat, lon, units = 'metric', lang = 'en' } = req.query;

      // Call OpenWeatherMap API
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${WEATHER_API_KEY}`
      );

      res.json({
        success: true,
        data: response.data
      });
    } catch (error: any) {
      console.error('Get current weather error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to get weather data',
          details: error.message
        }
      });
    }
  },

  // Get weather forecast
  async getWeatherForecast(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed',
            details: errors.array()
          }
        });
      }

      const { lat, lon, days = 7, units = 'metric' } = req.query;

      // Call OpenWeatherMap API for forecast
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`
      );

      res.json({
        success: true,
        data: response.data
      });
    } catch (error: any) {
      console.error('Get weather forecast error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to get forecast data',
          details: error.message
        }
      });
    }
  },

  // Get weather alerts
  async getWeatherAlerts(req: Request, res: Response) {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Latitude and longitude are required'
          }
        });
      }

      // Call OpenWeatherMap API for alerts
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${WEATHER_API_KEY}`
      );

      res.json({
        success: true,
        data: response.data.alerts || []
      });
    } catch (error: any) {
      console.error('Get weather alerts error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to get weather alerts',
          details: error.message
        }
      });
    }
  },

  // Get weather history
  async getWeatherHistory(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Authentication required'
          }
        });
      }

      // Placeholder for weather history
      res.json({
        success: true,
        data: {
          message: 'Weather history feature coming soon'
        }
      });
    } catch (error: any) {
      console.error('Get weather history error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to get weather history',
          details: error.message
        }
      });
    }
  },

  // Add favorite location
  async addFavoriteLocation(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Authentication required'
          }
        });
      }

      const { name, lat, lon } = req.body;

      // Placeholder for adding favorite location
      res.json({
        success: true,
        message: 'Favorite location added successfully'
      });
    } catch (error: any) {
      console.error('Add favorite location error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to add favorite location',
          details: error.message
        }
      });
    }
  },

  // Get favorite locations
  async getFavoriteLocations(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Authentication required'
          }
        });
      }

      // Placeholder for getting favorite locations
      res.json({
        success: true,
        data: []
      });
    } catch (error: any) {
      console.error('Get favorite locations error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to get favorite locations',
          details: error.message
        }
      });
    }
  },

  // Remove favorite location
  async removeFavoriteLocation(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Authentication required'
          }
        });
      }

      const { id } = req.params;

      // Placeholder for removing favorite location
      res.json({
        success: true,
        message: 'Favorite location removed successfully'
      });
    } catch (error: any) {
      console.error('Remove favorite location error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to remove favorite location',
          details: error.message
        }
      });
    }
  },

  // Subscribe to weather alerts
  async subscribeToAlerts(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Authentication required'
          }
        });
      }

      // Placeholder for subscribing to alerts
      res.json({
        success: true,
        message: 'Subscribed to weather alerts successfully'
      });
    } catch (error: any) {
      console.error('Subscribe to alerts error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to subscribe to alerts',
          details: error.message
        }
      });
    }
  },

  // Unsubscribe from weather alerts
  async unsubscribeFromAlerts(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Authentication required'
          }
        });
      }

      // Placeholder for unsubscribing from alerts
      res.json({
        success: true,
        message: 'Unsubscribed from weather alerts successfully'
      });
    } catch (error: any) {
      console.error('Unsubscribe from alerts error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to unsubscribe from alerts',
          details: error.message
        }
      });
    }
  },

  // Get alert subscriptions
  async getAlertSubscriptions(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Authentication required'
          }
        });
      }

      // Placeholder for getting alert subscriptions
      res.json({
        success: true,
        data: []
      });
    } catch (error: any) {
      console.error('Get alert subscriptions error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to get alert subscriptions',
          details: error.message
        }
      });
    }
  },

  // Get crop recommendations based on weather
  async getCropRecommendations(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Authentication required'
          }
        });
      }

      // Placeholder for crop recommendations
      res.json({
        success: true,
        data: {
          message: 'Crop recommendations feature coming soon'
        }
      });
    } catch (error: any) {
      console.error('Get crop recommendations error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to get crop recommendations',
          details: error.message
        }
      });
    }
  },

  // Get irrigation schedule based on weather
  async getIrrigationSchedule(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Authentication required'
          }
        });
      }

      // Placeholder for irrigation schedule
      res.json({
        success: true,
        data: {
          message: 'Irrigation schedule feature coming soon'
        }
      });
    } catch (error: any) {
      console.error('Get irrigation schedule error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to get irrigation schedule',
          details: error.message
        }
      });
    }
  }
};
