import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import profileReducer from './slices/ProfileSlice';
import signInReducer from './slices/SignInSlice';
import driversReducer from './slices/driversSlice';
import movesReducer from './slices/movesSlice';
import myQuotationReducer from './slices/myQuotationSlice';

const rootReducer = combineReducers({
  drivers: driversReducer,
  signIn: signInReducer,
  moves: movesReducer,
  myQuotation: myQuotationReducer,
  profile: profileReducer,
});

function createNoopStorage() {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
}

let storage;
if (typeof window !== 'undefined') {
  storage = require('redux-persist/lib/storage/session').default;
} else {
  storage = createNoopStorage();
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signIn', 'myQuotation', 'profile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = typeof window !== 'undefined' ? persistStore(store) : null;

// RootState 및 AppDispatch 타입 설정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
