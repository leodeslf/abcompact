import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: OptimizedFont[] = [];

const optimizedFontsSlice = createSlice({
  name: 'optimizedFonts',
  initialState,
  reducers: {
    optimizedFontsClear: () => {
      return [...initialState];
    },
    optimizedFontsAdd: (
      state: OptimizedFont[],
      { payload }: PayloadAction<OptimizedFont>
    ) => {
      return [...state, payload];
    }
  }
});

export const {
  optimizedFontsClear,
  optimizedFontsAdd
} = optimizedFontsSlice.actions;
export default optimizedFontsSlice.reducer;
