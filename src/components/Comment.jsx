import React from "react";
import { getDayandMonth } from "../utils/TimeConversion";

function Comment({ data }) {
  const day = getDayandMonth(data.createdAt);
  return (
    <div className="flex w-full gap-2 border-b-[1px] border-gray-700 p-3">
      <img
        src={data.localUser.avatar}
        alt="avatar"
        className="size-12 rounded-full"
      />
      <div className="flex flex-col">
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
          <div className="flex justify-center rounded-xl object-cover">
            <img
              src={data.commentImageses[0].url}
              alt="image"
              className="rounded-xl object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
