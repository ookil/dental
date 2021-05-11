import React, { useState } from 'react';
import { GetPatientInfo_patient } from '../../../../graphql/queries/__generated__/GetPatientInfo';
import DayPickerInput from '../../../dayPickerInput/DayPickerInput';
import { Button } from '../../../elements/Elements';
import Input from '../../../elements/Input';
import Switcher from '../../../elements/Switcher';
import TextArea from '../../../elements/TextArea';
import { InfoBox } from '../../../modals/Modals.elements';
import {
  PatientContainer,
  Col,
  MutationButtons,
  DeletePatientButton,
} from '../../Patients.elements';

type PatientInfoProps = {
  patient: GetPatientInfo_patient;
};

const PatientInfoContent = ({ patient }: PatientInfoProps) => {
  const [isUpdated, setIsUpdated] = useState(false);

  const [changedData, setChangedData] = useState<{ [key: string]: any }>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUpdated(true);
    setChangedData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = <T extends any>(key: string, value: T) => {
    setIsUpdated(true);
    setChangedData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCancel = () => {
    setIsUpdated(false);
    setChangedData(undefined);
  };

  return (
    <div style={{ height: 'inherit' }}>
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
              value={
                isUpdated
                  ? changedData?.name
                    ? changedData.name
                    : patient?.name
                  : patient?.name || ''
              }
            />
            <Input
              label='surname'
              name='surname'
              type='text'
              minLength={3}
              maxLength={30}
              onChange={(e) => handleChange(e)}
              layout='primary'
              value={
                isUpdated
                  ? changedData?.surname
                    ? changedData.surname
                    : patient?.surname
                  : patient?.surname
              }
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
              value={
                isUpdated
                  ? changedData?.nationalId
                    ? changedData.nationalId
                    : patient?.nationalId || ''
                  : patient?.nationalId || ''
              }
            />
            <DayPickerInput handleDayChange={handleSelectChange} />
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
              value={
                isUpdated
                  ? changedData?.street
                    ? changedData.street
                    : patient?.address?.street || ''
                  : patient?.address?.street || ''
              }
            />
            <Input
              label='House Number / Flat'
              name='houseNum'
              type='string'
              minLength={3}
              maxLength={30}
              onChange={(e) => handleChange(e)}
              layout='primary'
              value={
                isUpdated
                  ? changedData?.houseNum
                    ? changedData.houseNum
                    : patient?.address?.houseNum || ''
                  : patient?.address?.houseNum || ''
              }
            />
            <Input
              label='City'
              name='city'
              type='string'
              minLength={3}
              maxLength={30}
              onChange={(e) => handleChange(e)}
              layout='primary'
              value={
                isUpdated
                  ? changedData?.city
                    ? changedData.city
                    : patient?.address?.city || ''
                  : patient?.address?.city || ''
              }
            />
            <Input
              label='Zip Code'
              name='zipCode'
              type='string'
              minLength={3}
              maxLength={30}
              onChange={(e) => handleChange(e)}
              layout='primary'
              value={
                isUpdated
                  ? changedData?.zipCode
                    ? changedData.zipCode
                    : patient?.address?.zipCode || ''
                  : patient?.address?.zipCode || ''
              }
            />
            <Input
              label='Country'
              name='country'
              type='string'
              minLength={3}
              maxLength={30}
              onChange={(e) => handleChange(e)}
              layout='primary'
              value={
                isUpdated
                  ? changedData?.country
                    ? changedData.country
                    : patient?.address?.country || ''
                  : patient?.address?.country || ''
              }
            />
          </InfoBox>
        </Col>
        <Col col='second'>
          <InfoBox label='Contact Information'>
            <Input
              label='mobile'
              name='mobile'
              type='string'
              minLength={3}
              maxLength={30}
              onChange={(e) => handleChange(e)}
              layout='primary'
              value={
                isUpdated
                  ? changedData?.mobile
                    ? changedData.mobile
                    : patient?.mobile || ''
                  : patient?.mobile || ''
              }
            />
            <Input
              label='phone'
              name='phone'
              type='string'
              minLength={3}
              maxLength={30}
              onChange={(e) => handleChange(e)}
              layout='primary'
              value={
                isUpdated
                  ? changedData?.phone
                    ? changedData.phone
                    : patient?.phone || ''
                  : patient?.phone || ''
              }
            />
            <Input
              label='email'
              name='email'
              type='email'
              minLength={3}
              maxLength={30}
              onChange={(e) => handleChange(e)}
              layout='primary'
              value={
                isUpdated
                  ? changedData?.email
                    ? changedData.email
                    : patient?.email || ''
                  : patient?.email || ''
              }
            />
          </InfoBox>
          <TextArea label='Additional Information' />

          <InfoBox label='Patient Status'>
            <Switcher
              keyName='active'
              trueLabel='Active'
              falseLabel='Inactive'
              handleSwitchChange={handleSelectChange}
              isActive={
                isUpdated
                  ? changedData?.active !== undefined
                    ? changedData.active
                    : patient.active
                  : patient.active
              }
            />
            <DeletePatientButton>Delete Patient</DeletePatientButton>
          </InfoBox>
        </Col>
      </PatientContainer>
      {isUpdated && (
        <MutationButtons>
          <Button primary width='55%'>
            Save changes
          </Button>
          <Button onClick={handleCancel} width='30%'>
            Cancel
          </Button>
        </MutationButtons>
      )}
    </div>
  );
};

export default PatientInfoContent;
