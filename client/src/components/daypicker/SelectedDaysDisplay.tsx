import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
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
  selectedDay?: Date;
};

const SelectedDaysDisplay: React.FC<Props> = ({
  availableAppointments,
  selectedDay,
}) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number>();

  const handleClick = (day: WeeklyAppointments, index: number) => {
    dispatch(setAvailableAppointments(day.appointments));
    setSelected(index);
  };

  useEffect(() => {
    if (availableAppointments) {
      const firstFreeDayIndex = availableAppointments.weeklyAppointments.findIndex(
        (date) => date.appointments.length > 0
      );

      let index = firstFreeDayIndex;

      if (selectedDay) {
        const selectedDayIndex = availableAppointments.weeklyAppointments.findIndex(
          (date) => new Date(date.date).getDate() === selectedDay.getDate()
        );

        // if selected day is sat or sunday and it was not found in array select first free day
        if (selectedDayIndex !== -1) index = selectedDayIndex;
      }

      if (index !== -1) {
        setSelected(index);
        dispatch(
          setAvailableAppointments(
            availableAppointments.weeklyAppointments[index].appointments
          )
        );
      }
    }
  }, [availableAppointments, selectedDay, dispatch]);

  return (
    <WeekWrapper>
      {availableAppointments?.weeklyAppointments.map((day, index) => (
        <DayContainer key={index}>
          <DayName>{format(new Date(day.date), 'iii')}</DayName>
          <DayWrapper onClick={() => handleClick(day, index)}>
            <DayButton
              disabled={day.appointments.length === 0}
              isActive={selected === index}
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
