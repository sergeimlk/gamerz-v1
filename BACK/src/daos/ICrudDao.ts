import { Model, Document } from "mongoose";

export default interface ICrudDao<T extends Document> {
  model: Model<T>;

  findAll(): Promise<Array<T>>;
  findById(id: string): Promise<T | null>;
  update(id: string, dataUpdated: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}