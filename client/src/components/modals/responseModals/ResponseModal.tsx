import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  changeResponseModal,
} from '../../../store/slices/modalsSlice';
import { RootState, useAppDispatch } from '../../../store/store';
import { Button } from '../../elements/Elements';
import { ModalContainer, StyledResponseModal } from '../Modals.elements';
import ResponseContent from './ResponseContent';

const ResponseModal = () => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [countdown, setCountdown] = useState(5);

  const isResponseModal = useSelector(
    (state: RootState) => state.modal.isResponseModal
  );

  const { status, message } = isResponseModal;

  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeResponseModal({ status: false, message: null }));
    setCountdown(5);
  }, [dispatch]);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status ? true : false) {

      if (countdown < 1) {
        handleClose();
      } else {
        timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [status, countdown, handleClose]);

  return (
    <StyledResponseModal
      isOpen={status ? true : false}
      beforeOpen={beforeOpen}
      afterClose={afterClose}
      opacity={opacity}
      scale={scale}
      onEscapeKeydown={handleClose}
      onBackgroundClick={() => null}
    >
      <ModalContainer>
        <ResponseContent
          status={status}
          message={message}
          countdown={countdown}
        />
        <Button style={{ float: 'right' }} onClick={() => handleClose()}>
          Cancel
        </Button>
      </ModalContainer>
    </StyledResponseModal>
  );
};

export default ResponseModal;
