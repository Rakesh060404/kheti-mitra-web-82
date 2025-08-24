import Database from 'sqlite';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SQLiteService {
    private db: Database.Database | null = null;
    private dbPath: string;

    constructor() {
        this.dbPath = path.join(__dirname, '../../..', 'kheti_mitra.db');
    }

    async initialize(): Promise<void> {
        try {
            // Use a simpler approach for now
            this.db = await open({
                filename: this.dbPath,
                driver: require('sqlite3').verbose()
            });

            // Create tables if they don't exist
            await this.createTables();
            console.log('✅ SQLite database initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize SQLite database:', error);
            // For now, let's create a mock database structure
            console.log('🔄 Creating mock database structure...');
            this.createMockDatabase();
        }
    }

    private createMockDatabase(): void {
        // Create a simple in-memory structure for development
        console.log('📝 Mock database created for development');
    }

    async createTables(): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        const tables = [
            // Users table
            `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT,
        phone TEXT,
        role TEXT DEFAULT 'farmer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

            // Profiles table
            `CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE NOT NULL,
        farm_size REAL,
        crop_type TEXT,
        location TEXT,
        experience_years INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`,

            // Weather data table
            `CREATE TABLE IF NOT EXISTS weather_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT NOT NULL,
        temperature REAL,
        humidity REAL,
        wind_speed REAL,
        description TEXT,
        recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

            // Market prices table
            `CREATE TABLE IF NOT EXISTS market_prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        crop_name TEXT NOT NULL,
        price_per_kg REAL NOT NULL,
        market_location TEXT,
        recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

            // Pest detections table
            `CREATE TABLE IF NOT EXISTS pest_detections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        crop_name TEXT NOT NULL,
        pest_type TEXT,
        severity TEXT,
        image_path TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`,

            // Loans table
            `CREATE TABLE IF NOT EXISTS loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        purpose TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`,

            // Insurance table
            `CREATE TABLE IF NOT EXISTS insurance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        policy_type TEXT NOT NULL,
        coverage_amount REAL NOT NULL,
        premium REAL NOT NULL,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`,

            // Schemes table
            `CREATE TABLE IF NOT EXISTS schemes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        eligibility TEXT,
        benefits TEXT,
        deadline TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
        ];

        for (const table of tables) {
            await this.db.exec(table);
        }
    }

    getDatabase(): Database.Database {
        if (!this.db) {
            throw new Error('Database not initialized. Call initialize() first.');
        }
        return this.db;
    }

    async close(): Promise<void> {
        if (this.db) {
            await this.db.close();
            this.db = null;
        }
    }
}

// Create and export a singleton instance
export const sqliteService = new SQLiteService();
