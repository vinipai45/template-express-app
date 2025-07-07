export const BASE_QUERY = {
  findAll: (table: string) => `SELECT * FROM ${table}`,
  findById: (table: string) => `SELECT * FROM ${table} WHERE id = $1`,
  deleteById: (table: string) => `UPDATE ${table} SET is_deleted = true WHERE id = $1`,
  enableById: (table: string) => `UPDATE ${table} SET is_deleted = FALSE WHERE id = $1 RETURNING *`,
};
