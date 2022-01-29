import { createSlice } from '@reduxjs/toolkit';

const lastRequestSlice = createSlice({
  name: 'lastRequest',
  initialState: {},
  reducers: {
    set: (state, { payload }) => state = payload
  }
});

export const { set } = lastRequestSlice.actions;
export default lastRequestSlice.reducer;
