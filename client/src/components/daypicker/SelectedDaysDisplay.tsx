import { format } from 'date-fns';
import React from 'react';
import {
  CountDisplay,
  DayButton,
  DayWrapper,
  WeekWrapper,
} from './SelectedDaysDisplay.Elements';

type Props = {
  selectedDays?: Date[];
};

const SelectedDaysDisplay: React.FC<Props> = ({ selectedDays }) => {
  return (
    <WeekWrapper>
      {selectedDays?.map((day, index) => (
        <DayWrapper key={index}>
          <DayButton>{format(new Date(day), 'dd')}</DayButton>
          <CountDisplay>13</CountDisplay>
        </DayWrapper>
      ))}
    </WeekWrapper>
  );
};

export default SelectedDaysDisplay;
