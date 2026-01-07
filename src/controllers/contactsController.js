const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

async function getAllContacts(req, res) {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts", error: err.message });
  }
}

async function getContactById(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact id format" });
    }

    const db = getDb();
    const contact = await db.collection("contacts").findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact", error: err.message });
  }
}

module.exports = { getAllContacts, getContactById };
