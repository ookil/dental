import React from 'react';
import { GetOffsetPatients_getOffsetPatients_patients } from '../../../graphql/queries/__generated__/GetOffsetPatients';
import { List } from './elements';
import PatientItem from './PatientItem';

type Props = {
  patients: GetOffsetPatients_getOffsetPatients_patients[];
};

const PatientsList = ({ patients }: Props) => {
  return (
    <List>
      {patients.map((patient, index) => {
        const prevPatient = patients[index - 1];

        if (
          patient.surname[0].toUpperCase() !==
          prevPatient?.surname[0].toUpperCase()
        ) {
          return (
            <PatientItem
              key={patient.id}
              patient={patient}
              firstLetter={true}
            />
          );
        } else if (
          patient.surname[0].toUpperCase() ===
          prevPatient?.surname[0].toUpperCase()
        ) {
          return (
            <PatientItem
              key={patient.id}
              patient={patient}
              firstLetter={false}
            />
          );
        }
      })}
    </List>
  );
};

export default PatientsList;
