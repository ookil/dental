import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import styled from 'styled-components';

const StyledOverlay = styled(AppointmentForm.Overlay)`
  z-index: 5;
  background-color: red;
`;

const StyledLayout = styled(AppointmentForm.Layout)`
  z-index: 5;
  background-color: skyblue;
`;

export const FormOverlay = (props: AppointmentForm.OverlayProps) => (
  <StyledOverlay {...props} />
);

export const FormLayout = (props: AppointmentForm.LayoutProps) => (
  <StyledLayout {...props} >
      
  </StyledLayout>
);
