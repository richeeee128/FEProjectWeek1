import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <div>
      <HeaderStyle>
        <Title> GG 게임 리뷰</Title>
      </HeaderStyle>
    </div>
  );
}

const HeaderStyle = styled.header`
  height: 100px;
  background-color: #4a3f6f;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  @font-face {
    font-family: 'SDSamliphopangche_Outline';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff')
      format('woff');
  }
`;

const Title = styled.h1`
  font-family: 'SDSamliphopangche_Outline';
  font-size: 3.5rem;
`;

export default Header;
