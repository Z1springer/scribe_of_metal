// Dependancies
// ====================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Express
// ====================================================
const app = express();
PORT = 8080;
app.use(express.static("public")); //connecting to the public folder for styling and javascript
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// ====================================================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  console.log(path);
  console.log(__dirname);
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});
// GET API route, also adds ID for later use
app.get("/api/notes", (req, res) => {
  fs.readFile("./db.json", function (err, data) {
    if (err) throw err;
    var newNoteId = 1;
    const dataId = JSON.parse(data);
    dataId.forEach((element) => {
      element.id = newNoteId++;
    });
    fs.writeFile("./db.json", JSON.stringify(dataId), function (err, data) {
      if (err) throw err;
    });
    res.json(dataId);
  });
});
// POST API route
app.post("/api/notes", (req, res) => {
  fs.readFile("./db.json", function (err, data) {
    if (err) throw err;
    const newNote = JSON.parse(data);
    newNote.push(req.body);
    fs.writeFile("./db.json", JSON.stringify(newNote), function (err, data) {
      if (err) throw err;
    });
    res.json(newNote);
  });
});
// DELETE API route
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db.json", function (err, data) {
    if (err) throw err;
    const noteId = req.params.id;
    const removeNote = JSON.parse(data);
    removeNote.splice(parseInt(noteId) - 1, 1);
    fs.writeFile("./db.json", JSON.stringify(removeNote), function (err, data) {
      if (err) throw err;
    });
    res.json(removeNote);
  });
});

// Set the server to start listening
// ====================================================
app.listen(PORT, function () {
  console.log("Application listening on PORT " + PORT);
});
