import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import modalsReducer from './slices/modalsSlice';

const store = configureStore({
  reducer: {
    modal: modalsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
