const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://ismoil:ismoil@myfirstcluster.11mqx2p.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const Client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


module.exports.Client = Client;