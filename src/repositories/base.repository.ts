import { pool } from "../config/db";
import { ICRUD } from "../interfaces/ICRUD.interface";
import { BASE_QUERY } from "../queries/base.query";

export abstract class BaseRepository<T> implements ICRUD<T> {
  protected abstract tableName: string;

  abstract mapRowToEntity(row: any): T;

  async findAll(): Promise<T[]> {
    const query = BASE_QUERY.findAll(this.tableName);
    const result = await pool.query(query);
    return result.rows.map(this.mapRowToEntity);
  }

  async findById(id: string): Promise<T | null> {
    const query = BASE_QUERY.findById(this.tableName);
    const result = await pool.query(query, [id]);
    return result.rows.length ? this.mapRowToEntity(result.rows[0]) : null;
  }

  abstract create(data: Omit<T, "id">): Promise<T>;
  abstract update(id: string, data: Omit<T, "id">): Promise<T | null>;

  async delete(id: string): Promise<boolean> {
    const query = BASE_QUERY.deleteById(this.tableName);
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async enable(id: string): Promise<T | null> {
    const query = BASE_QUERY.enableById(this.tableName);
    const result = await pool.query(query, [id]);
    return result.rows.length ? this.mapRowToEntity(result.rows[0]) : null;
  }
}
