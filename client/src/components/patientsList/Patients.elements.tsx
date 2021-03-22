import styled from 'styled-components';
import { color } from '../../globalStyles';

const { textSecondary } = color;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.p``;

export const Header = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1px solid rgb(141 141 151 / 30%);
`;

export const Separator = styled.div`
  margin: 0 20px;
  height: 50%;
  width: 1px;
  background-color: rgb(141 141 151 / 30%);
`;
