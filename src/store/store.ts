import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import signInReducer from './slices/SignInSlice';
import driversReducer from './slices/driversSlice';
import movesReducer from './slices/movesSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['signIn'],
};

const rootReducer = combineReducers({
  drivers: driversReducer,
  signIn: signInReducer,
  moves: movesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// RootState 및 AppDispatch 타입 설정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
