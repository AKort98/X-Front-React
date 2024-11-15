import React from "react";
import { getDayandMonth } from "../../utils/TimeConversion";
import { Link } from "react-router-dom";
import { BiComment } from "react-icons/bi";

function Comment({ data, replyCount }) {
  const day = getDayandMonth(data.createdAt);

  return (
    <div className="flex w-full gap-2 border-b-[1px] border-gray-700 p-3">
      <Link to={`/user/${data.localUser.username}`} className="flex-shrink-0">
        <img
          src={data.localUser.avatar}
          alt="avatar"
          className="size-12 rounded-full hover:opacity-40"
        />
      </Link>
      <Link to={`/comment/${data.id}`} className="flex w-full flex-col">
        <div className="flex gap-1">
          <span className="text-white">{data.localUser.displayname}</span>
          <span className="text-[#777777]">
            {"@" + data.localUser.username}
          </span>
          <span className="text-[#777777]">~</span>
          <span className="text-[#777777]">{day}</span>
        </div>
        <p className="text-lg text-white">{data.content}</p>
        {data.commentImageses.length == 1 && (
          <div className="flex w-full justify-center rounded-xl object-cover">
            <img
              src={data.commentImageses[0].url}
              alt="image"
              className="rounded-xl object-cover"
            />
          </div>
        )}
        <div className="mt-2 flex items-center gap-1 text-gray-400">
          <span>
            <BiComment className="size-4" />
          </span>
          <small>{replyCount}</small>
        </div>
      </Link>
    </div>
  );
}

export default Comment;
