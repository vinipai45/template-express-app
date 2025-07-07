import express, { Request, Response, NextFunction } from "express";
import staffRoutes from "./routes/staff.route";
import authRoutes from "./routes/auth.route";
import { setupSwagger } from "./config/swagger";
import { HttpError } from "./utils/http.error";

const app = express();
app.use(express.json());
app.use("/api/user", staffRoutes);
app.use("/api/auth", authRoutes);

setupSwagger(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof HttpError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  console.error("Global error handler:", err);

  res.status(status).json({
    success: false,
    error: message,
  });
});

export default app;
