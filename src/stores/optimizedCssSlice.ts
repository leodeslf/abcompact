import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = '';

const optimizedCssSlice = createSlice({
  name: 'optimizedCss',
  initialState,
  reducers: {
    optimizedCssClear: () => {
      return initialState;
    },
    optimizedCssAdd: (state: string, { payload }: PayloadAction<string>) => {
      return state.concat(payload);
    }
  }
});

export const { optimizedCssClear, optimizedCssAdd } = optimizedCssSlice.actions;
export default optimizedCssSlice.reducer;
