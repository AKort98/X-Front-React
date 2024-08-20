import React from "react";
import UserConnectionsTab from "../components/UserConnectionsTab";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FollowersList from "../components/FollowersList";

export default function Followers() {
  const { username } = useParams("username");
  console.log(username);

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
      <div className="mt-32">
        <FollowersList followers={data} />
      </div>
    </div>
  );
}
