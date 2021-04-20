import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalContainer, StyledModal } from './Modals.elements';
import { RootState, useAppDispatch } from '../../store/store';
import {
  changeSelectingPatientForAppointment,
  openModal,
} from '../../store/slices/modalsSlice';
import AddPatientContent from './AddPatientContent';
import NewAppointmentContent from './NewAppointmentContent';
import PatientVisit from './PatientVisit';
import FindPatient from './FindPatient';

const MainModal: React.FC = () => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);

  const isOpenModal = useSelector(
    (state: RootState) => state.modal.isOpenModal
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(openModal(false));
    dispatch(changeSelectingPatientForAppointment(false));
  };

  function beforeOpen() {
    setTimeout(() => {
      setScale(1);
      setOpacity(1);
    }, 10);
  }

  function afterClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setScale(0.3);
      setTimeout(resolve, 200);
    });
  }

  let content;

  if (isOpenModal === 'NEW_APPOINTMENT') {
    content = <NewAppointmentContent />;
  } else if (isOpenModal === 'ADD_PATIENT') {
    content = <AddPatientContent />;
  } else if (isOpenModal === 'NEW_PATIENT_VISIT') {
    content = <PatientVisit />;
  } else if (isOpenModal === 'FIND_PATIENT') {
    content = <FindPatient />;
  } else {
    content = null;
  }

  return (
    <StyledModal
      isOpen={isOpenModal ? true : false}
      beforeOpen={beforeOpen}
      afterClose={afterClose}
      opacity={opacity}
      scale={scale}
      onEscapeKeydown={handleClose}
      onBackgroundClick={() =>
        window.screen.width < 940 ? dispatch(openModal(false)) : null
      }
    >
      <ModalContainer data-testid='modal-content'>{content}</ModalContainer>
    </StyledModal>
  );
};

export default MainModal;
