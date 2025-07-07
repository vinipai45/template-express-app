export interface ICRUD<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string, data: Omit<T, "id">): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  enable(id: string): Promise<T | null>;
}
