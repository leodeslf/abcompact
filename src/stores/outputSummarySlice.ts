import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = <FilesWeight>{
  css: {
    default: 0,
    optimized: 0,
    difference: 0
  },
  woff2: {
    default: 0,
    optimized: 0,
    difference: 0
  }
};

const outputSummarySlice = createSlice({
  name: 'outputSummary',
  initialState,
  reducers: {
    outputSummaryClear: (state: FilesWeight) => {
      Object.assign(state, initialState);
    },
    outputSummaryAdd: (
      state: FilesWeight,
      { payload }: PayloadAction<FilesWeight>
    ) => {
      for (const file in state) {
        for (const data in state[file as keyof FilesWeight]) {
          state[file as keyof FilesWeight][data as keyof WeightReport] +=
            payload[file as keyof FilesWeight][data as keyof WeightReport];
        }
      }
    }
  }
});

export const {
  outputSummaryClear,
  outputSummaryAdd
} = outputSummarySlice.actions;
export default outputSummarySlice.reducer;
