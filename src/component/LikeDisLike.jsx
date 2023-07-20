import React, { useState, useEffect } from "react";
import api from "../api/post";
import { Tooltip } from "antd";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  // AiOutlineDislike,
} from "react-icons/ai";

const LikeDisLike = ({ postId }) => {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState("");
  //   const [Dislikes, setDislikes] = useState(0);
  //   const [DisLikeAction, setDisLikeAction] = useState("");

  let variable = postId;
  //   if (props.post) {
  //     variable = { videoId: props.videoId, userId: props.userId };
  //   } else {
  //     //variable = {commentId , userId: }
  //   }

  useEffect(() => {
    api
      .post(`/post/${postId}/like`)
      .then((response) => {
        if (response.data.success) {
          // 얼마나 많은 좋아요를 받았는지
          console.log("response.data.info", response.data.info);
          setLikes(response.data.info);
        } else {
          alert("Like에 대한 정보를 가져오지 못했습니다.");
        }
      })
      .catch((error) => {
        console.error("Like 정보를 가져오는 중 오류가 발생했습니다.", error);
      });
  }, []);

  const onLike = async (e) => {
    console.log(Likes);
    try {
      const res = await api.post(`/post/${postId}/like`, Likes);

      console.log("res", res);
      setLikes("");
      // fetchPost();
    } catch (error) {
      console.error("코멘트API Post 요청 오류:", error);
    }
  };
  //  async () => {
  //     if (LikeAction === "") {
  //       try {
  //         const response = await api.post(`/post/${postId}/like`, variable);
  //         if (response.data.success) {
  //           setLikes(Likes + 1);
  //           setLikeAction("liked");

  // if (DisLikeAction !== '') {
  //   setDisLikeAction('');
  //   setDislikes(Dislikes - 1);
  // }
  //       } else {
  //         alert("Like를 올리지 못했습니다.");
  //       }
  //     } catch (error) {
  //       console.error("Like를 올리는 중 오류가 발생했습니다.", error);
  //     }
  //   }
  // };

  // else {
  //     api.post(`/post/${postId}/like`, variable).then((response) => {
  //       if (response.data.success) {
  //         setLikes(Likes - 1);
  //         setLikeAction("");
  //       } else {
  //         alert("Like를 내리지 못했습니다.");
  //       }
  //     });
  //   }
  // };
  //   //     api.post(`/post/${id}/dislike, variable).then((response) => {
  //   //       if (response.data.success) {
  //   //         //얼마나 많은 싫어요를 받았는지
  //   //         setDislikes(response.data.dislikes.length);
  //   //         //내가 싫어요를 이미 눌렀는지
  //   //         response.data.dislikes.map((dislike) => {
  //   //           if (dislike.username === props.username) {
  //   //             //pros.userId는 로그인한 사용자의 Id이기때문
  //   //             setDisLikeAction("disliked");
  //   //           }
  //   //         });
  //   //       } else {
  //   //         alert("DisLike에 대한 정보를 가져오지 못했습니다.");
  //   //       }
  //   //     });
  //   //   }, []);

  return (
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {LikeAction === "" ? (
          <AiOutlineLike onClick={onLike} />
        ) : (
          <AiFillLike />
        )}
      </Tooltip>
      <span style={{ paddingLeft: "4px", cursor: "auto" }}> {Likes}</span>
    </span>

    //       <span key="comment-basic-dislike" style={{ marginLeft: "4px" }}>
    //         <Tooltip title="Dislike">
    //           {DisLikeAction === "" ? (
    //             <AiOutlineDislike onClick />
    //           ) : (
    //             <AiFillDislike />
    //           )}
    //         </Tooltip>
    //         <span style={{ paddingLeft: "4px", cursor: "auto" }}> {Dislikes}</span>
    //       </span>
    //     </div>
  );
};

export default LikeDisLike;
