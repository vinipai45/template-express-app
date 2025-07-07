import { EntityConfig } from "./types";

export function generateMigration(config: EntityConfig, entity: string) {
  const plural = `${entity}s`;

  const sqlTypeMap: Record<string, string> = {
    string: "TEXT",
    number: "INTEGER",
    boolean: "BOOLEAN DEFAULT FALSE",
    timestamp: "TIMESTAMPTZ DEFAULT NOW()",
  };

  const sqlFields = Object.entries(config.fields)
    .map(([name, field]) => {
      if (name === "id") return `  id TEXT PRIMARY KEY`;

      if (field.type === "enum" && Array.isArray(field.values)) {
        const enumValues = field.values.map(v => `'${v}'`).join(", ");
        return `  ${name} TEXT CHECK (${name} IN (${enumValues}))`;
      }

      return `  ${name} ${sqlTypeMap[field.type] || "TEXT"}`;
    })
    .join(",\n");

  const tableSQL = `CREATE TABLE IF NOT EXISTS ${plural} (\n${sqlFields}\n);`;

  const triggerSQL = `
CREATE TRIGGER trigger_${plural}_updated_at
BEFORE UPDATE ON ${plural}
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();`;

  return [
    {
      path: `migrations/${entity}.migration.sql`,
      content: `${tableSQL}\n${triggerSQL}\n`,
    },
  ];
}
