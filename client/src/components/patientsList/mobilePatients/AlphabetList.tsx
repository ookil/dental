import React from 'react';
import styled from 'styled-components';
import { List } from './elements';

const Item = styled.li`
  text-decoration: none;
  font-size: 13px;
  padding: 2px 0;
`;

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  width: 30px;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
`;

const AlphabetList = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <Wrapper>
      <List>
        {alphabet.map((letter) => (
          <Item key={letter}>{letter.toUpperCase()}</Item>
        ))}
      </List>
    </Wrapper>
  );
};

export default AlphabetList;
