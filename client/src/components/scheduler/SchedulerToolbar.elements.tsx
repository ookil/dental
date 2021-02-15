import {
  DateNavigator,
  TodayButton,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import styled, { css } from 'styled-components';
import { color, size } from '../../globalStyles';

const { bluePrimary } = color;

const DesktopStyledSwitcher = styled(ViewSwitcher.Switcher)`
  && {
    fieldset {
      border: none;
    }

    @media (max-width: ${size.mobileL}) {
      display: none;
    }
  }
`;

export const DesktopViewSwitcher = (props: ViewSwitcher.SwitcherProps) => {
  return <DesktopStyledSwitcher {...props} />;
};

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 10px 0;

  @media (min-width: ${size.mobileL}) {
    display: none;
  }
`;

const SwitcherButton = styled.button<{ isActive?: boolean }>`
  border: none;
  background-color: inherit;
  padding: 6px 10px;
  font-size: 0.9em;
  outline: 0;

  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 1px solid ${bluePrimary};
    `}
`;

type ViewSwitcherProps = {
  currentViewName: string;
  onViewChange: (e: any) => void;
};

export const ExternalViewSwitcher = ({
  currentViewName,
  onViewChange,
}: ViewSwitcherProps) => {
  return (
    <ButtonsWrapper>
      <SwitcherButton
        onClick={onViewChange}
        value='Day'
        isActive={currentViewName === 'Day'}
      >
        Day
      </SwitcherButton>
      <SwitcherButton
        onClick={onViewChange}
        value='Week'
        isActive={currentViewName === 'Week'}
      >
        Week
      </SwitcherButton>
      <SwitcherButton
        onClick={onViewChange}
        value='Month'
        isActive={currentViewName === 'Month'}
      >
        Month
      </SwitcherButton>
    </ButtonsWrapper>
  );
};

const StyledControl = styled(DateNavigator.NavigationButton)`
  && {
    @media screen and (max-width: ${size.mobileL}) {
      display: none;
    }
  }
`;

export const NavigationButtons = (
  props: DateNavigator.NavigationButtonProps
) => <StyledControl {...props} />;

export const StyledToday = styled(TodayButton.Button)`
  && {
    border: 1px solid ${bluePrimary};
    border-radius: 10px;
    color: ${bluePrimary};

    &:hover {
      background-color: ${bluePrimary};
      color: #fff;
    }

    @media screen and (max-width: ${size.mobileL}) {
      margin-right: 12px;
    }
  }
`;

export const StyledTodayBtn = (props: TodayButton.ButtonProps) => {
  return <StyledToday {...props} />;
};
