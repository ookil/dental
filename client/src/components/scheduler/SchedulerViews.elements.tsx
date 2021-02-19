import {
  DayView,
  MonthView,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import { color } from '../../globalStyles';

const handleFormatDate = (date: any) => format(new Date(date), 'H:mm');

// style for timescale labels
const StyledTimeScaleLabel = styled(DayView.TimeScaleLabel)`
  && {
    padding-left: 8px;
  }
`;

export const TimeScaleLabel = ({
  formatDate,
  ...restProps
}: DayView.TimeScaleLabelProps) => (
  <StyledTimeScaleLabel {...restProps} formatDate={handleFormatDate} />
);

// styling that col with time scale
const StyledTimeScaleLayout = styled(DayView.TimeScaleLayout)`
  && {
    @media (max-width: 900px) {
      table:first-of-type {
        width: 25px;
      }
    }
  }
`;

export const TimeScaleLayout = (props: DayView.TimeScaleLayoutProps) => (
  <StyledTimeScaleLayout {...props} />
);

// bigger table with appointments in mobile view
const StyledTimeTableLayout = styled(DayView.TimeTableLayout)`
  && {
    @media (max-width: 500px) {
      min-width: ${({ isOneDentistView }) =>
        isOneDentistView ? '100%' : '450px'};
    }
  }
`;

type TimeTableLayoutProps = DayView.TimeTableLayoutProps & {
  isOneDentistView?: boolean;
};

export const TimeTableLayout = ({
  isOneDentistView,
  ...restProps
}: TimeTableLayoutProps) => (
  <StyledTimeTableLayout {...restProps} isOneDentistView={isOneDentistView} />
);

// bigger table with dates in mobile view
const StyledDayScaleLayout = styled(DayView.DayScaleLayout)`
  && {
    font-family: 'Montserrat', sans-serif;

    div[class*='Cell-highlightedText'] {
      color: ${color.bluePrimary};
    }

    p[class*='Cell-highlightedText'] {
      color: ${color.bluePrimary};
    }

    @media (max-width: 500px) {
      min-width: ${({ isOneDentistView }) =>
        isOneDentistView ? '100%' : '450px'};
    }
  }
`;

type DayScaleLayoutProps = DayView.DayScaleLayoutProps & {
  isOneDentistView?: boolean;
};

export const DayScaleLayout = ({
  isOneDentistView,
  ...restProps
}: DayScaleLayoutProps) => (
  <StyledDayScaleLayout {...restProps} isOneDentistView={isOneDentistView} />
);

// targeting that empty cell
const StyledDayScaleRow = styled(DayView.Layout)`
  && {
    div[class*='makeStyles-dayScaleEmptyCell'] {
      @media (max-width: 900px) {
        width: 55px;
        min-width: 55px;
      }
    }
  }
`;

export const DayScaleRow = (props: DayView.LayoutProps) => (
  <StyledDayScaleRow {...props} />
);

////////////////////////////////////////////////////////////////////////////////
/////                         WEEK VIEW                                     ////
////////////////////////////////////////////////////////////////////////////////

// bigger table with appointments in mobile view
const StyledTimeTableLayoutWeek = styled(WeekView.TimeTableLayout)`
  && {
    @media (max-width: 500px) {
      min-width: ${({ isOneDentistView }) =>
        isOneDentistView ? '100%' : '1450px'};
    }
  }
`;

type TimeTableLayoutWeekProps = WeekView.TimeTableLayoutProps & {
  isOneDentistView?: boolean;
};

export const TimeTableLayoutWeek = ({
  isOneDentistView,
  ...restProps
}: TimeTableLayoutWeekProps) => (
  <StyledTimeTableLayoutWeek
    {...restProps}
    isOneDentistView={isOneDentistView}
  />
);

// bigger table with dates in mobile view
const StyledDayScaleLayoutWeek = styled(WeekView.DayScaleLayout)`
  && {
    font-family: 'Montserrat', sans-serif;

    div[class*='Cell-highlightedText'] {
      color: ${color.bluePrimary};
    }

    p[class*='Cell-highlightedText'] {
      color: ${color.bluePrimary};
    }

    @media (max-width: 500px) {
      min-width: ${({ isOneDentistView }) =>
        isOneDentistView ? '100%' : '1450px'};
    }
  }
`;
export const DayScaleLayoutWeek = ({
  isOneDentistView,
  ...restProps
}: DayScaleLayoutProps) => (
  <StyledDayScaleLayoutWeek
    {...restProps}
    isOneDentistView={isOneDentistView}
  />
);

////////////////////////////////////////////////////////////////////////////////
/////                         MONTH VIEW                                    ////
////////////////////////////////////////////////////////////////////////////////

type TimeTableCellProps = MonthView.TimeTableCellProps & {
  handleClick: (startDate: Date) => void;
};

export const Cell = ({
  startDate,
  handleClick,
  ...restProps
}: TimeTableCellProps) => {
  return (
    <MonthView.TimeTableCell
      {...restProps}
      startDate={startDate}
      onClick={() => handleClick(startDate)}
    />
  );
};
