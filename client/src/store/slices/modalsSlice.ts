import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { GetPatients_clinicPatients } from '../../graphql/queries/__generated__/GetPatients';
import { RootState } from '../store';

type ModalsName =
  | 'NEW_APPOINTMENT'
  | 'NEW_PATIENT_VISIT'
  | 'PATIENT_VISIT'
  | 'FIND_PATIENT'
  | 'ADD_PATIENT'
  | false;

export type ResponseStatus = 'CONFIRMATION' | 'CANCELATION' | 'ERROR' | false;

type ResponseModal = {
  status: ResponseStatus;
  message: string | null;
};

type AvailableAppointment = {
  dateString: Date;
  formatedDate: string;
};

interface GetPatients extends GetPatients_clinicPatients {
  [key: string]: any;
}

type SliceState = {
  isNewPatient: boolean;
  patientId: string;
  selectingPatientForAppointment: boolean;
  isOpenModal: ModalsName;
  isResponseModal: ResponseModal;
  patients: Array<GetPatients> | null;
  filteredPatients: Array<GetPatients> | null;
  availableAppointments: AvailableAppointment[];
};

const initialState: SliceState = {
  isNewPatient: true,
  patientId: '',
  selectingPatientForAppointment: false,
  isOpenModal: false,
  isResponseModal: {
    status: false,
    message: null,
  },
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
    changeSelectingPatientForAppointment: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.selectingPatientForAppointment = action.payload;
    },
    setPatientForAppointment: (
      state,
      action: PayloadAction<string | false>
    ) => {
      if (action.payload) {
        state.patientId = action.payload;
        state.isNewPatient = false;
        state.selectingPatientForAppointment = false;
      } else {
        state.patientId = '';
        state.isNewPatient = true;
      }
    },
    changeResponseModal: (state, action: PayloadAction<ResponseModal>) => {
      state.isResponseModal.status = action.payload.status;
      state.isResponseModal.message = action.payload.message;
    },
    setPatients: (state, action: PayloadAction<GetPatients[]>) => {
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

export const patientSelector = (state: RootState) => {
  const isNewPatient = state.modal.isNewPatient;
  const patientId = state.modal.patientId;

  return { isNewPatient, patientId };
};

export const {
  openModal,
  changeResponseModal,
  changeSelectingPatientForAppointment,
  setPatients,
  setPatientForAppointment,
  filterPatients,
  clearFilteredPatients,
  setAvailableAppointments,
} = modalsSlice.actions;

// correct types??
export const patientForAppointment = (patientId: string) => {
  return (dispatch: any) => {
    dispatch(openModal('NEW_PATIENT_VISIT'));
    dispatch(setPatientForAppointment(patientId));
  };
};

export default modalsSlice.reducer;
