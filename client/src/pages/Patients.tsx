import React, { useEffect, useState } from 'react';
import Search from '../components/elements/Search';
import AddPatientButton from '../components/patientsList/AddPatientButton';
import PatientCount from '../components/patientsList/PatientCount';
import {
  Header,
  Separator,
} from '../components/patientsList/Patients.elements';
import PatientsGrid from '../components/patientsList/grid/PatientsGrid';
import { useLazyQuery } from '@apollo/client';
import { clinicIdVar } from '../cache';
import { GET_OFFSET_PATIENTS } from '../graphql/queries/patient';
import {
  GetOffsetPatients,
  GetOffsetPatientsVariables,
} from '../graphql/queries/__generated__/GetOffsetPatients';
import PatientsMobile from '../components/patientsList/mobilePatients/PatientsMobile';

const Patients: React.FC = () => {
  const clinicId = clinicIdVar();
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const [sorting, setSorting] = useState<
    { columnName: string; direction: 'asc' | 'desc' }[]
  >([{ columnName: 'surname', direction: 'asc' }]);

  const [getPatients, { data, loading }] = useLazyQuery<
    GetOffsetPatients,
    GetOffsetPatientsVariables
  >(GET_OFFSET_PATIENTS);

  useEffect(() => {
    /* if (window.screen.width > 425) */
    getPatients({
      variables: {
        patientsVar: {
          clinicId,
          currentPage,
          pageSize,
          search: searchQuery,
          orderBy: { [sorting[0].columnName]: sorting[0].direction },
        },
      },
    });
  }, [clinicId, currentPage, pageSize, sorting, searchQuery, getPatients]);

  const totalCount = data?.getOffsetPatients.totalCount || 0;

  return (
    <div style={{ height: '100%' }}>
      <Header>
        <PatientCount count={totalCount} />
        <Separator hide={true} />
        <AddPatientButton />
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
        paging={{ currentPage, setCurrentPage }}
        pageSize={pageSize}
        sort={{ sorting, setSorting }}
        rows={data?.getOffsetPatients.patients || []}
        loading={loading}
      />
      <PatientsMobile />
    </div>
  );
};

export default Patients;
