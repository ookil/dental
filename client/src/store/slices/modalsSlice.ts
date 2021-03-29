import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { GetPatients_clinicPatients } from '../../graphql/queries/__generated__/GetPatients';

type ModalsName = 'NEW_APPOINTMENT' | 'ADD_PATIENT' | false;

type AvailableAppointment = {
  dateString: Date;
  formatedDate: string;
};

interface GetPatients extends GetPatients_clinicPatients {
  [key: string]: any;
}

type SliceState = {
  isOpenModal: ModalsName;
  patients: Array<GetPatients> | null;
  filteredPatients: Array<GetPatients> | null;
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
    setPatients: (
      state,
      action: PayloadAction<GetPatients[]>
    ) => {
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
        state.availableAppointments = [];
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
