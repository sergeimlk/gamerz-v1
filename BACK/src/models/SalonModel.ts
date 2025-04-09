import mongoose, { Schema, Document } from "mongoose";

export interface ISalon extends Document {
  name: string;
  img: string;
}

const SalonSchema: Schema = new Schema({
  name: { type: String, required: true },
  img: { type: String },
});

export default mongoose.model<ISalon>("Salon", SalonSchema);
