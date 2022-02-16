const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs')
const notes = require('./notes');



// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler:argv => notes.addNote(argv.title , argv.body)
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'removes a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler:argv => notes.removeNote(argv.title)
})

// create read command
yargs.command({
    command: 'read',
    describe: 'reads a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => notes.readNote(argv.title)
})
// create list notes command
yargs.command({
    command:'list',
    describe:'list all the notes',
    handler: argv => notes.listNotes(argv.title)
})


yargs.parse()

