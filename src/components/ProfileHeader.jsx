import React from "react";
import { BiBell, BiMessage } from "react-icons/bi";
import { CgMore } from "react-icons/cg";

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
          alt=""
          className="size-24 translate-x-3 translate-y-[-50px] rounded-full border-2 border-black object-cover md:size-40 md:translate-x-3 md:translate-y-[-90px]"
        />
      </div>
      <div className="mt-16 flex justify-end gap-2 p-2 md:mt-4">
        <CgMore color="white" size={30} className="rounded-2xl border p-1" />
        <BiMessage color="white" size={30} className="rounded-2xl border p-1" />
        <BiBell color="white" size={30} className="rounded-2xl border p-1" />
        <button className="rounded-2xl border px-4 py-1 text-white">
          Following
        </button>
      </div>
    </>
  );
}

export default ProfileHeader;
