import React from 'react';
import { Form, StyledSearch } from './Elements';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnter: () => void;
}

const Search: React.FC<Props> = ({ onEnter, ...inputProps }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEnter()
  };

  return (
    <Form onSubmit={handleSubmit}>
      <StyledSearch {...inputProps} />
    </Form>
  );
};

export default Search;
