import React from "react";

import InteractWithProfileBar from "./InteractWithProfileBar";

function ProfileHeader({ data }) {
  return (
    <>
      <div className="h-[120px] md:h-[250px]">
        <img
          src={
            data.user.header ||
            "https://www.mainstreethost.com/wp-content/uploads/2013/07/5-free-twitter-headers-east-coast-city-skylines-8.jpg"
          }
          alt=""
          className="h-44 w-full object-cover md:h-60"
        />
        <img
          src={data.user.avatar}
          alt="user avatar"
          className="size-24 translate-x-3 translate-y-[-50px] rounded-full border-4 border-black object-cover md:size-40 md:translate-x-3 md:translate-y-[-90px]"
        />
      </div>
      <InteractWithProfileBar data={data} />
    </>
  );
}

export default ProfileHeader;
