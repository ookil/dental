import React, { useState } from 'react';
import { openModal } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
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

  return (
    <>
      <ModalTitle>Find Patient</ModalTitle>
      <Header>
        <Search
          placeholder='Search...'
          onEnter={(value) => setSearchQuery(value)}
        />
        <Button onClick={() => dispatch(openModal('NEW_PATIENT_VISIT'))}>
          New Patient
        </Button>
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
