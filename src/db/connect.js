const { MongoClient } = require("mongodb");

let client;
let db;

async function initDb(uri, dbName) {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);

  console.log("✅ Connected to MongoDB");
  return db;
}

function getDb() {
  if (!db) throw new Error("DB not initialized. Call initDb first.");
  return db;
}

module.exports = { initDb, getDb };
