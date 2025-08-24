// Simple in-memory database for development
export class MockDatabase {
  private users: Map<number, any> = new Map();
  private profiles: Map<number, any> = new Map();
  private weatherData: any[] = [];
  private marketPrices: any[] = [];
  private pestDetections: any[] = [];
  private loans: any[] = [];
  private insurance: any[] = [];
  private schemes: any[] = [];
  
  private nextId = 1;

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    // Add sample schemes
    this.schemes.push({
      id: this.nextId++,
      name: 'PM-KISAN',
      description: 'Direct income support for farmers',
      eligibility: 'Small and marginal farmers',
      benefits: '₹6,000 per year in three installments',
      deadline: '2024-12-31',
      created_at: new Date().toISOString()
    });

    this.schemes.push({
      id: this.nextId++,
      name: 'PM Fasal Bima Yojana',
      description: 'Crop insurance scheme',
      eligibility: 'All farmers growing notified crops',
      benefits: 'Comprehensive crop insurance coverage',
      deadline: '2024-12-31',
      created_at: new Date().toISOString()
    });

    // Add sample market prices
    this.marketPrices.push({
      id: this.nextId++,
      crop_name: 'Wheat',
      price_per_kg: 25.50,
      market_location: 'Delhi',
      recorded_at: new Date().toISOString()
    });

    this.marketPrices.push({
      id: this.nextId++,
      crop_name: 'Rice',
      price_per_kg: 32.75,
      market_location: 'Mumbai',
      recorded_at: new Date().toISOString()
    });

    // Add sample weather data
    this.weatherData.push({
      id: this.nextId++,
      location: 'Delhi',
      temperature: 28.5,
      humidity: 65,
      wind_speed: 12.3,
      description: 'Partly cloudy',
      recorded_at: new Date().toISOString()
    });
  }

  // Public methods for auth operations
  async findUserByEmail(email: string): Promise<any> {
    return Array.from(this.profiles.values()).find(profile => profile.email === email);
  }

  async createUser(userData: any): Promise<any> {
    const user = {
      id: this.nextId++,
      ...userData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.profiles.set(user.id, user);
    return user;
  }

  async findUserById(id: number): Promise<any> {
    return this.profiles.get(id);
  }

  async updateUser(id: number, updates: any): Promise<any> {
    const user = this.profiles.get(id);
    if (user) {
      const updatedUser = { ...user, ...updates, updated_at: new Date().toISOString() };
      this.profiles.set(id, updatedUser);
      return updatedUser;
    }
    return null;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.profiles.delete(id);
  }

  async getAllUsers(): Promise<any[]> {
    return Array.from(this.profiles.values());
  }

  async getUsersByRole(role: string): Promise<any[]> {
    return Array.from(this.profiles.values()).filter(profile => profile.role === role);
  }

  // Profile operations
  async createProfile(profileData: any): Promise<any> {
    const profile = {
      id: this.nextId++,
      ...profileData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.profiles.set(profile.id, profile);
    return profile;
  }

  async getProfileByUserId(userId: number): Promise<any> {
    return Array.from(this.profiles.values()).find(profile => profile.user_id === userId);
  }

  // Weather operations
  async getWeatherData(location?: string): Promise<any[]> {
    if (location) {
      return this.weatherData.filter(w => w.location === location);
    }
    return this.weatherData;
  }

  async addWeatherData(weatherData: any): Promise<any> {
    const weather = {
      id: this.nextId++,
      ...weatherData,
      recorded_at: new Date().toISOString()
    };
    this.weatherData.push(weather);
    return weather;
  }

  // Market prices operations
  async getMarketPrices(cropName?: string): Promise<any[]> {
    if (cropName) {
      return this.marketPrices.filter(p => p.crop_name === cropName);
    }
    return this.marketPrices;
  }

  async addMarketPrice(priceData: any): Promise<any> {
    const price = {
      id: this.nextId++,
      ...priceData,
      recorded_at: new Date().toISOString()
    };
    this.marketPrices.push(price);
    return price;
  }

  // Schemes operations
  async getSchemes(): Promise<any[]> {
    return this.schemes;
  }

  async getSchemeById(id: number): Promise<any> {
    return this.schemes.find(scheme => scheme.id === id);
  }

  // Pest detection operations
  async addPestDetection(detectionData: any): Promise<any> {
    const detection = {
      id: this.nextId++,
      ...detectionData,
      created_at: new Date().toISOString()
    };
    this.pestDetections.push(detection);
    return detection;
  }

  async getPestDetections(userId?: number): Promise<any[]> {
    if (userId) {
      return this.pestDetections.filter(d => d.user_id === userId);
    }
    return this.pestDetections;
  }

  // Loan operations
  async createLoan(loanData: any): Promise<any> {
    const loan = {
      id: this.nextId++,
      ...loanData,
      created_at: new Date().toISOString()
    };
    this.loans.push(loan);
    return loan;
  }

  async getLoans(userId?: number): Promise<any[]> {
    if (userId) {
      return this.loans.filter(l => l.user_id === userId);
    }
    return this.loans;
  }

  // Insurance operations
  async createInsurance(insuranceData: any): Promise<any> {
    const insurance = {
      id: this.nextId++,
      ...insuranceData,
      created_at: new Date().toISOString()
    };
    this.insurance.push(insurance);
    return insurance;
  }

  async getInsurance(userId?: number): Promise<any[]> {
    if (userId) {
      return this.insurance.filter(i => i.user_id === userId);
    }
    return this.insurance;
  }

  // Database info
  getDatabaseInfo(): any {
    return {
      type: 'Mock Database (In-Memory)',
      users: this.profiles.size,
      profiles: this.profiles.size,
      weatherData: this.weatherData.length,
      marketPrices: this.marketPrices.length,
      schemes: this.schemes.length,
      pestDetections: this.pestDetections.length,
      loans: this.loans.length,
      insurance: this.insurance.length
    };
  }
}

// Create and export a singleton instance
export const mockDb = new MockDatabase();
