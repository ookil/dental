import styled, { css } from 'styled-components';
import { color } from '../../globalStyles';

const { bluePrimary, blueSecondary, textPrimary, textSecondary } = color;

const handleProps = (props: any) => {
  if (props.disabled && props.isActive) {
    return css`
      color: white;
      background-color: #c4c4c4;
      box-shadow: 0px 0px 4px 1px #c4c4c4;
    `;
  }
  if (props.isActive && props.disabled === false) {
    return css`
      color: white;
      border: 2px solid ${bluePrimary};
      box-shadow: 0px 0px 4px 1px ${blueSecondary};
      background-color: ${blueSecondary};
    `;
  }
  if (props.disabled) {
    return css`
      color: ${textSecondary};
      border: 2px solid ${textSecondary};
    `;
  } else {
    return css`
      color: ${textPrimary};
      border: 2px solid ${bluePrimary};
    `;
  }

};

export const DayButton = styled.div<{ disabled?: boolean; isActive: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) => handleProps(props)}

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? '#C4C4C4' : blueSecondary};
    box-shadow: 0px 0px 4px 1px
      ${({ disabled }) => (disabled ? '#C4C4C4' : blueSecondary)};
    color: white;
  }
`;

export const WeekWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
`;

export const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DayWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const DayName = styled.p`
  color: ${textSecondary};
  font-size: 0.75rem;
  margin-bottom: 20px;
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
