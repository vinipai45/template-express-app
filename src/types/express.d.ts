import { Staff } from "../models/staff.model";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: Staff;
    }
  }
}
