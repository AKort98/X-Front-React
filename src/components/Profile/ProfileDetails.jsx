import React from "react";
import { Link } from "react-router-dom";

function ProfileDetails({ data }) {
  return (
    <div className="md: flex flex-col px-4">
      <span className="text-xl font-semibold text-white">
        {data.user.displayname}
      </span>
      <span className="text-lg text-[#77777779]">@{data.user.username}</span>
      <p className="mt-4 text-white">{data.user.description}</p>
      <div className="flex gap-4">
        <div className="mt-2 flex gap-1">
          <span className="font-semibold text-white">
            {data.followingCount}
          </span>
          <span className="text-[#77777779]">Following</span>
        </div>
        <Link
          to={`/${data.user.username}/followers`}
          className="mt-2 flex gap-1 text-white"
        >
          <div className="font-semibold text-white">{data.followerCount}</div>
          <span className="text-[#77777779] transition-all duration-100 ease-in hover:font-semibold hover:text-blue-500">
            Followers
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ProfileDetails;
