import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import modalsReducer from './slices/modalsSlice';
import clinicReducer from './slices/clinicSlice';

const store = configureStore({
  reducer: {
    modal: modalsReducer,
    clinic: clinicReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
