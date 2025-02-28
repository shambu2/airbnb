import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { User } from "./model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";

configDotenv();
// const bcryptSalt = bcrypt.genSaltSync(10)
const secret_key = "adf;;lsdkfjadskjf";
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

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
    const existUser = await User.findOne({ email });

    if (existUser) {
      const isValid = bcrypt.compareSync(password, existUser.password);
      if (isValid) {
        // res.json('pass ok')
        jwt.sign(
          { email: existUser.email, id: existUser._id },
          secret_key,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(existUser);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.json("not found");
    }
  } catch (error) {
    res.status(400).json({ message: "error while logging" });
  }
});
app.get("/profile", async(req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret_key, {}, async(err, userInfo) => {
      if (err) throw err;
      const userDoc = await User.findById(userInfo.id)
      res.json(userDoc);
    });
  } else {
    res.json(null);
  }
});
mongoose.connect(process.env.mongo_db);
app.listen(process.env.PORT, () => {
  console.log("logged");
});
