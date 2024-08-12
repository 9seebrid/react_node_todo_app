import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // 1. slice import

const store = configureStore({
  // 2. store에 slice 등록
  reducer: {
    auth: authReducer,
  },
});

export default store;
