import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import request from "request";
import fetch from "node-fetch";
import sharp from "sharp";
dotenv.config();

const PORT = process.env.PORT || 80;
const app = express();

const corsOptions = {
  origin: process.env.TARGET_URL,
};

app.use(cors(corsOptions));
app.use(express.json({ extended: true }));

app.get("/soccerProxy", async function (req, res) {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(404).send("Missing image URL");
  }
  //
  try{
    const response = await fetch(imageUrl);
    if(!response.ok) throw new Error("Failed to fetch image");

    const buffer = await response.buffer();
    const webpImage = await sharp(buffer)
      .webp({quality: 60})
      .toBuffer();


    res.setHeader("Content-Type", "image/webp");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.send(webpImage);
  } catch(error) {
    console.log(error);
    res.status(500).send("Error fetching or processing image");
  }
});

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
