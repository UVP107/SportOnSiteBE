import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  imageUrl: string;
}

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);
