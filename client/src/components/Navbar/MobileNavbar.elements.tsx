import styled, { css } from 'styled-components';
import { MobileNavProps } from './MobileNavbar';
import { color } from '../../globalStyles';
import { Link } from 'react-router-dom';

const { bgPrimary, blueTetriary, textPrimary } = color;

export const MobileNav = styled.div<MobileNavProps>`
  position: absolute;
  top: 60px;
  left: ${({ isOpen }) => (isOpen ? 0 : '-100%')};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
  transition: all 0.5s ease-in-out;
  z-index: 10;
  background: ${bgPrimary};
  /*   padding-top: 10px; */

  @media (min-width: 940px) {
    display: none;
  }
`;

const NavItem = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  width: 100%;
  color: ${textPrimary};
  text-align: center;
  font-weight: 500;
  cursor: pointer;
`;

export const QuickMenu = styled.div`
  background-color: ${blueTetriary};
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(32, 32, 32, 0.212);
`;

export const QuickMenuItem = styled.div`
  ${NavItem}
  margin-bottom: 3px;

  &:hover {
    background-color: white;
  }
`;

export const QuickMenuTitle = styled.p`
  font-weight: 500;
`;

export const NavLink = styled(Link)`
  ${NavItem}
  text-decoration: none;
`;

export const LogoutButton = styled.button`
  ${NavItem}
  background-color: #e8bcbc;
  border: 1px solid rgba(32, 32, 32, 0.212);
`;
