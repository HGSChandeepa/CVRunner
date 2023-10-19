import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";

dotenv.config();
//router
const router = express.Router();

// register new user
router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.json({ message: "Password does not match" });
  }

  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new UserModel({
    username: username,
    email: email,
    password: hashedPassword,
  });

  await newUser.save();
  return res.json({ message: "User registered successfully" });
});

// login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });
  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  return res.json({
    token,
    userId: user._id,
    message: "User logged in successfully",
  });
});

export { router as UserRouter };
