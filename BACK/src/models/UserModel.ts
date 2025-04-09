import mongoose, { Schema, Document } from "mongoose";
import { IRole } from "./RoleModel";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  password: string;
  motivation: string;
  avatar: string;
  role_id: mongoose.Types.ObjectId | IRole;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pseudo: { type: String, required: true },
    password: { type: String, required: true },
    motivation: { type: String, required: true },
    avatar: { type: String },
    role_id: { type: mongoose.Types.ObjectId, required: true, ref: "Role" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
