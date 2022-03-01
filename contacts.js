const fs = require("fs");
const path = require("path");
require("colors");

const contactsPath = path.basename("./contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    console.table(data);
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
    fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, "\t"),
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("Kontakt usunięty".green);
      }
    );
  } else {
    console.log("Brak takiego kontaktu");
  }
}

function addContact(name, email, phone) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  const maxId = Math.max(...contacts.map(({ id }) => id), 0);
  const newContact = {
    id: String(maxId + 1),
    name: name,
    email: email,
    phone: phone,
  };
  const newContacts = [...contacts, newContact];
  fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, "\t"),
    "utf8",
    (err) => {
      if (err) throw err;
      console.log(`Nowy kontakt dodany`);
    }
  );
}

module.exports = { listContacts, getContactById, removeContact, addContact };
