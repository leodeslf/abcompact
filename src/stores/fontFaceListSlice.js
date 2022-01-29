import { createSlice } from '@reduxjs/toolkit';

const fontFaceListSlice = createSlice({
  name: 'fontFaceList',
  initialState: [],
  reducers: {
    clear: (state) => state = [],
    add: (state, { payload }) => [...state, payload]
  }
});

export const { clear, add } = fontFaceListSlice.actions;
export default fontFaceListSlice.reducer;
