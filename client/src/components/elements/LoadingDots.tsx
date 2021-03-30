import React from 'react';
import styled, { keyframes } from 'styled-components';

const BlinkAnimation = keyframes`
    /**
     * At the start of the animation the dot
     * has an opacity of .2
     */
     0% {
      opacity: .2;
    }
    /**
     * At 20% the dot is fully visible and
     * then fades out slowly
     */
    20% {
      opacity: 1;
    }
    /**
     * Until it reaches an opacity of .2 and
     * the animation can start again
     */
    100% {
      opacity: .2;
    }
`;

const Dot = styled.div<{ delay: string }>`
  background-color: #8eaebd;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BlinkAnimation} 1.4s linear infinite;
  animation-delay: ${(props) => props.delay};
  animation-fill-mode: both;
`;

const DotWrapper = styled.div`
  display: flex;
  padding: 5px 0;
  margin: 0 auto;
  justify-content: center;
`;

const LoadingDots = () => {
  return (
    <DotWrapper>
      <Dot delay='0s' />
      <Dot delay='3s' />
      <Dot delay='6s' />
    </DotWrapper>
  );
};

export default LoadingDots;
