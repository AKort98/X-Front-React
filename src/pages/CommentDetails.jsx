import React from "react";

import CommentCard from "../components/CommentCard";
import BackNav from "../components/BackNav";
import RepliesFeed from "../components/RepliesFeed";
import PostComment from "../components/PostComment";

function CommentDetails() {
  return (
    <div className="flex h-auto flex-col border-l-[1px] border-r-[1px] border-gray-700">
      <BackNav />
      <div className="mt-14">
        <CommentCard />
        <PostComment />
        <RepliesFeed />
      </div>
    </div>
  );
}

export default CommentDetails;
