import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middlewares/auth.middlewares";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("backend is running!");
});

app.get("/test-middleware", authenticate, (req, res) => {
  res.send("endpoint bisa diakses public!");
});

export default app;
