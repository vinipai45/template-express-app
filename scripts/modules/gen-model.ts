import { EntityConfig } from "./types";

export function generateModel(config: EntityConfig, entity: string, pascal: string) {
  const zodMap: Record<string, string> = {
    string: "z.string()",
    number: "z.number()",
    boolean: "z.boolean()",
    timestamp: "z.coerce.date()",
  };

  const zodSchema = Object.entries(config.fields)
    .map(([key, field]) => {
      if (field.type === "enum" && Array.isArray(field.values)) {
        const enumValues = field.values.map(v => `"${v}"`).join(", ");
        return `  ${key}: z.enum([${enumValues}]),`;
      }

      return `  ${key}: ${zodMap[field.type] || "z.string()"},`;
    })
    .join("\n");

  const content = `import { z } from "zod";

export const ${pascal}Schema = z.object({
${zodSchema}
});

export type ${pascal} = z.infer<typeof ${pascal}Schema>;
`;

  return [
    {
      path: `models/${entity}.model.ts`,
      content,
    },
  ];
}
