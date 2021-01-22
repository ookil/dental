import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const patients = [
  { id: 1, name: 'Miłosz', surname: 'Fretek' },
  { id: 2, name: 'Super', surname: 'Star' },
  { id: 3, name: 'Barabasz', surname: 'Wielki' },
  { id: 4, name: 'Barabasz', surname: 'Wielki' },
  { id: 5, name: 'Barabasz', surname: 'Wielki' },
  { id: 6, name: 'Barabasz', surname: 'Wielki' },
  { id: 7, name: 'Barabasz', surname: 'Wielki' },
  { id: 8, name: 'Barabasz', surname: 'Wielki' },
  { id: 11, name: 'Miłosz', surname: 'Bernardo' },
  { id: 12, name: 'Miłosz', surname: 'Gozik' },
  { id: 9, name: 'Add', surname: 'Later' },
];

type ModalsName = 'NEW_APPOINTMENT' | 'ADD_PATIENT' | false;

type Patient = {
  id: number;
  name: string;
  surname: string;
};

type SliceState = {
  isOpenModal: ModalsName;
  filteredPatients: Array<Patient> | null;
};

const initialState: SliceState = { isOpenModal: false, filteredPatients: null };

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalsName>) => {
      state.isOpenModal = action.payload;
    },
    filterPatients: (state, action: PayloadAction<string>) => {
      const regex = new RegExp(`${action.payload}`, 'gi');
      state.filteredPatients = patients.filter(
        (patient) => patient.name.match(regex) || patient.surname.match(regex)
      );
    },
    clearFilteredPatients: (state) => {
      state.filteredPatients = null;
    },
  },
});

export const {
  openModal,
  filterPatients,
  clearFilteredPatients,
} = modalsSlice.actions;

export default modalsSlice.reducer;
