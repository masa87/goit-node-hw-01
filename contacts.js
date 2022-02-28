const fs = require("fs");
const path = require("path");
const rl = require("readline");
require("colors");

const contactsPath = path.basename("./contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

function getContactById(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  const newContacts = contacts.filter(({ id }) => id === String(contactId));
  console.log(newContacts);
}

function removeContact(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  if (contacts.find(({ id }) => id === contactId) !== undefined) {
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8", (err) => {
      if (err) throw err;
      console.log("Kontakt usunięty");
    });
  } else {
    console.log("Brak takiego kontaktu");
  }
}

function addContact(name, email, phone) {
  // ...twój kod
}

module.exports = { listContacts, getContactById, removeContact };
