import React from "react";
import UserConnectionsTab from "../components/UserConnectionsTab";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FollowersList from "../components/FollowersList";

function Following() {
  const { username } = useParams("username");

  const token = localStorage.getItem("token");
  const fetchFollowers = async () => {
    const response = await fetch(
      `http://localhost:8080/user/following/${username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      return await response.json();
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["following", username],
    queryFn: fetchFollowers,
  });

  if (isLoading) {
    return "loading";
  }

  return (
    <div className="flex flex-col border-[0.5px] border-t-0 border-b-gray-700 border-l-gray-700 border-r-gray-700">
      <UserConnectionsTab />
      {data.length === 0 ? (
        <div className="mt-44 flex h-dvh w-full flex-col items-center p-16 md:h-auto">
          <div>
            <h1 className="text-3xl font-extrabold text-white">{`@${username} isn't`}</h1>
            <h1 className="text-3xl font-extrabold text-white">
              following anyone
            </h1>
            <p className="text-gray-500">
              Once they follow accounts, they’ll show up here.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-32">
          <FollowersList followers={data} />
        </div>
      )}
    </div>
  );
}

export default Following;
