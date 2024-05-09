import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import request from "request";
dotenv.config();

const PORT = process.env.PORT || 80;
const app = express();

const corsOptions = {
  origin: process.env.TARGET_URL,
};

app.use(cors(corsOptions));
app.use(express.json({ extended: true }));

app.get("/soccerProxy", function (req, res) {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(404).send("Missing image URL");
  }
  // https로 수정된 URL로 요청
  request.get(imageUrl).pipe(res);
});

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
