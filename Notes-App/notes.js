const chalk = require('chalk');
const fs = require('fs');

const addNote = (title , body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
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
    const notesToKeep = loadTitle.filter(note => note.title !== title)
    if (loadTitle.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note had been removed'));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('no Note found'));
    }
}
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.bgGreen('Your notes'));
    notes.forEach((note) => console.log(chalk.bgGreen(note.title)))
}
const readNote = (title) => {    
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)
    if(findNote !== undefined) {
        console.log(chalk.bgGreen(findNote.title))
        console.log(findNote.body);
    }else {
        console.log(chalk.bgRed('Note not found')); 
    } 
}  

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}