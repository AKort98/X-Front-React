import React, { useState } from "react";
import { BiBookmark, BiComment, BiHeart } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";

function InteractionBar({ data }) {
  const [isLiked, setIsLiked] = useState(data.liked);
  const [likeCount, setLikeCount] = useState(data.tweet.userLikesCount);

  const token = localStorage.getItem("token");
  const likeTweet = async (tweetId) => {
    const response = await fetch(`http://localhost:8080/user/like/${tweetId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setIsLiked(!isLiked);
      if (isLiked == true) {
        setLikeCount((count) => count + -1);
      } else {
        setLikeCount((count) => count + 1);
      }
      return await response.json();
    }
  };
  return (
    <div className="flex justify-between border-b-[1px] border-t-[1px] border-[#363636f1] p-2 text-gray-400">
      <div className="flex items-center gap-1">
        <button>
          <BiComment color="gray" />
        </button>
        <span>{data.tweet.commentsCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <button>
          <FaRetweet color="gray" />
        </button>
        <span>{data.tweet.userLikesCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => likeTweet(data.tweet.id)}>
          {isLiked == true ? (
            <BsHeartFill className="size-4" color="red" />
          ) : (
            <BiHeart className="size-4" color="white" />
          )}
        </button>
        <span>{likeCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <button>
          <BiBookmark color="gray" />
        </button>
        <span>{data.tweet.userLikesCount}</span>
      </div>
    </div>
  );
}

export default InteractionBar;
