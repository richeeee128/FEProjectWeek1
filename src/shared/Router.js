import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../component/Main";
import Detail from "../component/Detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
