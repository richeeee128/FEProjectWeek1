import React from "react";
import styled from "styled-components";

function CommentForm(props) {
  const { postId } = props;
  console.log("댓글폼 페이지", { postId });
  return (
    // const onSUbmitHandler = async (id) => {
    //   api.post(`/post/${id}`, inputValue);
    //   fetchTodos();
    // };

    <SectionStyle>
      <CommentFormStyle>
        <form
          class="comment-form"
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   // 버튼 클릭시, input에 들어있는 값(state)을 이용하여 DB에 저장(POST요청)
          //   onSUbmitHandler();
          // }}
        >
          <textarea
            className="textarea"
            placeholder="댓글을 작성해주세요..."
          ></textarea>
          <button type="submit">댓글 작성</button>
        </form>
      </CommentFormStyle>
    </SectionStyle>
  );
}

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
