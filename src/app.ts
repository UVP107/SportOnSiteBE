import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middlewares/auth.middlewares";
import path from "node:path";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("backend is running!");
});

app.get("/test-middleware", authenticate, (req, res) => {
  res.send("hore, kamu bisa mengaksesnya karena kamu memakai token");
});

export default app;
