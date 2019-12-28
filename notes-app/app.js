const notes = require('./notes.js');
const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');

// console.log(notes());
// console.log(validator.isEmail('sdfdsfdsf@email.com'));
// console.log(chalk.bgRed.white.inverse.bold('Success'));

// const command = process.argv[2];

// if (command === 'add') {
//   console.log('Adding note!');
// } else if (command === 'remove') {
//   console.log('Removing note!');
// }

// Customize yargs version
yargs.version('1.1.0');
// console.log(yargs.argv);

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'This is a title argument',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Body of the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    console.log(`Title - ${argv.title}`);
    console.log('Body - ' + argv.body);
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: function() {
    console.log('Remove a note');
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List a note',
  handler: function() {
    console.log('List a note');
  }
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function() {
    console.log('Read a note');
  }
});

// console.log(yargs.argv);
yargs.parse();
