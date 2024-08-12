import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import ReactLoading from "react-loading";
import { VscLoading } from "react-icons/vsc";
import { CgSpinner } from "react-icons/cg";

function PostComment({ data }) {
  const [showReply, setShowReply] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setloading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const queryClient = useQueryClient();

  console.log(id);

  const submitComment = async () => {
    setloading(true);
    const response = await fetch(
      `http://localhost:8080/user/postComment?tweetId=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: content }),
      },
    );
    const data = await response.json();
    if (response.ok) {
      setloading(false);
      setContent("");
      queryClient.invalidateQueries("comments");
    }
  };

  return (
    <div className="border-b-[0.5px] border-gray-700 p-4">
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            className="mt-2 w-20 self-end rounded-2xl bg-blue-600 p-1 font-semibold text-white disabled:opacity-50"
            onClick={submitComment}
            disabled={loading || content === ""}
          >
            {loading ? "Posting" : "Reply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
