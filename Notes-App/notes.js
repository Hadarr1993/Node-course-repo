const chalk = require('chalk');
const fs = require('fs')
const getNotes = () =>  {return `Your notes...`}

const addNote = (title , body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note was added'));

    } else {
        console.log(chalk.bgRed('Note title is taken'));
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e) {
        return []
    }
}

const removeNote = (title) => {
    const loadTitle = loadNotes()
    const notesToKeep = loadTitle.filter((note) => {
        return note.title !== title
    })
    if (loadTitle.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note had been removed'));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('no Note found'));
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}