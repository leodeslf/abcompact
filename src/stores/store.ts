import { configureStore } from '@reduxjs/toolkit';
import optimizedCssReducer from './optimizedCssSlice';
import optimizedFontsReducer from './optimizedFontsSlice';
import outputSummaryReducer from './outputSummarySlice';
import requestMemoReducer from './requestMemoSlice';
import requestStatusReducer from './requestStatusSlice';

const store = configureStore({
  reducer: {
    optimizedCss: optimizedCssReducer,
    optimizedFonts: optimizedFontsReducer,
    outputSummary: outputSummaryReducer,
    requestMemo: requestMemoReducer,
    requestStatus: requestStatusReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;
