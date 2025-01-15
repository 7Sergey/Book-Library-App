import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId';
import { setError } from './errorSlice';
import { act } from 'react';

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

// создаем асинхронную функцию -- гет запрос на сервер с action под названием books/fetchBook
export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data; // возврат данных с сервера
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      // 1 option, перенаправляем в reject(отклоняем промисс)
      // return thunkAPI.rejectWithValue(error);
      // 2 option
      throw error;
      // всё равно нужно выкинуть ошибку дальше, чтобы промис был отклонен(rejected)

      // thunkAPI - объект, передаваемый в асинхронные thunk-функции в Redux Toolkit.
      // Он предоставляет доступ к вспомогательным методам, таким как dispatch, getState и rejectWithValue.
      // Пример использования:
      // - dispatch: позволяет отправлять другие действия из thunk.
      // - getState: предоставляет доступ к текущему состоянию хранилища.
      // - rejectWithValue: используется для возврата пользовательских ошибок при отклонении промиса.
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      // return [...state, action.payload];
      //А можно мутировать state, нам позволяет это сделать библиотека Immer, которая каждый раз пересоздает новый state
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },

    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  // 1 OPTION
  // extraReducers: {
  //   [fetchBook.pending]: (state) => {
  //     state.isLoadingViaAPI = true;
  //   },
  //   [fetchBook.fulfilled]: (state, action) => {
  //     state.isLoadingViaAPI = false;

  //     if (action.payload.title && action.payload.author) {
  //       // добавили в массив state новую книгу, которую создаем в createBookWithId
  //       state.books.push(createBookWithId(action.payload, 'API'));
  //     }
  //   },
  //   [fetchBook.rejected]: (state) => {
  //     state.isLoadingViaAPI = false;
  //   },
  // },

  // 2 OPTION
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      if (action?.payload?.title && action?.payload?.author) {
        state.books.push(createBookWithId(action.payload, 'API'));
      }
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default booksSlice.reducer;
