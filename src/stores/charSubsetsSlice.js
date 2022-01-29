import { createSlice } from '@reduxjs/toolkit';

const charSubsetsSlice = createSlice({
  name: 'charSubsets',
  initialState: [],
  reducers: {
    add: (state, { payload }) => [...state, payload],
    remove: (state, { payload }) => state.filter(item => item !== payload)
  }
});

export const { add, remove } = charSubsetsSlice.actions;
export default charSubsetsSlice.reducer;
