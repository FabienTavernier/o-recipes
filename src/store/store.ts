import { configureStore } from '@reduxjs/toolkit';

import listReducer from './slices/listSlice';
import recipesReducer from './slices/recipesSlice';

export const store = configureStore({
  reducer: {
    list: listReducer,
    recipes: recipesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
