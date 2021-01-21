import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import modalsReducer from './slices/modalsSlice';

const store = configureStore({
  reducer: {
    modals: modalsReducer,
  },
});

export default store;

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
