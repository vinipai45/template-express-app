import { EntityConfig } from "./types";

export function generateZodValidation(config: EntityConfig, entity: string, pascal: string) {
  const defaultKeys = ["id", "created_at", "updated_at", "is_deleted"];
  const insertKeys = Object.keys(config.fields).filter(k => !defaultKeys.includes(k));
  const updateKeys = Object.keys(config.fields).filter(k => !defaultKeys.includes(k));

  const zodMap: Record<string, string> = {
    string: "z.string()",
    number: "z.number()",
    boolean: "z.boolean()",
    timestamp: "z.coerce.date()",
  };

  const createZod = insertKeys
    .map(k => {
      const field = config.fields[k];
      if (field.type === "enum" && Array.isArray(field.values)) {
        const values = field.values.map(v => `"${v}"`).join(", ");
        return `  ${k}: z.enum([${values}]),`;
      }
      return `  ${k}: ${zodMap[field.type] || "z.string()"},`;
    })
    .join("\n");

  const updateZod = updateKeys
    .map(k => {
      const field = config.fields[k];
      if (field.type === "enum" && Array.isArray(field.values)) {
        const values = field.values.map(v => `"${v}"`).join(", ");
        return `  ${k}: z.enum([${values}]).optional(),`;
      }
      return `  ${k}: ${zodMap[field.type] || "z.string()"}.optional(),`;
    })
    .join("\n");

  const content = `import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const create${pascal}Schema = z.object({
${createZod}
});

const update${pascal}Schema = z.object({
${updateZod}
});

export const validate${pascal}Create = (req: Request, res: Response, next: NextFunction) => {
  try {
    create${pascal}Schema.parse(req.body);
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

export const validate${pascal}Update = (req: Request, res: Response, next: NextFunction) => {
  try {
    update${pascal}Schema.parse(req.body);
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
`;

  return [
    {
      path: `validations/${entity}.validation.ts`,
      content,
    },
  ];
}
