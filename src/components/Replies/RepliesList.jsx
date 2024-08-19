import React from "react";
import Reply from "./Reply";

function RepliesList({ pages }) {
  console.log(pages);

  return (
    <div className="flex flex-col">
      {pages.map((page) =>
        page.replies.map((reply) => (
          <Reply reply={reply.comment} replyCount={reply.replyCount} />
        )),
      )}
    </div>
  );
}

export default RepliesList;
