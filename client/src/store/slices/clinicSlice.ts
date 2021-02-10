import { createSlice } from '@reduxjs/toolkit';

type ClinicState = {
  isToolbarCollapsed: boolean;
};

const initialState: ClinicState = {
  isToolbarCollapsed: false,
};

const clinicSlice = createSlice({
  name: 'clinic',
  initialState,
  reducers: {
    setToolbarCollapse: (state) => {
      state.isToolbarCollapsed = !state.isToolbarCollapsed;
    },
  },
});

export const { setToolbarCollapse } = clinicSlice.actions;

export default clinicSlice.reducer;
