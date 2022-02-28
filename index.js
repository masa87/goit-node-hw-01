// const fs = require("fs");
// const path = require("path");
const argv = require("yargs").argv;
// const readline = require("readline");
const { listContact, getContactById, removeContact } = require("./contacts");
require("colors");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContact();
      // ...
      break;

    case "get":
      // ... id
      break;

    case "add":
      // ... name email phone
      break;

    case "remove":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
