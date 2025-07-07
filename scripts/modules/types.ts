export interface FieldDefinition {
  type: string;
  values?: string[]; // for enums
}
export interface EntityConfig {
  entity: string;
  fields: Record<string, FieldDefinition>;
}
