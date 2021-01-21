import React from 'react';
import { Button } from '../elements/Elements';
import Input from '../elements/Input';
import Select from '../elements/Select';
import { ButtonsWrapper, ModalTitle } from './Modals.elements';

const AddPatientContent: React.FC = () => {
  return (
    <>
      <ModalTitle>Add Patient</ModalTitle>
      <form>
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
      </form>
      <ButtonsWrapper>
        <Button>Cancel</Button>
        <Button primary>Confirm</Button>
      </ButtonsWrapper>
    </>
  );
};

export default AddPatientContent;
