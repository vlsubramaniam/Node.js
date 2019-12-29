const notes = require('./notes.js')
const yargs = require('yargs')

// Customize yargs version
yargs.version('1.1.0')
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
  handler (argv) {
    notes.addNote(argv.title, argv.body)
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Notes title',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.removeNote(argv.title)
  }
})

// Create list command
yargs.command({
  command: 'list',
  describe: 'List a note',
  handler () {
    notes.listNotes()
  }
})

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Read a note',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.readNote(argv.title)
  }
})

// console.log(yargs.argv);
yargs.parse()
