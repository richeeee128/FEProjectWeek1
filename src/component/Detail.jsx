import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/post';
import styled from 'styled-components';
import Header from './Header';
import CommentForm from './CommentForm';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [commentValue, setCommentValue] = useState({
    content: '',
  });
  const [updateCommentValue, setUpdateCommentValue] = useState({
    content: '',
  });

  const fetchPost = async () => {
    try {
      const response = await api.get(`/post/${id}`);
      console.log('reponse.data.data', response.data.info);
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

  // 댓글폼 제출
  const onSUbmitHandler = async (e) => {
    e.preventDefault();
    console.log(commentValue);
    try {
      const res = await api.post(`/post/${id}/comment`, commentValue);
      fetchPost();
      console.log(res);
      // setCommentValue("");
    } catch (error) {
      console.error('코멘트API Post 요청 오류:', error);
    }
  };

  //댓글 삭제함수
  const onDeleteComment = async ({ commentId }) => {
    console.log('commentId', commentId);
    if (commentId === undefined) {
      console.error('삭제할 댓글이 유효하지 않습니다.');
      return;
    }
    try {
      await api.delete(`/post/${id}/comment/${commentId}`);
      console.log('삭제되었습니다!');
    } catch (error) {
      alert('댓글에 대한 권한이 없습니다.');
      console.error('댓글 삭제 오류:', error);
    }
  };

  //댓글 수정함수
  const onUpdateComment = async ({ commentId }) => {
    console.log('수정할 commentId', commentId);
    console.log('페이지 id', id);
    if (commentId === undefined) {
      console.error('수정할 댓글이 유효하지 않습니다.');
      return;
    }
    try {
      const updatedCommentValue = { content: '수정할 댓글의 내용' };
      setUpdateCommentValue(updatedCommentValue);
      await api.put(`/post/${id}/comment/${commentId}`, updateCommentValue);
      console.log('수정되었습니다!');
    } catch (error) {
      alert('댓글에 대한 권한이 없습니다.');
      console.error('댓글 수정 오류:', error);
    }
  };
  //state로 값이 저장되있어 async(id,contents)로 안 받아도 됨

  return (
    <>
      <PageContainer>
        <Header />
        <SectionContainer>
          <div>
            <button onClick={() => handleGoBackPage(id)}>이전 페이지</button>
            {/* <button onClick={() => handleNextPage(id)}>다음 페이지</button> */}
            <a href='#' className='button' onClick={handlePostClick}>
              글 목록으로 돌아가기
            </a>
            <SectionStyle>
              <h1>
                <img src={post.image} alt='' />
              </h1>
              <h2 className='post-title'>{post.title}</h2>
              <p className='post-author'>작성자: {post.username}</p>
              <p className='post-date'>작성일: {post.createdAt}</p>
              <div className='post-content'>
                <p>{post.content}</p>
              </div>
            </SectionStyle>
            <CommentFormBoxStyle>
              <CommentFormStyle
                className='comment-form'
                onSubmit={(e) => {
                  // 버튼 클릭시, input에 들어있는 값(state)을 이용하여 DB에 저장(POST요청)
                  onSUbmitHandler(e);
                }}
              >
                <div>
                  {/*수정 영역*/}
                  <textarea
                    className='textarea'
                    type='text'
                    placeholder='수정할 내용을 작성해주세요...✨'
                    // ={changeHandler}
                    onChange={(e) => {
                      setUpdateCommentValue({
                        content: e.target.value,
                      });
                    }}
                  ></textarea>
                  <button type='submit'>수정</button>
                </div>
              </CommentFormStyle>
            </CommentFormBoxStyle>

            <CommentFormBoxStyle>
              <CommentFormStyle
                className='comment-form'
                onSubmit={(e) => {
                  // 버튼 클릭시, input에 들어있는 값(state)을 이용하여 DB에 저장(POST요청)
                  onSUbmitHandler(e);
                }}
              >
                <div>
                  {/*입력 영역*/}
                  <textarea
                    className='textarea'
                    type='text'
                    placeholder='댓글을 작성해주세요...✨'
                    // ={changeHandler}
                    onChange={(e) => {
                      setCommentValue({
                        content: e.target.value,
                      });
                    }}
                  ></textarea>
                  <button type='submit'>댓글 작성</button>
                </div>
              </CommentFormStyle>
            </CommentFormBoxStyle>
            <SectionStyle>
              <h3>댓글</h3>
              {post.commentList &&
                post.commentList.map((comment) => (
                  <>
                    <div className='comment' key={comment.id}>
                      <p className='comment-author'>
                        작성자:{comment.username}
                      </p>
                      <p className='comment-date'>
                        작성일: {comment.createdAt}
                      </p>
                      <div className='comment-content'>{comment.content}</div>
                    </div>
                    <button
                      onClick={() => {
                        onUpdateComment({ commentId: comment.id });
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        onDeleteComment({ commentId: comment.id });
                      }}
                    >
                      삭제
                    </button>
                  </>
                ))}

              {/* 추가 댓글들을 여기에 추가하세요 */}
            </SectionStyle>
          </div>
        </SectionContainer>
        <footer>{/* 푸터 내용 추가 */}</footer>
      </PageContainer>
    </>
  );
};

const CommentFormBoxStyle = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #fefefe;
  /* width: 700px;
  height: 300px; */
  border: 1px solid #ccc;
  padding: 20px;
`;
const CommentFormStyle = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;

  .textarea {
    flex-grow: 1;
    width: 90%;
    height: 39px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #fc0303;
    resize: vertical;
  }

  button {
    display: inline-block;
    padding: 8px 16px;
    background-color: #4caf50;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const SectionContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  > * + * {
    margin-top: 10px;
  }
`;

const SectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #fefefe;
  /* width: 700px;
  height: 300px; */
  border: 1px solid #ccc;
  padding: 20px;

  .h1 {
    flex-shrink: 0; /* 제목 영역은 고정 크기를 유지 */
  }

  .post-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  /* 작성자 스타일 */
  .post-author {
    font-size: 16px;
    color: #888;
    margin-bottom: 5px;
  }

  /* 작성일 스타일 */
  .post-date {
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
  }

  /* 본문 스타일 */
  .post-content {
    font-size: 16px;
    line-height: 1.5;
    flex-grow: 1; /* 내용 영역이 늘어나도록 설정 */
    margin-bottom: 20px;
  }
`;

export default Detail;
