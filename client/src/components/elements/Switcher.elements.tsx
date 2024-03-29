import styled from 'styled-components';
import { color } from '../../globalStyles';

const { greenConfirm, textSecondary } = color;

export const SwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SwitcherBackground = styled.div<{ isActive: boolean }>`
  width: 50px;
  height: 25px;
  border-radius: 999px;
  background-color: ${({ isActive }) =>
    isActive ? greenConfirm : textSecondary};
  position: relative;
  transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
`;

export const SwitcherCircle = styled.div<{ isActive: boolean }>`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 2px;
  left: 3px;

  transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;

  ${({ isActive }) =>
    isActive &&
    `
    left: calc(100% - 24px);
  `};
`;

export const SwitcherLabel = styled.p`
  font-size: 0.9em;
  margin-left: 5px;
`;


