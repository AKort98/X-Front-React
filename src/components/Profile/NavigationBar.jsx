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
    <div className="mt-2 flex self-center border-b-[1px] border-gray-700 text-center">
      <Link
        to=""
        className={`flex-1 p-4 transition duration-300 ease-in-out ${
          isActive("")
            ? "relative inline-block font-semibold text-white after:absolute after:bottom-0 after:left-16 after:h-1 after:w-1/2 after:rounded-xl after:bg-blue-500"
            : "text-[#777777] hover:bg-[#333333a2]"
        }`}
      >
        Posts
      </Link>
      <Link
        to="replies"
        className={`flex-1 p-4 transition duration-300 ease-in-out ${
          isActive("/replies")
            ? "relative inline-block font-semibold text-white after:absolute after:bottom-0 after:left-16 after:h-1 after:w-1/2 after:rounded-xl after:bg-blue-500"
            : "text-[#777777] hover:bg-[#333333a2]"
        }`}
      >
        Replies
      </Link>
      <Link
        to="media"
        className={`flex-1 p-4 transition duration-300 ease-in-out ${
          isActive("/media")
            ? "relative inline-block font-semibold text-white after:absolute after:bottom-0 after:left-16 after:h-1 after:w-1/2 after:rounded-xl after:bg-blue-500"
            : "text-[#777777] hover:bg-[#333333a2]"
        }`}
      >
        Media
      </Link>
    </div>
  );
}

export default NavigationBar;
