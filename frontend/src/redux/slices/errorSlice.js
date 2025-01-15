import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    setError: (state, action) => {
      state = action.payload;
      return state;
    },
    clearError: () => {
      // очищаем состояние ошибки
      return initialState;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export const selectErrorMessage = (state) => state.errorSlice;

export default errorSlice.reducer;
