import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "SportOn123";
const JWT_EXPIRES_IN = "1d";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "email not found" });
      return;
    }
    // validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "password not match" });
      return;
    }
    // create token
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({ id: user._id, email: user.email, JWT_SECRET });
    res.json({
      token,
      user: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const initiateAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const count = await User.countDocuments({});
    if (count > 0) {
      res
        .status(400)
        .json({ message: "admin already exists, delete and create again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
