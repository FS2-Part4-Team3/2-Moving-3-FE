import { configureStore } from '@reduxjs/toolkit';
import signInReducer from './slices/SignInSlice';
import driversReducer from './slices/driversSlice';
import movesReducer from './slices/movesSlice';

export const store = configureStore({
  reducer: {
    // Slice Reducers 추가
    drivers: driversReducer,
    signIn: signInReducer,
    moves: movesReducer,
  },
});

// RootState 및 AppDispatch 타입 설정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
