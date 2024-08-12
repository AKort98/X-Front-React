import React from "react";
import { getTimeOfTweet, getDayOfTweet } from "../utils/TimeConversion";

function Comment({ data }) {
  const time = getTimeOfTweet(data.createdAt);
  const day = getDayOfTweet(data.createdAt);
  return (
    <div className="">
      <div className="flex flex-col border-b-[0.5px] border-[#363636f1] p-4">
        <div className="flex gap-4">
          <img
            src={data.localUser.avatar}
            alt="avatar"
            className="size-14 rounded-lg"
          />
          <div className="flex flex-col">
            <span className="text-white">{data.localUser.displayname}</span>
            <span className="text-[#777777]">
              {"@" + data.localUser.username}
            </span>
          </div>
        </div>
        <p className="mt-6 text-lg text-white">{data.content}</p>

        <div className="flex items-center gap-2 font-bold text-[#777777]">
          <span className="">{time}</span>
          <span>-</span>
          <span className="">{day}</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
