import { createSlice } from '@reduxjs/toolkit';

const customCharsSlice = createSlice({
  name: 'customChars',
  initialState: '',
  reducers: {
    set: (state, { payload }) => state = payload
  }
});

export const { set } = customCharsSlice.actions;
export default customCharsSlice.reducer;
