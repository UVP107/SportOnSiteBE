import { Request, Response } from "express";
import { Transaction } from "../models/transaction.model";
import Product from "../models/product.model";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transactionData = req.body;
    if (req.file) {
      transactionData.paymentProof = req.file.path;
    } else {
      res.status(400).json({ message: "Payment proof is required" });
      return;
    }

    if (typeof transactionData.purchasedItems === "string") {
      try {
        transactionData.purchasedItems = JSON.parse(
          transactionData.purchasedItems,
        );
      } catch (error) {
        res.status(400).json({ message: "Invalid format for purchased items" });
        return;
      }
    }

    transactionData.status = "pending";

    const transaction = new Transaction(transactionData);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

export const getTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const transaction = await Transaction.find()
      .sort({ createdAt: -1 })
      .populate("purchasedItems.productID");
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error getting transaction", error });
  }
};

export const getTransactionById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate(
      "purchasedItems.productID",
    );
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting transaction", error });
  }
};

export const updateTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { status } = req.body;

    const existingTransaction = await Transaction.findById(req.params.id);
    if (!existingTransaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    const currentStatus = (existingTransaction as any).status;

    if (status === "paid" && currentStatus !== "paid") {
      for (const purchasedItem of (existingTransaction as any).purchasedItems) {
        await Product.findByIdAndUpdate(purchasedItem.productID, {
          $inc: { stock: -purchasedItem.qty },
        });
      }
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true },
    );
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating transaction status", error });
  }
};
