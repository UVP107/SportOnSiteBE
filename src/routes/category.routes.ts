import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryByID,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { upload } from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/", authenticate, upload.single("image"), createCategory);
router.get("/", authenticate, getCategories);
router.get("/:id", authenticate, getCategoryByID);
router.put("/:id", authenticate, upload.single("image"), updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
