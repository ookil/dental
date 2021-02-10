import React, { useEffect, useRef, useState } from 'react';
import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  subWeeks,
  format,
} from 'date-fns';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Label } from '../elements/Elements';
import {
  DayPickerContainer,
  DayPickerWrapper,
  Indicator,
  IndicatorButton,
  StyledDayPicker,
  WeekDisplay,
  WeekPickerWrapper,
} from './CustomDayPicke.Elements';
import SelectedDaysDisplay from './SelectedDaysDisplay';
import { useQuery } from '@apollo/client';
import {
  GET_WEEKLY_APPOINTMENTS,
  WeeklyAppointmentsData,
  WeeklyAppointmentsVars,
} from '../../graphql/queries/appointments';
import { clinicIdVar } from '../../cache';

function getWeekDays(week: Week) {
  const days = eachDayOfInterval(week);
  return days;
}

function getWeekRange(date: Date) {
  const res = {
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  };
  return res;
}

type Week = {
  start: Date;
  end: Date;
};

type Props = {
  dentistId: number | string;
};

const CustomDayPicker: React.FC<Props> = ({ dentistId }) => {
  const [selectedDays, setSelectedDays] = useState<Date[]>();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [selectedWeek, setSelectedWeek] = useState<Week>();
  const [currentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const clinicId = clinicIdVar();

  const { data: availableAppointments } = useQuery<
    WeeklyAppointmentsData,
    WeeklyAppointmentsVars
  >(GET_WEEKLY_APPOINTMENTS, {
    variables: {
      appointmentsInput: {
        days: selectedDays!,
        clinicId,
        dentistId,
        currentDate,
      },
    },
    skip: !dentistId,
    fetchPolicy: 'network-only',
  });

  const handleWeekChange = (action: 'ADD' | 'SUB') => {
    setSelectedDay(undefined);
    if (selectedWeek) {
      let newSelectedWeek = selectedWeek;
      if (action === 'ADD') {
        newSelectedWeek = {
          start: addWeeks(new Date(selectedWeek.start), 1),
          end: addWeeks(new Date(selectedWeek.end), 1),
        };
      } else if (action === 'SUB') {
        newSelectedWeek = {
          start: subWeeks(new Date(selectedWeek.start), 1),
          end: subWeeks(new Date(selectedWeek.end), 1),
        };
      }

      const newSelectedDays = getWeekDays(newSelectedWeek);
      setSelectedWeek(newSelectedWeek);
      setSelectedDays(newSelectedDays);
    }
  };

  const handleDayChange = (date: Date) => {
    setSelectedDay(date);
    setSelectedDays(getWeekDays(getWeekRange(date)));
    setSelectedWeek(getWeekRange(date));
    setIsOpen(false);
  };

  useEffect(() => {
    const today = new Date();
    setSelectedDays(getWeekDays(getWeekRange(today)));
    setSelectedWeek(getWeekRange(today));
  }, []);

  const pickerRef = useRef<DayPicker>();

  //click outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        pickerRef &&
        pickerRef.current &&
        !pickerRef.current.dayPicker.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pickerRef]);

  let modifiers;
  if (selectedDays && selectedDays.length > 0) {
    modifiers = {
      selectedRangeStart: selectedDays[0],
      selectedRangeEnd: selectedDays[6],
    };
  }

  return (
    <DayPickerContainer>
      <Label>Choose date</Label>
      <WeekPickerWrapper>
        <IndicatorButton onClick={() => handleWeekChange('SUB')} left>
          <Indicator />
        </IndicatorButton>
        <WeekDisplay onClick={() => setIsOpen(!isOpen)}>
          {selectedDays &&
            selectedDays.length === 7 &&
            format(new Date(selectedDays[0]), 'dd LLL') +
              ' - ' +
              format(new Date(selectedDays[6]), 'dd LLL')}
        </WeekDisplay>
        <IndicatorButton onClick={() => handleWeekChange('ADD')}>
          <Indicator />
        </IndicatorButton>
      </WeekPickerWrapper>
      {isOpen && (
        <DayPickerWrapper>
          <StyledDayPicker
            month={selectedDays ? selectedDays[0] : new Date()}
            ref={pickerRef}
            selectedDays={selectedDays}
            showOutsideDays
            modifiers={modifiers}
            onDayClick={handleDayChange}
            firstDayOfWeek={1}
          />
        </DayPickerWrapper>
      )}
      <SelectedDaysDisplay
        availableAppointments={availableAppointments}
        selectedDay={selectedDay}
      />
    </DayPickerContainer>
  );
};

export default CustomDayPicker;
