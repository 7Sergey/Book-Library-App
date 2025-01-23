require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const booksData = require('./data/books.json');
// Подключение модели книги
const Book = require('./models/Book');

const app = express();
app.use(cors());

const getRandomBook = (booksData) => {
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

// Маршрут для получения всех книг
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find(); // Получаем все книги из базы данных
    res.json(getRandomBook(books));
    console.log(getRandomBook(books));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка получения книг' });
  }
});

// Подключение к MongoDB
const mongoURL = process.env.MONGO_URL;
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((error) => console.error('Ошибка подключения к MongoDB:', error));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Сервер запущен на ${port} порту`);
});
