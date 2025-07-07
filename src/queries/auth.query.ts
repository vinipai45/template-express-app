export const AUTH_QUERY = {
  LOGIN: `SELECT * FROM staffs WHERE username = $1 AND password = $2 AND is_deleted = false;`,
};
