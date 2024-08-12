import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function BackNav() {
  const navigate = useNavigate();
  return (
    <div className="fixed flex w-[745px] items-center gap-8 bg-transparent p-4 backdrop-blur-md">
      <button onClick={() => navigate("/home")}>
        <BiLeftArrowAlt color="white" size={30} />
      </button>
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-white">Post</span>
      </div>
    </div>
  );
}

export default BackNav;
