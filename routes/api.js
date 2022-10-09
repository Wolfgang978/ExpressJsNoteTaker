const router = require('express') .Router()
const fs = require('fs');
const util = require('util')
const readFile = util.promisify(fs.readFile)

function getNotes() {
    return readFile('db/db.json', 'utf-8').then(notes => {
      let finishedNotes = [].concat(JSON.parse(notes))
      return finishedNotes;
    })
  }
  router.get('/api/notes', (req, res) => {
    getNotes().then(data => res.json(data))
  })
  
  router.post('/api/notes', (req, res) => {
  
    const { title, text } = req.body;
  
    const addNote = {
      title,
      text,
      id: Math.floor(Math.random()*1000),
    };
  
    getNotes().then(notes => {
      let newNote = [...notes, addNote]
      fs.writeFile('./db/db.json', JSON.stringify(newNote, null, 4), (err) => {
        res.json({msg:"ok"});
      })
    })
  });



  module.exports = router