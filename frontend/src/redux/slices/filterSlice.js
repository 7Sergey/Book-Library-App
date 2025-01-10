import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return {
        ...state,
        title: action.payload,
      };
    },
  },
});

export const setTitleFilter = filterSlice.actions.setTitleFilter;

export const selectTitleFilter = (state) => state.filter.title;

export default filterSlice.reducer;
