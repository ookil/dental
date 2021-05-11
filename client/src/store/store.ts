import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import modalsReducer from './slices/modalsSlice';
import clinicReducer from './slices/clinicSlice';
import diagramReducer from './slices/diagramSlice';

const store = configureStore({
  reducer: {
    modal: modalsReducer,
    clinic: clinicReducer,
    diagram: diagramReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
