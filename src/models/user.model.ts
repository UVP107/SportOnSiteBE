import mongoose, { Schema, Document } from "mongoose";
import { truncate } from "node:fs/promises";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: { type: String, required: truncate },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {timestamps: true});

export default mongoose.model<IUser>("User", userSchema);