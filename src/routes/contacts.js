const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contactsController");

// #swagger.tags = ['Contacts']
// #swagger.description = 'Get all contacts'
router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);
router.post("/", contactsController.createContact);
router.put("/:id", contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
