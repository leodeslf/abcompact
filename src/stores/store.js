import { configureStore } from '@reduxjs/toolkit';
import customCharsReducer from './customCharsSlice';
import fontFaceListReducer from './fontFaceListSlice';
import lastRequestReducer from './lastRequestSlice';
import charSubsetsReducer from './charSubsetsSlice';
import charCoverageModalContentReducer from './charCoverageModalContentSlice';
import urlReducer from './urlSlice';

const store = configureStore({
  reducer: {
    customChars: customCharsReducer,
    fontFaceList: fontFaceListReducer,
    lastRequest: lastRequestReducer,
    charSubsets: charSubsetsReducer,
    charCoverageModalContent: charCoverageModalContentReducer,
    url: urlReducer
  }
});

export default store;
