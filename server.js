// set dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// global variable for reading the db.json file
let notes = require("./db/db.json");

// set up express app
const app = express();
const port = 8080;

// configure express app to use middleware for data parsing
// only run if response is in json format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files for css (without this code, the javascript and custom CSS will not work)
app.use(express.static("public"));

// set up routes ===================
// the express application server receives a request and provides an object, which is the response/res
//return notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// return the contents of the db.json file
app.get("/api/notes", function(req, res) {
  // res.sendFile(path.join(__dirname, "./db/db.json"));
  res.json(notes);
});

// create new data =================
app.post("/api/notes", function(req, res) {
  // use req.body (what the note that the user is requesting to post)
  const newNote = req.body;
  // add ID property to the object that we are going to push to the array
  let newID = notes.length;
  newNote.id = newID;
  notes.push(newNote);
  // update and re-write the file with the additional request body that we pushed
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  // send the notes, which is the required db.json file that was just updated
  res.send(notes);
})

// delete data after receiving query paramater with unique id ===================
app.delete("/api/notes/:id", (req, res) => {
  // read all note with specific id
  const chosen = req.params.id;
  // remove note based on unique id by filtering and calling a function (pass in note, return without the element with id the same as chosen)
  notes = notes.filter(chosenNote => chosenNote.id != chosen)
  // re-assign id numbers based on new notes.length for each of the elements in the JSON array, otherwise we will have potetential repeat IDs
  let newID = 1;
  for (let chosenNote of notes) {
    chosenNote.id = newID;
    newID++;
  }
  // rewrite notes to db.json and send
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.send(notes);
});

// return index.html for any route that does not exist
// put this get method at the end, otherwise it will override everything that comes after
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// start server =================
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
