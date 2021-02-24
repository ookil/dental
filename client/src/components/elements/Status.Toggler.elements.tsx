import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const SVG = styled.svg`
  &:hover {
    path {
      stroke: #fff;
    }
  }
`;

const ConfirmSvg = ({ color, active }: { color: string; active: boolean }) => (
  <SVG
    width='30'
    height='30'
    viewBox='0 0 30 30'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0)'>
      <path
        d='M26.25 7.71345L14.1926 22.083L5.00003 14.3695'
        stroke={active ? '#fff' : color}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0'>
        <rect width='30' height='30' fill='white' />
      </clipPath>
    </defs>
  </SVG>
);

const ButtonBox = styled.div<{ color: string; active: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${({ color, active }) => (active ? color : '#ffffff')};
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    background: ${({ color }) => color && color};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &:nth-of-type(odd) {
    margin-right: 30px;
  }
`;

const Text = styled.p`
  margin-left: 10px;
`;

type Props = {
  color: string;
  active: boolean;
  text?: string;
  onClick: (value: any) => void;
};

export const StatusButton = ({ text, color, active, onClick }: Props) => (
  <ButtonWrapper onClick={onClick}>
    <ButtonBox color={color} active={active}>
      <ConfirmSvg color={color} active={active} />
    </ButtonBox>
    {text && <Text>{text}</Text>}
  </ButtonWrapper>
);
