export function generateController(entity: string, pascal: string) {
  const content = `import { BaseController } from "./base.controller";
import { ${pascal} } from "../models/${entity}.model";
import { ${pascal}Service } from "../services/${entity}.service";

export class ${pascal}Controller extends BaseController<${pascal}> {
  constructor() {
    super(new ${pascal}Service());
  }
}`;

  return [
    {
      path: `controllers/${entity}.controller.ts`,
      content,
    },
  ];
}
