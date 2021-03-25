import fs from "fs";
import path from "path";

import createDirname from "./lib/dirname.js";

const {__dirname} = createDirname(import.meta.url);
const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, contacts) => {
    if (err) {
      throw err;
    }

    console.table(JSON.parse(contacts));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, contacts) => {
    if (err) {
      throw err;
    }

    const listContacts = JSON.parse(contacts.toString());
    console.table(listContacts.find((contact) => contact.id === contactId));
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, contacts) => {
    if (err) {
      throw err;
    }

    const listContacts = JSON.parse(contacts.toString());
    const newContactsList = listContacts.filter(
      (contact) => contact.id !== contactId
    );

    fs.writeFile(contactsPath, JSON.stringify(newContactsList), (err) => {
      if (err) {
        throw err;
      }

      console.log(`Контакт ${contactId} успешно удалён`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, contacts) => {
    if (err) {
      throw err;
    }

    const listContacts = JSON.parse(contacts.toString());
    const newContactsList = [
      ...listContacts,
      {id: listContacts.length + 1, name, email, phone},
    ];

    fs.writeFile(contactsPath, JSON.stringify(newContactsList), (err) => {
      if (err) {
        throw err;
      }

      console.log(`Контакт ${name} успешно добавлен`);
    });
  });
}

export {listContacts, getContactById, removeContact, addContact};
