import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  //매개변수 이름은 config가 아니라도 됨
  function (config) {
    console.log("인터셉터 요청 성공!");
    let accesstoken = localStorage.getItem("authorization");
    config.headers.Authorization = accesstoken;

    return config;
  },
  //오류 요청을 보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉터 요청 오류!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // 응답을 보내기 전 수행되는 함수
  function (response) {
    console.log("인터셉터 응답 받았습니다!");
    return response;
  },
  //오류응답을 보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉터 응답 오류 발생");
    return Promise.reject(error);
  }
);

export default instance;
