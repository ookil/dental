import { DayView, WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import { format } from 'date-fns';
import styled from 'styled-components';

const handleFormatDate = (date: any) => format(new Date(date), 'H:mm');

const StyledTimeScaleLabel = styled(DayView.TimeScaleLabel)`
  && {
    padding-left: 8px;
  }
`;

type TimeScaleProps = DayView.TimeScaleLabelProps &
  WeekView.TimeScaleLabelProps & { viewName: 'day' | 'month' };

export const TimeScaleLabel = ({
  formatDate,
  viewName,
  ...restProps
}: TimeScaleProps) => {
  if (viewName === 'day')
    return (
      <StyledTimeScaleLabel {...restProps} formatDate={handleFormatDate} />
    );
  return (
    <WeekView.TimeScaleLabel {...restProps} formatDate={handleFormatDate} />
  );
};

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

const StyledDayScaleEmptyCell = styled.div`
  && {
    width: 80px;

    @media (max-width: 900px) {
      width: 25px;
    }
  }
`;

export const DayScaleEmptyCell = (props: DayView.DayScaleEmptyCellProps) => (
  <StyledDayScaleEmptyCell {...props} />
);

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

const StyledDayScaleRow = styled(DayView.Layout)`
  && {
    background-color: pink;

    /* div:first-of-type > div:first-of-type > div:first-of-type {
      background-color: skyblue;
    } */
  }
`;

export const DayScaleRow = (props: DayView.LayoutProps) => (
  <StyledDayScaleRow {...props} />
);
