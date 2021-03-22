import React, { useState } from 'react';
import Search from '../components/elements/Search';
import AddPatientButton from '../components/patientsList/AddPatientButton';
import PatientCount from '../components/patientsList/PatientCount';
import {
  Header,
  Separator,
} from '../components/patientsList/Patients.elements';
import PatientsGrid from '../components/patientsList/grid/PatientsGrid';

const Patients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ height: '100%' }}>
      <Header>
        <PatientCount count={0} />
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
      <PatientsGrid searchQuery={searchQuery} />
    </div>
  );
};

export default Patients;
