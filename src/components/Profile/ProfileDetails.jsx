import React from "react";

function ProfileDetails({ data }) {
  return (
    <div className="md: flex flex-col px-4">
      <span className="text-xl font-semibold text-white">
        {data.user.displayname}
      </span>
      <span className="text-lg text-[#77777779]">@{data.user.username}</span>
      <p className="mt-4 text-white">{data.user.description}</p>
    </div>
  );
}

export default ProfileDetails;
