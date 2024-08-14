import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
function NavigationBar() {
  const location = useLocation();
  const { username } = useParams();

  const isActive = (path) => {
    return location.pathname === `/user/${username}${path}`;
  };

  return (
    <div className="">
      <div className="mt-2 flex self-center border-b-[1px] border-gray-700 text-center">
        <Link
          to=""
          className={`flex-1 p-4 transition duration-300 ease-in-out ${
            isActive("")
              ? "font-extrabold text-white"
              : "text-[#777777] hover:bg-[#333333a2]"
          }`}
        >
          Posts
        </Link>
        <Link
          to="replies"
          className={`flex-1 p-4 transition duration-300 ease-in-out ${
            isActive("/replies")
              ? "font-extrabold text-white"
              : "text-[#777777] hover:bg-[#333333a2]"
          }`}
        >
          Replies
        </Link>
        <Link
          to="media"
          className={`flex-1 p-4 transition duration-300 ease-in-out ${
            isActive("/media")
              ? "font-extrabold text-white"
              : "text-[#777777] hover:bg-[#333333a2]"
          }`}
        >
          Media
        </Link>
      </div>
    </div>
  );
}

export default NavigationBar;
