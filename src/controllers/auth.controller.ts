import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "SportOn123";
const JWT_EXPIRES_IN = "1d";

export const signin = async (req: Request, res: Response): Promise<void> => {
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
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
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
  console.log("DEBUG: Incoming Body ->", req.body); // Check if keys are missing

  try {
    const { email, password, name } = req.body;
    const count = await User.countDocuments({});

    if (count > 0) {
      console.log("DEBUG: Blocked because count is", count);
      res.status(400).json({
        message: "admin already exists",
        currentCount: count,
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, name });

    await newUser.save();
    res.status(200).json({ message: "admin created successfully" });
  } catch (error: any) {
    // This is the "Blind 400" spot!
    console.error("DEBUG: Mongoose Save Error ->", error);
    res.status(400).json({
      message: "Validation or Database Error",
      details: error.message, // This will tell you if 'name' is missing
      stack: error.name,
    });
  }
};
