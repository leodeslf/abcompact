import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;

const characterValidationSlice = createSlice({
  name: 'characterValidation',
  initialState,
  reducers: {
    characterValidationUpdate: (
      state: boolean,
      { payload }: PayloadAction<boolean>
    ) => {
      return state || payload;
    }
  }
});

export const { characterValidationUpdate } = characterValidationSlice.actions;
export default characterValidationSlice.reducer;
