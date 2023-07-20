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
      setTitle('');
      setContent('');
      setFile(null);

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
        <h1>리뷰 작성</h1>
        <SectionStyle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              // 버튼 클릭시, input에 들어있는 값(state)을 이용하여 DB에 저장(POST요청)
              onSubmitHandler(event, title, content, file);
            }}
          >
            <FormGroup>
              <label htmlFor='title'>제목</label>
              <input
                className='TitletInput'
                type='text'
                id='title'
                name='title'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder='제목 입력해주세요.'
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor='content'>내용</label>
              <textarea
                className='ContentInput'
                type='text'
                id='content'
                name='content'
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder='본문 입력 해주세요.'
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor='file'>파일</label>
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
              <Btn className='write-form button' type='submit'>
                글 작성
              </Btn>
              <Btn
                className='write-form button'
                type='submit'
                onClick={onClickMain}
              >
                취소
              </Btn>
            </BtnWrap>
          </form>
        </SectionStyle>
      </SectionWrapper>
    </>
  );
};

export default DetailForm;

const SectionWrapper = styled.div`
  color: #4a3f6f;
  width: 100%;
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SectionStyle = styled.section`
  margin-top: 20px;
  width: 800px;
  height: 500px;
  background-color: #f2f2f2;
`;
const FormGroup = styled.div`
  display: flex;
  padding: 20px 10px 5px 5px;

  input {
    padding: 10px 15px;
    width: 100%;
    height: 30px;
    font-size: 16px;
    background-color: #fff;
  }

  label {
    margin: 10px;
    flex: 0 0 auto;
    /* 너비를 고정으로 유지 */
    color: #4a3f6f;
    font-size: 1.2rem;
    font-weight: bold;
  }

  textarea {
    padding: 15px;
    border: 1px solid #ccc;
    width: 100%;
    height: 200px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
