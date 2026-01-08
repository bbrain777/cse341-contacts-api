const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("contacts").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const db = getDb();
    const result = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(contactId) });

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllContacts, getSingleContact };
