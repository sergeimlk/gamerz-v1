import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./UserModel";

export interface IMessage extends Document {
  message: string;
  user_id: mongoose.Types.ObjectId | IUser;
}

const MessageSchema: Schema = new Schema(
  {
    message: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
