import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import DayPicker from 'react-day-picker';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { color } from '../../../globalStyles';

const { bgSecondary, bluePrimary, pinkCancel } = color;

export const ModalForm = Modal.styled`
  height: 80%;
  width: 750px;
  max-width: 90%;
  border-radius: 15px;
  background-color: white;
  box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.25);
  opacity: ${(props: { opacity: number }) => props.opacity};
  transform: translate(0, 0) scale(${(props: { scale: number }) =>
    props.scale});
  transition: all ease-in-out 300ms;
  z-index: 1300;
  margin: auto;
  overflow: hidden;
`;

export const Box = styled.div`
  border-radius: 15px;
  height: 100%;
  width: 100%;
  overflow: hidden;

  div[class*='LayoutBase-root-'] {
    overflow-y: initial;
  }

  div[class*='LayoutBase-basic-'] {
    width: 100%;
  }

  div[class*='LayoutBase-root-'] {
    width: 100%;
  }

  div[class*='LayoutBase-container-'] {
    height: calc(100% - 64px);
  }
`;

export const LeftCol = styled.div`
  flex-grow: 1;
  padding-right: 15px;
  position: relative;
`;

export const RightCol = styled.div`
  padding-left: 15px;
  height: 95%;
  overflow-y: scroll;
`;

export const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 76px);
`;

export const AppointmentList = styled.ul`
  height: 100%;
  overflow: scroll;
`;

export const AppointmentDuration = styled.li<{
  fullH: boolean;
  selected: boolean;
  isSelecting: boolean;
  working: boolean;
  busy: boolean;
}>`
  padding: 3px 4px;
  padding-right: 90px;
  border-bottom: 1px solid #f6f6f7;
  font-family: 'Roboto';
  font-size: 14px;
  cursor: pointer;
  ${({ fullH }) => fullH && `border-bottom: 1px solid ${bgSecondary};`}

  ${({ selected, working, busy }) => {
    if (!working && !selected) {
      return `
        background-color: #3d3d3d;
        color: white;
      `;
    } else if (busy && !selected) {
      return `
      background-color: #fcd9df;
      color: #fd5757;
      `;
    } else if (selected) {
      return `
      background-color: rgba(222,235,255,0.9);
      color: ${bluePrimary};
      `;
    } else {
      return `
      &:nth-child(odd) {
        background-color: rgba(239, 239, 240, 0.6)
      }
      `;
    }
  }}
  
  &:hover {
    background: rgba(222, 235, 255, 0.9);
    color: ${bluePrimary};
  }
`;

export const StyledLayout = styled(AppointmentForm.BasicLayout)`
  && {
    height: 100%;
    user-select: none;
  }
`;

export const StyledDayPicker = styled(DayPicker)`
  transform: scale(0.8) translateX(-14%);
  position: absolute;
  bottom: 0;

  .DayPicker-Day {
    outline: none;
  }

  .DayPicker-Day.DayPicker-Day--selected {
    background-color: ${bluePrimary};
  }

  .DayPicker-wrapper {
    outline: none;
    padding-bottom: 0;
  }
`;
