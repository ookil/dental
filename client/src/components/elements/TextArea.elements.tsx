import styled from 'styled-components';
import { Label } from './Elements';
import { color } from '../../globalStyles';

export const TextAreaLabel = styled(Label)<{ isActive: boolean }>`
  position: absolute;
  top: 12px;
  left: 7px;
  font-size: 0.9em;
  background-color: white;
  transition: all 0.2s ease-in-out;

  ${({ isActive }) =>
    isActive &&
    `{
    color: ${color.bluePrimary};
    top: 0;
    font-size: 10px;
    transform: translateY(-50%);
  }
  `}
`;

export const DynamicTextArea = styled.div`
  width: 100%;
  margin-top: 20px;
  position: relative;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 150px;
  resize: none;
  outline: none;
  border: 1px solid #cdcdcd;
  background-color: rgb(244 244 244 / 60%);
`;
