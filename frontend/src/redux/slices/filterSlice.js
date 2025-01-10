import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      //При использовании slice можно изменять state (объект состояния). Благодаря библиотеке Immer
      state.title = action.payload;
    },
    resetFilters: () => {
      //При использовании slice можно изменять state (объект состояния). Благодаря библиотеке Immer
      return initialState;
    },
  },
});

export const { setTitleFilter, resetFilters } = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;

export default filterSlice.reducer;
