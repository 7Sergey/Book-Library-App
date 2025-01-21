import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Sergey';

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserName: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUserName } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
