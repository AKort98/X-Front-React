import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
function UserConnectionsTab() {
  const location = useLocation();
  const { username } = useParams("username");
  const nav = useNavigate();
  const isActive = (path) => {
    return location.pathname === `/${username}/${path}`;
  };

  const userDetails = async () => {
    const response = await fetch(
      `http://localhost:8080/user/userDetails?username=${username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      return data; // User exists
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["userExists", username],
    queryFn: userDetails,
    retry: false,
  });

  if (isLoading) return "loading";

  return (
    <div className="fixed z-10 w-full bg-transparent backdrop-blur-sm lg:w-[748px]">
      <div className="flex flex-col gap-1">
        <div className="flex gap-4 p-2">
          <button onClick={() => nav("/home")}>
            <BiLeftArrowAlt color="white" size={30} />
          </button>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">
              {data.user.displayname}
            </span>
            <span className="text-sm text-gray-400">{`@${data.user.username}`}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link
            to={`/${username}/followers`}
            className={`flex-1 p-3 text-center transition duration-300 ease-in-out ${
              isActive("followers")
                ? "relative inline-block font-semibold text-white after:absolute after:bottom-0 after:left-24 after:h-1 after:w-1/2 after:rounded-xl after:bg-blue-500"
                : "text-[#777777] hover:bg-[#333333a2]"
            }`}
          >
            Followers
          </Link>
          <Link
            to={`/${username}/following`}
            className={`flex-1 p-3 text-center transition duration-300 ease-in-out ${
              isActive("following")
                ? "font-extrabold text-white"
                : "text-[#777777] hover:bg-[#333333a2]"
            }`}
          >
            Following
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserConnectionsTab;
