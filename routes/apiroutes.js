const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

module.exports = (app) => {
  function readNotesFromFile() {
    const dbPath = path.join(__dirname, '../db/db.json');
    const dbData = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(dbData);
  }

  function writeNotesToFile(notes) {
    const dbPath = path.join(__dirname, '../db/db.json');
    fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
  }

  app.get('/api/notes', (req, res) => {
    const notes = readNotesFromFile();
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    const notes = readNotesFromFile();
    const userNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };

    notes.push(userNote);
    writeNotesToFile(notes);

    res.json(userNote);
  });


};