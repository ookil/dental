import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Modal from 'styled-react-modal';
import { color } from '../../globalStyles';

const { bluePrimary } = color;

export const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow-y: scroll;
`;

export const StyledModal: any = Modal.styled`
  height: auto;
/*   max-height: 96%; */
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
  margin: auto;
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
