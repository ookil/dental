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

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
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

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setSelectedIndex((index) =>
          e.key === 'ArrowDown' ? index + 1 : index - 1
        );
      }

      if (selectedIndex > maxIndex) {
        setSelectedIndex(0);
      } else if (selectedIndex < 0) {
        setSelectedIndex(maxIndex);
      }

      if (e.key === 'Enter') {
        if (selectedIndex === -1) {
          setIsOpen(true);
        } else if (selectedIndex !== -1 || selectedIndex <= options?.length) {
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

  //for switching dropdown position - not finished
  useEffect(() => {
    function updatePosition() {
      if (dropdownRef.current) {
        const bottomPos = dropdownRef.current.getBoundingClientRect().bottom;
        console.log(bottomPos);
      }
    }
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  });

  return (
    <>
      <SelectContainer marginBottom={marginBottom} marginTop={marginTop}>
        <Label>
          {label}
          {isError && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Label>
        <StyledSelect
          onClick={handleDropdown}
          onBlur={() => setIsOpen(false)}
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
            <DropdownList ref={dropdownRef} role='listbox' tabIndex={-1}>
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
    </>
  );
};

export default Select;
