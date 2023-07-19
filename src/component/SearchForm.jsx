import React, { useState } from 'react';
import styled from 'styled-components';

function SearchForm() {
  const [word, setWord] = useState('');

  const onSubmit = async () => {};

  return (
    <div>
      SearchForm
      <Input type='text' />
      <Button>🔍</Button>
    </div>
  );
}

export default SearchForm;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  background-color: #7fa1ff;
`;

const Button = styled.button`
  width: 50px;
  height: 30px;
  border: none;
`;
