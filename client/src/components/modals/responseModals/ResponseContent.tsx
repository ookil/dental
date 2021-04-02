import React from 'react';
import { ResponseStatus } from '../../../store/slices/modalsSlice';
import { Gif, GifWrapper } from '../../elements/Elements';
import { Countdown, Message } from '../Modals.elements';
import completedGif from '../../../images/completed.gif';

type ContentProps = {
  message: string | null;
  countdown: number;
  status: ResponseStatus;
};

const ResponseContent = ({ message, countdown, status }: ContentProps) => {
  return (
    <>
      <Message>{message}</Message>
      {status === 'CONFIRMATION' && (
        <GifWrapper>
          <Gif src={completedGif} />
        </GifWrapper>
      )}
      <Countdown>Window will close in {countdown}s.</Countdown>
    </>
  );
};

export default ResponseContent;
