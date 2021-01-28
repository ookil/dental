import { format } from 'date-fns';
import React, { useState } from 'react';
import {
  WeeklyAppointments,
  WeeklyAppointmentsData,
} from '../../graphql/queries/appointments';
import { setAvailableAppointments } from '../../store/slices/modalsSlice';
import { useAppDispatch } from '../../store/store';
import {
  CountDisplay,
  DayButton,
  DayContainer,
  DayName,
  DayWrapper,
  WeekWrapper,
} from './SelectedDaysDisplay.Elements';

type Props = {
  availableAppointments?: WeeklyAppointmentsData;
};

const SelectedDaysDisplay: React.FC<Props> = ({ availableAppointments }) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number>();

  const handleClick = (day: WeeklyAppointments, index: number) => {
    dispatch(setAvailableAppointments(day.appointments));
    setSelected(index);
  };

  return (
    <WeekWrapper>
      {availableAppointments?.weeklyAppointments.map((day, index) => (
        <DayContainer key={index}>
          <DayName>{format(new Date(day.date), 'iii')}</DayName>
          <DayWrapper onClick={() => handleClick(day, index)}>
            <DayButton
              disabled={day.appointments.length === 0 ? true : false}
              isActive={index === selected ? true : false}
            >
              {format(new Date(day.date), 'dd')}
            </DayButton>
            {day.appointments.length > 0 && (
              <CountDisplay>{day.appointments.length}</CountDisplay>
            )}
          </DayWrapper>
        </DayContainer>
      ))}
    </WeekWrapper>
  );
};

export default SelectedDaysDisplay;
