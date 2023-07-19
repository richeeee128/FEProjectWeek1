import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";

const DetailForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 시 onSubmit 콜백 함수 호출
    onSubmit({ title, content });
    // 폼 초기화
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <Header />
      <SectionWrapper>
        <SectionStyle>
          <WriteFormStyle enctype="multipart/form-data" onSubmit={handleSubmit}>
            <label for="title">제목:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a title..."
              required
            />

            <label for="content">내용:</label>
            <textarea
              id="content"
              name="content"
              placeholder="Enter the content..."
              required
            />

            <label for="image">Image 업로드:</label>
            <input
              type="file"
              class="file-input"
              id="image"
              name="image"
              accept="image/*"
            />
            <button className="write-form button" type="submit">
              글 작성
            </button>
          </WriteFormStyle>
        </SectionStyle>
      </SectionWrapper>
    </div>
  );
};

const LabelStyle = styled.label`
  font-size: 50px;
`;

const WriteFormStyle = styled.form`
  gap: 10px;
  margin: 20px auto;
  display: flex;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: flex-end;

  .file-input {
    /* 스타일을 원하는 대로 수정하세요 */
    padding: 10px 15px;
    background-color: #eaeaea;
    border: none;
    border-radius: 5px;
    color: #333;
    font-size: 16px;
  }

  .textarea {
    width: 85%;
    height: 30px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    resize: vertical;
  }

  .button {
    padding: 8px 16px;
    background-color: #0efbdf;
    color: #2b2a2a;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 10px;
  }

  > button.write-form button:hover {
    background-color: #45a049;
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SectionStyle = styled.section`
  margin-top: 40px;
  width: 800px;
  height: 200px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  /* text-align: center; */
  padding: 20px;
`;

export default DetailForm;
