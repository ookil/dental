import { CurrentTimeIndicator } from '@devexpress/dx-react-scheduler-material-ui';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { color } from '../../globalStyles';

const IndicatorLine = styled.div<{ top?: string }>`
  position: 'absolute';
  z-index: 1;
  left: 0;
  top: ${({ top }) => top};

  height: 2px;
  border-top: 2px ${color.bluePrimary} dotted;
  width: 100%;
  transform: translate(0, -1px);
`;

export const TimeIndicator = ({ top }: CurrentTimeIndicator.IndicatorProps) => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (indicatorRef && indicatorRef.current) {
      indicatorRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div ref={indicatorRef}>
      <IndicatorLine top={top} />
    </div>
  );
};
