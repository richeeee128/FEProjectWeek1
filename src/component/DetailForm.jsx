import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import api from '../api/post';
import { useNavigate } from 'react-router-dom';

const DetailForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const onSubmitHandler = async (event, title, content, file) => {
    if (title === '' || content === '') {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const postFormData = new FormData();

    const data = {
      title: title,
      content: content,
    };

    postFormData.append(
      'data',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
    postFormData.append('file', file);

    try {
      const response = await api.post(`/post/newpost`, postFormData);

      setTitle('');
      setContent('');
      setFile(null);
      navigate(`/`); // 이동
      console.log(response);
      // 요청에 대한 응답 처리
    } catch (error) {
      console.error('Error:', error);
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
        <InputForm
          onSubmit={(event) => {
            event.preventDefault();
            // 버튼 클릭시, input에 들어있는 값(state)을 이용하여 DB에 저장(POST요청)
            onSubmitHandler(event, title, content, file);
          }}
        >
          <FormGroup>
            <label for='title'>제목:</label>
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder='Enter a title...'
              required
            />
          </FormGroup>
          <FormGroup>
            <label for='content'>내용:</label>
            <textarea
              className='ContentInput'
              type='text'
              name='content'
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder='리뷰 내용을 입력해주세요'
              required
            />
          </FormGroup>
          <FormGroup>
            <label for='image'>Image 업로드:</label>
            <input
              type='file'
              className='file-input'
              id='image'
              name='image'
              accept='image/*'
              onChange={handleFileUpload}
            />
          </FormGroup>
          <BtnWrap>
            <Btn type='submit'>등록</Btn>
            <Btn onClick={onClickMain}>취소</Btn>
          </BtnWrap>
        </InputForm>
      </SectionWrapper>
    </>
  );
};

export default DetailForm;

const SectionWrapper = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  /* /* height: 600px; */
  background-color: #ddd;
`;

const FormGroup = styled.div`
  background-color: yellow;
  display: flex;
  width: 650px;
  height: 100px;
  margin: 10px;
  overflow-x: hidden; /* 가로 스크롤 숨김 */
  overflow-y: auto;

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

  input {
    padding: 5px;
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
