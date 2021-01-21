import React, { useState } from 'react';
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
}

const dentists = [
  { id: 1, name: 'Miłosz', surname: 'Fretek' },
  { id: 2, name: 'Super', surname: 'Star' },
  { id: 3, name: 'Barabasz', surname: 'Wielki' },
];

const Select: React.FC<Props> = ({
  label,
  options,
  placeholder,
  ...selectProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setSelected] = useState('');

  const handleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (dentist: any) => {
    setSelected(dentist.name + ' ' + dentist.surname);
    setIsOpen(false);
  };

  return (
    <>
      <Label>{label}</Label>
      <SelectContainer>
        <StyledSelect onClick={handleDropdown}>
          <DropdownButton>
            <CollapseIcon />
          </DropdownButton>
          <SelectPlaceholder>
            {isSelected ? isSelected : placeholder}
          </SelectPlaceholder>
        </StyledSelect>
        {isOpen && (
          <DropdownListContainer>
            <DropdownList>
              {dentists.map((dentist) => (
                <ListItem
                  key={dentist.id}
                  onClick={() => handleSelect(dentist)}
                >
                  {dentist.name + ' ' + dentist.surname}
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
