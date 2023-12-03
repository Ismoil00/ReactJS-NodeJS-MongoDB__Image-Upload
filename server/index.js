const express = require("express");
const mongodb = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 8080; // server port

const app = express();

app.use(cors()); // frontend connection;

// API endpoint:
app.get("/upload", (req, res) => {
  //   res.json({ message: "Server is running" });
  console.log(req.body);
});

// Image Schema:
const schema = new mongodb.Schema({
  image: String,
});

// Image Model:
const ImageModel = mongodb.model("Image", schema);

// mongodb database connection;
// First we connect to mongodb then run the server:
mongodb
  .connect("mongodb://127.0.0.1:27017/employees_registration_images")
  .then(() => {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    console.log("Connected MongoDB");
  })
  .catch((err) => console.log("ERROR", err));
