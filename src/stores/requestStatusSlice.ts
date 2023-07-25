import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RequestStatus = {
  currentProgress: 0,
  isFailed: false,
  isLoading: false,
  progressPhases: 0
};

const requestStatusSlice = createSlice({
  name: 'requestStatus',
  initialState,
  reducers: {
    requestStatusInitialize: (
      state: RequestStatus,
      { payload }: PayloadAction<number>
    ) => {
      Object.assign(state, initialState)
      state.isLoading = true;
      state.progressPhases = payload;
    },
    requestStatusUpdateProgress: (state: RequestStatus,) => {
      state.currentProgress++;
    },
    requestStatusFinish: (
      state: RequestStatus,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isLoading = false;
      state.isFailed = payload;
    }
  }
});

export const {
  requestStatusInitialize,
  requestStatusUpdateProgress,
  requestStatusFinish
} = requestStatusSlice.actions;
export default requestStatusSlice.reducer;
