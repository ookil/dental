import { Link } from 'react-router-dom';
import styled, { css, StyledComponent } from 'styled-components';
import Modal, { ModalProps } from 'styled-react-modal';
import { color } from '../../globalStyles';

const { bluePrimary } = color;

export const StyledModal: StyledComponent<
  React.ComponentClass<ModalProps, any>,
  any,
  { opacity: number; scale: number },
  never
> = Modal.styled`
  height: auto;
 /*  max-height: 95vh; */
  width: 400px;
  max-width: 90%;
  border-radius: 15px;
  padding: 20px;
  background-color: white;
  box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.25);
  opacity: ${(props: { opacity: number }) => props.opacity};
  transform: translate(0,0) scale(${(props: { scale: number }) => props.scale});
  transition: all ease-in-out 300ms ;
  z-index: 999;
 /*  overflow: auto; */
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ModalTitle = styled.h3`
  font-weight: bold;
  color: ${bluePrimary};
  margin-bottom: 20px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export const MoreOption = css`
  color: ${bluePrimary};
  font-size: 13px;
`;

export const MoreOptionLink = styled(Link)`
  ${MoreOption}
`;

export const MoreOptionButton = styled.div`
  ${MoreOption}
  text-decoration: underline;
  cursor: pointer;
`;
