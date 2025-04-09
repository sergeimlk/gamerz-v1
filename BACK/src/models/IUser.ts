import mongoose, { Schema, Document } from "mongoose";
import { IRole } from "./IRole"

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  password: string;
  role: mongoose.Types.ObjectId | IRole
}

const UserSchema: Schema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pseudo: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Types.ObjectId, required: true, ref: "Role" }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);