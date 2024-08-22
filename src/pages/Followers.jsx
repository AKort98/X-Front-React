import React from "react";
import UserConnectionsTab from "../components/UserConnectionsTab";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FollowersList from "../components/FollowersList";

export default function Followers() {
  const { username } = useParams("username");

  const token = localStorage.getItem("token");
  const fetchFollowers = async () => {
    const response = await fetch(
      `http://localhost:8080/user/followers/${username}`,
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
    queryKey: ["followers", username],
    queryFn: fetchFollowers,
  });

  if (isLoading) {
    return "loading";
  }
  return (
    <div className="flex flex-col border-[0.5px] border-t-0 border-b-gray-700 border-l-gray-700 border-r-gray-700">
      <UserConnectionsTab />
      {data.length === 0 ? (
        <div className="mt-44 flex h-dvh w-full flex-col items-center text-wrap break-words p-16 text-center md:h-auto">
          <h1 className="text-3xl font-extrabold text-white">
            Looking for followers?
          </h1>
          <p className="text-wrap text-gray-500">
            When someone follows this account, they’ll show up here. Posting and
            interacting with others helps boost followers.{" "}
          </p>
        </div>
      ) : (
        <div className="mt-32">
          <FollowersList followers={data} />
        </div>
      )}
    </div>
  );
}
