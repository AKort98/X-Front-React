import React from "react";
import Follower from "./Follower";

function FollowersList({ followers }) {
  return (
    <div className="flex flex-col">
      {followers.map((follower) => (
        <div key={follower.user.id}>
          <Follower follower={follower} />
        </div>
      ))}
    </div>
  );
}

export default FollowersList;
