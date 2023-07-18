import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import instance from '../api/post';
import { useQuery } from 'react-query';

function List() {
  const [posts, setPosts] = useState([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleBtnClick = () => {
    if (localStorage.getItem('authorization') === null) {
      navigate('/auth/login');
      console.log('로그인 하고 오세요');
    } else {
      navigate('/newpost');
      console.log('로그인 중입니다');
    }
  };

  // 전체 리스트
  const { post } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await instance.get(`/post`);
        setPosts(data.data.content);
        console.log('data', data.data.content);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    },
  });

  // 클릭시 상세 페이지로 이동
  const handlePostClick = (id) => {
    console.log('상세페이지', id);
    navigate(`detail/${id}`);
  };

  return (
    <>
      <div>
        <Btn onClick={handleBtnClick}>글쓰기</Btn>
      </div>
      <Wrapper>
        {posts.map((post) => (
          <ListBox key={post.id}>
            <div
              onClick={() => {
                handlePostClick(post.id);
              }}
            >
              <h1>
                <img src={post.image} alt='' />
              </h1>
              <h2>{post.title}</h2>
              <h4>{post.content}</h4>
              <p>{post.username}</p>
              <p>{post.liked} ❤️</p>
            </div>
          </ListBox>
        ))}
      </Wrapper>
    </>
  );
}

export default List;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  border: 1px solid #000;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Btn = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  margin: 10px;
  background-color: #13f8e2;
  &:hover {
    background-color: #05ad9d;
  }
  &:active {
    background-color: #17675f;
    color: #fff;
  }
`;

const ListBox = styled.div`
  min-width: 400px;
  width: 25%;
  height: 450px;
  padding: 10px;
  margin: 20px 0;
  color: #4a3f6f;
  border: 2px solid red;
  display: flex;
  justify-content: center;
  img {
    max-width: 400px;
  }
`;
