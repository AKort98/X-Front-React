import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function ProfileBackNav({ data }) {
  const navigate = useNavigate();
  return (
    <div className="fixed flex w-full items-center gap-8 bg-transparent p-4 backdrop-blur-md">
      <button onClick={() => navigate("/home")}>
        <BiLeftArrowAlt color="white" size={30} />
      </button>
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-white">
          {data.user.username}
        </span>
        <span className="text-xs font-semibold text-[#777777c5]">
          {data.tweetCount}
        </span>
      </div>
    </div>
  );
}

export default ProfileBackNav;
