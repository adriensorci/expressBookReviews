const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = "testkey";
let books = require("./booksdb.js");
const regd_users = express.Router();


let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate if username and password are provided
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  // Check if the user exists in the registered users list
  const user = users[username];
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  // Compare the password
  if (password !== user.password) {
    return res.status(401).send("Invalid username or password");
  }

  // Generate a JWT token with the user's username as the payload
  const token = jwt.sign({ username: username }, secretKey, {
    expiresIn: 60*60, // Token expiration time
  });

  // Return the token to the client
  res.status(200).json({
    message: "Login successful",
    token: token,
  });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;  // Get the ISBN from the URL parameter
    const review = req.query.review;  // Get the review from the query parameter
    const username = req.session.username;  // Get the logged-in user's username from the session
  
    // Check if the ISBN exists in the books collection
    const book = books[isbn];
    if (!book) {
      return res.status(404).send("Book not found");
    }
  
    // Check if the review is provided
    if (!review) {
      return res.status(400).send("Review is required");
    }
  
    // Add or modify the review under the user's name
    book.reviews[username] = review;
  
    // Respond with success message and the updated book details
    res.status(200).json({
      message: "Review successfully added/modified",
      book: book
    });
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
