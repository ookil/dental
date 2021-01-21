import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color, device } from '../../globalStyles';

const { bgPrimary, bluePrimary, blueTetriary, textPrimary } = color;

export const Nav = styled.nav`
  background-color: ${bgPrimary};
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-bottom: 3px solid ${bluePrimary};
  color: ${textPrimary};
  position: relative;
  z-index: 29;
`;

export const NavbarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const NavLogo = styled(Link)`
  cursor: [pointer];
  text-decoration: none;
  width: 180px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: ${color.textPrimary};

  @media ${device.mobileM} {
    max-width: 50px;
  }
`;

export const NavIcon = styled.img`
  height: 45px;
  margin-right: 10px;
`;

export const NavLogoTitle = styled.p`
  font-weight: 700;

  @media ${device.mobileM} {
    display: none;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media ${device.maxMobile} {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    cursor: pointer;
  }
`;

export const QuickMenu = styled.div`
  background-color: ${blueTetriary};
  align-self: flex-end;
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 15px 15px 0 0;
  padding: 0 15px;
  margin-right: 50px;
  margin-left: auto;

  @media ${device.laptop} {
    margin-right: 0;
  }

  @media ${device.maxMobile} {
    display: none;
  }
`;

export const QuickMenuItem = styled.div`
  height: 90%;
  min-width: 170px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9em;
  margin-right: 10px;
  font-weight: 500;

  &:hover {
    border-radius: 5px;
    background-color: white;
  }

  @media ${device.laptop} {
    margin-right: 0;
  }
`;

export const QuickMenuIcon = styled.img`
  height: 25px;
  margin-right: 10px;
`;

export const CurrentPage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 50px;
`;

export const CurrentPageIcon = styled.div`
  color: ${bluePrimary};

  @media ${device.mobileM} {
    display: none;
  }
`;

export const CurrentPageTitle = styled.h3`
  font-weight: 700;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 10px;
`;




export const CloseIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 19 19'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M2 2L17 17M17 2L2 17'
      stroke='#333333'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const HamburgerIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 19 19'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M2 2H17M2 9.5H17M2 17H17'
      stroke='#333333'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
