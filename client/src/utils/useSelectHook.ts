import { useState, useEffect, useCallback } from 'react';

export const useSelectHook = (
  dropdownRef: any,
  fieldName: string,
  readFrom: string,
  handleSelectChange: (key: string, value: number | string) => void,
  options?: any[],
  displayValue?: string,
  initialValue?: string,
  filteredOptions?: any[] | null
) => {
  const initialIndex = options?.findIndex((option) => {
    if (displayValue) {
      return option[displayValue] === initialValue;
    }
    return option === initialValue;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setSelected] = useState(initialValue);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex || -1);

  const handleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = useCallback(
    (option: any, index: number) => {
      setSelectedIndex(index);

      displayValue ? setSelected(option[displayValue]) : setSelected(option);

      //[fieldName]: [option[readFrom]] <- to set chosen options
      handleSelectChange(fieldName, option[readFrom]);

      setIsOpen(false);
    },
    [displayValue, fieldName, readFrom, handleSelectChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (options) {
      const indexes = filteredOptions
        ? Object.keys(filteredOptions)
        : Object.keys(options);
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
        } else if (selectedIndex !== -1) {
          const selectOption = filteredOptions
            ? filteredOptions[selectedIndex][readFrom]
            : options[selectedIndex][readFrom];

          handleSelectChange(fieldName, selectOption);

          const displayOption = filteredOptions
            ? filteredOptions[selectedIndex]
            : options[selectedIndex];

          displayValue
            ? setSelected(displayOption[displayValue])
            : setSelected(displayOption);
          setIsOpen(false);
        }
      }
    }
  };

  useEffect(() => {
    if (dropdownRef && dropdownRef.current)
      dropdownRef.current.scrollTop = selectedIndex * 40;
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

  return {
    isOpen,
    isSelected,
    selectedIndex,
    handleDropdown,
    handleSelect,
    handleKeyDown,
    setSelected,
  };
};
