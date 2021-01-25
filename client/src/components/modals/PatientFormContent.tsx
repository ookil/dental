import React from 'react';
import Input from '../elements/Input';
import Select from '../elements/Select';

interface PatientFormProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, id: number) => void;
  options?: any[];
}

export const PatientFormContent = ({
  handleChange,
  handleSelectChange,
  options,
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
      pattern='[0-9]*'
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
      options={options}
      handleSelectChange={handleSelectChange}
    />
  </>
);
