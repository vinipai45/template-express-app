import { Request } from "express";
import { Staff } from "../models/staff.model";

export type LoginRepo<T extends { password?: string }> = {
  token: string;
  user: Omit<T, "password">;
};

export type RequestWithUser = Request & { user: Staff };
