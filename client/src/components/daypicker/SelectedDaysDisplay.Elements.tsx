import styled from 'styled-components';
import { color } from '../../globalStyles';

const { bluePrimary, blueSecondary, textPrimary, textSecondary } = color;

export const WeekWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
`;

export const DayWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const DayButton = styled.div<{ disabled?: boolean }>`
  width: 40px;
  height: 40px;
  color: ${({ disabled }) => (disabled ? textSecondary : textPrimary)};
  border-radius: 50%;
  border: 2px solid
    ${({ disabled }) => (disabled ? textSecondary : bluePrimary)};
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? '#C4C4C4' : blueSecondary};
    box-shadow: 0px 0px 4px 1px
      ${({ disabled }) => (disabled ? '#C4C4C4' : blueSecondary)};
    color: white;
  }
`;

export const CountDisplay = styled.div`
  position: absolute;
  right: -10px;
  top: -10px;
  width: 25px;
  height: 25px;
  background-color: ${bluePrimary};
  color: white;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
