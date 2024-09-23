const express = require('express');
const books = require('./booksdb.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", function (req, res) {
    const { username, password } = req.body; // Destructure the username and password from the request body
  
    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }
  
    // Check if the username already exists
    if (users[username]) {
      return res.status(400).send("Username already exists");
    }
  
    // Register the user by storing the username and password
    users[username] = { password };
  
    // Respond with a success message
    res.status(201).send("User registered successfully");
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
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author; // Récupère l'auteur passé dans l'URL
    const booksByAuthor = [];         // Tableau pour stocker les livres trouvés
  
    // Boucle pour parcourir tous les livres
    for (let key in books) {
      if (books[key].author === author) {
        booksByAuthor.push(books[key]); // Ajouter le livre correspondant dans le tableau
      }
    }
  
    if (booksByAuthor.length > 0) {
      res.json(booksByAuthor); // Si des livres sont trouvés, les renvoyer en JSON
    } else {
      res.status(404).send('Auteur non trouvé'); // Si aucun livre n'est trouvé, envoyer une erreur 404
    }
  });

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title; // Récupère le titre passé dans l'URL
    const booksByTitle = [];        // Tableau pour stocker les livres trouvés
  
    // Boucle pour parcourir tous les livres
    for (let key in books) {
      if (books[key].title === title) {
        booksByTitle.push(books[key]); // Ajouter le livre correspondant dans le tableau
      }
    }
  
    if (booksByTitle.length > 0) {
      res.json(booksByTitle); // Si des livres sont trouvés, les renvoyer en JSON
    } else {
      res.status(404).send('Livre non trouvé'); // Si aucun livre n'est trouvé, envoyer une erreur 404
    }
  });
  

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Récupère l'ISBN passé dans l'URL
    const book = books[isbn];     // Récupère le livre correspondant à l'ISBN
  
    if (book) {
      res.json(book.reviews); // Si le livre est trouvé, renvoyer les critiques
    } else {
      res.status(404).send('Livre non trouvé'); // Si l'ISBN n'est pas trouvé, envoyer une erreur 404
    }
  });

module.exports.general = public_users;
