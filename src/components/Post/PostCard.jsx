import React from "react";
import { getTimeOfTweet, getDayOfTweet } from "../../utils/TimeConversion";
import { Link } from "react-router-dom";

function PostCard({ data }) {
  const time = getTimeOfTweet(data.tweet.createdAt);
  const day = getDayOfTweet(data.tweet.createdAt);
  return (
    <div className="flex flex-col p-4">
      <Link to={`/user/${data.tweet.user.username}`} className="flex gap-4">
        <img
          src={data.tweet.user.avatar}
          alt="avatar"
          className="size-14 rounded-full hover:opacity-45"
        />
        <div className="flex flex-col">
          <span className="text-white">{data.tweet.user.displayname}</span>
          <span className="text-gray-500">
            {"@" + data.tweet.user.username}
          </span>
        </div>
      </Link>
      <p className="mt-4 text-lg text-white">{data.tweet.content}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {data.tweet.images.map((image) => (
          <img
            src={image.url}
            alt="image from tweet"
            className="mt-2 w-full rounded-md"
            key={image.id}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 font-bold text-gray-600">
        <span className="">{time}</span>
        <span>-</span>
        <span className="">{day}</span>
      </div>
    </div>
  );
}

export default PostCard;
