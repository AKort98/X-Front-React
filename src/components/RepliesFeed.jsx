import React from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import RepliesList from "./RepliesList";
import ReactLoading from "react-loading";

function RepliesFeed() {
  const { commentId } = useParams();
  const fetchReplies = async ({ pageParams = 0 }) => {
    const response = await fetch(
      `http://localhost:8080/user/replies/${commentId}?page=${pageParams}&size=12`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return await response.json();
  };

  const { data, isLoading, error } = useInfiniteQuery(
    ["replies", commentId],
    fetchReplies,
    { refetchOnMount: true },
  );

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center">
        <ReactLoading
          color="blue"
          type="spinningBubbles"
          width={24}
          className="mt-4"
        />
      </div>
    );
  return (
    <div className="border-t border-gray-700">
      <RepliesList pages={data.pages} />
    </div>
  );
}

export default RepliesFeed;
