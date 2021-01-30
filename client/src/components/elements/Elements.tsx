import styled, { css } from 'styled-components';
import { color } from '../../globalStyles';

const {
  textPrimary,
  textSecondary,
  bluePrimary,
  blueSecondary,
  bgSecondary,
  greenConfirm,
  pinkCancel,
} = color;

export const InputContainer = styled.div<{
  marginBottom?: number;
  marginTop?: number;
}>`
  margin-top: ${(props) => (props.marginTop ? `${props.marginTop}px` : 0)};
  margin-bottom: ${(props) =>
    props.marginBottom
      ? props.marginBottom === 0
        ? props.marginBottom
        : `${props.marginBottom}px`
      : '15px'};
`;

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

export const ErrorMessage = styled.small`
  margin-left: 3px;
  text-transform: none;
  font-style: italic;
  color: ${pinkCancel};
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

export const StyledInput = styled.input<{ isError: boolean }>`
  ${InputBox}
  border: 1px solid ${({ isError }) => (isError ? pinkCancel : textSecondary)};
`;

export const SelectContainer = styled.div<{
  marginBottom?: number;
  marginTop?: number;
}>`
  width: 100%;
  margin-top: ${(props) => (props.marginTop ? `${props.marginTop}px` : 0)};
  margin-bottom: ${(props) =>
    props.marginBottom ? `${props.marginBottom}px` : '25px'};
`;

export const StyledSelect = styled.div.attrs((props) => ({ tabIndex: 0 }))`
  ${InputBox}
  cursor: pointer;
  position: relative;
`;

export const InputWrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

export const SelectPlaceholder = styled.p`
  color: ${textSecondary};
  line-height: 40px;

  span {
    color: ${textPrimary};
  }
`;

export const DropdownButton = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-25%, -50%) rotate(-90deg) scale(1.5);
  color: ${bluePrimary};
`;

export const DropdownListContainer = styled.div<{ ref?: any }>`
  width: 100%;
  position: relative;
`;

export const DropdownList = styled.ul<{ ref?: any }>`
  ${InputBox}
  background-color: #e0e0e0;
  padding: 0;
  height: auto;
  max-height: 160px;
  overflow: auto;
  position: absolute;
  z-index: 30;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25), -3px 3px 5px rgba(0, 0, 0, 0.25);

  @media (max-height: 740px) {
    /* top: -200px; */
    box-shadow: -3px 0px 4px -1px rgba(0, 0, 0, 0.25),
      3px -2px 4px -1px rgba(0, 0, 0, 0.25);
  }
`;

export const ListItem = styled.li<{ isActive?: boolean }>`
  list-style: none;
  padding-left: 8px;
  width: 100%;
  line-height: 40px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? blueSecondary : 'inherit')};
  color: ${(props) => (props.isActive ? 'white' : 'inherit')};

  &:hover {
    background-color: ${blueSecondary};
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

export const BigErrorMessage = styled.div`
  color: ${pinkCancel};
  font-weight: 600;
  margin: auto;
`;
