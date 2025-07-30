import { EntityConfig } from "./types";

export function generateSwagger(entity: string, config: EntityConfig) {
  const pascal = entity.charAt(0).toUpperCase() + entity.slice(1);
  const defaultKeys = ["id", "created_at", "updated_at", "is_deleted"];

  const formatFields = (entries: [string, any][]) =>
    entries
      .map(([key, field]) => {
        if (field.type === "enum" && Array.isArray(field.values)) {
          return `            "${key}": { "type": "string", "enum": [${field.values.map((v: string) => `"${v}"`).join(", ")}] }`;
        }

        const type =
          field.type === "number" ? "integer" : field.type === "boolean" ? "boolean" : "string";
        const format = field.type === "timestamp" ? `, "format": "date-time"` : "";
        return `            "${key}": { "type": "${type}"${format} }`;
      })
      .join(",\n");

  const allFields = formatFields(Object.entries(config.fields));

  const createFields = formatFields(
    Object.entries(config.fields).filter(([key]) => !defaultKeys.includes(key))
  );

  const updateFields = formatFields(
    Object.entries(config.fields).filter(([key]) => !defaultKeys.includes(key))
  );

  const content = `{
  "openapi": "3.0.0",
  "info": {
    "title": "${pascal} API",
    "version": "1.0.0"
  },
  "paths": {
    "/api/${entity}/list": {
      "get": {
        "summary": "Get all ${entity}s",
        "tags": ["${pascal}"],
        "responses": {
          "200": { "description": "A list of ${entity}s" }
        }
      }
    },
    "/api/${entity}/get-by-id/{id}": {
      "get": {
        "summary": "Get a ${entity} by ID",
        "tags": ["${pascal}"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": { "description": "${pascal} details" },
          "404": { "description": "Not found" }
        }
      }
    },
    "/api/${entity}/create": {
      "post": {
        "summary": "Create a new ${entity}",
        "tags": ["${pascal}"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/${pascal}Create" }
            }
          }
        },
        "responses": {
          "200": { "description": "${pascal} created" }
        }
      }
    },
    "/api/${entity}/update/{id}": {
      "put": {
        "summary": "Update a ${entity}",
        "tags": ["${pascal}"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/${pascal}Update" }
            }
          }
        },
        "responses": {
          "200": { "description": "${pascal} updated" }
        }
      }
    },
    "/api/${entity}/delete/{id}": {
      "delete": {
        "summary": "Delete a ${entity}",
        "tags": ["${pascal}"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "204": { "description": "${pascal} deleted" }
        }
      }
    },
    "/api/${entity}/enable/{id}": {
      "patch": {
        "summary": "Enable a deleted ${entity}",
        "tags": ["${pascal}"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "204": { "description": "${pascal} enabled" }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "${pascal}": {
        "type": "object",
        "properties": {
${allFields}
        }
      },
      "${pascal}Create": {
        "type": "object",
        "properties": {
${createFields}
        }
      },
      "${pascal}Update": {
        "type": "object",
        "properties": {
${updateFields}
        }
      }
    }
  }
}
`;

  return [
    {
      path: `docs/${entity}.swagger.json`,
      content,
    },
  ];
}
