import React, { useState } from 'react';
import { Form, StyledSearch } from './Elements';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnter: (value: any) => void;
}

const Search: React.FC<Props> = ({ onEnter}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEnter(value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <StyledSearch value={value} onChange={(e) => setValue(e.target.value)} />
    </Form>
  );
};

export default Search;
