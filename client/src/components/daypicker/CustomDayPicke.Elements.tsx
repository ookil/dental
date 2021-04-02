import DayPicker from 'react-day-picker';
import styled from 'styled-components';
import { color } from '../../globalStyles';

const { bluePrimary } = color;

export const Indicator = () => (
  <svg
    width='25'
    height='25'
    viewBox='0 0 25 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M9 19L17 12.4999L9 6'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const DayPickerContainer = styled.div`
  position: relative;
`;

export const WeekPickerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 13px;
  margin-bottom: 5px;
`;

export const IndicatorButton = styled.div<{ left?: boolean }>`
  color: ${bluePrimary};
  height: 25px;
  transform: rotate(${({ left }) => (left ? '180deg' : 0)});
  cursor: pointer;
`;

export const WeekDisplay = styled.div`
  font-weight: 500;
  cursor: pointer;
`;

export const DayPickerWrapper = styled.div<{ ref?: any }>``;

export const StyledDayPicker = styled(DayPicker)<{ ref?: any }>`
  width: 100%;
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  border-radius: 10px;
  box-shadow: -4px -4px 5px rgba(0, 0, 0, 0.25), 5px 3px 5px rgba(0, 0, 0, 0.25);

  .DayPicker-wrapper {
    background-color: white;
    outline: none;
  }

  .DayPicker-Body {
    font-size: 14px;
  }

  .DayPicker-Day.DayPicker-Day--selected {
    background-color: ${bluePrimary};
  }
`;
