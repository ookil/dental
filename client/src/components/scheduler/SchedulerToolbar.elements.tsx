import {
  DateNavigator,
  TodayButton,
  Toolbar,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import styled, { css } from 'styled-components';
import { color, size } from '../../globalStyles';
import { LinearProgress } from '@material-ui/core';
import Select from '../elements/Select';
import { GetDentistsGrouping_clinicDentists } from '../../graphql/queries/__generated__/GetDentistsGrouping';
import { DisplayValue } from '../elements/Elements';

const { bluePrimary, textPrimary, blueLight } = color;


const IconWrapper = styled.div`
  height: 40px;
  color: ${textPrimary};
  display: flex;
  align-items: center;
  padding-right: 24px;
  //width: 100px;

  @media screen and (min-width: 740px) {
    display: none;
  }
`;

const DisplayText = styled(DisplayValue)`
  @media screen and (max-width: 740px) {
    display: none;
  }
`;

const DentistIcon = () => (
  <IconWrapper>
    <PersonRoundedIcon style={{ marginLeft: 'auto' }} />
  </IconWrapper>
);

type DentistSelectorProps = {
  dentistId: string;
  dentists: GetDentistsGrouping_clinicDentists[];
  handleDentistChange: (dentistId: string) => void;
};


export const FlexibleSpace = ({
  dentistId,
  dentists,
  handleDentistChange,
  ...restProps
}: DentistSelectorProps) => {
  const currentDentist =
    dentistId === '-1'
      ? { text: 'All Dentists' }
      : dentists.find((dentist) => dentist.id === dentistId);

  return (
    <Toolbar.FlexibleSpace {...restProps}>
      <Select
        options={[{ id: '-1', text: 'All Dentists' }, ...dentists]}
        fieldName='id'
        readFrom='id'
        displayValue='text'
        handleSelectChange={(_, value) => {
          handleDentistChange(value);
        }}
        sizing='small'
        marginBottom={5}
        initialValue={currentDentist?.text || ''}
        renderOverride={() => (
          <>
            <DentistIcon />
            <DisplayText>{currentDentist?.text}</DisplayText>
          </>
        )}
      />
    </Toolbar.FlexibleSpace>
  );
};

////////////////////////////////////////////////////////////////////////////////
/////                         Toolbar Loading                               ////
////////////////////////////////////////////////////////////////////////////////

const StyledLoading = styled(LinearProgress)`
  && {
    height: 2px;
    background-color: ${blueLight};

    div[class*='MuiLinearProgress-bar'] {
      background-color: ${bluePrimary};
    }
  }
`;

export const ToolbarWithLoading = ({
  children,
  ...restProps
}: Toolbar.RootProps) => {
  return (
    <>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <StyledLoading />
    </>
  );
};

////////////////////////////////////////////////////////////////////////////////
/////                         View Switcher                                 ////
////////////////////////////////////////////////////////////////////////////////

export const DesktopViewSwitcher = ({
  currentView,
  availableViews,
  onChange,
}: ViewSwitcher.SwitcherProps) => {
  return (
    <Select
      options={availableViews}
      readFrom='displayName'
      displayValue='displayName'
      fieldName='name'
      initialValue={currentView.name}
      sizing='small'
      handleSelectChange={(_, value) => onChange(value)}
      marginBottom={5}
      hiddenSize={size.mobileL}
    />
  );
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
  position: relative;
  z-index: 1;

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

////////////////////////////////////////////////////////////////////////////////
/////                         Navigation Buttons                            ////
////////////////////////////////////////////////////////////////////////////////

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
