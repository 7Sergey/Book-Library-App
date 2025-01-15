import { configureStore } from '@reduxjs/toolkit';
// import booksReducer from './books/reducer';
import filterReduser from './slices/filterSlice';
import booksReducer from './slices/booksSlice';
import errorReduser from './slices/errorSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReduser,
    error: errorReduser,
  },
});

export default store;
