import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/upload.middleware";
import {
  createTransaction,
  getTransaction,
  getTransactionById,
  updateTransaction,
} from "../controllers/transaction.controller";

const router = Router();

router.post("/checkout", upload.single("paymentProof"), createTransaction);
router.get("/", authenticate, getTransaction);
router.get("/:id", authenticate, getTransactionById);
router.put("/:id", authenticate, updateTransaction);

export default router;
