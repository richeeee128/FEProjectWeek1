import React, { useState, useEffect } from 'react';
import api from '../api/post';
import { Tooltip } from 'antd';
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from 'react-icons/ai';

const LikeDisLike = ({ postId }) => {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(false);
  const [Dislikes, setDislikes] = useState(0);
  const [DislikeAction, setDislikeAction] = useState(false);

  ///////////////////////////////////////
  //좋아요 버튼
  ////////////////////////////////////

  useEffect(() => {
    // 포스트에 대한 사용자의 좋아요 상태를 서버에서 가져옴
    api
      .get(`/post/${postId}`)
      .then((response) => {
        if (response.data.success) {
          setLikes(response.data.info.liked);
        }
      })
      .catch((error) => {
        alert('좋아요 정보를 가져오지 못했습니다.');
        console.error('좋아요 정보를 가져오는 중 오류가 발생했습니다.', error);
      });
  }, []);

  const onToggleLike = async () => {
    try {
      const response = await api.post(`/post/${postId}/like`);
      if (response.data.success) {
        setLikes((prevLikes) => (LikeAction ? prevLikes - 1 : prevLikes + 1));
        setLikeAction((prevLikeAction) => !prevLikeAction);
      } else {
        alert('좋아요 처리를 실패했습니다.');
      }
    } catch (error) {
      console.error('좋아요 요청 중 오류가 발생했습니다.', error);
    }
  };

  ///////////////////////////////////////
  //싫어요 버튼
  ////////////////////////////////////

  useEffect(() => {
    // 포스트에 대한 사용자의 좋아요 상태를 서버에서 가져옴
    api
      .get(`/post/${postId}`)
      .then((response) => {
        if (response.data.success) {
          setDislikes(response.data.info.disliked);
        }
      })
      .catch((error) => {
        alert('싫어요 정보를 가져오지 못했습니다.');
        console.error('싫어요 정보를 가져오는 중 오류가 발생했습니다.', error);
      });
  }, []);

  const onToggleDislike = async () => {
    try {
      const response = await api.post(`/post/${postId}/dislike`);
      if (response.data.success) {
        setDislikes((prevDislikes) =>
          DislikeAction ? prevDislikes - 1 : prevDislikes + 1
        );
        setDislikeAction((prevDislikeAction) => !prevDislikeAction);
      } else {
        alert('좋아요 처리를 실패했습니다.');
      }
    } catch (error) {
      console.error('좋아요 요청 중 오류가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    api
      .get(`/post/${postId}`)
      .then((response) => {
        if (response.data.success) {
          setDislikes(response.data.info.disliked);
        } else {
          alert('DisLike에 대한 정보를 가져오지 못했습니다.');
        }
      })
      .catch((error) => {
        console.error('DisLike 정보를 가져오는 중 오류가 발생했습니다.', error);
      });
  }, []);

  return (
    <>
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          {LikeAction ? (
            <AiFillLike onClick={onToggleLike} />
          ) : (
            <AiOutlineLike onClick={onToggleLike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: '4px', cursor: 'auto' }}> {Likes}</span>
      </span>{' '}
      <span key='comment-basic-dislike'>
        <Tooltip title='disLike'>
          {DislikeAction ? (
            <AiFillDislike onClick={onToggleDislike} />
          ) : (
            <AiOutlineDislike onClick={onToggleDislike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: '4px', cursor: 'auto' }}> {Dislikes}</span>
      </span>{' '}
    </>
  );
};

export default LikeDisLike;
