const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(note => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green('Note added successfully!!!'))
  } else {
    console.log(chalk.red('Title already available!!!'))
  }
}

const removeNote = title => {
  const notes = loadNotes()
  const notesToKeep = notes.filter(note => note.title !== title)
  console.log('Notes - ', notesToKeep)
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log(chalk.green('Note removed'))
  } else {
    console.log(
      chalk.red('Note title is not available. Unable to remove note!!!')
    )
  }
}

const listNotes = () => {
  console.log(chalk.bgYellow.black('Your Notes'))
  const notes = loadNotes()
  notes.forEach(note => console.log(chalk.blue(note.title)))
}

const readNote = title => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)
  if (note) {
    console.log(chalk.green(note.title))
    console.log(chalk.green(note.body))
  } else {
    console.log(chalk.red('Title is not available. Unable to read note!!!'))
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const data = dataBuffer.toString()
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
