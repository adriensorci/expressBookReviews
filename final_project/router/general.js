const express = require('express');
const books = require('./booksdb.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented 0"});
 });
// Get the book list available in the shop
public_users.get('/',function (req, res) {
    bouquin = JSON.stringify(books);
    return res.status(300).json(bouquin);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Récupère l'ISBN passé dans l'URL
    const book = books[isbn];     // Récupère le livre correspondant à l'ISBN
  
    if (book) {
      res.status(300).json(book); // Si le livre est trouvé, renvoie-le en JSON
    } else {
      res.status(404).send('Livre non trouvé'); // Si l'ISBN n'est pas trouvé, renvoie une erreur 404
    }
  });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented 3"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented 4"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented 5"});
});

module.exports.general = public_users;
