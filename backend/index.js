import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { User } from "./model.js";
import bcrypt from "bcrypt";
// import {cors} from 'cors'
import cors from "cors";
configDotenv();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello maaasdfa");
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "error while registration" });
  }
  // res.send(`received ${name + email +password}`)
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.find({ email });
    if (!existUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const hashedPassword = existUser.password; 
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) return res.status(400).json({ message: "invalid password" });
    console.log(existUser)
    res.status(200).json({ message: "login successful", data: existUser });
    
  } catch (error) {
    res.status(400).json({ message: "error while logging" });
  }
});
 mongoose.connect(process.env.mongo_db);
app.listen(process.env.PORT, () => {
  console.log("logged");
});
