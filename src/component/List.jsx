
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../api/post";
import { useQuery } from "react-query";


function List() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handleBtnClick = () => {

    if (localStorage.getItem('authorization') === null) {
      navigate('/auth/login');
      alert('로그인 되지 않은 사용자입니다.');
    } else {
      navigate('/write');
      console.log('로그인 중입니다');

    }
  };

  // 클릭시 상세 페이지로 이동
  const handlePostClick = (id) => {
    console.log('상세페이지', id);
    navigate(`/detail/${id}`);
  };

  //백에서 데이터를 받아 페이지네이션을 함
  const { data, isLoading, error } = useQuery(
    ['posts', currentPage],
    async () => {
      try {

        const response = await instance.get(`/post`, {
          // 페이지
          params: {
            page: currentPage,
            // 불러오고 싶은 페이지 개수
            pageSize: 6,
          },
        });
        console.log('페이지네이션', response);
        return response.data.info.content;
      } catch (error) {
        console.log('페이징을 불러올 수 없습니다.', error);

      }
    }
  );

  // 로딩과 에러가 없으면 이전 포스트들과 데이터를 합침
  useEffect(() => {
    if (!isLoading && !error) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
    }
  }, [data, isLoading, error]);

  // useEffect(() => {
  //   setPosts();
  // }, []);

  // 버튼 클릭시 페이지에 1을 더함
  const fetchMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div>
        <Btn onClick={handleBtnClick}>글쓰기</Btn>
      </div>
      <Wrapper>
        {posts &&
          posts.map((post) => (
            <ListBox key={post.id}>
              <div
                onClick={() => {
                  handlePostClick(post.id);
                }}
              >
                <h1>
                  {post.image === '' ? (
                    <img
                      src='https://cdn.pixabay.com/photo/2021/12/30/12/09/gaming-computer-6903836_1280.jpg'
                      alt='이미지가 존재하지 않습니다.'
                    />
                  ) : (
                    <img src={post.image} alt='' />
                  )}
                </h1>
                <h2>{post.title}</h2>
                <h4>
                  {post.content.length > 100
                    ? `${post.content.slice(0, 65)} ...더보기`
                    : post.content}
                </h4>
                <p>{post.username}</p>
                <p>{post.liked} ❤️</p>
              </div>
            </ListBox>
          ))}
      </Wrapper>
      <Btnbox>
        <MoreBtn onClick={fetchMoreData}>항목 더보기</MoreBtn>
      </Btnbox>
    </>
  );
}

export default List;

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
  display: flex;
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

const Btn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  margin-right: 50px;
  float: right;
  font-weight: bold;
  font-size: 1rem;

  background-color: #13f8e2;
  &:hover {
    background-color: #05ad9d;
  }
  &:active {
    background-color: #17675f;
    color: #fff;
  }
`;

const Btnbox = styled.div`
  display: flex;
  justify-content: center;
`;

const MoreBtn = styled.button`
  width: 300px;
  height: 40px;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  margin: 30px;
  background-color: #13f8e2;
  &:hover {
    background-color: #05ad9d;
  }
  &:active {
    background-color: #17675f;
    color: #fff;
  }
`;
