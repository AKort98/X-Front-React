import React from "react";

function FollowersList({ followers }) {
  console.log(followers);

  return (
    <div className="flex flex-col">
      {followers.map((follower) => (
        <div className="flex gap-2 p-4" key={follower.id}>
          <img
            src={follower.avatar}
            alt="avatar"
            className="size-12 rounded-full"
          />
          <div className="flex w-full flex-col">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-white">
                  {follower.displayname}
                </span>
                <span className="text-gray-500">{`@${follower.username}`}</span>
              </div>
              <button className="rounded-2xl bg-white px-5 py-1 font-semibold text-black">
                Follow
              </button>
            </div>
            <p className="text-white">{follower.description}</p>
          </div>
        </div>
      ))}
      {followers.map((follower) => (
        <div className="flex gap-2 p-4" key={follower.id}>
          <img
            src={follower.avatar}
            alt="avatar"
            className="size-12 rounded-full"
          />
          <div className="flex w-full flex-col">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-white">
                  {follower.displayname}
                </span>
                <span className="text-gray-500">{`@${follower.username}`}</span>
              </div>
              <button className="rounded-2xl bg-white px-5 py-1 font-semibold text-black">
                Follow
              </button>
            </div>
            <p className="text-white">{follower.description}</p>
          </div>
        </div>
      ))}
      {followers.map((follower) => (
        <div className="flex gap-2 p-4" key={follower.id}>
          <img
            src={follower.avatar}
            alt="avatar"
            className="size-12 rounded-full"
          />
          <div className="flex w-full flex-col">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-white">
                  {follower.displayname}
                </span>
                <span className="text-gray-500">{`@${follower.username}`}</span>
              </div>
              <button className="rounded-2xl bg-white px-5 py-1 font-semibold text-black">
                Follow
              </button>
            </div>
            <p className="text-white">{follower.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FollowersList;
