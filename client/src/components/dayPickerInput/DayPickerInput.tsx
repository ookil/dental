import { format, isValid } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { Label } from '../elements/Elements';
import {
  BdayPicker,
  CalendarButton,
  Container,
  FlexBox,
  Separator,
  WrapperBox,
} from './DayPickerInput.elements';
import InputBox from './InputBox';
import YearMonthForm from './YearMonthForm';

const currentYear = new Date().getFullYear();
const currentMonth = new Date();
const fromMonth = new Date(currentYear - 100, 0);
const toMonth = new Date(currentYear, 11);

type BdayProps = {
  handleDayChange: (key: string, value: string | number) => void;
};

const DayPickerInput = ({ handleDayChange }: BdayProps) => {
  const [activeInput, setActiveInput] = useState(-1);
  const [date, setDate] = useState({ day: '', month: '', year: '' });
  const [isOpen, setOpen] = useState(false);
  const [month, setMonth] = useState(currentMonth);
  const [selectedDay, setSelectedDay] = useState<Date>();

  const focusInput = (inputIndex: number) => {
    const selectedIndex = Math.max(Math.min(2, inputIndex), 0);
    setActiveInput(selectedIndex);
  };

  const focusNextInput = () => {
    setActiveInput((prev) => prev + 1);
  };

  const changeCodeAtFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxLength: number
  ) => {
    changeCodeAtFocus(e);

    const val = e.currentTarget.value;

    if (val.length === maxLength) {
      focusNextInput();
    }
  };

  const handleDayClick = (day: Date, { selected }: DayModifiers) => {
    if (selected) {
      setSelectedDay(undefined);
    } else {
      setSelectedDay(day);
      setDate({
        day: format(day, 'dd'),
        month: format(day, 'MM'),
        year: `${day.getFullYear()}`,
      });
      handleDayChange('bday', day.toISOString());
      setOpen(false);
    }
  };

  useEffect(() => {
    const { day, month, year } = date;
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      const writtenDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      if (isValid(writtenDate)) {
        setSelectedDay(writtenDate);
        handleDayChange('bday', writtenDate.toISOString());
      }
    }
  }, [date, handleDayChange]);

  const pickerRef = useRef<DayPicker>();

  //click outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        pickerRef &&
        pickerRef.current &&
        !pickerRef.current.dayPicker.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pickerRef]);

  return (
    <FlexBox>
      <Container>
        <Label layout='primary'>Birth Day</Label>
        <WrapperBox>
          <InputBox
            focus={activeInput === 0}
            onFocus={() => focusInput(0)}
            onChange={(e) => handleOnChange(e, 2)}
            value={date.day}
            name='day'
            type='text'
            placeholder='DD'
            maxLength={2}
            autoComplete='false'
          />
          <Separator>-</Separator>
          <InputBox
            focus={activeInput === 1}
            onFocus={() => focusInput(1)}
            onChange={(e) => handleOnChange(e, 2)}
            value={date.month}
            name='month'
            type='text'
            placeholder='MM'
            maxLength={2}
            autoComplete='false'
          />
          <Separator>-</Separator>
          <InputBox
            focus={activeInput === 2}
            onFocus={() => focusInput(2)}
            onChange={(e) => handleOnChange(e, 4)}
            value={date.year}
            name='year'
            type='text'
            placeholder='YYYY'
            maxLength={4}
            width={40}
            autoComplete='false'
          />
        </WrapperBox>
      </Container>
      <CalendarButton handleClick={() => setOpen((prev) => !prev)} />
      {isOpen && (
        <BdayPicker
          selectedDays={selectedDay}
          onDayClick={handleDayClick}
          month={selectedDay ? selectedDay : month}
          fromMonth={fromMonth}
          toMonth={toMonth}
          firstDayOfWeek={1}
          ref={pickerRef}
          captionElement={({ localeUtils }) => (
            <YearMonthForm
              date={selectedDay ? selectedDay : month}
              localeUtils={localeUtils}
              onChange={(month) => {
                setSelectedDay(undefined);
                setMonth(month);
              }}
            />
          )}
        />
      )}
    </FlexBox>
  );
};

export default DayPickerInput;
