import { pool } from "../config/db";
import { BaseRepository } from "./base.repository";
import { Staff } from "../models/staff.model";
import { STAFF_QUERY } from "../queries/staff.query";
import { v4 as uuidv4 } from "uuid";

export class StaffRepository extends BaseRepository<Staff> {
  protected tableName = "staffs";

  mapRowToEntity(row: any): Staff {
    return {
      id: row.id,
      name: row.name,
      username: row.username,
      password: row.password,
      branch_id: row.branch_id,
      role: row.role,
      is_deleted: row.is_deleted,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async create(data: Staff): Promise<Staff> {
    const id = uuidv4();
    data.id = id;
    const res = await pool.query(STAFF_QUERY.CREATE, [
      data.id,
      data.name,
      data.username,
      data.password,
      data.branch_id,
      data.role
    ]);
    return this.mapRowToEntity(res.rows[0]);
  }

  async update(id: string, data: Partial<Staff>): Promise<Staff | null> {
    const forbidden = ["id", "created_at", "updated_at", "is_deleted"];
    const keys = Object.keys(data).filter(k => !forbidden.includes(k));
    if (keys.length === 0) return null;

    const values = keys.map(k => (data as any)[k]);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
    const query = `UPDATE staffs SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
    const res = await pool.query(query, [...values, id]);
    return res.rows.length ? this.mapRowToEntity(res.rows[0]) : null;
  }
}
