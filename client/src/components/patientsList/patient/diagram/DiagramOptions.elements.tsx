import styled from 'styled-components';
import { color } from '../../../../globalStyles';

const { bluePrimary, bgPrimary, bgSecondary } = color;

export const OptionsWrapper = styled.div`
  width: 100%;
  height: 450px;
`;

export const BoxRoot = styled.div<{ isOpen: boolean; isSiblingOpen: boolean }>`
  width: 100%;
  height: auto;
  background-color: #f5f5f5;
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
  box-shadow: 1px 1px 3px 1px rgb(0 0 0 / 39%);
`;

export const BoxBody = styled.div<{ isOpen: boolean; isSiblingOpen: boolean }>`
  /* background-color: #f5f5f5; */
  background-color: ${bgPrimary};
  border-radius: 0 0 3px 3px;
  height: 0;
  box-shadow: inset 0px 1px 4px 2px rgb(0 0 0 / 27%);

  /* transition: height 300ms ease; */

  ${({ isOpen, isSiblingOpen }) => {
    if (isOpen && isSiblingOpen) {
      return `
        
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
  height: 100%;
`;

export const CategoriesList = styled.ul`
  list-style: none;
  width: 125px;
  border-right: 1px solid #8db5f2;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
  }
`;

export const ActionsList = styled.div`
  overflow-y: scroll;
  display: flex;
  margin-left: 5px;
  padding: 5px;

  &::-webkit-scrollbar {
    width: 3px;
  }
`;

export const ActionItem = styled.div`
  margin: 3px;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export const PaddingBox = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 1px;
  border: 1px solid lightgray;

  &:hover {
    border: 1px solid ${bluePrimary};
  }

  ${({ isSelected }) =>
    isSelected &&
    `
  box-shadow: 0px 0px 2px 1px #337ae3;
  `}
`;

export const FillColorBox = styled.div<{
  fillColor: string | null;
}>`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: ${({ fillColor }) => (fillColor ? fillColor : 'white')};
`;

export const CategoryItem = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  font-size: 0.9em;
  padding: 5px 8px;

  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${bgSecondary};
    color: ${bluePrimary};
    box-shadow: inset 2px 0px 3px 0px rgb(0 0 0 / 27%);
    `}

  &:hover {
    background-color: ${bgSecondary};
    color: ${bluePrimary};
    box-shadow: inset 2px 0px 3px 0px rgb(0 0 0 / 27%);
  }
`;
