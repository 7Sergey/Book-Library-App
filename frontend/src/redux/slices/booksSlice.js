import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

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
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
