import React from "react";

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
        <div className="mt-2 flex gap-1">
          <span className="font-semibold text-white">{data.followerCount}</span>
          <span className="text-[#77777779]">Followers</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
