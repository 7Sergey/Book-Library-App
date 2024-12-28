import { configureStore } from '@reduxjs/toolkit';
import booksReduser from './books/reducer';

const store = configureStore({
  reducer: {
    books: booksReduser,
  },
});

export default store;
