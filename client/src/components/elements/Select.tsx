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
  DisplayValue,
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
  initialValue?: string;
  sizing?: 'big' | 'small';
  handleSelectChange: (key: string, value: any) => void;
  renderOverride?: () => JSX.Element;
  hiddenSize?: string;
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
  initialValue,
  sizing,
  handleSelectChange,
  renderOverride,
  hiddenSize,
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
    options,
    displayValue,
    initialValue
  );

  return (
    <SelectContainer
      marginBottom={marginBottom}
      marginTop={marginTop}
      sizing={sizing}
      hiddenSize={hiddenSize}
    >
      <Label sizing={sizing}>
        {label}
        {isError && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </Label>
      <StyledSelect
        onClick={handleDropdown}
        onKeyDown={(e) => handleKeyDown(e)}
        sizing={sizing}
      >
        <DropdownButton sizing={sizing}>
          <CollapseIcon />
        </DropdownButton>
        {renderOverride ? (
          renderOverride()
        ) : (
          <DisplayValue sizing={sizing}>
            {isSelected ? isSelected : <span>{placeholder}</span>}
          </DisplayValue>
        )}
      </StyledSelect>
      {isOpen && (
        <DropdownListContainer>
          <DropdownList ref={dropdownRef} role='listbox' sizing={sizing}>
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
