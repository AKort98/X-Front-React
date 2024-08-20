import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import ReactLoading from "react-loading";
import ForYou from "../components/ForYou";
import PostList from "../components/Post/PostList";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import Header from "../components/Header";
import CreatePost from "../components/Post/CreatePost";

function Feed() {
  const { ref, inView } = useInView();

  const token = localStorage.getItem("token");
  const fetchPosts = async ({ pageParam = 0 }) => {
    const response = await fetch(
      `http://localhost:8080/user/tweets?page=${pageParam}&size=5`,
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
  };

  const {
    data: queriedPosts,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => {
      let end = lastPage.nextPage > lastPage.totalPageNumber;
      return end ? undefined : lastPage.nextPage;
    },
    hasNextPage: (lastPage) => {
      return lastPage.nextPage < lastPage.totalPageNumber;
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading)
    return (
      <div className="flex w-full justify-center p-5">
        <ReactLoading type="spinningBubbles" color="#1D9BF0" width={30} />
      </div>
    );
  return (
    <>
      <Header />
      <div className="fixed z-20 hidden w-[750px] backdrop-blur-md md:block">
        <ForYou />
      </div>
      <div className="border-l-gray-700 border-r-gray-700 pb-12 sm:border-r-[1px] sm:pb-0 md:mt-14 md:border-l-[1px]">
        <div className="hidden sm:block">
          <CreatePost />
        </div>

        {queriedPosts && <PostList pages={queriedPosts.pages} />}
      </div>
      <div className="mt-2 flex justify-center">
        <button
          className="text-white"
          onClick={fetchNextPage}
          hidden={!hasNextPage}
        >
          {isFetchingNextPage ? (
            <ReactLoading type="spinningBubbles" color="blue" width={30} />
          ) : (
            <div ref={ref}>"Show more"</div>
          )}
        </button>
      </div>
      <Navbar />
    </>
  );
}

export default Feed;
