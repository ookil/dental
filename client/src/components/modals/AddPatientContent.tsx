import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
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
import { ButtonsWrapper, Gif, GifWrapper, ModalTitle } from './Modals.elements';
import { PatientFormContent } from './PatientFormContent';
import loadingGif from '../../images/loading.gif';
import completedGif from '../../images/completed.gif';

export type Patient = {
  [key: string]: string | number | null;
  name: string;
  surname: string;
  nationalId: number | null;
  email: string | null;
  dentistId: number | null;
};

const clinicId = 1

const AddPatientContent: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isCompleted, setCompleted] = useState(false);

  const [patientData, setPatientData] = useState<Patient>({
    name: '',
    surname: '',
    nationalId: null,
    email: null,
    dentistId: null,
  });

  const { loading: dentistsLoading, data } = useQuery<
    ClinicDentistsData,
    ClinicDentistVar
  >(GET_CLINIC_DENTISTS, {
    variables: {
      clinicId,
    },
  });

  const dentists = data && data.clinicDentists;

  const [addPatient, { error, loading: addPatientLoading }] = useMutation<
    { createPatient: ClinicPatient },
    { patientData: NewPatientDetails }
  >(ADD_PATIENT, {
    onCompleted() {
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        dispatch(openModal(false));
      }, 2000);
    },
  });

  const validationErrors =
    error?.graphQLErrors[0].extensions?.exception?.validationErrors || null;

  useEffect(() => {
    if (validationErrors) {
      validationErrors.forEach((validationError: any) => {
        setErrors((errors) => [...errors, validationError.property]);
        console.log(validationError.property);
      });
    }
  }, [validationErrors]);

  const handleAddPatientSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (patientData.dentistId === null) {
      setErrors((errors) => [...errors, 'dentistId']);
    }
    if (
      patientData.name &&
      patientData.surname &&
      patientData.nationalId &&
      patientData.dentistId
    ) {
      addPatient({
        variables: {
          patientData: {
            ...patientData,
            clinicId,
          },
        },
      });
    }
  };

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (key: string, value: number | string) => {
    setPatientData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  if (dentistsLoading || addPatientLoading)
    return (
      <GifWrapper>
        <Gif src={loadingGif} />;
      </GifWrapper>
    );

  if (isCompleted) {
    return (
      <GifWrapper>
        <Gif src={completedGif} />
      </GifWrapper>
    );
  }

  return (
    <>
      <ModalTitle>Add Patient</ModalTitle>
      <form id='patientForm' onSubmit={handleAddPatientSubmit}>
        <PatientFormContent
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          options={dentists}
          errors={errors}
        />
      </form>
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
