import { createSlice } from '@reduxjs/toolkit';

const urlSlice = createSlice({
  name: 'url',
  initialState: '',
  reducers: {
    set: (state, { payload }) => state = payload
  }
});

export const { set } = urlSlice.actions;
export default urlSlice.reducer;
