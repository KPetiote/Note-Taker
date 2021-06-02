// API routes
const fs = require("fs");

// NPM package "uuid" to assign unique ids.
const { v4: uuidv4 } = require('uuid');

// ROUTING
module.exports = (app) => {

    // API GET Requests
    // GET Requests will receive a new note to the JSON File
    // ---------------------------------------------------------------------------
    app.get("/api/notes", (req, res) => {
        
        console.log("Getting Notes Started")

        // Assigns variable to read the data from the "./db/db.json" file.
        let note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        console.log("Returning Notes Data");
        
        res.json(note);
    });


    // API POST Requests
    // Post Requests will post new notes to the JSON File
    // ---------------------------------------------------------------------------
    app.post("/api/notes", (req, res) => {

        // Extracted new note from request body.  
        const newNote = req.body;
        
        console.log("Saving new note" + JSON.stringify(newNote));

        // Assigns a unique id obtained from 'uuid' package.
        newNote.id = uuidv4();

        // Assigns variable to read the data from the "./db/db.json" file
        let note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        // Adds a new note to the "./db/db.json"" file.
        note.push(newNote);

        // Writes new note data to "./db/db.json" file.
        fs.writeFileSync('./db/db.json', JSON.stringify(note));
        
        console.log("New note successfully added!");

        res.json(note);
    });


    // API DELETE
    // Delete Request will clear out the notes from the JSON File
    // ---------------------------------------------------------------------------

    app.delete("/api/notes/:id", (req, res) => {

        // Checks unique id that needs to be deleted.
        let noteId = req.params.id.toString();
        
        console.log("Deleting note for id " + JSON.stringify(noteId));

        // Assigns variable to read the data from the 'db.json' file.
        let note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // Checks data to make sure the wrong note is not being deleted.
        const noteCheck = note.filter( note => note.id.toString() !== noteId );

        // Writes new note data to "./db/db.json" file.
        fs.writeFileSync('./db/db.json', JSON.stringify(noteCheck));
        
        console.log("Succesfully delete note");

        res.json(noteCheck);
    });
};