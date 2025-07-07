import { Request, Response, NextFunction } from "express";
import { IncomingHttpHeaders } from "http";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../config/db";
import { Staff } from "../models/staff.model";

dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({ success: false, message: "JWT secret is not configured" });
    }

    const { authorization }: IncomingHttpHeaders = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Access Denied" });
    }

    const token = authorization.replace("Bearer ", "");

    const payload = jwt.verify(token, JWT_SECRET) as { id: string };

    const result = await pool.query("SELECT * FROM staffs WHERE id = $1", [payload.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = result.rows[0];
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Session expired or invalid token" });
  }
};
