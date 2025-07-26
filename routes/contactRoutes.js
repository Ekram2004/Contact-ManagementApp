const express = require('express');
const router = express.Router();
const { addContact, getAllContacts, getContact, updateContact, deleteContact } = require('../controllers/contactControllers');
const verify = require('../middleware/authMiddleware')
router.post("/contacts",verify, addContact);
router.get("/contacts", verify, getAllContacts);
router.get("/contacts/:id", verify, getContact);
router.put("/contacts/:id", verify, updateContact);
router.delete("/contacts/:id",verify,  deleteContact);

module.exports = router;