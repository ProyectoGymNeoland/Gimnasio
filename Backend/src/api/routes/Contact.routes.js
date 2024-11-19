const express = require("express");
const { createContact, deleteContact, getContactsAll } = require("../controllers/Contact.controllers");
const { isAuthSuper } = require("../../middleware/auth.middleware");

const ContactRoutes = express.Router();

ContactRoutes.post("/createContact",createContact);
ContactRoutes.delete("/delete/:id",[isAuthSuper], deleteContact);
ContactRoutes.get("/getContacts",[isAuthSuper],  getContactsAll);
module.exports = ContactRoutes;


