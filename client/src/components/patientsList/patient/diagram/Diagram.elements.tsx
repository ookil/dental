import styled from 'styled-components';
import { color } from '../../../../globalStyles';

export const DiagramBox = styled.div`
  min-width: 990px;
  height: 500px;
  background-color: #f5f5f5;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 225px 225px;
  grid-gap: 50px 25px;
  padding: 0 10px;
`;

export const DashedSeparator = styled.div`
  border: none;
  border-top: 1px dashed ${color.textSecondary};
  width: 90%;
  position: absolute;
`;
