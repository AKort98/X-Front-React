import React from "react";

function ForYou() {
  return (
    <div className="flex w-full justify-between border-b-[0.5px] border-b-gray-700 font-semibold text-white">
      <div className="flex-1 cursor-pointer p-4 text-center text-white hover:bg-[#111111af]">
        For You
      </div>
      <div className="flex-1 cursor-pointer p-4 text-center text-white hover:bg-[#111111af]">
        Following
      </div>
    </div>
  );
}

export default ForYou;
