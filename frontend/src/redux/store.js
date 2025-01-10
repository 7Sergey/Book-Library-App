import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/reducer';
import filterReduser from './slices/filterSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReduser,
  },
});

export default store;
