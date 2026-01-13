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

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Basic required fields check
    if (!contact.firstName || !contact.lastName || !contact.email) {
      return res.status(400).json({
        message: "firstName, lastName, and email are required"
      });
    }

    const db = getDb();
    const response = await db.collection("contacts").insertOne(contact);

    if (response.acknowledged) {
      return res.status(201).json({ id: response.insertedId });
    }

    return res.status(500).json({ message: "Failed to create contact" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = getDb();
    const response = await db
      .collection("contacts")
      .updateOne({ _id: new ObjectId(contactId) }, { $set: contact });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: "Invalid contact id" });
    }

    const db = getDb();
    const response = await db
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(contactId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};

