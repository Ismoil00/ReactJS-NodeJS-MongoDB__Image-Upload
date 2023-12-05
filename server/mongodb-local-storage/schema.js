const mongodb = require("mongoose");

// Image Schema:
const schema = new mongodb.Schema({
  image: String,
});

// Image Model:
const ImageModel = mongodb.model("Image", schema);

module.exports.ImageModel = ImageModel;
