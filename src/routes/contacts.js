const router = require("express").Router();
const contactsController = require("../controllers/contactsController");

// #swagger.tags = ['Contacts']
// #swagger.description = 'Get all contacts'
router.get("/", contactsController.getAllContacts);

// #swagger.tags = ['Contacts']
// #swagger.description = 'Get a single contact by id'
router.get("/:id", contactsController.getSingleContact);

/* #swagger.tags = ['Contacts']
   #swagger.description = 'Create a new contact'
   #swagger.parameters['body'] = {
     in: 'body',
     required: true,
     schema: { $ref: '#/definitions/Contact' }
   }
*/
router.post("/", contactsController.createContact);

/* #swagger.tags = ['Contacts']
   #swagger.description = 'Update a contact by id'
   #swagger.parameters['body'] = {
     in: 'body',
     required: true,
     schema: { $ref: '#/definitions/Contact' }
   }
*/
router.put("/:id", contactsController.updateContact);

// #swagger.tags = ['Contacts']
// #swagger.description = 'Delete a contact by id'
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
