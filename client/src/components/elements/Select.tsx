import React, { useRef } from 'react';
import { useSelectHook } from '../../utils/useSelectHook';
import { CollapseIcon } from '../Toolbar/Toolbar.elements';
import {
  DropdownButton,
  DropdownList,
  DropdownListContainer,
  ErrorMessage,
  Label,
  ListItem,
  SelectContainer,
  SelectPlaceholder,
  StyledSelect,
} from './Elements';

type Props = {
  label?: string;
  placeholder?: string;
  fieldName: string;
  readFrom: string;
  displayValue?: string;
  marginBottom?: number;
  marginTop?: number;
  options?: any[];
  isError?: boolean;
  errorMsg?: string;
  handleSelectChange: (key: string, value: number) => void;
};

const Select: React.FC<Props> = ({
  label,
  placeholder,
  marginBottom,
  marginTop,
  fieldName,
  readFrom,
  options,
  isError,
  errorMsg,
  displayValue,
  handleSelectChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>();

  const {
    isOpen,
    isSelected,
    selectedIndex,
    handleDropdown,
    handleKeyDown,
    handleSelect,
  } = useSelectHook(
    dropdownRef,
    fieldName,
    readFrom,
    handleSelectChange,
    displayValue,
    options
  );

  return (
    <SelectContainer marginBottom={marginBottom} marginTop={marginTop}>
      <Label>
        {label}
        {isError && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </Label>
      <StyledSelect
        onClick={handleDropdown}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <DropdownButton>
          <CollapseIcon />
        </DropdownButton>
        <SelectPlaceholder>
          {isSelected ? <span>{isSelected}</span> : placeholder}
        </SelectPlaceholder>
      </StyledSelect>
      {isOpen && (
        <DropdownListContainer>
          <DropdownList ref={dropdownRef} role='listbox'>
            {options &&
              options.map((option, index) => (
                <ListItem
                  role='option'
                  key={option.id || index}
                  isActive={selectedIndex === index}
                  onClick={() => handleSelect(option, index)}
                >
                  {displayValue ? option[displayValue] : option}
                </ListItem>
              ))}
          </DropdownList>
        </DropdownListContainer>
      )}
    </SelectContainer>
  );
};

export default Select;
