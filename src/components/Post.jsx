import React, { useState } from "react";
import { BiComment, BiHeart, BiRepost } from "react-icons/bi";
import { BsEye, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { time } from "../utils/TimeConversion";

function Post({ post }) {
  const [isLiked, setIslIked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.tweet.userLikesCount);
  const timeOfTweet = time(post.tweet.createdAt);

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
      setIslIked(!isLiked);
      if (isLiked == true) {
        setLikeCount((count) => count + -1);
      } else {
        setLikeCount((count) => count + 1);
      }
      return await response.json();
    }
  };

  return (
    <div className="flex flex-col border-b-[1px] border-gray-700 p-3">
      <div className="flex gap-3">
        <Link to={`/${post.tweet.user.username}`} className="w-[50px]">
          <img
            src={post.tweet.user.avatar}
            alt="user avatar"
            className="size-8 cursor-pointer rounded-full hover:opacity-65 md:size-12"
          />
        </Link>
        <div className="flex w-full flex-col gap-1">
          <Link
            to={`/post/${post.tweet.id}`}
            className="flex items-center gap-1"
          >
            <span className="text-lg font-semibold text-white">
              {post.tweet.user.displayname}
            </span>
            <span className="font-semibold text-[#858585]">
              {"@" + post.tweet.user.username}
            </span>
            <span className="text-[#858585]">~</span>
            <span className="font-semibold text-[#858585]">{timeOfTweet}</span>
          </Link>
          <Link to={`/post/${post.tweet.id}`} className="text-white">
            {post.tweet.content}
          </Link>
          {post.tweet.images.length == 1 && (
            <Link
              to={`/post/${post.tweet.id}`}
              className="flex justify-center rounded-xl"
            >
              <img
                src={post.tweet.images[0].url}
                alt="image"
                className="rounded-xl object-cover"
              />
            </Link>
          )}
          {post.tweet.images.length > 1 && (
            <Link
              to={`/post/${post.tweet.id}`}
              className="flex w-full flex-wrap justify-center gap-1"
            >
              {post.tweet.images.map((image, index) => (
                <img
                  src={image.url}
                  alt="image"
                  className="rounded-md object-cover"
                  key={index}
                />
              ))}
            </Link>
          )}
          <div className="mt-2 flex items-center justify-between text-gray-400">
            <div className="flex items-center gap-1">
              <span>
                <BiComment className="size-4" />
              </span>
              <small>{post.tweet.commentsCount}</small>
            </div>
            <div className="flex items-center gap-1">
              <span>
                <BiRepost className="size-4" />
              </span>
              <small>52</small>
            </div>
            <div className="flex items-center gap-1 align-middle">
              <button onClick={() => likeTweet(post.tweet.id)}>
                {isLiked == true ? (
                  <BsHeartFill className="size-4" color="red" />
                ) : (
                  <BiHeart className="size-4" color="white" />
                )}
              </button>
              <small>{likeCount}</small>
            </div>
            <div className="flex items-center gap-1 align-middle">
              <span>
                <BsEye className="size-4" />
              </span>
              <small>{0}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
