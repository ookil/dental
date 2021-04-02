import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

export const PatientButtonWrapper = styled.div<{
  bgColor?: string;
  color?: string;
}>`
  height: 55px;
  width: 55px;
  border-radius: 50%;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : '#337ae396')};
  color: ${({ color }) => (color ? color : 'white')};
  position: fixed;
  bottom: 3%;
  right: 10%;
  margin-left: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResetButtonWrapper = styled(PatientButtonWrapper)`
  right: calc(10% + 60px);
`;

export const PlusIcon = () => (
  <svg
    width='30'
    height='30'
    viewBox='0 0 30 30'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <line
      x1='15'
      y1='1'
      x2='15'
      y2='29'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <line
      x1='29'
      y1='15'
      x2='1'
      y2='15'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const UpIcon = () => (
  <svg
    width='26'
    height='15'
    viewBox='0 0 26 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1 14L13 1.5L25 14'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

type ButtonProps = {
  handleClick: () => void;
};

export const AddPatientButton = ({ handleClick }: ButtonProps) => (
  <PatientButtonWrapper onClick={handleClick}>
    <PlusIcon />
  </PatientButtonWrapper>
);

export const ResetButton = ({ handleClick }: { handleClick: () => void }) => (
  <ResetButtonWrapper bgColor='grey' onClick={handleClick}>
    <UpIcon />
  </ResetButtonWrapper>
);

export const Letter = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

export const NoDataText = styled.div`
  height: 50px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoDataNotification = styled.div``;
