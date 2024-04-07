import Contact from "../models/Contacts.js";

export const listContacts = () => Contact.find();
export const addContact = (data) => Contact.create(data);
export const getContactById = async (contactId) =>
  Contact.findById(contactId);
export const removeContact = async (contactId) =>
  Contact.findByIdAndDelete(contactId);
export const updateCont = async (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data, { new: true });
