import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <div>
      <HeaderStyle>
        <h2 className="header-title">GG 게임 리뷰</h2>
      </HeaderStyle>
    </div>
  );
}

const HeaderStyle = styled.header`
  height: 60px;
  background-color: #4a3f6f;
  padding: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  @font-face {
    font-family: "SDSamliphopangche_Outline";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  .header-title {
    font-family: "SDSamliphopangche_Outline";
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .header-subtitle {
    font-size: 14px;
    color: #888;
  }
`;

export default Header;
