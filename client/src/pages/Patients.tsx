import React, { useState } from 'react';
import Search from '../components/elements/Search';
import AddPatientButton from '../components/patientsList/AddPatientButton';
import PatientCount from '../components/patientsList/PatientCount';
import {
  Header,
  Separator,
} from '../components/patientsList/Patients.elements';
import PatientsGrid from '../components/patientsList/grid/PatientsGrid';
import PatientsMobile from '../components/patientsList/mobilePatients/PatientsMobile';
import { openModal } from '../store/slices/modalsSlice';
import { useAppDispatch } from '../store/store';

const Patients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(0);

  const [totalCount, setTotalCount] = useState(0);

  const dispatch = useAppDispatch();

  const handleAddPatientButton = () => {
    dispatch(openModal('ADD_PATIENT'));
  };

  return (
    <div style={{ height: '100%' }}>
      <Header>
        <PatientCount count={totalCount} />
        <Separator hide={true} />
        <AddPatientButton handleClick={() => handleAddPatientButton()} />
        <Separator />
        <Search
          onEnter={(value) => {
            setCurrentPage(0);
            setSearchQuery(value);
          }}
          placeholder='Search...'
        />
      </Header>
      <PatientsGrid
        searchQuery={searchQuery}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
        paging={{ currentPage, setCurrentPage }}
      />
      <PatientsMobile handleClick={() => handleAddPatientButton()} />
    </div>
  );
};

export default Patients;
