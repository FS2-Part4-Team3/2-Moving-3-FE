import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import signInReducer from './slices/SignInSlice';
import driversReducer from './slices/driversSlice';
import movesReducer from './slices/movesSlice';
import myQuotationReducer from './slices/myQuotationSlice';
import receiveQuoteReducer from './slices/receivedQuoteSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['signIn', 'myQuotation', 'receiveQuote'],
};

const rootReducer = combineReducers({
  drivers: driversReducer,
  signIn: signInReducer,
  moves: movesReducer,
  myQuotation: myQuotationReducer,
  receiveQuote: receiveQuoteReducer,
});

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

export const persistor = persistStore(store);

// RootState 및 AppDispatch 타입 설정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
