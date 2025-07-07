import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const createStaffSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  branch_id: z.enum(["karkala", "udupi", "manipal"]),
  role: z.enum(["staff", "admin", "dev"]),
});

const updateStaffSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  branch_id: z.enum(["karkala", "udupi", "manipal"]).optional(),
  role: z.enum(["staff", "admin", "dev"]).optional(),
});

export const validateStaffCreate = (req: Request, res: Response, next: NextFunction) => {
  try {
    createStaffSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Bad Request",
      issues: (error as any).errors?.map((e: any) => ({
        field: e.path?.join("."),
        message: e.message
      })) || [],
    });
  }
};

export const validateStaffUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateStaffSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Bad Request",
      issues: (error as any).errors?.map((e: any) => ({
        field: e.path?.join("."),
        message: e.message
      })) || [],
    });
  }
};
