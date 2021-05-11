import { React } from '@ungap/global-this';
import { SVGProps } from 'react';
import { Arrow, UseLayerArrowProps } from 'react-laag';
import styled from 'styled-components';

export const HoverMenu = styled.div`
  background: rgb(33, 22, 32);
  box-shadow: rgb(0 0 0 / 15%) 4px 4px 10px 0px;
  border-radius: 4px;
  padding: 5px 10px;
  color: white;
  font-size: 0.8em;
`;

type DarkArrowProps = UseLayerArrowProps & { size: number };

export const DarkArrow = (props: DarkArrowProps) => (
  <Arrow {...props} backgroundColor={'rgb(33, 22, 32)'} />
);
