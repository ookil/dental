import React from 'react';
import DayPickerInput from '../dayPickerInput/DayPickerInput';
import Input from '../elements/Input';
import { InfoBox } from './Modals.elements';

interface PatientFormProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (key: string, value: string | number) => void;
  hide?: string[];
}

export const PatientFormContent = ({
  handleChange,
  handleSelectChange,
  hide,
}: PatientFormProps) => (
  <>
    <InfoBox label='Personal information'>
      <Input
        label='name'
        name='name'
        type='text'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />
      <Input
        label='surname'
        name='surname'
        type='text'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />
      <Input
        label='ID number'
        name='nationalId'
        type='text'
        pattern='[0-9]*'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />

      <DayPickerInput handleDayChange={handleSelectChange} />
    </InfoBox>

    <InfoBox label='Contact Information'>
      <Input
        label='mobile'
        name='mobile'
        type='string'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />

      <Input
        label='phone'
        name='phone'
        type='string'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />

      <Input
        label='email'
        name='email'
        type='email'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />
    </InfoBox>

    <InfoBox label='Address'>
      <Input
        label='street'
        name='street'
        type='string'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />
      <Input
        label='House Number / Flat'
        name='houseNum'
        type='string'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />
      <Input
        label='City'
        name='city'
        type='string'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />
      <Input
        label='Zip Code'
        name='zipCode'
        type='string'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />
      <Input
        label='Country'
        name='country'
        type='string'
        minLength={3}
        maxLength={30}
        onChange={(e) => handleChange(e)}
        layout='primary'
      />
    </InfoBox>
  </>
);
