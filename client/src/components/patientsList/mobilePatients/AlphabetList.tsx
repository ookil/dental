import React from 'react';
import styled from 'styled-components';
import { List } from './elements';

const Item = styled.li`
  text-decoration: none;
  font-size: 13px;
  padding: 1px 0;
  user-select: none;
`;

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  width: 30px;
  text-align: center;
  top: 25%;
  transform: translateY(-25%);
`;

type Props = {
  handleRefetch: (letter: string) => void;
};

const AlphabetList = ({ handleRefetch }: Props) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <Wrapper>
      <List>
        {alphabet.map((letter) => (
          <Item key={letter} onClick={() => handleRefetch(letter)}>
            {letter.toUpperCase()}
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

export default AlphabetList;
