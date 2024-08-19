import React from "react";
import { Link } from "react-router-dom";
import { getDayandMonth } from "../../utils/TimeConversion";
import { BiComment } from "react-icons/bi";

function Reply({ reply, replyCount }) {
  console.log(reply);
  const day = getDayandMonth(reply.createdAt);

  return (
    <div className="flex w-full gap-2 border-b-[1px] border-gray-700 p-3">
      <Link to={`/user/${reply.localUser.username}`} className="flex-shrink-0">
        <img
          src={reply.localUser.avatar}
          alt="avatar"
          className="size-12 rounded-full hover:opacity-40"
        />
      </Link>
      <Link to={`/comment/${reply.id}`} className="flex flex-col">
        <div className="flex gap-1">
          <span className="text-white">{reply.localUser.displayname}</span>
          <span className="text-[#777777]">
            {"@" + reply.localUser.username}
          </span>
          <span className="text-[#777777]">~</span>
          <span className="text-[#777777]">{day}</span>
        </div>
        <p className="text-lg text-white">{reply.content}</p>
        {reply.commentImageses.length == 1 && (
          <div className="flex justify-center rounded-xl object-cover">
            <img
              src={reply.commentImageses[0].url}
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

export default Reply;
