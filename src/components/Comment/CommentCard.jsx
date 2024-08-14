import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getDayandMonth } from "../../utils/TimeConversion";

function CommentCard() {
  const { commentId } = useParams();
  const fetchCommentDetails = async () => {
    const response = await fetch(
      `http://localhost:8080/user/commentDetails?commentId=${commentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return await response.json();
  };
  const { data, isLoading, error } = useQuery(
    ["commentDetails", commentId],
    fetchCommentDetails,
    { retry: false },
  );

  if (isLoading) return "Loading";
  if (error) return "Something went wrong";

  const day = getDayandMonth(data.createdAt);

  return (
    <div className="flex flex-col p-4">
      <Link to={`/user/${data.localUser.username}`} className="flex gap-4">
        <img
          src={data.localUser.avatar}
          alt="avatar"
          className="size-14 rounded-full hover:opacity-45"
        />
        <div className="flex flex-col">
          <span className="text-white">{data.localUser.displayname}</span>
          <span className="text-gray-500">{"@" + data.localUser.username}</span>
        </div>
      </Link>
      <p className="mt-4 text-lg text-white">{data.content}</p>

      {data.commentImageses.map((image) => (
        <img
          src={image.url}
          alt="image from tweet"
          className="mt-2 w-full rounded-md"
          key={image.id}
        />
      ))}
    </div>
  );
}

export default CommentCard;
