import React, { useState } from 'react';
import styled from 'styled-components';
import instance from '../api/post';

function Search({ post }) {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const onClickSearch = async () => {
    try {
      if (!username && !title) {
        // 검색어가 비어있을 경우, 검색을 수행하지 않고 메시지를 표시할 수도 있습니다.
        console.log('검색어를 입력해주세요.');
        return;
      }
      setErrorMessage('');
      // API 요청을 보냅니다.
      const response = await instance.get(
        `/post?username=${username}&title=${title}`
      );
      console.log('검색을 위한 response', response.data);
      console.log('검색 완료!');
      // 검색 결과를 받아와서 상태로 저장합니다.
      setSearchResults(response.data.info.content);
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다.', error);
    }
  };
  console.log(username);
  console.log(title);

  const handlekeyDown = (e) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };

  return (
    <div>
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
              {content.content.length > 80
                ? `${content.content.slice(0, 65)} ...더보기`
                : content.content}
            </h4>
            <p>{content.username}</p>
            <p>{content.liked} ❤️</p>
          </ListBox>
        ))}
      </Wrapper>
    </div>
  );
}
export default Search;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  background-color: #e4faff;
`;

const Button = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  &:active {
    background-color: red;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  border: 1px solid #000;
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
    max-width: 400px;
    max-height: 260px;
    margin-bottom: -10px;
  }
`;
