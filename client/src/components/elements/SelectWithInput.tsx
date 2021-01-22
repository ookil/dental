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
  patients?: Array<{}>;
  marginBottom?: number;
  marginTop?: number;
}

const patients = [
  { id: 1, name: 'Miłosz', surname: 'Fretek' },
  { id: 2, name: 'Super', surname: 'Star' },
  { id: 3, name: 'Barabasz', surname: 'Wielki' },
  { id: 4, name: 'Barabasz', surname: 'Wielki' },
  { id: 5, name: 'Barabasz', surname: 'Wielki' },
  { id: 6, name: 'Barabasz', surname: 'Wielki' },
  { id: 7, name: 'Barabasz', surname: 'Wielki' },
  { id: 8, name: 'Barabasz', surname: 'Wielki' },
  { id: 11, name: 'Miłosz', surname: 'Bernardo' },
  { id: 12, name: 'Miłosz', surname: 'Gozik' },
  { id: 9, name: 'Add', surname: 'Later' },
];

const SelectWithInput: React.FC<Props> = ({
  label,
  placeholder,
  marginBottom,
  marginTop,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setSelected] = useState('');

  const handleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (dentist: any) => {
    setSelected(dentist.name + ' ' + dentist.surname);
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
          />
        </InputWrapper>

        {isOpen && filteredPatients?.length !== 0 && (
          <DropdownListContainer>
            <DropdownList ref={dropdownRef}>
              {filteredPatients !== null
                ? filteredPatients.map((patient) => (
                    <ListItem
                      key={patient.id}
                      onClick={() => handleSelect(patient)}
                    >
                      {patient.name + ' ' + patient.surname}
                    </ListItem>
                  ))
                : patients.map((patient) => (
                    <ListItem
                      key={patient.id}
                      onClick={() => handleSelect(patient)}
                    >
                      {patient.name + ' ' + patient.surname}
                    </ListItem>
                  ))}
            </DropdownList>
          </DropdownListContainer>
        )}
      </SelectContainer>
    </>
  );
};

export default SelectWithInput;
