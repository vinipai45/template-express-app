export function generateService(entity: string, pascal: string) {
  const content = `import { ${pascal} } from "../models/${entity}.model";
import { ${pascal}Repository } from "../repositories/${entity}.repository";
import { BaseService } from "./base.service";

export class ${pascal}Service extends BaseService<${pascal}, ${pascal}Repository> {
  constructor() {
    super(new ${pascal}Repository());
  }
}`;

  return [
    {
      path: `services/${entity}.service.ts`,
      content,
    },
  ];
}
