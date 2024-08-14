import React from "react";
import Post from "./Post";

function PostList({ pages }) {
  return (
    <div className="flex flex-col">
      {pages.map((page) =>
        page.tweets.map((tweet) => (
          <div key={tweet.tweet.id}>
            <Post post={tweet} />
          </div>
        )),
      )}
    </div>
  );
}

export default PostList;
