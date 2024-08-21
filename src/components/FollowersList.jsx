import React from "react";
import { Link } from "react-router-dom";

function FollowersList({ followers }) {
  const localUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col">
      {followers.map((follower) => {
        return (
          <div
            className="flex gap-1 p-4 hover:bg-[#3535353f]"
            key={follower.user.id}
          >
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
                  follower.followedByCurrentLoggedInUser === true ? (
                    <button
                      className="hover: w-28 rounded-2xl border py-1 font-semibold text-white hover:border-[#F4212E] hover:bg-[#67070f4f] hover:text-[#F4212E] disabled:bg-red-600"
                      onClick={() => console.log("hi")}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button className="hover: w-28 rounded-2xl border bg-white py-1 font-semibold text-black hover:border-[#2dff5b] hover:bg-[#2dff5a28] hover:text-[#2dff5b] disabled:bg-red-600">
                      Follow
                    </button>
                  )
                ) : null}
              </div>
              <p className="text-white">{follower.user.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FollowersList;
