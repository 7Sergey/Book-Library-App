const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const booksData = require('./data/books.json');

const app = express();

app.use(cors());

const getRandomBook = () => {
  const randomIndex = Math.floor(Math.random() * booksData.length);
  const randomBook = booksData[randomIndex];
  return randomBook;
};

app.get('/random-book', (req, res) => {
  res.json(getRandomBook());
});

app.get('/random-book-delayed', (req, res) => {
  setTimeout(() => {
    res.json(getRandomBook());
  }, 2000);
});

mongoose.connect('mongodb://127.0.0.1:27017/mongo');

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Сервер запущен на ${port} порту`);
});
