// API routes
const fs = require('fs');
var notes;

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // GET Requests will receive a new note to the JSON File
  // ---------------------------------------------------------------------------

    app.get('/api/notes', (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            notes = JSON.parse(data);
            res.json(notes);
        });
    });

  // API POST Requests
  // Post Requests will post new notes to the JSON File
  // ---------------------------------------------------------------------------

    app.post('/api/notes', (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data)
            let newNotes = req.body;
            let noteId = 0;
            if (notes.length !== 0){
                noteId = notes[notes.lenghts - 1]["id"];
            }
            let newNoteId = noteId + 1;
            newNotes["id"] = newNoteId;
            notes.push(newNotes);
            fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                if (err) throw err;
            });
            res.json(newNotes);
        });
    });   

    // API DELETE
    // Delete Request will clear out the notes from the JSON File
    // ---------------------------------------------------------------------------

    app.delete('/api/notes/:id', (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);

            let chosenId = parseInt(req.params.id);
            for (let i = 0; i < notes.length; i++) {
                if (chosenId === notes[i].id) {
                    notes.splice(i, 1);
                    let noteJSON = JSON.stringify(notes, null, 2);

            fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                if (err) throw err;
                console.log("Note has been deleted");
            });
            }
        }
        res.json(notes);
        });
    });
}