# Express-Note-Taker
## Description
This application allows for users to create and save notes, view previously saved notes, and delete previously saved notes. Users must use node to start an express server on their localhost before using the application. 

## Challenges
One of the main hurdles for building this application was working with JSON files and the errors I encountered while trying to send the contents of the JSON file to the front-end. Through this project, I learned how to require certain files, serving custom css files, and filtering through the array in the db.json file. While testing out the website, it occurred to me that if I delete an old note and create a new note, the IDs may become duplicated. If I were to delete a note that had the same ID as another note, both notes would have been deleted.
