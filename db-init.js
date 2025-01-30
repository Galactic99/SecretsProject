import pg from "pg";
import env from "dotenv";
env.config();

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initializeDatabase() {
  try {
    await db.connect();
    
    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        secret TEXT
      );
    `);
    
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
  } finally {
    await db.end();
  }
}

initializeDatabase();