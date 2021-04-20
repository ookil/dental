import React, { useState } from 'react';
import { setToolbarCollapse } from '../../store/slices/clinicSlice';
import { useAppDispatch } from '../../store/store';
import {
  ToolbarMenu,
  ToolbarWrapper,
  ToolbarLink,
  DashboardIcon,
  LinkTitle,
  CalendarIcon,
  LinkIconWrapper,
  UserBox,
  CollapseButton,
  CollapseIcon,
  SettingsIcon,
} from './Toolbar.elements';

const Toolbar: React.FC = () => {
  const [button, setButton] = useState('dashboard');
  const [isCollapsed, setCollapse] = useState(false);

  const handleButton = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
    setButton(e.currentTarget.id);

  const dispatch = useAppDispatch();

  const handleCollapse = () => {
    dispatch(setToolbarCollapse());
    setCollapse(!isCollapsed);
  };

  return (
    <ToolbarMenu isCollapsed={isCollapsed}>
      <ToolbarWrapper>
        <ToolbarLink
          data-testid='btn-dashboard'
          to='/dashboard'
          id='dashboard'
          selected={button}
          onClick={(e) => handleButton(e)}
          isCollapsed={isCollapsed}
        >
          <LinkIconWrapper>
            <DashboardIcon />
          </LinkIconWrapper>
          <LinkTitle>Dashboard</LinkTitle>
        </ToolbarLink>
        <ToolbarLink
          data-testid='btn-calendar'
          to='/calendar'
          id='calendar'
          selected={button}
          onClick={(e) => handleButton(e)}
          isCollapsed={isCollapsed}
        >
          <LinkIconWrapper>
            <CalendarIcon />
          </LinkIconWrapper>
          <LinkTitle>Calendar</LinkTitle>
        </ToolbarLink>
        <ToolbarLink
          data-testid='btn-pateints'
          to='/patients'
          id='patients'
          selected={button}
          onClick={(e) => handleButton(e)}
          isCollapsed={isCollapsed}
        >
          <LinkIconWrapper>
            <DashboardIcon />
          </LinkIconWrapper>
          <LinkTitle>Patients List</LinkTitle>
        </ToolbarLink>
        <ToolbarLink
          data-testid='btn-settings'
          to='/settings'
          id='settings'
          selected={button}
          onClick={(e) => handleButton(e)}
          isCollapsed={isCollapsed}
        >
          <LinkIconWrapper>
            <SettingsIcon />
          </LinkIconWrapper>
          <LinkTitle>Settings</LinkTitle>
        </ToolbarLink>

        <CollapseButton onClick={handleCollapse} isCollapsed={isCollapsed}>
          <CollapseIcon />
        </CollapseButton>

        <UserBox>Dr. Ząbek</UserBox>
      </ToolbarWrapper>
    </ToolbarMenu>
  );
};

export default Toolbar;
