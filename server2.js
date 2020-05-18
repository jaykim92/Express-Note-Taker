// set dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

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

// read db.json and return the contents of the file
app.get("/api/notes", function(req, res) {
  const thing = res.sendFile(path.join(__dirname, "/db/db.json"));
  console.log(thing)
});

// create new data =================
app.post("/api/notes", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  console.log(savedNotes);
  let newNote = req.body;
  let uniqueID = (savedNotes.length).toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Note saved to db.json. Content: ", newNote);
  res.json(savedNotes);
})


// delete data after receiving query paramater with unique id ===================
// app.delete("/api/notes/:id", (req, res) => {
//   // receive query paramater containing id**

//   // read all note with specific id
//   const chosen = req.params.id;
//   console.log(chosen);
//   // remove note based on unique id
//   // rewrite notes to db.json
//   let updatedNotes = JSON.stringify(notes);
//   fs.writeFile("/db/db.json");
// });

// return index.html for any route that does not exist
// put this get method at the end, otherwise it will override everything that comes after
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// start server =================
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
