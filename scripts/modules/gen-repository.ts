import { EntityConfig } from "./types";

export function generateRepository(config: EntityConfig, entity: string, pascal: string) {
  const plural = `${entity}s`;
  const ENTITY_QUERY = `${entity.toUpperCase()}_QUERY`;

  const keys = Object.keys(config.fields);
  const defaultKeys = ["id", "created_at", "updated_at", "is_deleted"];
  const defaultKeysWithoutId = ["created_at", "updated_at", "is_deleted"];

  const insertKeys = keys.filter(k => !defaultKeysWithoutId.includes(k));
  const updateKeys = keys.filter(k => !defaultKeys.includes(k));

  const mapRowToEntity = keys.map(k => `      ${k}: row.${k},`).join("\n");

  const content = `import { pool } from "../config/db";
import { BaseRepository } from "./base.repository";
import { ${pascal} } from "../models/${entity}.model";
import { ${ENTITY_QUERY} } from "../queries/${entity}.query";
import { v4 as uuidv4 } from "uuid";

export class ${pascal}Repository extends BaseRepository<${pascal}> {
  protected tableName = "${plural}";

  mapRowToEntity(row: any): ${pascal} {
    return {
${mapRowToEntity}
    };
  }

  create = (data: ${pascal}): Promise<${pascal}> =>{
    const id = uuidv4();
    data.id = id;
    const res = await pool.query(${ENTITY_QUERY}.CREATE, [
      ${insertKeys.map(k => `data.${k}`).join(",\n      ")}
    ]);
    return this.mapRowToEntity(res.rows[0]);
  }

  update = (id: string, data: Partial<${pascal}>): Promise<${pascal} | null> => {
    const forbidden = ["id", "created_at", "updated_at", "is_deleted"];
    const keys = Object.keys(data).filter(k => !forbidden.includes(k));
    if (keys.length === 0) return null;

    const values = keys.map(k => (data as any)[k]);
    const setClause = keys.map((k, i) => \`\${k} = $\${i + 1}\`).join(", ");
    const query = \`UPDATE ${plural} SET \${setClause} WHERE id = $\${keys.length + 1} RETURNING *\`;
    const res = await pool.query(query, [...values, id]);
    return res.rows.length ? this.mapRowToEntity(res.rows[0]) : null;
  }
}
`;

  return [
    {
      path: `repositories/${entity}.repository.ts`,
      content,
    },
  ];
}
