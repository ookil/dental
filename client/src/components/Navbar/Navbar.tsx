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

type MatchTypes = {
  params?: any;
};

const Navbar: React.FC = () => {
  const match = useRouteMatch('/:page');
  const [isOpen, setOpen] = useState(false);

  const {
    params: { page },
  } = match as MatchTypes;

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to='/'>
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
            <QuickMenuItem>
              <QuickMenuIcon src={AppointmentIcon} />
              New Appointment
            </QuickMenuItem>
            <QuickMenuItem>
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
