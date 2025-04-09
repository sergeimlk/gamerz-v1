import { Model, Document } from "mongoose";
import ICrudDao from "./ICrudDao";

export abstract class AbstractCrudRepository<T extends Document> implements ICrudDao<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(): Promise<Array<T>> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new Error(`[DB][Error] Failed to retrieve all documents: ${error}`);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw new Error(`[DB][Error] Failed to find document by ID: ${error}`);
    }
  }

  async update(id: string, updateData: Partial<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
    } catch (error) {
      throw new Error(`[DB][Error] Failed to update document: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`[DB][Error] Failed to delete document: ${error}`);
    }
  }
}
