const express = require("express");
const mongodb = require("mongoose");
const cors = require("cors");
const { ImageModel } = require("./schema");

const PORT = process.env.PORT || 8080; // server port

const app = express();

app.use(cors()); // frontend connection;
app.use(express.json({ limit: "10mb" })); // ??????????;

// Image Upload API:
app.post("/upload", async (req, res) => {
  const image = new ImageModel({
    image: req.body.img,
  });
  await image.save();
  res.json({ message: "Image uploaded successfully!", status_code: 200 });
});

// Image Return API:
app.get("/get-image", async (req, res) => {
  const data = (await ImageModel.find({})).reverse();
  res.json({ data, status_code: 200 });
});

// mongodb database connection;
// First we connect to mongodb then run the server:
mongodb
  .connect("mongodb://127.0.0.1:27017/image-upload-test")
  .then(() => {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    console.log("Connected MongoDB");
  })
  .catch((err) => console.log("ERROR", err));
