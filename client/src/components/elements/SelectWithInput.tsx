import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  clearFilteredPatients,
  filterPatients,
} from '../../store/slices/modalsSlice';
import { useAppDispatch, RootState } from '../../store/store';
import { useSelectHook } from '../../utils/useSelectHook';
import { CollapseIcon } from '../Toolbar/Toolbar.elements';
import {
  DropdownButton,
  DropdownList,
  DropdownListContainer,
  ErrorMessage,
  InputWrapper,
  Label,
  ListItem,
  SelectContainer,
} from './Elements';
import Input from './Input';

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: string;
  fieldName: string;
  readFrom: string;
  displayValue?: string;
  options?: any[];
  marginBottom?: number;
  marginTop?: number;
  isError?: boolean;
  errorMsg?: string;
  handleSelectChange: (key: string, value: number) => void;
}

const SelectWithInput: React.FC<Props> = ({
  label,
  fieldName,
  displayValue,
  readFrom,
  options,
  marginBottom,
  marginTop,
  isError,
  errorMsg,
  handleSelectChange,
}) => {
  const dispatch = useAppDispatch();
  const filteredPatients = useSelector(
    (state: RootState) => state.modal.filteredPatients
  );

  const dropdownRef = useRef<HTMLDivElement>();

  const {
    isOpen,
    isSelected,
    selectedIndex,
    handleDropdown,
    handleKeyDown,
    handleSelect,
    setSelected,
  } = useSelectHook(
    dropdownRef,
    fieldName,
    readFrom,
    handleSelectChange,
    displayValue,
    options,
    filteredPatients
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    if (e.target.value !== '') {
      dispatch(filterPatients(e.target.value));
    } else {
      dispatch(clearFilteredPatients());
    }
  };

  return (
    <>
      <SelectContainer marginBottom={marginBottom} marginTop={marginTop}>
        <Label>
          {label}
          {isError && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Label>
        <InputWrapper>
          <DropdownButton>
            <CollapseIcon />
          </DropdownButton>
          <Input
            marginBottom={marginBottom}
            onClick={handleDropdown}
            type='text'
            placeholder='Select patient'
            onChange={handleChange}
            value={isSelected}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </InputWrapper>

        {isOpen && filteredPatients?.length !== 0 && (
          <DropdownListContainer>
            <DropdownList ref={dropdownRef} tabIndex={-1}>
              {filteredPatients !== null ? (
                filteredPatients.map((option, index) => (
                  <ListItem
                    key={option.id || index}
                    isActive={selectedIndex === index}
                    onClick={() => handleSelect(option, index)}
                  >
                    {displayValue ? option[displayValue] : option}
                  </ListItem>
                ))
              ) : options && options.length > 0 ? (
                options.map((option, index) => (
                  <ListItem
                    key={option.id || index}
                    isActive={selectedIndex === index}
                    onClick={() => handleSelect(option, index)}
                  >
                    {displayValue ? option[displayValue] : option}
                  </ListItem>
                ))
              ) : (
                <ListItem>No patients</ListItem>
              )}
            </DropdownList>
          </DropdownListContainer>
        )}
      </SelectContainer>
    </>
  );
};

export default SelectWithInput;
