import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  favorite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      //При использовании slice можно изменять state (объект состояния). Благодаря библиотеке Immer
      state.title = action.payload;
    },
    setAuthorFilter: (state, action) => {
      // Классический способ
      return {
        ...state,
        author: action.payload,
      };
    },
    setFavoriteFilter: (state, action) => {
      // Классический способ
      return {
        ...state,
        favorite: action.payload,
      };
    },
    resetFilters: () => {
      //Можно просто вернуть начальное значение
      return initialState;
    },
  },
});

export const {
  setTitleFilter,
  setAuthorFilter,
  setFavoriteFilter,
  resetFilters,
} = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectFavoriteFilter = (state) => state.filter.favorite;

export default filterSlice.reducer;
