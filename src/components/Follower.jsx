import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Follower({ follower }) {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [disabled, setdisabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [friend, setFriend] = useState(follower.followedByCurrentLoggedInUser);

  const id = follower.user.id;

  const follow = async () => {
    setdisabled(true);
    const response = await fetch(
      `http://localhost:8080/user/friend-request/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      setFriend((prev) => !prev);
      setdisabled(false);
    }
    if (!response.ok) {
      setdisabled(false);
      console.log("failed to follow");
    }
  };

  const unfollow = async () => {
    setFriend((prev) => !prev);
    setdisabled(true);
    const response = await fetch(
      `http://localhost:8080/user/friend-request/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      setdisabled(false);
    }
    if (!response.ok) {
      setFriend(data.followedByCurrentLoggedInUser);
      console.log("failed to unfollow");
    }
  };

  return (
    <div className="flex gap-1 p-4 hover:bg-[#3535353f]" key={follower.user.id}>
      <Link className="w-[60px]" to={`/user/${follower.user.username}`}>
        <img
          src={follower.user.avatar}
          alt="avatar"
          className="size-12 rounded-full hover:opacity-40"
        />
      </Link>
      <div className="flex w-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-white">
              {follower.user.displayname}
            </span>
            <span className="text-gray-500">{`@${follower.user.username}`}</span>
          </div>
          {follower.user.id !== localUser.id ? (
            friend === true ? (
              <button
                className="hover: w-28 rounded-2xl border py-1 font-semibold text-white hover:border-[#F4212E] hover:bg-[#67070f4f] hover:text-[#F4212E] disabled:bg-red-600"
                onClick={unfollow}
                disabled={disabled}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {hover ? "Unfollow" : "Following"}
              </button>
            ) : (
              <button
                className="hover: w-28 rounded-2xl border bg-white py-1 font-semibold text-black hover:border-[#2dff5b] hover:bg-[#2dff5a28] hover:text-[#2dff5b] disabled:opacity-35"
                onClick={follow}
                disabled={disabled}
              >
                Follow
              </button>
            )
          ) : null}
        </div>
        <p className="text-white">{follower.user.description}</p>
      </div>
    </div>
  );
}

export default Follower;
