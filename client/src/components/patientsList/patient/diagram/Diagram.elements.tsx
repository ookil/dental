import styled from 'styled-components';
import { color } from '../../../../globalStyles';

export const DiagramOptionsWrapper = styled.div`
  display: flex;
  padding: 20px 25px;
`;

export const DiagramBoxRoot = styled.div`
  padding-right: 30px;
  margin-right: 20px;
  background-color: #f5f5f5;
`;

export const DiagramBox = styled.div`
  /* min-width: 990px; */
  height: 450px;

  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 200px 200px;
  grid-gap: 50px 25px;
  position: relative;
  flex-grow: 1;
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
