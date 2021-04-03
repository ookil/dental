import React from 'react';
import {
  LogoutButton,
  MobileNav,
  NavLink,
  QuickMenu,
  QuickMenuItem,
  QuickMenuTitle,
} from './MobileNavbar.elements';
import { QuickMenuIcon } from './Navbar.elements';
import Appointment from '../../images/appointment.svg';
import AddPatient from '../../images/new_patient.svg';
import Search from '../../images/search.svg';
import { useAppDispatch } from '../../store/store';
import { openModal } from '../../store/slices/modalsSlice';

export type MobileNavProps = {
  isOpen: boolean;
};

const MobileNavbar: React.FC<MobileNavProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();

  return (
    <MobileNav isOpen={isOpen}>
      <QuickMenu>
        <QuickMenuItem onClick={() => dispatch(openModal('NEW_APPOINTMENT'))}>
          <QuickMenuIcon src={Appointment} />
          <QuickMenuTitle>New Appointment</QuickMenuTitle>
        </QuickMenuItem>
        <QuickMenuItem onClick={() => dispatch(openModal('ADD_PATIENT'))}>
          <QuickMenuIcon src={AddPatient} />
          <QuickMenuTitle>Add Patient</QuickMenuTitle>
        </QuickMenuItem>
        <QuickMenuItem
          onClick={() => {
            dispatch(openModal('FIND_PATIENT'));
          }}
        >
          <QuickMenuIcon src={Search} />
          <QuickMenuTitle>Search</QuickMenuTitle>
        </QuickMenuItem>
      </QuickMenu>
      <NavLink to='/dashboard'>Dashboard</NavLink>
      <NavLink to='/calendar'>Calendar</NavLink>
      <NavLink to='/patients'>Patients</NavLink>
      <NavLink to='/settings'>Settings</NavLink>
      <LogoutButton>Logut</LogoutButton>
    </MobileNav>
  );
};

export default MobileNavbar;
