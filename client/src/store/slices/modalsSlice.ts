import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

type ModalsName = 'NEW_APPOINTMENT' | 'ADD_PATIENT' | false;

type Patient = {
  id: number;
  name: string;
  surname: string;
  active: boolean;
};

type AvailableAppointment = {
  dateString: Date;
  formatedDate: string;
};

type SliceState = {
  isOpenModal: ModalsName;
  patients: Array<Patient> | null;
  filteredPatients: Array<Patient> | null;
  availableAppointments: AvailableAppointment[];
};

const initialState: SliceState = {
  isOpenModal: false,
  patients: null,
  filteredPatients: null,
  availableAppointments: [],
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
      if (action.payload.length > 0) {
        for (const appointment of action.payload) {
          const formated = {
            dateString: appointment,
            formatedDate: format(new Date(appointment), 'iiii d, k:mm'),
          };

          state.availableAppointments.push(formated);
        }
      } else {
        state.availableAppointments = [];
      }
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
