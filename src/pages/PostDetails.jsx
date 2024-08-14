import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import BackNav from "../components/BackNav";
import PostCard from "../components/PostCard";
import InteractionBar from "../components/InteractionBar";
import PostComment from "../components/PostComment";
import CommentsFeed from "../components/CommentsFeed";

function PostDetails() {
  const { id } = useParams("id");
  const fetchPostDetails = async () => {
    const response = await fetch(`http://localhost:8080/user/post/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  };
  const { data, isLoading, error } = useQuery(
    ["postDetails", id],
    fetchPostDetails,
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-4">
        <ReactLoading type="spin" color="blue" width={30} />
      </div>
    );

  return (
    <div className="flex h-auto flex-col border-l-[1px] border-r-[1px] border-gray-700">
      <BackNav />
      <div className="mt-14">
        <PostCard data={data} />
        <InteractionBar data={data} />
        <PostComment data={data} />
        <CommentsFeed comment={data} />
      </div>
    </div>
  );
}

export default PostDetails;
