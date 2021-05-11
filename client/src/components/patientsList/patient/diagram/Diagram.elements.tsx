import styled from 'styled-components';
import { color } from '../../../../globalStyles';
import { Button } from '../../../elements/Elements';

export const DiagramOptionsWrapper = styled.div`
  display: flex;
  padding: 20px 25px;
`;

export const BottomRowWrapper = styled.div`
  display: flex;
  height: calc(100% - 490px);
  padding: 0 25px;
  padding-bottom: 10px;
`;

export const ChangeButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;

  button:last-of-type {
    margin-top: auto;
  }
`;

export const ChangeButton = styled(Button)`
  border-radius: 1px;
  padding: 0.3em;
  width: 80px;
  height: calc(100% / 6);
  margin-bottom: 10px;
`;

export const DiagramBoxRoot = styled.div`
  padding-right: 30px;
  margin-right: 20px;
  background-color: ${color.bgPrimary};
  box-shadow: 0px 0px 4px 1px rgb(0 0 0 / 10%);
`;

export const DiagramBox = styled.div`
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
