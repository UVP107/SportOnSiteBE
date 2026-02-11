import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { upload } from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/", authenticate, upload.single("image"), createProduct);
router.get("/", authenticate, getProducts);
router.get("/:id", authenticate, getProductByID);
router.put("/:id", authenticate, upload.single("image"), updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
