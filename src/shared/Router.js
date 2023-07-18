import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../component/Main';
import Detail from '../component/Detail';
import Login from '../component/Login';
import Signup from '../component/Signup';
import DetailForm from '../component/DetailForm';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:id' element={<Detail />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/newpost' element={<DetailForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
