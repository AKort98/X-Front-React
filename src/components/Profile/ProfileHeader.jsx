import React from "react";
import InteractWithProfileBar from "./InteractWithProfileBar";

function ProfileHeader({ data }) {
  return (
    <>
      <div className="h-[120px] md:h-[250px]">
        <img
          src={
            data.user.header ||
            "https://user-images.githubusercontent.com/513929/53929982-e5497700-404c-11e9-8393-dece0b196c98.png"
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
