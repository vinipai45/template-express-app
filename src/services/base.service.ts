import { ICRUD } from "../interfaces/ICRUD.interface";
import { HttpError } from "../utils/http.error";

export abstract class BaseService<T, R extends ICRUD<T> = ICRUD<T>> {
  constructor(protected repository: R) {}

  private handleError(err: unknown, message: string, notFound = false): never {
    if (err instanceof HttpError) throw err;
    throw new HttpError(message, notFound ? 404 : 500);
  }

  async findAll() {
    try {
      return await this.repository.findAll();
    } catch (err) {
      this.handleError(err, "Failed to fetch all records");
    }
  }

  async findById(id: string) {
    try {
      const item = await this.repository.findById(id);
      if (!item) throw new HttpError("Record not found", 404);
      return item;
    } catch (err) {
      this.handleError(err, "Failed to fetch record");
    }
  }

  async create(data: Omit<T, "id">) {
    try {
      return await this.repository.create(data);
    } catch (err) {
      this.handleError(err, "Failed to create record");
    }
  }

  async update(id: string, data: Omit<T, "id">) {
    try {
      const updated = await this.repository.update(id, data);
      if (!updated) throw new HttpError("Record not found", 404);
      return updated;
    } catch (err) {
      this.handleError(err, "Failed to update record");
    }
  }

  async delete(id: string) {
    try {
      const deleted = await this.repository.delete(id);
      if (!deleted) throw new HttpError("Record not found", 404);
      return true;
    } catch (err) {
      this.handleError(err, "Failed to delete record");
    }
  }

  async enable(id: string) {
    try {
      const enabled = await this.repository.enable(id);
      if (!enabled) throw new HttpError("Record not found", 404);
      return enabled;
    } catch (err) {
      this.handleError(err, "Failed to enable record");
    }
  }
}
