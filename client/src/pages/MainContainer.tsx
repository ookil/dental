import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { device } from '../globalStyles';

export const Container = styled.div<{ toolbarCollapsed: boolean }>`
  width: calc(
    100vw - ${({ toolbarCollapsed }) => (toolbarCollapsed ? '20px' : '160px')}
  );
  height: calc(100vh - 60px);
  background-color: skyblue;
  float: right;
  transition: width 0.5s ease-in-out;
  padding: 10px 15px;

  @media ${device.maxMobile} {
    width: 100vw;
    transition: none;
  }
`;

type Props = {
  children: ReactNode;
};

const MainContainer: React.FC<Props> = ({ children }) => {
  const toolbarCollapsed = useSelector(
    (state: RootState) => state.clinic.isToolbarCollapsed
  );

  return <Container toolbarCollapsed={toolbarCollapsed}>{children}</Container>;
};

export default MainContainer;
