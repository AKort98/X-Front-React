import React from "react";
import { getTimeOfTweet, getDayOfTweet } from "../../utils/TimeConversion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

function PostCard({ data }) {
  const time = getTimeOfTweet(data.tweet.createdAt);
  const day = getDayOfTweet(data.tweet.createdAt);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleClick = (e) => {
    setImageUrl(e.target.src);
    setOpen(true);
    console.log(e);
  };
  return (
    <div className="flex flex-col p-4">
      {open && (
        <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-[#080808de]">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="absolute left-8 top-8 rounded-full bg-[#02020293] p-2 hover:bg-[#020202cc]"
          >
            <CgClose size={24} color="white" />
          </button>
          <img
            src={imageUrl}
            alt="preview image"
            className="h-[90%] rounded-lg object-contain"
          />
        </div>
      )}
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
      <div className="mt-2 flex flex-wrap justify-center gap-[1px]">
        {data.tweet.images.map((image) => (
          <img
            src={image.url}
            alt="image from tweet"
            className="mt-2 w-3/4 cursor-pointer rounded-md"
            key={image.id}
            onClick={(e) => handleClick(e)}
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
