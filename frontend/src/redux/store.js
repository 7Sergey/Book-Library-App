import { configureStore } from '@reduxjs/toolkit';
// import booksReducer from './books/reducer';
import filterReduser from './slices/filterSlice';
import booksSlice from './slices/booksSlice';

const store = configureStore({
  reducer: {
    books: booksSlice,
    filter: filterReduser,
  },
});

export default store;
