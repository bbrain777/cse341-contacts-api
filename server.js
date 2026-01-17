require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const express = require("express");
const { initDb } = require("./src/db/connect");

const contactsRoutes = require("./src/routes/contacts");

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
  res.send("Contacts API running");
});

app.use("/contacts", contactsRoutes);

const PORT = process.env.PORT || 8080;

async function start() {
  try {
    await initDb(process.env.MONGODB_URI, process.env.DB_NAME || "cse341");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
