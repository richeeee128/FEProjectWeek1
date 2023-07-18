import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function List() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 전체 리스트
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`http://18.212.99.235:8080/post`);
      setPosts(data.data.content);
      console.log('data', data.data.content);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    // DB로부터 값을 가져올 것입니다.
    fetchPost();
  }, []);

  // 클릭시 상세 페이지로 이동
  const handlePostClick = (id) => {
    console.log('상세페이지', id);
    navigate(`detail/${id}`);
  };

  return (
    <>
      <Wrapper>
        {posts.map((post) => (
          <div key={post.id}>
            <ListBox
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
              <p>{post.liked}</p>
            </ListBox>
          </div>
        ))}
      </Wrapper>
    </>
  );
}

export default List;

const Wrapper = styled.div`
  // 스타일 지정
`;

const ListBox = styled.div`
  // 스타일 지정
`;
