import React from "react";

import BackNav from "../components/BackNav";
import CommentCard from "../components/Comment/CommentCard";
import PostComment from "../components/Comment/PostComment";
import RepliesFeed from "../components/Replies/RepliesFeed";

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
