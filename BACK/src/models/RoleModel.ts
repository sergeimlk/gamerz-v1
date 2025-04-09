import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  role: string;
}

const RoleSchema: Schema = new Schema({
  role: { type: String, required: true },
});

export default mongoose.model<IRole>("Role", RoleSchema);
