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
  options?: Array<{}>;
  readFrom?: string;
  marginBottom?: number;
  marginTop?: number;
  handleSelectChange: (key: string, value: number) => void;
}

const options = [
  { id: 1, name: 'Miłosz', surname: 'Fretek' },
  { id: 2, name: 'Super', surname: 'Star' },
  { id: 3, name: 'Barabasz', surname: 'Wielki' },
  { id: 4, name: 'Barabasz', surname: 'Wielki' },
  { id: 5, name: 'Barabasz', surname: 'Wielki' },
  { id: 6, name: 'Barabasz', surname: 'Wielki' },
  { id: 7, name: 'Barabasz', surname: 'Wielki' },
  { id: 8, name: 'Barabasz', surname: 'Wielki' },
  { id: 9, name: 'Add', surname: 'Later' },
];

const Select: React.FC<Props> = ({
  label,
  placeholder,
  marginBottom,
  marginTop,
  name,
  readFrom,
  handleSelectChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setSelected] = useState('');

  const handleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option: any) => {
    setSelected(option.name + ' ' + option.surname);
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
              {options.map((option) => (
                <ListItem key={option.id} onClick={() => handleSelect(option)}>
                  {option.name + ' ' + option.surname}
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
