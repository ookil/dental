import { useMutation } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { ADD_PATIENT } from '../../graphql/queries/patient';
import { changeResponseModal, openModal } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import { Button, Gif, GifWrapper } from '../elements/Elements';
import { ButtonsWrapper, ModalTitle, ScrollBox } from './Modals.elements';
import { PatientFormContent } from './PatientFormContent';
import { clinicIdVar } from '../../cache';
import {
  AddPatient,
  AddPatientVariables,
} from '../../graphql/queries/__generated__/AddPatient';
import { CreatePatientInput } from '../../../__generated__/globalTypes';
import { useHistory } from 'react-router';
import loadingGif from '../../images/loading.gif';

const AddPatientContent: React.FC = () => {
  const [height, setHeight] = useState<number>();

  const history = useHistory();

  useEffect(() => {
    const windowHeight = window.screen.height;
    setHeight(windowHeight);
  }, []);

  const clinicId = clinicIdVar();

  const [patientData, setPatientData] = useState<CreatePatientInput>({
    name: '',
    surname: '',
    nationalId: null,
    bday: null,
    mobile: null,
    phone: null,
    email: null,
    street: null,
    houseNum: null,
    city: null,
    zipCode: null,
    country: null,
    clinicId,
  });

  const [addPatient, { loading: addPatientLoading }] = useMutation<
    AddPatient,
    AddPatientVariables
  >(ADD_PATIENT, {
    onCompleted(data) {
      dispatch(
        changeResponseModal({
          status: 'CONFIRMATION',
          message: 'Patient successfully added.',
        })
      );
      dispatch(openModal(false));

      history.push(`/patient/${data.createPatient.id}`);
    },
    onError() {
      dispatch(
        changeResponseModal({
          status: 'ERROR',
          message: 'Something went wrong, please try again.',
        })
      );
    },
  });

  const handleAddPatientSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (patientData.name === '' || patientData.surname === '') {
      dispatch(
        changeResponseModal({
          status: 'ERROR',
          message: 'Please provide name and surname.',
        })
      );
    }

    if (patientData.name && patientData.surname && clinicId) {
      addPatient({
        variables: {
          patientData: {
            ...patientData,
          },
        },
      });
    }
  };

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = useCallback(
    (key: string, value: number | string) => {
      setPatientData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    []
  );
  if (addPatientLoading) {
    return (
      <GifWrapper>
        <Gif src={loadingGif} />
      </GifWrapper>
    );
  }

  return (
    <>
      <ModalTitle>Add Patient</ModalTitle>
      <ScrollBox height={height}>
        <form id='patientForm' onSubmit={handleAddPatientSubmit}>
          <PatientFormContent
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        </form>
      </ScrollBox>
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
