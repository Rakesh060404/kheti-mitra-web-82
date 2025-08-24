# Kheti Mitra Backend API

A comprehensive backend API for the Kheti Mitra agricultural platform, built with Node.js, Express, TypeScript, and Supabase.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Weather Services**: Real-time weather data and forecasts using OpenWeatherMap API
- **Pest Detection**: Image-based pest identification and management
- **Market Prices**: Agricultural commodity price tracking and analysis
- **Agricultural Loans**: Loan application and management system
- **Insurance**: Agricultural insurance policies and claims
- **Government Schemes**: Subsidy and support program management
- **User Management**: Comprehensive user profiles and farm management

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + Supabase Auth
- **File Upload**: Multer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project
- OpenWeatherMap API key (for weather features)

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the environment file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# External APIs
WEATHER_API_KEY=your_openweathermap_api_key
MARKET_API_KEY=your_market_data_api_key
PEST_DETECTION_API_KEY=your_pest_detection_api_key
```

### 3. Database Setup

Create the following tables in your Supabase project:

#### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'farmer',
  address TEXT,
  farm_size DECIMAL,
  crops JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Weather Data Table
```sql
CREATE TABLE weather_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  location TEXT NOT NULL,
  lat DECIMAL NOT NULL,
  lon DECIMAL NOT NULL,
  weather_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Pest Detections Table
```sql
CREATE TABLE pest_detections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  image_url TEXT NOT NULL,
  crop_type TEXT,
  pest_type TEXT,
  confidence DECIMAL,
  location TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Run the Application

#### Development Mode
```bash
npm run dev
```

#### Production Build
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Weather
- `GET /api/weather/current` - Get current weather
- `GET /api/weather/forecast` - Get weather forecast
- `GET /api/weather/alerts` - Get weather alerts
- `GET /api/weather/history` - Get weather history (authenticated)

### Pest Detection
- `POST /api/pest-detection/detect` - Detect pest from image
- `GET /api/pest-detection/history` - Get detection history
- `GET /api/pest-detection/pests` - Get all pests

### Market Prices
- `GET /api/market-prices/prices` - Get market prices
- `POST /api/market-prices/submit-price` - Submit price (authenticated)
- `GET /api/market-prices/trends` - Get price trends

### Loans
- `GET /api/loans/types` - Get loan types
- `POST /api/loans/apply` - Apply for loan (authenticated)
- `GET /api/loans/my-loans` - Get user loans (authenticated)

### Insurance
- `GET /api/insurance/policies` - Get available policies
- `POST /api/insurance/apply` - Apply for insurance (authenticated)
- `POST /api/insurance/claims` - Submit claim (authenticated)

### Government Schemes
- `GET /api/schemes/schemes` - Get all schemes
- `POST /api/schemes/apply` - Apply for scheme (authenticated)
- `GET /api/schemes/search` - Search schemes

### User Management
- `GET /api/user/profile` - Get user profile (authenticated)
- `PUT /api/user/profile` - Update user profile (authenticated)
- `GET /api/user/dashboard` - Get dashboard data (authenticated)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Admin, moderator, and user roles
- **Input Validation**: Request validation using Express Validator
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Configurable CORS settings
- **Helmet Security**: Security headers and protection

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── routes/          # API route definitions
│   ├── lib/            # External library configurations
│   └── index.ts        # Main application entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── env.example          # Environment variables template
└── README.md           # This file
```

## 🧪 Testing

```bash
npm test
```

## 📊 Monitoring

The API includes built-in monitoring endpoints:

- `GET /health` - Health check endpoint
- Request logging with Morgan
- Error tracking and logging
- Performance monitoring

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set in your production environment.

### Build Process
```bash
npm run build
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation

## 🔮 Roadmap

- [ ] Real-time notifications using WebSockets
- [ ] Advanced analytics and reporting
- [ ] Mobile app API optimization
- [ ] Machine learning integration for pest detection
- [ ] Blockchain integration for transparent transactions
- [ ] Multi-language support
- [ ] Advanced caching strategies
