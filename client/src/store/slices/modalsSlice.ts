import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalsName = 'NEW_APPOINTMENT' | 'ADD_PATIENT' | false;

type SliceState = { isOpenModal: ModalsName };

const initialState: SliceState = { isOpenModal: false };

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalsName>) => {
      state.isOpenModal = action.payload;
    },
  },
});

export const { openModal } = modalsSlice.actions;

export default modalsSlice.reducer;

