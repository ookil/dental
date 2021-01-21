import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalsName = 'NEW_APPOINTMENT' | 'ADD_PATIENT' | false;

type SliceState = { modal: ModalsName };

const initialState: SliceState = { modal: false };

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalsName>) => {
      state.modal = action.payload;
    },
  },
});

export const { openModal } = modalsSlice.actions;

export default modalsSlice.reducer;

/* 
type SliceState = {

  NEW_APPOINTMENT: boolean;
  ADD_PATIENT: boolean;
};

const initialState: SliceState = {
  NEW_APPOINTMENT: false,
  ADD_PATIENT: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<keyof SliceState>) => {
      {
        console.log(state[action.payload]);
        console.log((state[action.payload] = !state[action.payload]));
        state[action.payload] = !state[action.payload];
      }
    },
  },
});

export const { toggleModal } = modalsSlice.actions;

export default modalsSlice.reducer; */
