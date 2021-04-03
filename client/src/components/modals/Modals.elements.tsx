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
  z-index: 1300;
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
  max-height: 96%;
  width: 600px;
  max-width: 90%;
  border-radius: 10px;
  padding: .2em;
  outline: 0;
  background-color: white;
  box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.25);
  opacity: ${(props: { opacity: number }) => props.opacity};
  transform: translate(0,0) scale(${(props: { scale: number }) => props.scale});
  transition: all ease-in-out 300ms ;
  z-index: 998;
  margin: auto;
`;

export const StyledResponseModal = styled(StyledModal)`
  width: auto;
  min-width: 250px;
  min-height: 100px;
  z-index: 999;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ModalTitle = styled.div`
  font-weight: bold;
  padding: 12px 20px 15px 14px;
  color: ${bluePrimary};
`;

export const ScrollBox = styled.div<{
  height?: number;
  padding?: string;
}>`
  width: auto;
  min-height: 0px;
  max-height: 680px;
  height: ${({ height }) => height && `${height - 200}px`};
  padding: ${({ padding }) => (padding ? padding : '0.5em 1em')};
  overflow: auto;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 0.3em 1em 0.9em 0.4em;
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

const Box = styled.div`
  border: 1px solid #cdcdcd;
  padding: 20px 10px;
  padding-top: 30px;
  position: relative;
  margin-top: 20px;

  &:nth-child(1) {
    margin-top: 0;
  }
`;

const Label = styled.label`
  position: absolute;
  padding: 0 5px;
  font-size: 10px;
  top: 0;
  left: 5px;
  transform: translateY(-50%);
  background-color: white;
`;

export const InfoBox = ({ label, children }: any) => (
  <Box>
    <Label>{label}</Label>
    <>{children}</>
  </Box>
);

export const Message = styled.p`
  font-weight: 500;
  margin-bottom: 0.9em;
`;

export const Countdown = styled.p`
  margin-bottom: 20px;
`;
