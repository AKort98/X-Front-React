import { useInfiniteQuery } from "react-query";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Comment from "./Comment";

function CommentsFeed({ comment }) {
  const token = localStorage.getItem("token");
  const id = comment.tweet.id;
  const { ref, inView } = useInView();

  const fetchComments = async ({ pageParam = 0 }) => {
    const response = await fetch(
      `http://localhost:8080/user/comments/${id}?page=${pageParam}&size=10`,
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
    data: comments,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: fetchComments,

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

  if (isLoading) return <ReactLoading type="spin" width={20} color="blue" />;
  if (comments.pages[0].comments.length === 0) {
    return (
      <div className="text-center text-xl text-slate-700">No comments</div>
    );
  }
  return (
    <div className="flex flex-col border-l-[1px] border-r-[1px] border-gray-700">
      {comments.pages.map((page, index) => (
        <div key={`page-${index}`}>
          {page.comments.map((comment) => (
            <div key={comment.comment.id}>
              <Comment data={comment.comment} replyCount={comment.replyCount} />
            </div>
          ))}
        </div>
      ))}

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
  );
}

export default CommentsFeed;
