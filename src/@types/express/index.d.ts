import { Staff } from "../../models/staff.model";

declare global {
  namespace Express {
    interface Request {
      user?: Staff;
    }
  }
}

export {};
