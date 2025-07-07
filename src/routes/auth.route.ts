import { Router } from "express";
import asyncMiddleware from "../middlewares/async";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

const controller = new AuthController();
const router = Router();

router.post("/login", asyncMiddleware(controller.login));

export default router;
