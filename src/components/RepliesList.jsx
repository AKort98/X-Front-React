import React from "react";
import Comment from "./Comment";

function RepliesList({ pages }) {
  console.log(pages);

  return (
    <div className="flex flex-col">
      {pages.map((page) =>
        page.replies.map((reply) => <Comment data={reply} key={reply.id} />),
      )}
    </div>
  );
}

export default RepliesList;
