import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalsName = 'NEW_APPOINTMENT' | 'ADD_PATIENT' | false;

type Patient = {
  id: number;
  name: string;
  surname: string;
  active: boolean;
};

type SliceState = {
  isOpenModal: ModalsName;
  patients: Array<Patient> | null;
  filteredPatients: Array<Patient> | null;
  availableAppointments: Date[] | null;
};

const initialState: SliceState = {
  isOpenModal: false,
  patients: null,
  filteredPatients: null,
  availableAppointments: null,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalsName>) => {
      state.isOpenModal = action.payload;
    },
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
    },
    filterPatients: (state, action: PayloadAction<string>) => {
      const regex = new RegExp(`${action.payload}`, 'gi');
      if (state.patients) {
        state.filteredPatients = state.patients.filter(
          (patient) => patient.name.match(regex) || patient.surname.match(regex)
        );
      }
    },
    clearFilteredPatients: (state) => {
      state.filteredPatients = null;
    },
    setAvailableAppointments: (state, action: PayloadAction<Date[]>) => {
      state.availableAppointments = action.payload;
    },
  },
});

export const {
  openModal,
  setPatients,
  filterPatients,
  clearFilteredPatients,
  setAvailableAppointments,
} = modalsSlice.actions;

export default modalsSlice.reducer;
