import React, { useState } from 'react';
import { openModal } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import { Button } from '../elements/Elements';
import Input from '../elements/Input';
import Select from '../elements/Select';
import { ButtonsWrapper, ModalTitle } from './Modals.elements';

export type Patient = {
  [key: string]: string | number | null;
  name: string;
  surname: string;
  nationalId: number | null;
  email: string | null;
  dentistId: number | null;
};

export type PatientFormProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, id: number) => void;
};

export const PatientFormContent = ({
  handleChange,
  handleSelectChange,
}: PatientFormProps) => (
  <>
    <Input
      label='name'
      name='name'
      type='text'
      required
      minLength={3}
      maxLength={30}
      onChange={(e) => handleChange(e)}
    />
    <Input
      label='surname'
      name='surname'
      type='text'
      required
      minLength={3}
      maxLength={30}
      onChange={(e) => handleChange(e)}
    />
    <Input
      label='id number'
      name='nationalId'
      type='text'
      required
      minLength={3}
      maxLength={30}
      onChange={(e) => handleChange(e)}
    />
    <Input
      label='email'
      name='email'
      type='email'
      minLength={3}
      maxLength={30}
      onChange={(e) => handleChange(e)}
    />
    <Select
      label='dentist'
      name='dentistId'
      readFrom='id'
      placeholder='Please select dentist'
      handleSelectChange={handleSelectChange}
    />
  </>
);

const AddPatientContent: React.FC = () => {
  const [patientData, setPatientData] = useState<Patient>({
    name: '',
    surname: '',
    nationalId: null,
    email: null,
    dentistId: null,
  });

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

  return (
    <>
      <ModalTitle>Add Patient</ModalTitle>
      <form>
        <PatientFormContent
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />
      </form>
      <ButtonsWrapper>
        <Button onClick={() => dispatch(openModal(false))}>Cancel</Button>
        <Button primary>Confirm</Button>
      </ButtonsWrapper>
    </>
  );
};

export default AddPatientContent;
