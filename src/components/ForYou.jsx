import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ForYou() {
  const location = useLocation();

  return (
    <div className="flex w-full justify-between border border-b-[1px] border-t-0 border-b-gray-700 border-l-gray-700 border-r-gray-700 bg-transparent font-semibold text-white md:w-full">
      <Link
        to={"/foryou"}
        className={`flex-1 cursor-pointer p-4 text-center text-gray-700 hover:bg-[#111111af] ${location.pathname === "/foryou" ? "text-white" : ""}`}
      >
        For You
      </Link>
      <Link
        to={"/home"}
        className={`flex-1 cursor-pointer p-4 text-center text-gray-700 hover:bg-[#111111af] ${location.pathname === "/home" ? "text-white" : ""}`}
      >
        Following
      </Link>
    </div>
  );
}

export default ForYou;
