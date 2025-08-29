import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './global/searchSlice';
import loaderReducer from './global/loaderSlice'
import invoiceReducer from './dashboard/finance/invoiceSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    loader: loaderReducer,
    invoices: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;