import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RequestMemo = {
  googleFontsUrl: '',
  charMolecules: []
};

const requestMemoSlice = createSlice({
  name: 'requestMemo',
  initialState,
  reducers: {
    requestMemoSet: (
      state: RequestMemo,
      { payload }: PayloadAction<RequestMemo>
    ) => {
      Object.assign(state, payload);
    }
  }
});

export const { requestMemoSet } = requestMemoSlice.actions;
export default requestMemoSlice.reducer;
