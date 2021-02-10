import React, { useState } from 'react';
import {
  CloseIcon,
  CurrentPage,
  CurrentPageIcon,
  CurrentPageTitle,
  HamburgerIcon,
  MobileIcon,
  Nav,
  NavbarContainer,
  NavIcon,
  NavLogo,
  NavLogoTitle,
  QuickMenu,
  QuickMenuIcon,
  QuickMenuItem,
} from './Navbar.elements';
import ClinicIcon from '../../images/logo.svg';
import AppointmentIcon from '../../images/appointment.svg';
import AddPatient from '../../images/new_patient.svg';
import Search from '../../images/search.svg';
import {
  CalendarIcon,
  DashboardIcon,
  PatientsIcon,
  SettingsIcon,
} from '../Toolbar/Toolbar.elements';
import { useRouteMatch } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import { useAppDispatch } from '../../store/store';
import { openModal } from '../../store/slices/modalsSlice';

type MatchTypes = {
  page?: any;
};

const Navbar: React.FC = () => {
  const match = useRouteMatch<MatchTypes>('/:page');
  const [isOpen, setOpen] = useState(false);

  const page = match?.params.page || '/';

  const dispatch = useAppDispatch();

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to='/dashboard'>
            <NavIcon src={ClinicIcon} />
            <NavLogoTitle>DENTAL</NavLogoTitle>
          </NavLogo>

          <CurrentPage>
            <CurrentPageIcon>
              {page === 'dashboard' ? (
                <DashboardIcon />
              ) : page === 'calendar' ? (
                <CalendarIcon />
              ) : page === 'patients' ? (
                <PatientsIcon />
              ) : (
                <SettingsIcon />
              )}
            </CurrentPageIcon>
            <CurrentPageTitle>
              {page === 'dashboard'
                ? 'Clinic Overview'
                : page === 'calendar'
                ? 'Calendar'
                : page === 'patients'
                ? 'Patients List'
                : 'Settings'}
            </CurrentPageTitle>
          </CurrentPage>

          <MobileIcon onClick={() => setOpen(!isOpen)}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </MobileIcon>

          <QuickMenu>
            <QuickMenuItem
              onClick={() => dispatch(openModal('NEW_APPOINTMENT'))}
            >
              <QuickMenuIcon src={AppointmentIcon} />
              New Appointment
            </QuickMenuItem>
            <QuickMenuItem onClick={() => dispatch(openModal('ADD_PATIENT'))}>
              <QuickMenuIcon src={AddPatient} />
              Add Patient
            </QuickMenuItem>
            <QuickMenuItem>
              <QuickMenuIcon src={Search} />
              Find Patient
            </QuickMenuItem>
          </QuickMenu>
        </NavbarContainer>
      </Nav>
      <MobileNavbar isOpen={isOpen} />
    </>
  );
};

export default Navbar;
