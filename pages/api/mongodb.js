import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
//const uri = "mongodb+srv://ajith1:VJn9jP24g9FsAJu@cluster0.qhwsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
