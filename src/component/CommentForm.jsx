import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api/post';

const CommentForm = ({ postId, detailPost }) => {
  const [post, setPost] = useState([]);
  console.log('댓글폼 페이지', post);
  const [commentValue, setCommentValue] = useState({
    content: '',
  });
  const [updateCommentValue, setUpdateCommentValue] = useState({
    content: '',
  });

  const fetchPost = async () => {
    try {
      const response = await api.get(`/post/${postId}`);
      console.log('코멘트reponse.data.info', response.data.info);
      setPost(response.data.info);
    } catch (error) {
      console.error('API 요청 오류:', error);
    }
  };
  const onSUbmitHandler = async (e) => {
    e.preventDefault();
    console.log(commentValue);
    try {
      const res = await api.post(`/post/${postId}/comment`, commentValue);
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
      await api.delete(`/post/${postId}/comment/${commentId}`);
      console.log('삭제되었습니다!');
    } catch (error) {
      alert('댓글에 대한 권한이 없습니다.');
      console.error('댓글 삭제 오류:', error);
    }
  };

  //댓글 수정함수
  const onUpdateComment = async ({ commentId }) => {
    console.log('수정할 commentId', commentId);
    console.log('페이지 id', postId);
    if (commentId === undefined) {
      console.error('수정할 댓글이 유효하지 않습니다.');
      return;
    }
    try {
      const updatedCommentValue = { content: '수정할 댓글의 내용' };
      setUpdateCommentValue(updatedCommentValue);
      await api.put(`/post/${postId}/comment/${commentId}`, updateCommentValue);
      console.log('수정되었습니다!');
    } catch (error) {
      alert('댓글에 대한 권한이 없습니다.');
      console.error('댓글 수정 오류:', error);
    }
  };
  //state로 값이 저장되있어 async(id,contents)로 안 받아도 됨
  return (
    <SectionStyle>
      <CommentFormStyle>
        <form
          class='comment-form'
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   // 버튼 클릭시, input에 들어있는 값(state)을 이용하여 DB에 저장(POST요청)
          //   onSUbmitHandler();
          // }}
        >
          <textarea
            className='textarea'
            placeholder='댓글을 작성해주세요...'
          ></textarea>
          <button type='submit'>댓글 작성</button>
        </form>
      </CommentFormStyle>
    </SectionStyle>
  );
};

const SectionStyle = styled.section`
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

  .comment-form button {
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

  > button.comment-form button:hover {
    background-color: #45a049;
  }
`;

export default CommentForm;
