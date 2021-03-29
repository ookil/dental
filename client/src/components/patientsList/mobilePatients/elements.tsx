import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../../../globalStyles';

export const List = styled.ul`
  list-style: none;
`;

export const AddPatientButton = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: ${color.bluePrimary};
  color: white;
  position: sticky;
  bottom: 10%;
  right: 10%;
  cursor: pointer;
`;
