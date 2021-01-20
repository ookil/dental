import React, { useState } from 'react';
import {
  ToolbarMenu,
  ToolbarWrapper,
  ToolbarLink,
  DashboardIcon,
  LinkTitle,
  CalendarIcon,
  LinkIconWrapper,
} from './Toolbar.elements';

const Toolbar: React.FC = () => {
  const [dashboard, setDashboard] = useState(true);
  const [calendar, setCalendar] = useState(false);
  const [patients, setPatients] = useState(false);

  const [button, setButton] = useState('dashboard');

  return (
    <ToolbarMenu>
      <ToolbarWrapper>
        <ToolbarLink
          to='/dashboard'
          id='dashboard'
          selected={button}
          onClick={(e) => setButton(e.currentTarget.id)}
        >
          <LinkIconWrapper>
            <DashboardIcon />
          </LinkIconWrapper>
          <LinkTitle>Dashboard</LinkTitle>
        </ToolbarLink>
        <ToolbarLink
          to='/calendar'
          id='calendar'
          selected={button}
          onClick={(e) => setButton(e.currentTarget.id)}
        >
          <LinkIconWrapper>
            <CalendarIcon />
          </LinkIconWrapper>
          <LinkTitle>Calendar</LinkTitle>
        </ToolbarLink>
        <ToolbarLink
          to='/patients'
          id='patients'
          selected={button}
          onClick={(e) => setButton(e.currentTarget.id)}
        >
          <LinkIconWrapper>
            <DashboardIcon />
          </LinkIconWrapper>
          <LinkTitle>Patients List</LinkTitle>
        </ToolbarLink>
      </ToolbarWrapper>
    </ToolbarMenu>
  );
};

export default Toolbar;
