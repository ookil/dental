import React from 'react';
import styled from 'styled-components';
import { CalendarIcon } from '../Toolbar/Toolbar.elements';
import { color } from '../../globalStyles';
import { StyledDayPicker } from '../daypicker/CustomDayPicke.Elements';

export const Container = styled.div`
  border-radius: 3px;
  width: 135px;
  height: 40px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px inset;
  background-color: rgb(244 244 244 / 60%);
  color: #333333;
  font-weight: 500;
  font-family: 'Montserrat';
  font-size: 14px;
  padding: 0 8px;
  border: none;
  position: relative;
`;

export const WrapperBox = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const Separator = styled.span`
  margin: 0 2px;
`;

export const DateInput = styled.input`
  width: ${({ width }) => (width ? width + 'px' : '30px')};
  height: 30px;
  outline: none;
  border: none;
  background-color: transparent;
  text-align: center;
`;

const Button = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: inline-block;
  margin-left: 10px;
  color: #5c5b5b;

  &:hover {
    color: ${color.bluePrimary};
  }
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const CalendarButton = ({ handleClick }: any) => (
  <Button onClick={handleClick}>
    <CalendarIcon />
  </Button>
);

export const BdayPicker = styled(StyledDayPicker)`
  width: auto;
  transform: translateY(40px);
  z-index: 1;
`;
