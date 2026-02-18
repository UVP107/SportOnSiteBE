import mongoose, { Schema, Document } from "mongoose";

export interface IBank extends Document {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

const bankSchema = new Schema({
  bankName: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
});

export const Bank = mongoose.model<IBank>("Bank", bankSchema);