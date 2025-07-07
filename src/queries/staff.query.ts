export const STAFF_QUERY = {
  FIND_ALL: "SELECT * FROM staffs",
  FIND_BY_ID: "SELECT * FROM staffs WHERE id = $1",
  CREATE: "INSERT INTO staffs (id, name, username, password, branch_id, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
  UPDATE: "UPDATE staffs SET name = $1, username = $2, password = $3, branch_id = $4, role = $5 WHERE id = $6 RETURNING *",
  DELETE: "UPDATE staffs SET is_deleted = TRUE WHERE id = $1",
  ENABLE: "UPDATE staffs SET is_deleted = FALSE WHERE id = $1",
};
