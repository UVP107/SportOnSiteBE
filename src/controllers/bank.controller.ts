import { Request, Response } from "express";
import { Bank } from "../models/bank.model";

export const createBank = async (req: Request, res: Response) => {
  const bank = new Bank({
    bankName: req.body.bankName,
    accountName: req.body.accountName,
    accountNumber: req.body.accountNumber,
  });

  try {
    await bank.save();
    res.status(201).json(bank);
  } catch (error) {
    res.status(500).json({ message: "Error creating bank" });
  }
};

export const getBank = async (req: Request, res: Response) => {
  try {
    const bank = await Bank.findOne({ bankName: req.params.bankName });
    if (bank) {
      res.status(200).json(bank);
    } else {
      res.status(404).json({ message: "Bank not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting bank" });
  }
};

export const updateBank = async (req: Request, res: Response) => {
  try {
    const bank = await Bank.findOneAndUpdate(
      { bankName: req.params.bankName },
      {
        $set: {
          accountName: req.body.accountName,
          accountNumber: req.body.accountNumber,
        },
      },
      { new: true },
    );
    if (bank) {
      res.status(200).json(bank);
    } else {
      res.status(404).json({ message: "Bank not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating bank" });
  }
};

export const deleteBank = async (req: Request, res: Response) => {
  try {
    await Bank.findOneAndDelete({ bankName: req.params.bankName });
    res.status(200).json({ message: "Bank deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bank" });
  }
};
