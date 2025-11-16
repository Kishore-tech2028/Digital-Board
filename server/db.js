// backend/db.js

const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

let db;

async function connectToDb() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to MongoDB!");

    // Get the database name from the URI.
    // e.g., "mongodb://localhost:27017/webprodb" -> "webprodb"
    // We'll use a simple split instead of the URL parser
    const dbName = mongoUri.split('/').pop().split('?')[0];

    if (!dbName) {
      throw new Error("No database name specified in MONGO_URI");
    }

    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process with failure
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDb first.");
  }
  return db;
}

module.exports = { connectToDb, getDb };