const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
require("colors");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;
    case "get":
      rl.question("Podaj id kontaktu do wyświetlenia: ".yellow, (value) => {
        getContactById(value);
        rl.close();
      });
      break;
    case "add":
      rl.question("Podaj imię: ".yellow, (name) => {
        rl.question("Podaj email: ".yellow, (email) => {
          rl.question("Podaj numer telefonu: ".yellow, (phone) => {
            addContact(name, email, phone);
            rl.close();
          });
        });
      });
      break;
    case "remove":
      rl.question("Podaj id kontaktu do usunięcia: ".yellow, (value) => {
        removeContact(value);
        rl.close();
      });
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
