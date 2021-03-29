import React, { useState } from 'react';
import Search from '../components/elements/Search';
import AddPatientButton from '../components/patientsList/AddPatientButton';
import PatientCount from '../components/patientsList/PatientCount';
import {
  Header,
  Separator,
} from '../components/patientsList/Patients.elements';
import PatientsGrid from '../components/patientsList/grid/PatientsGrid';
import { useQuery } from '@apollo/client';
import { clinicIdVar } from '../cache';
import { GET_OFFSET_PATIENTS } from '../graphql/queries/patient';
import {
  GetOffsetPatients,
  GetOffsetPatientsVariables,
} from '../graphql/queries/__generated__/GetOffsetPatients';

const Patients: React.FC = () => {
  const clinicId = clinicIdVar();
  const [searchQuery, setSearchQuery] = useState('');

  const { data } = useQuery<GetOffsetPatients, GetOffsetPatientsVariables>(
    GET_OFFSET_PATIENTS
  );

  const totalCount =  0;

  return (
    <div style={{ height: '100%' }}>
      <Header>
        <PatientCount count={totalCount} />
        <Separator />
        <AddPatientButton />
        <Separator />
        <Search
          onEnter={() => console.log('enter')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search...'
        />
      </Header>
      <PatientsGrid searchQuery={searchQuery} totalCount={totalCount} />
    </div>
  );
};

export default Patients;
