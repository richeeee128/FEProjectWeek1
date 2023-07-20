
import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";
import api from "../api/post";
import { useNavigate } from "react-router-dom";

const DetailForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const onSubmitHandler = async (event, title, content, file) => {
    if (title === "" || content === "") {
      alert("제목과 내용을 입력해주세요.");

      return;
    }

    const postFormData = new FormData();

    const data = {
      title: title,
      content: content,
    };

    postFormData.append(

      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    postFormData.append("file", file);
    /*
    multipart/form-data
    {
      data : {
        title: "title",
        content: "content"
        [[type]] = application/json
      },
      file : imageFile : File
    }
    */
    try {
      const response = await api.post(`/post/newpost`, postFormData);
      navigate(`/`); // 이동
      setTitle("");
      setContent("");
      setFile(null);

      console.log(response);
      // 요청에 대한 응답 처리
    } catch (error) {
      console.error("Error:", error);

      // 에러 처리
    }
    // setTitle("");
    // setContent("");
  };
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // onSubmitHandler(event, title, content, file); // 전송
    }
  };

  const onClickMain = () => navigate('/');

  return (
    <>
      <Header />
      <SectionWrapper>

        {/* <SectionStyle> */}
        <form

          onSubmit={(event) => {
            event.preventDefault();
            // 버튼 클릭시, input에 들어있는 값(state)을 이용하여 DB에 저장(POST요청)
            onSubmitHandler(event, title, content, file);
          }}
        >
          <FormGroup>

            <label htmlFor="title">제목:</label>
            <input
              className="TitletInput"
              type="text"
              id="title"
              name="title"

              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}

              placeholder="Enter a title..."
              required
            />{" "}
          </FormGroup>
          <FormGroup>
            <label htmlFor="content">내용:</label>
            <textarea
              className="ContentInput"
              type="text"
              id="content"
              name="content"

              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}

              placeholder="Enter content..."
              required
            />{" "}
          </FormGroup>
          <FormGroup>
            <label htmlFor="file">파일:</label>
            <input
              type="file"
              className="file-input"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <button className="write-form button" type="submit">
              글 작성
            </button>
          </FormGroup>
        </form>
        {/* </SectionStyle> */}

      </SectionWrapper>
    </>
  );
};

const FormGroup = styled.div`
  background-color: yellow;
  overflow: auto;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: nowrap;
  display: flex;
  align-items: flex-start;
  width: 100%;
  overflow-x: hidden; /* 가로 스크롤 숨김 */
  overflow-y: auto; /* 세로 스크롤 표시 */


  .file-input {
    /* 스타일을 원하는 대로 수정하세요 */
    padding: 10px 15px;
    background-color: #eaeaea;
    border: none;
    border-radius: 5px;
    color: #4a3f6f;
    font-size: 16px;
  }
  label {
    /* margin-bottom: 10px; */
    margin: 5px;
    flex: 0 0 auto;
    /* 너비를 고정으로 유지 */
    color: #4a3f6f;
    font-size: 1.1rem;
    font-weight: bold;

  }


    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
  }

  textarea {
    /* input 요소의 스타일을 원하는 대로 수정하세요 */
    padding: 10px;
    border: 1px solid #ccc;
    width: 100%;
    height: 200px;
  }


  button {
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
`;


const SectionWrapper = styled.div`
  max-width: 600px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionStyle = styled.section`
  margin-top: 40px;
  width: 800px;
  max-width: 600px;
  height: 200px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;

  /* text-align: center; */
  padding: 20px;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Btn = styled.button`
  padding: 8px 16px;
  background-color: #0efbdf;
  color: #2b2a2a;
  text-decoration: none;
  border: none;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;

`;
