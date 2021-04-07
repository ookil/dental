import React, { useState } from 'react';
import { GetFullPatient_patient } from '../../../graphql/queries/__generated__/GetFullPatient';
import DayPickerInput from '../../dayPickerInput/DayPickerInput';
import Input from '../../elements/Input';
import TextArea from '../../elements/TextArea';
import { InfoBox } from '../../modals/Modals.elements';
import { PatientContainer, Col } from '../Patients.elements';

type PatientInfoProps = {
  patient: GetFullPatient_patient | null;
};

const PatientInfoContent = ({ patient }: PatientInfoProps) => {
  const [patientData, setPatientData] = useState<
    Partial<GetFullPatient_patient>
  >({
    name: patient?.name,
    surname: patient?.surname,
    nationalId: patient?.nationalId,
    bday: patient?.bday,
    mobile: patient?.mobile,
    phone: patient?.phone,
    email: patient?.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <PatientContainer>
      <Col>
        <InfoBox label='Personal information'>
          <Input
            label='name'
            name='name'
            type='text'
            minLength={3}
            maxLength={30}
            onChange={(e) => handleChange(e)}
            layout='primary'
            value={patientData.name}
          />
          <Input
            label='surname'
            name='surname'
            type='text'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
            value={patientData.surname}
          />
          <Input
            label='ID number'
            name='nationalId'
            type='text'
            pattern='[0-9]*'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
            value={patientData.nationalId || ''}
          />

          <DayPickerInput handleDayChange={(e) => console.log(e)} />
        </InfoBox>
        <InfoBox label='Address'>
          <Input
            label='street'
            name='street'
            type='string'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
          />
          <Input
            label='House Number / Flat'
            name='houseNum'
            type='string'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
          />
          <Input
            label='City'
            name='city'
            type='string'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
          />
          <Input
            label='Zip Code'
            name='zipCode'
            type='string'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
          />
          <Input
            label='Country'
            name='country'
            type='string'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
          />
        </InfoBox>
      </Col>
      <Col>
        <InfoBox label='Contact Information'>
          <Input
            label='mobile'
            name='mobile'
            type='string'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
            value={patientData.mobile || ''}
          />

          <Input
            label='phone'
            name='phone'
            type='string'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
            value={patientData.phone || ''}
          />

          <Input
            label='email'
            name='email'
            type='email'
            minLength={3}
            maxLength={30}
            onChange={(e) => console.log(e)}
            layout='primary'
            value={patientData.email || ''}
          />
        </InfoBox>
        <TextArea label='Additional information' />
      </Col>
    </PatientContainer>
  );
};

export default PatientInfoContent;
