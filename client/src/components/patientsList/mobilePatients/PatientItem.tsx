import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GetOffsetPatients_getOffsetPatients_patients } from '../../../graphql/queries/__generated__/GetOffsetPatients';

const Item = styled.li`
  height: 50px;
  padding: 5px 30px 5px 10px;
`;

const Separator = styled.li`
  height: 25px;
  padding: 5px 10px 5px 10px;
  font-weight: bold;
  position: relative;
  width: 35px;
  background: #def2fa;
  box-shadow: 0 0 2px 1px #def2fa;
  color: #1b1b1b;

  p {
    line-height: 15px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  border-bottom: 1px solid rgb(141 141 151 / 30%);
`;

const Text = styled.p``;

export const LinkItem = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

type Props = {
  patient: GetOffsetPatients_getOffsetPatients_patients;
  firstLetter?: boolean;
};

const PatientItem = ({ patient, firstLetter }: Props) => {
  return (
    <>
      {firstLetter && (
        <Separator>
          <p>{patient.surname[0].toUpperCase()}</p>
        </Separator>
      )}
      <Item>
        <LinkItem to={`/patient/${patient.id}`}>
          <Wrapper>
            <Text>{patient.surname + ' ' + patient.name}</Text>
          </Wrapper>
        </LinkItem>
      </Item>
    </>
  );
};

export default PatientItem;
