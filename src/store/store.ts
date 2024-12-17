import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // Slice Reducers 추가
  },
});

// RootState 및 AppDispatch 타입 설정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
