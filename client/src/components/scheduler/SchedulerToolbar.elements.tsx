import {
  DateNavigator,
  TodayButton,
  Toolbar,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import styled, { css } from 'styled-components';
import { color, size } from '../../globalStyles';
import { LinearProgress } from '@material-ui/core';
import CustomSelect from '../elements/Select';

const { bluePrimary, textPrimary, blueLight } = color;

const ItemWrapper = styled.div<{ mobile?: boolean }>`
  ${({ mobile }) => css`
    ${mobile &&
    css`
      @media screen and (max-width: 740px) {
        display: none;
      }
    `}
  `}
`;

const Text = styled.div``;

const DentistSelectorItem = ({
  dentistName,
  mobile,
}: {
  dentistName?: string;
  mobile?: boolean;
}) => {
  const displayText = dentistName || 'All Dentists';
  return (
    <ItemWrapper mobile={mobile}>
      <Text>{displayText}</Text>
    </ItemWrapper>
  );
};

const IconWrapper = styled.div`
  height: 24px;
  color: ${textPrimary};

  @media screen and (min-width: 740px) {
    display: none;
  }
`;

const DentistIcon = () => (
  <IconWrapper>
    <PersonRoundedIcon />
  </IconWrapper>
);

type DentistSelectorProps = {
  dentistId: string;
  dentists: any[];
  handleDentistChange: (dentistId: string) => void;
};

const DentistSelector: React.FC<DentistSelectorProps> = ({
  dentistId,
  dentists,
  handleDentistChange,
}) => {
  const currentDentist =
    dentistId === '-1'
      ? { text: 'All Dentists' }
      : dentists.find((dentist) => dentist.id === dentistId);

  return (
    <FormControl>
      <Select
        disableUnderline
        value={dentistId}
        onChange={(e) => {
          handleDentistChange(e.target.value as any);
        }}
        renderValue={() => (
          <>
            <DentistIcon />
            <DentistSelectorItem
              dentistName={currentDentist.text}
              mobile={true}
            />
          </>
        )}
      >
        <MenuItem value={'-1'}>
          <DentistSelectorItem />
        </MenuItem>
        {dentists.map(({ id, text }) => (
          <MenuItem value={id} key={id}>
            <DentistSelectorItem dentistName={text} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const FlexibleSpace = ({
  dentistId,
  dentists,
  handleDentistChange,
  ...restProps
}: DentistSelectorProps) => {
  return (
    <Toolbar.FlexibleSpace {...restProps}>
      <DentistSelector
        dentistId={dentistId}
        dentists={dentists}
        handleDentistChange={handleDentistChange}
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

const DesktopStyledSwitcher = styled(CustomSelect)`
  @media (max-width: ${size.mobileL}) {
    div {
      display: none;
    }
  }
`;

export const DesktopViewSwitcher = ({
  currentView,
  availableViews,
  onChange,
}: ViewSwitcher.SwitcherProps) => {
  return (
    <CustomSelect
      options={availableViews}
      readFrom='displayName'
      displayValue='displayName'
      fieldName='name'
      initialValue={currentView.name}
      sizing='small'
      handleSelectChange={(_, value) => onChange(value)}
      marginBottom={5}
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
