import { EntityConfig } from "./types";

export function generateQuery(config: EntityConfig, entity: string) {
  const plural = `${entity}s`;
  const ENTITY_QUERY = `${entity.toUpperCase()}_QUERY`;

  const keys = Object.keys(config.fields);
  const defaultKeys = ["id", "created_at", "updated_at", "is_deleted"];
  const defaultKeysWithoutId = ["created_at", "updated_at", "is_deleted"];

  // INSERT: everything except created/updated/is_deleted
  const insertKeys = keys.filter(k => !defaultKeysWithoutId.includes(k));
  const insertValues = insertKeys.map((_, i) => `$${i + 1}`).join(", ");

  // UPDATE: everything except id/created/updated/is_deleted
  const updateKeys = keys.filter(k => !defaultKeys.includes(k));
  const updateSet = updateKeys.map((k, i) => `${k} = $${i + 1}`).join(", ");

  const updateIdParamIndex = updateKeys.length + 1;

  const content = `export const ${ENTITY_QUERY} = {
  FIND_ALL: "SELECT * FROM ${plural}",
  FIND_BY_ID: "SELECT * FROM ${plural} WHERE id = $1",
  CREATE: "INSERT INTO ${plural} (${insertKeys.join(", ")}) VALUES (${insertValues}) RETURNING *",
  UPDATE: "UPDATE ${plural} SET ${updateSet} WHERE id = $${updateIdParamIndex} RETURNING *",
  DELETE: "UPDATE ${plural} SET is_deleted = TRUE WHERE id = $1",
  ENABLE: "UPDATE ${plural} SET is_deleted = FALSE WHERE id = $1",
};
`;

  return [
    {
      path: `queries/${entity}.query.ts`,
      content,
    },
  ];
}
