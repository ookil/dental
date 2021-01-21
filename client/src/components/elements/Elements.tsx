import styled, { css } from 'styled-components';
import { color } from '../../globalStyles';

const {
  textPrimary,
  textSecondary,
  bluePrimary,
  bgSecondary,
  greenConfirm,
  pinkCancel,
} = color;

export const Label = styled.div`
  text-transform: uppercase;
  color: black;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 5px;
  font-weight: 500;

  span {
    color: ${pinkCancel};
  }
`;

const InputBox = css`
  border-radius: 5px;
  width: 100%;
  height: 40px;
  border: 1px solid ${textSecondary};
  background-color: rgba(216, 217, 218, 0.6);
  color: ${textPrimary};
  font-weight: 500;
  font-family: 'Montserrat';
  font-size: 14px;
  padding: 0 8px;

  &:focus {
    outline-color: ${bluePrimary};
  }
`;

export const StyledInput = styled.input`
  ${InputBox}
  margin-bottom: 25px;
`;

export const SelectContainer = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

export const StyledSelect = styled.div`
  ${InputBox}
  cursor: pointer;
  position: relative;
`;

export const SelectPlaceholder = styled.p`
  color: ${textSecondary};
  line-height: 40px;
`;

export const DropdownButton = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-25%, -50%) rotate(-90deg) scale(1.5);
  color: ${bluePrimary};
`;

export const DropdownListContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const DropdownList = styled.ul`
  ${InputBox}
  background-color: #e0e0e0;
  padding: 0;
  height: auto;
  position: absolute;
  z-index: 30;
`;

export const ListItem = styled.li`
  list-style: none;
  padding-left: 8px;
  width: 100%;
  line-height: 40px;
  cursor: pointer;

  &:hover {
    background-color: ${bluePrimary};
    color: white;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  border: none;
  cursor: pointer;
  border-radius: 15px;
  padding: 0.5em 1em;
  font-weight: 500;
  box-shadow: 0 3px 6px 0px #777777;
  background-color: ${(props) => (props.primary ? bluePrimary : bgSecondary)};
  color: ${(props) => (props.primary ? 'white' : bluePrimary)};

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${(props) => props.primary && greenConfirm};
    color: ${(props) => (props.primary ? 'white' : pinkCancel)};
  }
`;
