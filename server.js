require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { initDb } = require("./src/db/connect");
const contactsRoutes = require("./src/routes/contacts");

const app = express();

app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home test route
app.get("/", (req, res) => {
  res.send("Contacts API running");
});

// Contacts routes
app.use("/contacts", contactsRoutes);

const PORT = process.env.PORT || 8080;

async function start() {
  try {
    await initDb(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
