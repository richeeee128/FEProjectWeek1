import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/post';
import styled from 'styled-components';
import Header from './Header';
import CommentForm from './CommentForm';
import LikeDisLike from './LikeDisLike';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const postId = id;
  const postState = post;

  console.log('id', id);
  // const fetchPost = async () => {
  //   const { data } = await api.get(`/post`);
  //   console.log("data", data);
  //   setPost(data);
  // };

  // useEffect(() => {
  //   //db 로부터 값을 가져올 것이다.
  //   fetchPost();
  // }, []);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/post/${id}`);

      setPost(response.data.info);
    } catch (error) {
      console.error('API 요청 오류:', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handlePostClick = () => {
    navigate(`/`);
  };

  const handleGoBackPage = (id) => {
    if (id === '1') {
      alert('첫번째 페이지입니다!');
      return; // 첫 번째 요소이면 함수 실행을 중지하고 종료합니다.
    } else {
      const previousId = parseInt(id) - 1;
      navigate(`/detail/${previousId}`);
    }
  };

  const onDeletePost = async () => {
    try {
      await api.delete(`/post/${id}`);
      console.log('삭제되었습니다!');
      navigate(`/`);
    } catch (error) {
      alert('포스트에 대한 권한이 없습니다.');
      console.error('댓글 삭제 오류:', error);
    }
  };

  // // 객체의 모든 id 값들을 배열로 추출
  // const ids = Object.values(post).map((post) => post.id);

  // // 가장 큰 id 값을 구함
  // const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  // console.log("maxId", maxId); // 가장 큰 id 값을 출력합니다.

  // const handleNextPage = (id) => {
  //   const nextId = parseInt(id) + 1;
  //   const lastPostId = post[post.length - 1].id;

  //   if (id === lastPostId) {
  //     alert("마지막 페이지입니다!");
  //     return;
  //   }

  //   navigate(`/detail/${nextId}`);
  // };

  //state로 값이 저장되있어 async(id,contents)로 안 받아도 됨

  return (
    <>
      <Header />
      <Container>
        <BtnContainer>
          <Button onClick={() => handleGoBackPage(id)}>이전 페이지</Button>
          {/* <button onClick={() => handleNextPage(id)}>다음 페이지</button> */}
          <Button onClick={handlePostClick}>글 목록으로 돌아가기</Button>

          <Button onClick={(e) => onDeletePost()}>글 삭제</Button>
        </BtnContainer>
        <SectionStyle>
          <h1 className='post-title'>{post.title}</h1>
          <StPost id='post-author'>작성자: {post.username}</StPost>
          <h2>
            <img src={post.image} alt='' />
          </h2>
          <div className='post-content'>
            <p>{post.content}</p>
            <LikeDisLike postId={postId} />
          </div>
          <StPost id='post-date'>
            작성일: {new Date(post.createdAt).toLocaleDateString()}
          </StPost>
        </SectionStyle>
      </Container>
    </>
  );
};

export default Detail;

const Container = styled.div`
  margin-top: 20px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: #4a3f6f;
  > * + * {
    margin-top: 20px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  width: 1200px;
  justify-content: space-between;
`;

const SectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #fefefe;
  max-width: 1200px;
  /* height: 300px; */ */
  border: 1px solid #ccc;
  padding: 20px;

  h2 {
    /* flex-shrink: 0; 제목 영역은 고정 크기를 유지 */
    text-align: center;
    img {
      max-width: 800px;
    }
  }

  .post-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  /* 본문 스타일 */
  .post-content {
    font-size: 16px;
    line-height: 1.5;
    flex-grow: 1; /* 내용 영역이 늘어나도록 설정 */
    margin-bottom: 20px;
    text-align: justify;
  }
`;

/* 작성자 스타일 */
const StPost = styled.span`
  font-size: 14px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 140px;
  height: 35px;
  border: none;
  background-color: #13f8e2;
  &:hover {
    background-color: #05ad9d;
  }
  &:active {
    background-color: #17675f;
    color: #fff;
  }
`;
