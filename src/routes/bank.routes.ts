import { Router } from "express";
import {
  createBank,
  getBank,
  updateBank,
  deleteBank,
} from "../controllers/bank.controller";

const router = Router();

router.post("/", createBank);
router.get("/", getBank);
router.put("/:id", updateBank);
router.delete("/:id", deleteBank);

export default router;
