import jwt from "jsonwebtoken";
import { pool } from "../config/db";
import { Staff } from "../models/staff.model";
import { AUTH_QUERY } from "../queries/auth.query";
import dotenv from "dotenv";
import { LoginRepo } from "../@types/auth.types";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "";

export class AuthRepository {
  // protected tableName = "staff";

  constructor() {}

  mapRowToEntity(row: any): Omit<Staff, "password"> {
    return {
      id: row.id,
      name: row.name,
      username: row.username,
      role: row.role,
      branch_id: row.branch_id,
      is_deleted: row.is_deleted,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  login = async (username: string, password: string): Promise<LoginRepo<Staff> | null> => {
    const result = await pool.query(AUTH_QUERY.LOGIN, [username, password]);

    if (result.rows.length === 0) return null;

    const user = this.mapRowToEntity(result.rows[0]);

    const token = jwt.sign({ _id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return { token, user };
  };
}
