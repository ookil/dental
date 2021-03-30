import React from 'react';
import { GetScrollPatients_getScrollPatients_patients } from '../../../graphql/queries/__generated__/GetScrollPatients';
import LoadingDots from '../../elements/LoadingDots';
import { List } from './elements';
import PatientItem from './PatientItem';

type Props = {
  patients: GetScrollPatients_getScrollPatients_patients[];
  handleScroll: (e: React.UIEvent<HTMLUListElement, UIEvent>) => void;
  loading: boolean;
};

const PatientsList = ({ patients, handleScroll, loading }: Props) => {
  return (
    <>
      <List onScroll={(e) => handleScroll(e)}>
        {/* <li style={{ height: '60px' }}>asd</li>
        <li style={{ height: '60px' }}>asd</li>
        <li style={{ height: '60px' }}>asd</li>
        <li style={{ height: '60px' }}>asd</li>
        <li style={{ height: '60px' }}>asd</li>
        <li style={{ height: '60px' }}>asd</li>
        <li style={{ height: '60px' }}>asd</li>
        <li style={{ height: '60px' }}>asd</li>
        <li style={{ height: '60px' }}>asd</li>
        <li style={{ height: '60px' }}>asd</li> */}
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
      {loading && <LoadingDots />}
    </>
  );
};

export default PatientsList;
