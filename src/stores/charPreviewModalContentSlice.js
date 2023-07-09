import { createSlice } from '@reduxjs/toolkit';

const charCoverageModalContentSlice = createSlice({
  name: 'charCoverageModalContent',
  initialState: false,
  reducers: {
    clear: (state) => state = false,
    set: (state, { payload }) => state = payload
  }
});

export const { clear, set } = charCoverageModalContentSlice.actions;
export default charCoverageModalContentSlice.reducer;
