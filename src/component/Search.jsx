import React, { useState } from 'react';
import styled from 'styled-components';
import instance from '../api/post';

function Search({ onSearchResult }) {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const onClickSearch = async () => {
    try {
      if (!username && !title) {
        // 검색어가 비어있을 경우, alert
        alert('검색어를 입력해주세요.');
        return;
      }
      // API 요청을 보냅니다.
      const response = await instance.get(
        `/post?username=${username}&title=${title}`
      );

      // 검색 결과가 비어있을 경우 alert 경고
      if (response.data.info.content.length === 0) {
        alert('검색 결과가 존재하지 않습니다.');
      }

      // 검색 결과를 받아와서 상태로 저장.
      setSearchResults(response.data.info.content);
      onSearchResult(response.data.info.content.length > 0);
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다.', error);
    }
  };

  //엔터키를 사용해도 결과값 나오도록
  const handlekeyDown = (e) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };

  return (
    <>
      <InputForm>
        <Input
          type='text'
          placeholder='유저 이름 검색'
          onChange={usernameHandler}
          onKeyDown={handlekeyDown}
        />
        <Input
          type='text'
          placeholder='타이틀 검색'
          onChange={titleHandler}
          onKeyDown={handlekeyDown}
        />
        <Button onClick={onClickSearch}>🔍</Button>
      </InputForm>
      <Wrapper>
        {searchResults.map((content) => (
          <ListBox>
            <h1>
              {content.image ? (
                <img src={content.image} alt='' />
              ) : (
                <img
                  src='https://cdn.pixabay.com/photo/2021/12/30/12/09/gaming-computer-6903836_1280.jpg'
                  alt='이미지가 존재하지 않습니다.'
                />
              )}
            </h1>
            <h2>{content.title}</h2>
            <h4>
              {content.content.length > 100
                ? `${content.content.slice(0, 65)} ...더보기`
                : content.content}
            </h4>
            <p>{content.username}</p>
            <p>{content.liked} ❤️</p>
          </ListBox>
        ))}
      </Wrapper>
    </>
  );
}
export default Search;

const InputForm = styled.div`
  margin: 20px;
`;
const Input = styled.input`
  width: 215px;
  height: 30px;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  background-color: #e8e3f9;
`;

const Button = styled.button`
  width: 60px;
  height: 40px;
  border: none;
  font-size: 1rem;
  background-color: #b29ef4;
  &:active {
    background-color: #9980ea;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ListBox = styled.div`
  min-width: 400px;
  width: 25%;
  height: 450px;
  padding: 10px;
  margin: 20px 0;
  color: #4a3f6f;
  border: 2px solid #3adfce;
  box-shadow: 6px 6px 2px 1px rgba(19, 248, 225, 0.481);

  justify-content: center;
  h1 {
    text-align: center;
    margin-top: 0px;
  }
  img {
    width: 400px;
    height: 260px;
    object-fit: cover;
    margin-bottom: -10px;
  }
`;
