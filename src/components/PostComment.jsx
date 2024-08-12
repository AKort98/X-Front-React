import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

function PostComment({ data }) {
  const [showReply, setShowReply] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="border-b-[0.5px] border-[#363636f1] p-4">
      <div className="flex gap-4">
        <img src={user.avatar} alt="avatar" className="size-12 rounded-full" />
        <div className="flex w-full flex-col">
          {showReply ? (
            <motion.div
              initial={{ x: -10 }} // Start position (below the initial position)
              animate={{ x: 0 }} // End position (at the initial position)
              transition={{ duration: 0.5 }} // Animation duration
              className="text-white"
            >{`replying to @${data.tweet.user.username}`}</motion.div>
          ) : undefined}
          <textarea
            placeholder="Post your reply"
            className="w-full bg-transparent text-xl text-white focus:outline-none"
            onFocus={() => setShowReply(true)}
            onBlur={() => setShowReply(false)}
          ></textarea>
          <button className="mt-2 w-20 self-end rounded-2xl bg-blue-600 p-1 font-semibold text-white">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
