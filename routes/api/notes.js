const express = require('express');
const router = express.Router();
const fs = require('fs');
const shortid = require('shortid');
const path = require('path');

const Notes = path.resolve(__dirname, '../../db/db.json');

router.get('/', (req, res) => {
    fs.readFile(Notes, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err});
        };
        const notes = JSON.parse(data);
        res.status(200).json(notes);
        
    });
});

router.post ('/', (req, res) => {
    const newNote = req.body;

    newNote.id = shortid.generate();

    fs.readFile(Notes, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err});
        };

        const notes = JSON.parse(data);

        notes.push(newNote);

        fs.writeFile(Notes, JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err});
            };
            res.status(200).json(notes);
        });
    });
});

router.delete('/:id', (req, res) => {
    fs.readFile(Notes, (err, data)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err});
        };
        const notes = JSON.parse(data);

        const filteredNotes = notes.filter(note => note.id !== req.params.id);
        fs.writeFile(Notes, JSON.stringify(filteredNotes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err});
            };
            res.status(200).json(filteredNotes);
        });

    });
});

module.exports = router;