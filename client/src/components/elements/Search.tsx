import React, { useState } from 'react';
import { Button, Form, StyledSearch } from './Elements';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnter: (value: any) => void;
}

const Search: React.FC<Props> = ({ onEnter, placeholder }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEnter(value);
  };

  return (
    <Form id='searchForm' onSubmit={handleSubmit}>
      <StyledSearch
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button search type='submit' form='searchForm'>
        Search
      </Button>
    </Form>
  );
};

export default Search;
