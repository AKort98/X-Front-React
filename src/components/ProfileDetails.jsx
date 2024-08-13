import React from "react";

function ProfileDetails({ data }) {
  return (
    <div className="md: flex flex-col px-4">
      <span className="text-xl text-white">{data.user.displayname}</span>
      <span className="text-lg text-[#77777779]">@{data.user.username}</span>
      <p className="font-extralight text-slate-100">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
        maxime, delectus cupiditate error beatae laboriosam, ipsam, voluptas
        maiores suscipit adipisci odio?
      </p>
    </div>
  );
}

export default ProfileDetails;
