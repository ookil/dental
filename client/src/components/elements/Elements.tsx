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

export const Label = styled.div<{ sizing?: 'big' | 'small' }>`
  text-transform: uppercase;
  color: black;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 5px;
  font-weight: 500;

  ${({ sizing }) =>
    sizing === 'big' &&
    css`
      font-size: 14px;
      text-transform: none;
      font-weight: 600;
    `}

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
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px inset;
  background-color: rgba(242, 241, 238, 0.6);
  color: ${textPrimary};
  font-weight: 500;
  font-family: 'Montserrat';
  font-size: 14px;
  padding: 0 8px;

  &:focus {
    outline-color: ${bluePrimary};
  }
`;

const SizingBig = css`
  height: 45px;
  box-shadow: none;
  border-bottom: 1px solid ${bluePrimary};
  font-size: 14px;
`;

const SizingSmall = css`
  box-shadow: none;
  background-color: white;
  margin-right: 30px;
  outline: none;
`;

export const StyledInput = styled.input<{
  isError: boolean;
  sizing?: 'big' | 'small';
}>`
  ${InputBox}
  border: none;

  ${({ sizing }) => sizing === 'big' && SizingBig}
  box-shadow: ${({ isError }) => isError && '#e3339d7d 0px 0px 0px 1px inset'};
`;

export const SelectContainer = styled.div<{
  marginBottom?: number;
  marginTop?: number;
  sizing?: 'big' | 'small';
  hiddenSize?: string;
}>`
  width: ${({ sizing }) => (sizing === 'small' ? 'auto' : '100%')};
  margin-top: ${(props) => (props.marginTop ? `${props.marginTop}px` : 0)};
  margin-bottom: ${(props) =>
    props.marginBottom ? `${props.marginBottom}px` : '25px'};

  ${({ hiddenSize }) =>
    hiddenSize &&
    css`
      @media (max-width: ${hiddenSize}) {
        display: none;
      }
    `}
`;

export const StyledSelect = styled.div.attrs(() => ({ tabIndex: 0 }))<{
  sizing?: 'big' | 'small';
}>`
  ${InputBox}
  ${({ sizing }) => sizing === 'big' && SizingBig}
  ${({ sizing }) => sizing === 'small' && SizingSmall}
  cursor: pointer;
  position: relative;
`;

export const InputWrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

export const DisplayValue = styled.p<{ sizing?: 'big' | 'small' }>`
  color: ${textPrimary};
  line-height: 40px;
  white-space: nowrap;
  padding-right: 24px;
  ${({ sizing }) =>
    sizing === 'big' &&
    css`
      line-height: 45px;
    `}

  span {
    color: ${textSecondary};
  }
`;

export const DropdownButton = styled.div<{ sizing?: 'big' | 'small' }>`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-25%, -50%) rotate(-90deg) scale(1.5);
  color: ${bluePrimary};
  ${({ sizing }) =>
    sizing === 'small' &&
    'transform: translate(-25%, -50%) rotate(-90deg) scale(1.1)'}
`;

export const DropdownListContainer = styled.div<{ ref?: any }>`
  width: 100%;
  position: relative;
`;

export const DropdownList = styled.ul.attrs(() => ({ tabIndex: -1 }))<{
  ref?: any;
  sizing?: 'big' | 'small';
}>`
  ${InputBox}
  background-color: rgba(242, 241, 238);
  padding: 0;
  height: auto;
  max-height: 160px;
  overflow: auto;
  position: absolute;
  right: 0;
  z-index: 30;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25), -3px 3px 5px rgba(0, 0, 0, 0.25);
  ${({ sizing }) =>
    sizing === 'small' &&
    'background-color: white; outline: none; min-width: 180px; font-size: 12.5px;'}
`;

export const ListItem = styled.li<{
  isActive?: boolean;
  sizing?: 'small' | 'big';
}>`
  list-style: none;
  padding-left: 8px;
  width: 100%;
  line-height: 40px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${(props) => (props.isActive ? blueSecondary : 'inherit')};
  color: ${(props) => (props.isActive ? 'white' : 'inherit')};

  &:hover {
    background-color: ${blueSecondary};
    color: white;
  }

  &::after {
    content: '';
    background: #dfdfdf;
    display: block;
    width: 90%;
    height: 1px;
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

export const GifWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Gif = styled.img`
  height: 60%;
  max-width: 100px;
  max-height: 100px;
`;
