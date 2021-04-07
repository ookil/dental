import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { patientForAppointment } from '../../store/slices/modalsSlice';
import { RootState, useAppDispatch } from '../../store/store';
import { Button } from '../elements/Elements';
import Search from '../elements/Search';
import PatientsGrid from '../patientsList/grid/PatientsGrid';
import { Header } from '../patientsList/Patients.elements';
import { ModalTitle, ScrollBox } from './Modals.elements';

const FindPatient = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(0);

  const [totalCount, setTotalCount] = useState(0);

  const dispatch = useAppDispatch();

  const selectingPatientForAppointment = useSelector(
    (state: RootState) => state.modal.selectingPatientForAppointment
  );

  return (
    <>
      <ModalTitle>Find Patient</ModalTitle>
      <Header>
        <Search
          placeholder='Search...'
          onEnter={(value) => setSearchQuery(value)}
        />
        {selectingPatientForAppointment && (
          <Button
            onClick={() => {
              dispatch(patientForAppointment(''));
            }}
          >
            New Patient
          </Button>
        )}
      </Header>
      <ScrollBox height={600} padding={'0.5em 0em'}>
        <PatientsGrid
          searchOnly={true}
          searchQuery={searchQuery}
          totalCount={totalCount}
          setTotalCount={setTotalCount}
          paging={{ currentPage, setCurrentPage }}
        />
      </ScrollBox>
    </>
  );
};

export default FindPatient;
