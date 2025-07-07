import { z } from "zod";

export const StaffSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  branch_id: z.enum(["karkala", "udupi", "manipal"]),
  role: z.enum(["staff", "admin", "dev"]),
  is_deleted: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Staff = z.infer<typeof StaffSchema>;
