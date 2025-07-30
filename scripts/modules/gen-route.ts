export function generateRoute(entity: string, pascal: string) {
  const content = `import { Router } from "express";
import { ${pascal}Controller } from "../controllers/${entity}.controller";
import { validate${pascal}Create, validate${pascal}Update } from "../validations/${entity}.validation";
import asyncMiddleware from "../middlewares/async.middleware";

const router = Router();
const controller = new ${pascal}Controller();

router.get("/list", asyncMiddleware(controller.getAll));
router.get("/get-by-id/:id", asyncMiddleware(controller.getById));
router.post("/create", validate${pascal}Create, asyncMiddleware(controller.create));
router.put("/update/:id", validate${pascal}Update, asyncMiddleware(controller.update));
router.delete("/delete/:id", asyncMiddleware(controller.delete));
router.patch("/enable/:id", asyncMiddleware(controller.enable));

export default router;
`;

  return [
    {
      path: `routes/${entity}.route.ts`,
      content,
    },
  ];
}
