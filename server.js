// set dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// set up express app
const app = expess();
const port = 8080;

// set up express app for data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// set empty array for notes we can push into later


// set up routes ===================
//return notes.html
app.get("/notes", function(req, res) {
    
});

// return index.html FOR ERROR??
app.get("*", function(req, res) {
    
});

// read db.json
app.get("/api/notes", function(req, res) {
    // read file and return all saved notes as JSON
    
});

// create new data
app.post("/api/notes", function(req, res) {
    // save to request body

    // add to db.json

    // return new note to client

});

// delete data after receiving query paramater with unique id
app.delete("", function(req, res) {
    // read all notes from db.json

    // remove note based on unique id

    // rewrite notes to db.json
});

// start server
app.listen(port, function() {
    console.log(`Server is listening on http://localhost:${port}`);
});