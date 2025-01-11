import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
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
    resetFilters: () => {
      //Можно просто вернуть начальное значение
      return initialState;
    },
  },
});

export const { setTitleFilter, setAuthorFilter, resetFilters } =
  filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export default filterSlice.reducer;
