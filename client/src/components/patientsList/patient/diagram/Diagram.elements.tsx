import styled from 'styled-components';
import { color } from '../../../../globalStyles';

export const DiagramBox = styled.div`
  min-width: 990px;
  height: 500px;
  background-color: #f5f5f5;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 225px 225px;
  grid-gap: 50px 25px;
  padding: 0 10px;
  position: relative;
`;

export const DashedSeparator = styled.div<{
  orientation: 'horizontal' | 'vertical';
}>`
  position: absolute;

  ${({ orientation }) => {
    if (orientation === 'horizontal') {
      return `
            width: 90%;
            top: 50%;
            left: 50%;
            transform: translateX(-50%);
            border-top: 1px dashed ${color.textSecondary};
          `;
    }
    if (orientation === 'vertical') {
      return `
            height: 90%;
              top: 50%;
              left: 50%;
              transform: translateY(-50%);
              border-left: 1px dashed ${color.textSecondary}
            `;
    }
  }}
`;

export const DiagramSeparator = () => (
  <>
    <DashedSeparator orientation='horizontal' />
    <DashedSeparator orientation='vertical' />
  </>
);
