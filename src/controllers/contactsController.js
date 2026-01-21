const mongoose = require("mongoose");
const Contact = require("../models/contact");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid contact id" });

    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const created = await Contact.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    // Mongoose validation errors land here
    res.status(400).json({ message: "Validation failed", error: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid contact id" });

    const updated = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid contact id" });

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
