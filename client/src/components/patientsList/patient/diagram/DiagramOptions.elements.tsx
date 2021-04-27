import styled from 'styled-components';
import { color } from '../../../../globalStyles';

const { textSecondary, bluePrimary } = color;

export const OptionsWrapper = styled.div`
  width: 100%;
  height: 450px;
`;

export const BoxRoot = styled.div<{ isOpen: boolean; isSiblingOpen: boolean }>`
  width: 100%;
  height: auto;

  :nth-child(2) {
    margin-top: 1.5%;
  }

  transition: height 300ms ease-in-out;

  ${({ isOpen, isSiblingOpen }) => {
    if (isOpen && isSiblingOpen) {
      return `
        height: calc(49%);
      `;
    }
  }}
`;

export const BoxHeader = styled.div`
  width: 100%;
  height: 30px;
  color: white;
  background-color: ${bluePrimary};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.95em;
  font-weight: 600;
  cursor: pointer;
`;

export const BoxBody = styled.div<{ isOpen: boolean; isSiblingOpen: boolean }>`
  background-color: #f5f5f5;
  border-radius: 0 0 3px 3px;
  height: 0;

  /* transition: height 300ms ease; */

  ${({ isOpen, isSiblingOpen }) => {
    if (isOpen && isSiblingOpen) {
      return `
        overflow: hidden;
        height: calc(100% - 30px);
      `;
    }

    if (isOpen) {
      return `
        height: 380px;
        overflow: hidden;
      `;
    }
  }}
`;

export const FlexBox = styled.div`
  display: flex;
  padding: 5px 0;
`;

export const CategoriesList = styled.ul`
  list-style: none;
  max-width: 10%;
  border-right: 1px solid black;
  overflow: scroll;
`;

export const CategoryItem = styled.li`
  cursor: pointer;
  font-size: 0.9em;
  padding: 5px 8px;
`;
