import React from 'react';
import { openModal } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import { Button } from '../elements/Elements';
import Input from '../elements/Input';
import Select from '../elements/Select';
import { ButtonsWrapper, ModalTitle } from './Modals.elements';

export const PatientFormContent = () => (
  <>
    <Input
      label='name'
      name='name'
      type='text'
      required
      minLength={3}
      maxLength={30}
    />
    <Input
      label='surname'
      name='surname'
      type='text'
      required
      minLength={3}
      maxLength={30}
    />
    <Input
      label='id number'
      name='id_number'
      type='text'
      required
      minLength={3}
      maxLength={30}
    />
    <Input
      label='email'
      name='email'
      type='email'
      minLength={3}
      maxLength={30}
    />
    <Select label='dentist' placeholder='Please select dentist' />
  </>
);

const AddPatientContent: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <ModalTitle>Add Patient</ModalTitle>
      <form>
        <PatientFormContent />
      </form>
      <ButtonsWrapper>
        <Button onClick={() => dispatch(openModal(false))}>Cancel</Button>
        <Button primary>Confirm</Button>
      </ButtonsWrapper>
    </>
  );
};

export default AddPatientContent;
