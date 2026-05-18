import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// Use the full connection string directly
export const sql = neon(process.env.DATABASE_URL);