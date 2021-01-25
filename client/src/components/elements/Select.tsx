import React, { useEffect, useRef, useState } from 'react';
import { CollapseIcon } from '../Toolbar/Toolbar.elements';
import {
  DropdownButton,
  DropdownList,
  DropdownListContainer,
  Label,
  ListItem,
  SelectContainer,
  SelectPlaceholder,
  StyledSelect,
} from './Elements';

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: string;
  readFrom?: string;
  marginBottom?: number;
  marginTop?: number;
  options?: any[];
  handleSelectChange: (key: string, value: number) => void;
}

const Select: React.FC<Props> = ({
  label,
  placeholder,
  marginBottom,
  marginTop,
  name,
  readFrom,
  options,
  handleSelectChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setSelected] = useState('');

  const handleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option: any) => {
    if (option.surname !== undefined) {
      setSelected(option.name + ' ' + option.surname);
    } else {
      setSelected(option.name);
    }
    if (name && readFrom) {
      handleSelectChange(name, option[readFrom]);
    }
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>();

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
    <>
      <SelectContainer marginBottom={marginBottom} marginTop={marginTop}>
        <Label>{label}</Label>
        <StyledSelect onClick={handleDropdown}>
          <DropdownButton>
            <CollapseIcon />
          </DropdownButton>
          <SelectPlaceholder>
            {isSelected ? <span>{isSelected}</span> : placeholder}
          </SelectPlaceholder>
        </StyledSelect>
        {isOpen && (
          <DropdownListContainer>
            <DropdownList ref={dropdownRef}>
              {options &&
                options.map((option) => (
                  <ListItem
                    key={option.id}
                    onClick={() => handleSelect(option)}
                  >
                    {option.surname
                      ? option.name + ' ' + option.surname
                      : option.name}
                  </ListItem>
                ))}
            </DropdownList>
          </DropdownListContainer>
        )}
      </SelectContainer>
    </>
  );
};

export default Select;
