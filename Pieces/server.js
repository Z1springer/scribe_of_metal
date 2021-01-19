// Dependancies
// ====================================================
const express = require("express");
const path = require("path");

// Express
// ====================================================
const app = express();
PORT = 8080;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// ====================================================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/notes", (req, res) => {
  console.log(path);
  console.log(__dirname);
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// Set the server to start listening
// ====================================================
app.listen(PORT, function () {
  console.log("Application listening on PORT " + PORT);
});
