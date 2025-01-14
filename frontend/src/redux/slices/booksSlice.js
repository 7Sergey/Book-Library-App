import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId';

const initialState = [];
// создаем асинхронную функцию -- гет запрос на сервер с action под названием books/fetchBook
export const fetchBook = createAsyncThunk('books/fetchBook', async () => {
  const url = 'http://localhost:4000/random-book';
  const res = await axios.get(url);

  // возвращаем данные с сервера
  return res.data;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      // return [...state, action.payload];
      //А можно мутировать state, нам позволяет это сделать библиотека Immer, которая каждый раз пересоздает новый state
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => {
        return book.id !== action.payload;
      });
    },

    // return state.map((book) =>
    //   book.id === action.payload
    //     ? {
    //         ...book,
    //         isFavorite: !book.isFavorite,
    //       }
    //     : book
    // );

    //а можно мутировать состояние книги (благодаря библиотеке Immer)
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  extraReducers: (builder) => {
    //Добавили кейс. Что делать, если получили fetchBook.fulfilled, то есть к нам вернулся успешный результат промиса
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        // добавили в массив state новую книгу, которую создаем в createBookWithId
        state.push(createBookWithId(action.payload, 'API'));
      }
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
