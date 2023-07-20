<h1>주특기 프로젝트 1주차</h1>

<h2>프론트엔드</h2>
</br>
<table>
<th>이름</th>
<th>담당</th>
<th></th>
  <tr>
  <td>나혜림 님</td>
  <td>상세게시글 CURD, 댓글 CURD, 좋아요싫어요</td>
  <td>배포</td>
  </tr>

  <tr>
  <td>이채연 님</td>
  <td>회원가입/로그인, 메인페이지 조회, 검색 기능</td>
  <td>CSS</td>
  </tr>
</table>
</br>

<h2>프론트엔드 파일 리스트</h2>

```
📂 src
┣ App.jsx
┣ 📂api
┃ ┗ post.js : 통신을 위한 instance, interceptors
┣ 📂component
┃ ┣ CommentForm.jsx : 댓글 입력폼 컴포넌트
┃ ┣ Detail.jsx : 상세페이지 컴포넌트
┃ ┣ DetailForm.jsx : 상세페이지 입력폼 컴포넌트
┃ ┣ Header.jsx : 헤더 부분 컴포넌트
┃ ┣ LikeDisLike.jsx : 좋아요, 싫어요 컴포넌트
┃ ┣ List.jsx : 메인페이지의 전체 리스트 조회 컴포넌트
┃ ┣ Login.jsx : 로그인 컴포넌트
┃ ┣ Main.jsx : 메인페이지 컴포넌트
┃ ┣ Search.jsx : 검색 기능 컴포넌트
┃ ┗ Signup.jsx : 회원가입 컴포넌트
┗ 📂shared
  ┗ Router.js : 라우터 설정 컴포넌트
```

</br>
<h2>주요 기능</h2>
<ul>
<li>회원가입</li>
<li>로그인</li>
----- 로그인 하지 않고도 접근 가능
<li>전체 리스트 조회하기</li>
<li>페이지네이션을 이용한 무한스크롤</li>
<li>검색 기능</li>
<li>게시글, 댓글 조회</li>
  
------로그인 이후 가능한 기능
<li>게시글 생성, 삭제</li>
<li>코멘트 댓글 생성, 수정, 삭제</li>
<li>좋아요, 싫어요</li>
</ul>
<h2>트러블 슈팅</h2>
<ul>
<li>react-icons를 설치해야 하는데 react-icon을 설치해서 오류 발생했었음</li>
<li>로그인 시 페이지 이동을 하면 토큰이 날라가는 오류를 경험 -> 로컬 스토리지에 토큰을 담아 오류 해결</li>
<li>multipart/form-data에서 한 번에 보내되, 각각 두개의 데이터를 보내야 되는 줄 알고 formdata를 두개를 보내려다 에러가 나버림. -> 하나로 묶되 data와 file로 나눠 보내서 해결</li>
<li>TypeError: Cannot read property 'map' of undefined</br>
post && 를 넣어줌으로 렌더링 시간을 벌어줘야 함. 리액트는 데이터가 완전히 들어오지 않아도 렌더링이 되므로 값이 모두 undefined가 되어버림. </li>
<li>git 초기화.....</br>
백엔드 url을 푸쉬해버린 뒤 바로 레포지토리 삭제 후 다른 레포지토리로 이동하다 초기 환경으로 돌아가버림... 다행히 소스트리에서 이전 기록이 남아 있었기 때문에 복구할 수 있었음</br>

</li>
</ul>

<h2>시간이 더 있었다면</h2>
<ol>
<li>상태관리 리팩토링 -> 글쓰기, 삭제 시 새로고침을 해야 적용됨</li>
<li>좋아요, 싫어요에서 서버에서는 유저를 구분하여 같은 유저가 클릭한 값은 자동으로 count 안하지만 클라이언트에서는 반영이 되서 같은 유저가 좋아요 누른 후 새로고침하면 새로운 숫자가 count 되는 것처럼 보임. get으로 좋아요상태 관련 가져와야 할듯함 </li>
<li>페이지, 스타일, 기능 컴포넌트 분리</li>
<li>로그인 시 유효성 검사, 쿠키에 토큰 담기</li>
<li>게시글 수정</li>
</ol>
