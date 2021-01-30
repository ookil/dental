import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {

  ModalContainer,
  StyledModal,
} from './Modals.elements';
import { RootState, useAppDispatch } from '../../store/store';
import { openModal } from '../../store/slices/modalsSlice';
import AddPatientContent from './AddPatientContent';
import NewAppointmentContent from './NewAppointmentContent';

const MainModal: React.FC = () => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);

  const isOpenModal = useSelector(
    (state: RootState) => state.modal.isOpenModal
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(openModal(false));
  };

  function beforeOpen() {
    setTimeout(() => {
      setScale(1);
      setOpacity(1);
    }, 10);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setScale(0.3);
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  }


  let content;

  
  if (isOpenModal === 'NEW_APPOINTMENT') {
    content = <NewAppointmentContent />;
  } else if (isOpenModal === 'ADD_PATIENT') {
    content = <AddPatientContent />;
  } else {
    content = null;
  }

  return (
    <StyledModal
      isOpen={isOpenModal ? true : false}
      beforeOpen={beforeOpen}
      beforeClose={beforeClose}
      opacity={opacity}
      scale={scale}
      onEscapeKeydown={handleClose}
      onBackgroundClick={() =>
        window.screen.width < 940 ? dispatch(openModal(false)) : null
      }
    >
      <ModalContainer>{content}</ModalContainer>
    </StyledModal>
  );
};

export default MainModal;
