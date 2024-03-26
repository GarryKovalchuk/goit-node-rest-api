import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const [selectContacts] = contacts.filter(
    (contact) => contactId === contact.id
  );
  return selectContacts || null;
}

async function removeContact(contactId) {
  let existContacts = await listContacts();
  const removeContactIndex = existContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (removeContactIndex === -1) {
    return null;
  }
  const [removedContact] = existContacts.splice(
    removeContactIndex,
    1
  );
  await fs.writeFile(
    contactsPath,
    JSON.stringify(existContacts, null, 2)
  );
  return removedContact;
}

async function addContact(data) {
  const existContacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  existContacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(existContacts, null, 2)
  );
  return newContact;
}

async function updateCont(id, data) {
  let existContacts = await listContacts();
  const updateContactIndex = existContacts.findIndex(
    (contact) => contact.id === id
  );
  if (updateContactIndex === -1) {
    return null;
  }
  existContacts[updateContactIndex] = {
    ...existContacts[updateContactIndex],
    ...data,
  };
  await fs.writeFile(
    contactsPath,
    JSON.stringify(existContacts, null, 2)
  );
  return existContacts[updateContactIndex];
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateCont,
};
