import mongoose, { Schema, Document } from "mongoose";

export interface IPurchasedItem extends Document {
  transactionDate: Date;
  transactionType: string;
  amount: number;
  description: string;
  bankName: string;
}

const PurchasedItemSchema = new Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const transactionSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "paid", "rejected"],
      default: "pending",
      required: true,
    },
    paymentProof: { type: String, required: true },
    purchasedItems: { type: [PurchasedItemSchema], required: true },
    totalPayment: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerContact: { type: String, required: true },
    customerAddress: { type: String, required: true },
  },
  { timestamps: true },
);

export const Transaction = mongoose.model<IPurchasedItem>(
  "Transaction",
  transactionSchema,
);
