import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()"); // simple test query
    console.log("✅ Connected to PostgreSQL");
  } catch (err) {
    console.error("❌ Failed to connect to PostgreSQL:", err);
    process.exit(1); // exit process if DB connection fails
  }
};
