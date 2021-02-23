import React from 'react';
import Input from '../elements/Input';
import Select from '../elements/Select';

interface PatientFormProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (key: string, value: string | number) => void;
  options?: any[];
  errors?: string[];
}

export const PatientFormContent = ({
  handleChange,
  handleSelectChange,
  options,
  errors,
}: PatientFormProps) => (
  <>
    <Input
      label='name'
      name='name'
      type='text'
      required
      minLength={3}
      maxLength={30}
      isError={errors?.includes('name')}
      errorMsg='Must be shorther than or equal 10 characters'
      onChange={(e) => handleChange(e)}
    />
    <Input
      label='surname'
      name='surname'
      type='text'
      required
      minLength={3}
      maxLength={30}
      isError={errors?.includes('surname')}
      errorMsg='Must be shorther than or equal 10 characters'
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
      isError={errors?.includes('nationalId')}
      errorMsg='Must be shorther than or equal 10 characters'
      onChange={(e) => handleChange(e)}
    />
    <Input
      label='email'
      name='email'
      type='email'
      minLength={3}
      maxLength={30}
      isError={errors?.includes('email')}
      errorMsg='Must be a valid email adress'
      onChange={(e) => handleChange(e)}
    />
    <Select
      label='dentist'
      fieldName='dentistId'
      displayValue='nameWithSurname'
      readFrom='id'
      placeholder='Please select dentist'
      isError={errors?.includes('dentistId')}
      errorMsg='Dentist not selected'
      options={options}
      handleSelectChange={handleSelectChange}
    />
  </>
);
