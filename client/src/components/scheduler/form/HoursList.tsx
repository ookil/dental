import { format, getMinutes } from 'date-fns';
import React, { useState } from 'react';
import { GetAppointmentsList_appointmentsList } from '../../../graphql/queries/__generated__/GetAppointmentsList';
import { AppointmentList, AppointmentDuration } from './Form.elements';

const checkIfFullH = (date: Date) => {
  const minutes = getMinutes(date);
  return minutes === 0;
};

const getRange = (start: number, end: number) => {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};

type Props = {
  startDate: Date;
  endDate: Date;
  times: GetAppointmentsList_appointmentsList[];
  onFieldChange: (change: any) => void;
};

const HoursList = ({ startDate, endDate, times, onFieldChange }: Props) => {
  const initialStartIndex = times.findIndex(
    (el) => format(startDate, 'HH:mm') === format(el.startAt, 'HH:mm')
  );

  const initialEndIndex = times.findIndex(
    (el) => format(endDate, 'HH:mm') === format(el.endAt, 'HH:mm')
  );

  const [indexesRange, setRange] = useState(
    getRange(initialStartIndex, initialEndIndex)
  );

  const [isSelecting, setSelecting] = useState(false);

  const handleSelect = () => {
    const startIndex = Math.min(...indexesRange);
    const endIndex = Math.max(...indexesRange);

    onFieldChange({ startDate: times[startIndex].startAt });
    onFieldChange({ endDate: times[endIndex].endAt });
  };

  return (
    <AppointmentList
      onMouseDown={() => setSelecting(true)}
      onMouseUp={() => setSelecting(false)}
    >
      {times.map((item, index) => (
        <AppointmentDuration
          key={index}
          fullH={checkIfFullH(item.endAt)}
          isSelecting={isSelecting}
          selected={indexesRange?.includes(index) || false}
          working={item.working}
          busy={item.busy}
          onMouseDown={() => {
            setRange([index]);
          }}
          onMouseUp={handleSelect}
          onMouseEnter={() => {
            if (isSelecting)
              setRange((prev) => {
                if (prev) {
                  return [...prev, index];
                }
                return [];
              });
          }}
        >
          {`${format(item.startAt, 'HH:mm')} - ${format(item.endAt, 'HH:mm')}`}
        </AppointmentDuration>
      ))}
    </AppointmentList>
  );
};

export default HoursList;
