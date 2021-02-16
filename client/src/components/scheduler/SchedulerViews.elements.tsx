import { DayView, WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns';
import styled from 'styled-components';

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
      min-width: 450px;
    }
  }
`;

export const TimeTableLayout = (props: DayView.TimeTableLayoutProps) => (
  <StyledTimeTableLayout {...props} />
);

// bigger table with dates in mobile view
const StyledDayScaleLayout = styled(DayView.DayScaleLayout)`
  && {
    font-family: 'Montserrat', sans-serif;

    @media (max-width: 500px) {
      min-width: 450px;
    }
  }
`;

export const DayScaleLayout = (props: DayView.DayScaleLayoutProps) => (
  <StyledDayScaleLayout {...props} />
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

// for week view

// bigger table with appointments in mobile view
const StyledTimeTableLayoutWeek = styled(WeekView.TimeTableLayout)`
  && {
    @media (max-width: 500px) {
      min-width: 1450px;
    }
  }
`;

export const TimeTableLayoutWeek = (props: WeekView.TimeTableLayoutProps) => (
  <StyledTimeTableLayoutWeek {...props} />
);

// bigger table with dates in mobile view
const StyledDayScaleLayoutWeek = styled(WeekView.DayScaleLayout)`
  && {
    font-family: 'Montserrat', sans-serif;

    @media (max-width: 500px) {
      min-width: 1450px;
    }
  }
`;
export const DayScaleLayoutWeek = (props: DayView.DayScaleLayoutProps) => (
  <StyledDayScaleLayoutWeek {...props} />
);
