const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { Client } = require("./confix");

let db;
const PORT = process.env.PORT || 8080; // server port
const app = express();

app.use(cors()); // frontend connection;
app.use(express.json({ limit: "10mb" })); // ??????????;

// Image Upload API:
app.post("/upload", async (req, res) => {
  try {
    const imageCollection = db.collection("images");
    const result = await imageCollection.insertOne({
      image: req.body.img,
    });

    if (result.acknowledged) {
      res.json({ message: "Image uploaded successfully!", status_code: 200 });
    } else throw new Error("Something went wrong saving image");
  } catch (error) {
    console.error("Error uploading image:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", status_code: 500 });
  }
});

// Image Return API:
app.get("/get-image", async (req, res) => {
  try {
    const imageCollection = db.collection("images");
    const data = await imageCollection.find({}).toArray();

    if (data.length > 0) {
      res.json({ data, status_code: 200 });
    } else throw new Error("Something went wrong saving image");
  } catch (error) {
    console.error("Error retrieving images:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", status_code: 500 });
  }
});

// Connect to MongoDB Atlas Cloud Service
Client.connect()
  .then(() => {
    console.log("Connected to MongoDB Atlas Cloud Service");
    db = Client.db("nodejs-image-upload-test");

    // Start the server after connecting to the database
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  })
  .catch((err) => console.log("ERROR", err));
