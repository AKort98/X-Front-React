import React from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import PostList from "../Post/PostList";

function UserPosts() {
  const { username } = useParams();
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const { ref, inView } = useInView();

  const fetchRequestedUserPosts = async ({ pageParam = 0 }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/user/details?username=${username}&page=${pageParam}&size=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        return await response.json();
      }

      if (response.status == 400) {
        nav("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["userPosts", username],
      queryFn: fetchRequestedUserPosts,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage > 0 ? lastPage.nextPage : undefined;
      },
      hasNextPage: (lastPage) => {
        return lastPage.nextPage === -1 ? true : false;
      },
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center">
        <ReactLoading type="spin" width={32} color="blue" />;
      </div>
    );
  }

  return (
    <>
      {data && <PostList pages={data.pages} />}
      <button
        className="text-white"
        onClick={fetchNextPage}
        hidden={!hasNextPage}
      >
        {isFetchingNextPage ? (
          <ReactLoading
            type="spinningBubbles"
            color="blue"
            width={30}
            className="text-center"
          />
        ) : (
          <div ref={ref}>"Show more"</div>
        )}
      </button>
    </>
  );
}

export default UserPosts;
