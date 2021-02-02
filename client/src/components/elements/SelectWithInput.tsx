import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  clearFilteredPatients,
  filterPatients,
} from '../../store/slices/modalsSlice';
import { useAppDispatch, RootState } from '../../store/store';
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
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setSelected] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: any, index: number) => {
    setSelectedIndex(index);

    displayValue ? setSelected(option[displayValue]) : setSelected(option);

    handleSelectChange(fieldName, option[readFrom]);
    setIsOpen(false);
  };

  const dispatch = useAppDispatch();
  const filteredPatients = useSelector(
    (state: RootState) => state.modal.filteredPatients
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    if (e.target.value !== '') {
      dispatch(filterPatients(e.target.value));
    } else {
      dispatch(clearFilteredPatients());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (options) {
      const indexes = Object.keys(options);
      const maxIndex = indexes.length - 1;

      if (dropdownRef && dropdownRef.current) {
        if (e.key === 'ArrowDown') {
          setSelectedIndex((index) =>
            selectedIndex + 1 > maxIndex ? 0 : index + 1
          );
        }
        if (e.key === 'ArrowUp') {
          setSelectedIndex((index) =>
            selectedIndex - 1 < 0 ? maxIndex : index - 1
          );
        }
      }

      if (e.key === 'Tab') if (isOpen === true) setIsOpen(false);

      if (e.key === 'Enter') {
        e.preventDefault();
        if (isOpen === false) {
          setIsOpen(true);
        } else if (selectedIndex !== -1 ) {
          handleSelectChange(fieldName, options[selectedIndex][readFrom])
          displayValue
            ? setSelected(options[selectedIndex][displayValue])
            : setSelected(options[selectedIndex]);
          setIsOpen(false);
        }
      }
    }
  };

  const dropdownRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dropdownRef && dropdownRef.current) 
      dropdownRef.current.scrollTop = selectedIndex * 40
  });

  useEffect(() => {
    //Close dropdown if clicked outside

    //proper type for event?
    function handleClickOutside(event: any) {
      if (
        dropdownRef &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

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
