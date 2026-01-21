const mongoose = require("mongoose");

const initDb = async (mongoUri) => {
  if (!mongoUri) throw new Error("MONGODB_URI is missing in .env");

  // prevents reconnecting if already connected
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(mongoUri);
  console.log("✅ MongoDB connected via Mongoose");
};

module.exports = { initDb };
