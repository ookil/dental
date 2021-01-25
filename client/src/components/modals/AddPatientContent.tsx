import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {
  ClinicDentistsData,
  ClinicDentistVar,
  GET_CLINIC_DENTISTS,
} from '../../graphql/queries/dentist';
import {
  ADD_PATIENT,
  ClinicPatient,
  NewPatientDetails,
} from '../../graphql/queries/patient';
import { openModal } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import { Button } from '../elements/Elements';
import { ButtonsWrapper, ModalTitle } from './Modals.elements';
import { PatientFormContent } from './PatientFormContent';

export type Patient = {
  [key: string]: string | number | null;
  name: string;
  surname: string;
  nationalId: number | null;
  email: string | null;
  dentistId: number | null;
};

const AddPatientContent: React.FC = () => {
  const [patientData, setPatientData] = useState<Patient>({
    name: '',
    surname: '',
    nationalId: null,
    email: null,
    dentistId: null,
  });

  const { loading, data } = useQuery<ClinicDentistsData, ClinicDentistVar>(
    GET_CLINIC_DENTISTS,
    {
      variables: {
        clinicId: 7,
      },
    }
  );

  const dentists = data && data.clinicDentists;

  const [addPatient, { error, loading: mutationLoading }] = useMutation<
    { createPatient: ClinicPatient },
    { patientData: NewPatientDetails }
  >(ADD_PATIENT, {
    variables: {
      patientData: {
        ...patientData,
        clinicId: 7,
      },
    },
  });

  console.log(error?.graphQLErrors);

  const handleAddPatient = (e: any) => {
    e.preventDefault();
    if (
      patientData.name &&
      patientData.surname &&
      patientData.nationalId &&
      patientData.dentistId
    ) {
      addPatient();
      if (!loading && !error?.message) {
        dispatch(openModal(false));
      }
    }
  };

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, id: number) => {
    setPatientData({
      ...patientData,
      [name]: id,
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ModalTitle>Add Patient</ModalTitle>
      <form id='patientForm' onSubmit={handleAddPatient}>
        <PatientFormContent
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          options={dentists}
        />
      </form>
      <p>{error && error.message}</p>
      <ButtonsWrapper>
        <Button onClick={() => dispatch(openModal(false))}>Cancel</Button>
        <Button primary type='submit' form='patientForm'>
          Confirm
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default AddPatientContent;
