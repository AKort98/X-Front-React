import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { getTimeOfTweet, getDayOfTweet } from "../../utils/TimeConversion";
import { CgComment } from "react-icons/cg";
import { BiComment } from "react-icons/bi";

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

  if (isLoading)
    return (
      <div className="flex justify-center">
        <ReactLoading type="spinningBubbles" color="blue" width={24} />;
      </div>
    );
  if (error) return "Something went wrong";

  const day = getDayOfTweet(data.comment.createdAt);
  const time = getTimeOfTweet(data.comment.createdAt);
  console.log(data);

  return (
    <div className="flex flex-col p-4">
      <Link
        to={`/user/${data.comment.localUser.username}`}
        className="flex gap-4"
      >
        <img
          src={data.comment.localUser.avatar}
          alt="avatar"
          className="size-14 rounded-full hover:opacity-45"
        />
        <div className="flex flex-col">
          <span className="text-white">
            {data.comment.localUser.displayname}
          </span>
          <span className="text-gray-500">
            {"@" + data.comment.localUser.username}
          </span>
        </div>
      </Link>
      <p className="mt-4 text-lg text-white">{data.comment.content}</p>
      <div className="mt-3 flex items-center gap-2 font-bold text-gray-600">
        <span>{time}</span>
        <span>-</span>
        <span>{day}</span>
      </div>

      {data.comment.commentImageses.map((image) => (
        <img
          src={image.url}
          alt="image from tweet"
          className="mt-2 w-full rounded-md"
          key={image.id}
        />
      ))}
      <div className="mt-2 flex items-center gap-1 text-gray-400">
        <span>
          <BiComment className="size-4" />
        </span>
        <small>{data.replyCount}</small>
      </div>
    </div>
  );
}

export default CommentCard;
