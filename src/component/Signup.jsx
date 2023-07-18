import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../api/post';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        await instance.post('auth/signup', {
          username,
          password,
        });

        setUsername('');
        setPassword('');
        navigate('/auth/login');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Wrapper onSubmit={handleSignup}>
      <LoginForm>
        <h1>회원가입</h1>
        <InputBox>
          <Input
            type='text'
            placeholder='아이디를 입력해주세요.'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBox>
        <BtnBox>
          <Button type='submit'>가입하기</Button>
          <Link to='/auth/login'>로그인</Link>
        </BtnBox>
      </LoginForm>
    </Wrapper>
  );
}

export default Signup;

const Wrapper = styled.form`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard-Regular';
`;

const LoginForm = styled.div`
  width: 50%;
  min-width: 400px;
  min-height: 400px;
  height: 55%;
  background-color: #4a3f6f;
  color: #13f8e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 250px;
  height: 40px;
  margin: 5px;
`;

const BtnBox = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 260px;
  margin: 10px;
  height: 40px;
  font: bold 16px;
  background-color: #13f8e2;
  &:hover {
    background-color: #05ad9d;
  }
  &:active {
    background-color: #17675f;
    color: #fff;
  }
`;
