/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'testdb';
const collection = 'Contacts';

// The current database to use.
use(database);

// Create a new collection.
db.getCollection(collection).insertMany(
    [
        {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "favoriteColor": "Blue",
            "birthday": "1990-05-15"
        },
        {
            "firstName": "Jane",
            "lastName": "Smith",
            "email": "jane.smith@example.com",
            "favoriteColor": "Green",
            "birthday": "1985-12-10"
        },
        {
            "firstName": "Alice",
            "lastName": "Johnson",
            "email": "alice.johnson@example.com",
            "favoriteColor": "Red",
            "birthday": "1995-08-22"
        }
    ]
);

// The prototype form to create a collection:


// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
