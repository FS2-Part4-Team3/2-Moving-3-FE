import { configureStore } from '@reduxjs/toolkit';
import driversReducer from './slices/driversSlice';

export const store = configureStore({
  reducer: {
    // Slice Reducers 추가
    drivers: driversReducer,
  },
});

// RootState 및 AppDispatch 타입 설정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
