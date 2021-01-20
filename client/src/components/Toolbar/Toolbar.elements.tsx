import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../../globalStyles';

type LinkProps = {
  readonly selected: string;
};

const { bgPrimary, textPrimary, bluePrimary } = color;

export const ToolbarMenu = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  width: 160px;
  background-color: ${bgPrimary};
  box-shadow: 4px -3px 4px rgba(0, 0, 0, 0.25);
  padding-top: 25px;

  @media screen and (max-width: 940px) {
    display: none;
  }
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ToolbarLink = styled(Link)<LinkProps>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.selected === props.id ? 'white' : textPrimary)};
  background-color: ${(props) =>
    props.selected === props.id ? bluePrimary : 'none'};
  padding: 10px 15px;
  width: 100%;
  height: 50px;

  text-decoration: none;
  margin-bottom: 10px;

  &:hover {
    background-color: ${bluePrimary};
    color: white;
  }
`;

export const LinkTitle = styled.p`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
`;

export const LinkIconWrapper = styled.div`
  width: 20px;
  height: 20px;
`;

const Icon = styled.svg.attrs({
  version: '1.1',
  xmls: 'http://www.w3.org/2000/svg',
})``;

export const Svg = styled(Icon)`
  width: 100%;
  height: 100%;
  max-height: 25px;
  max-width: 25px;
`;

export const DashboardIcon = () => (
  <Svg viewBox='0 0 40 40'>
    <path
      d='M38.4286 13.68C37.4246 11.0185 35.9692 8.60053 34.1429 6.56C32.321 4.51454 30.162 2.88442 27.7857 1.76C25.317 0.59 22.7009 0 20 0C17.2991 0 14.683 0.59 12.2143 1.76C9.83799 2.88442 7.67905 4.51454 5.85714 6.56C4.03084 8.60053 2.57538 11.0185 1.57143 13.68C0.526786 16.445 0 19.375 0 22.4C0 29.035 2.60268 35.285 7.13839 39.555L7.21429 39.625C7.47321 39.865 7.79911 40 8.13393 40H31.8705C32.2054 40 32.5312 39.865 32.7902 39.625L32.8661 39.555C37.3973 35.285 40 29.035 40 22.4C40 19.375 39.4688 16.445 38.4286 13.68ZM31.1339 36.2H8.86607C7.14106 34.458 5.76236 32.3292 4.81945 29.9517C3.87654 27.5743 3.3905 25.0014 3.39286 22.4C3.39286 17.43 5.12054 12.76 8.25893 9.25C11.3973 5.735 15.567 3.8 20 3.8C24.4375 3.8 28.6071 5.735 31.7411 9.25C34.8795 12.765 36.6071 17.435 36.6071 22.4C36.6071 27.68 34.6205 32.675 31.1339 36.2ZM24.9777 15.475C24.9106 15.4006 24.8199 15.3588 24.7254 15.3588C24.631 15.3588 24.5403 15.4006 24.4732 15.475L20.7009 19.7C19.8661 19.45 18.942 19.69 18.2857 20.425C18.0533 20.6848 17.8689 20.9935 17.743 21.3332C17.6172 21.673 17.5525 22.0372 17.5525 22.405C17.5525 22.7728 17.6172 23.137 17.743 23.4768C17.8689 23.8165 18.0533 24.1252 18.2857 24.385C18.5177 24.6453 18.7933 24.8519 19.0966 24.9928C19.4 25.1337 19.7252 25.2062 20.0536 25.2062C20.382 25.2062 20.7072 25.1337 21.0105 24.9928C21.3139 24.8519 21.5894 24.6453 21.8214 24.385C22.1323 24.0378 22.3559 23.6049 22.4696 23.1299C22.5833 22.6549 22.583 22.1548 22.4688 21.68L26.2411 17.455C26.3795 17.3 26.3795 17.045 26.2411 16.89L24.9777 15.475ZM19.0179 10.4H20.9821C21.1786 10.4 21.3393 10.22 21.3393 10V6C21.3393 5.78 21.1786 5.6 20.9821 5.6H19.0179C18.8214 5.6 18.6607 5.78 18.6607 6V10C18.6607 10.22 18.8214 10.4 19.0179 10.4ZM30.625 21.3V23.5C30.625 23.72 30.7857 23.9 30.9821 23.9H34.5536C34.75 23.9 34.9107 23.72 34.9107 23.5V21.3C34.9107 21.08 34.75 20.9 34.5536 20.9H30.9821C30.7857 20.9 30.625 21.08 30.625 21.3ZM31.192 11.44L29.8036 9.885C29.7364 9.81056 29.6458 9.7688 29.5513 9.7688C29.4569 9.7688 29.3662 9.81056 29.2991 9.885L26.7723 12.715C26.7059 12.7902 26.6686 12.8917 26.6686 12.9975C26.6686 13.1033 26.7059 13.2048 26.7723 13.28L28.1607 14.835C28.2991 14.99 28.5268 14.99 28.6652 14.835L31.192 12.005C31.3304 11.85 31.3304 11.595 31.192 11.44ZM10.7188 9.885C10.6516 9.81056 10.561 9.7688 10.4665 9.7688C10.3721 9.7688 10.2814 9.81056 10.2143 9.885L8.82589 11.44C8.75943 11.5152 8.72214 11.6167 8.72214 11.7225C8.72214 11.8283 8.75943 11.9298 8.82589 12.005L11.3527 14.835C11.4911 14.99 11.7188 14.99 11.8571 14.835L13.2455 13.28C13.3839 13.125 13.3839 12.87 13.2455 12.715L10.7188 9.885ZM8.83929 20.9H5.26786C5.07143 20.9 4.91071 21.08 4.91071 21.3V23.5C4.91071 23.72 5.07143 23.9 5.26786 23.9H8.83929C9.03571 23.9 9.19643 23.72 9.19643 23.5V21.3C9.19643 21.08 9.03571 20.9 8.83929 20.9Z'
      fill='currentColor'
    />
  </Svg>
);

export const CalendarIcon = () => (
  <Svg viewBox='0 0 40 40'>
    <path
      d='M35.3125 3.125H33.4375V0H30.3125V3.125H9.6875V0H6.5625V3.125H4.6875C2.10281 3.125 0 5.22781 0 7.8125V35.3125C0 37.8972 2.10281 40 4.6875 40H35.3125C37.8972 40 40 37.8972 40 35.3125V7.8125C40 5.22781 37.8972 3.125 35.3125 3.125ZM36.875 35.3125C36.875 36.1741 36.1741 36.875 35.3125 36.875H4.6875C3.82594 36.875 3.125 36.1741 3.125 35.3125V14.6875H36.875V35.3125ZM36.875 11.5625H3.125V7.8125C3.125 6.95094 3.82594 6.25 4.6875 6.25H6.5625V9.375H9.6875V6.25H30.3125V9.375H33.4375V6.25H35.3125C36.1741 6.25 36.875 6.95094 36.875 7.8125V11.5625Z'
      fill='currentColor'
    />
    <path
      d='M9.0625 17.9688H5.9375V21.0938H9.0625V17.9688Z'
      fill='currentColor'
    />
    <path
      d='M15.3125 17.9688H12.1875V21.0938H15.3125V17.9688Z'
      fill='currentColor'
    />
    <path
      d='M21.5625 17.9688H18.4375V21.0938H21.5625V17.9688Z'
      fill='currentColor'
    />
    <path
      d='M27.8125 17.9688H24.6875V21.0938H27.8125V17.9688Z'
      fill='currentColor'
    />
    <path
      d='M34.0625 17.9688H30.9375V21.0938H34.0625V17.9688Z'
      fill='currentColor'
    />
    <path
      d='M9.0625 24.2188H5.9375V27.3438H9.0625V24.2188Z'
      fill='currentColor'
    />
    <path
      d='M15.3125 24.2188H12.1875V27.3438H15.3125V24.2188Z'
      fill='currentColor'
    />
    <path
      d='M21.5625 24.2188H18.4375V27.3438H21.5625V24.2188Z'
      fill='currentColor'
    />
    <path
      d='M27.8125 24.2188H24.6875V27.3438H27.8125V24.2188Z'
      fill='currentColor'
    />
    <path
      d='M9.0625 30.4688H5.9375V33.5938H9.0625V30.4688Z'
      fill='currentColor'
    />
    <path
      d='M15.3125 30.4688H12.1875V33.5938H15.3125V30.4688Z'
      fill='currentColor'
    />
    <path
      d='M21.5625 30.4688H18.4375V33.5938H21.5625V30.4688Z'
      fill='currentColor'
    />
    <path
      d='M27.8125 30.4688H24.6875V33.5938H27.8125V30.4688Z'
      fill='currentColor'
    />
    <path
      d='M34.0625 24.2188H30.9375V27.3438H34.0625V24.2188Z'
      fill='currentColor'
    />
  </Svg>
);

export const PatientsIcon = () => (
  <Svg viewBox='0 0 40 40'>
    <path
      d='M25.0197 16.7843H33.8041C34.4538 16.7843 34.9805 16.2576 34.9805 15.6079C34.9805 14.9581 34.4538 14.4314 33.8041 14.4314H25.0197C24.37 14.4314 23.8433 14.9581 23.8433 15.6079C23.8433 16.2576 24.37 16.7843 25.0197 16.7843Z'
      fill='currentColor'
    />
    <path
      d='M25.0197 21.8039H33.8041C34.4538 21.8039 34.9805 21.2772 34.9805 20.6275C34.9805 19.9777 34.4538 19.451 33.8041 19.451H25.0197C24.37 19.451 23.8433 19.9777 23.8433 20.6275C23.8433 21.2772 24.37 21.8039 25.0197 21.8039Z'
      fill='currentColor'
    />
    <path
      d='M38.8235 2.5098H16.1237L14.6828 0.492628C14.462 0.183451 14.1055 0 13.7255 0H1.17647C0.526745 0 0 0.526745 0 1.17647V36.6797V38.1641C0 38.6719 0.15625 39.7266 1.83594 40H3.00781H4.0625H38.8235C39.6484 39.6484 40 39.4922 40 38.5547C40 37.3047 40 7.70471 40 3.68627C40 3.03655 39.4733 2.5098 38.8235 2.5098ZM22.7075 37.6471H7.37255V35.178C7.37255 28.3421 15.6677 24.9631 20.463 29.7558C21.9103 31.2031 22.7074 33.1288 22.7074 35.178L22.7075 37.6471ZM11.7946 21.9122C11.7946 20.1227 13.2505 18.6667 15.0402 18.6667C16.8298 18.6667 18.2857 20.1226 18.2857 21.9122C18.2857 23.6977 16.834 25.1576 15.04 25.1576C13.2511 25.1576 11.7946 23.7024 11.7946 21.9122ZM37.6471 37.6471H25.0604V35.178C25.0604 31.0017 22.514 27.4445 18.9265 25.9363C22.5416 22.4438 20.0475 16.3137 15.0402 16.3137C10.0415 16.3137 7.53153 22.4441 11.158 25.9403C7.55498 27.4602 5.01961 31.0285 5.01961 35.178V37.6471H2.35294V2.35294H13.12L19.0427 10.6446C19.2635 10.9538 19.62 11.1373 20 11.1373H37.6471V37.6471ZM37.6471 8.78431H20.6055L17.8044 4.86275H37.6471V8.78431Z'
      fill='currentColor'
    />
  </Svg>
);


