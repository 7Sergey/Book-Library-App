import { configureStore } from '@reduxjs/toolkit';
// import booksReducer from './books/reducer';
import filterReducer from './slices/filterSlice';
import booksReducer from './slices/booksSlice';
import errorReducer from './slices/errorSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
    user: userReducer,
  },
});

export default store;
