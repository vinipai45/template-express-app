import { Router } from "express";
import { StaffController } from "../controllers/staff.controller";
import { validateStaffCreate, validateStaffUpdate } from "../validations/staff.validation";
import asyncMiddleware from "../middlewares/async.middleware";

const router = Router();
const controller = new StaffController();

router.get("/list", asyncMiddleware(controller.getAll));
router.get("/get-by-id/:id", asyncMiddleware(controller.getById));
router.post("/create", validateStaffCreate, asyncMiddleware(controller.create));
router.put("/update/:id", validateStaffUpdate, asyncMiddleware(controller.update));
router.delete("/delete/:id", asyncMiddleware(controller.delete));
router.patch("/enable/:id", asyncMiddleware(controller.enable));

export default router;
