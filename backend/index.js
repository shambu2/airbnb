import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import { image } from "image-downloader"
import { fileURLToPath } from 'url';
import path from 'path';
import multer from "multer";
import fs from "fs"
import { placeModel } from "./models/places.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv();

const secret_key = "adf;;lsdkfjadskjf";
const app = express();
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use(cors({
  origin: "http://localhost:5173",
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
app.post("/logout", async (req, res) => {
  res.cookie('token', '').json(true);
})
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret_key, {}, async (err, userInfo) => {
      if (err) throw err;
      const userDoc = await User.findById(userInfo.id)
      res.json(userDoc);
    });
  } else {
    res.json(null);
  }
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  const options = {
    url: link,
    dest: __dirname + '/uploads/' + newName, // will be saved to /path/to/dest/image.jpg
  };
  try {
    await image(options);
    res.json(newName)
  } catch (error) {
    res.json(error)
  }
  

})
const photosMiddleware = multer({dest:'uploads'});
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path,newPath)
    uploadFiles.push(newPath.replace("uploads\\",""))
  }
  res.json(uploadFiles);
})

app.post('/places',(req,res)=>{
  try {
    const {token} = req.cookies;
    const {title,address,addedPhotos,
    description,perks,extraInfo,
    checkIn,
    checkOut,
    maxGuests} = req.body;
  jwt.verify(token,secret_key,{},async(err,userInfo)=>{
    if (err) throw err;
    const placeDoc = await placeModel.create({
      owner:userInfo.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests
    });
    res.json(placeDoc)
  })
  } catch (error) {
    res.status(500).json({error:'Failed to save to DB'})
  }
  
})
app.get('/places',(req,res)=>{
  // const {token} = req.cookies;
  // const token = req.headers.authorization?.split('')[1];
  const {token} = req.cookies;
  if(!token){
    return res.status(401).json('token not provided')
  }
  jwt.verify(token,secret_key,{},async(err,userInfo)=>{
    // if (err) throw err;
    const {id} = userInfo;
    res.json(await placeModel.find({owner:id}));
  })
})

app.get('/places/:id',async(req,res)=>{
  const {id} = req.params;
  const placeData = await placeModel.findById(id)
  res.json(placeData)
})


app.put('/places',async (req,res) => {
  const {token} = req.cookies;
  const {
    id,title,address,addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests
  } = req.body;

  jwt.verify(token,secret_key,{},async (err,userData) => {
    const placeDoc = await placeModel.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,
      });
      await placeDoc.save();
      res.json('ok')
    }
  })


})


 

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.mongo_db);
  console.log('backend started ')
});
