import React, { useEffect, useRef, useState } from 'react';
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
}

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
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setSelected] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option: any, index: number) => {
    setSelectedIndex(index);

    displayValue ? setSelected(option[displayValue]) : setSelected(option);

    //[fieldName]: [option[readFrom]] <- to set chosen options
    handleSelectChange(fieldName, option[readFrom]);

    setIsOpen(false);
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
          if (selectedIndex > 0)
            dropdownRef.current.scrollTop = dropdownRef.current?.scrollTop + 40;
          if (selectedIndex === maxIndex) dropdownRef.current.scrollTop = 0;
        }
        if (e.key === 'ArrowUp') {
          setSelectedIndex((index) =>
            selectedIndex - 1 < 0 ? maxIndex : index - 1
          );
          if (selectedIndex === 0)
            dropdownRef.current.scrollTop = dropdownRef.current.scrollHeight;
          else {
            dropdownRef.current.scrollTop = dropdownRef.current?.scrollTop - 40;
          }
        }
      }

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
  /* console.log(dropdownRef?.current?.getBoundingClientRect()); */

  useEffect(() => {
    /**
     Close dropdown if clicked outside
     */
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
      <SelectContainer marginBottom={marginBottom} marginTop={marginTop}>
        <Label>
          {label}
          {isError && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Label>
        <StyledSelect
          onClick={handleDropdown}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)} // timeout because otherwiise onClick won't fire
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
