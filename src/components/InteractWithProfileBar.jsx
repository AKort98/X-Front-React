import React from "react";
import { BiBell, BiMessage } from "react-icons/bi";
import { CgMore } from "react-icons/cg";
import { useState } from "react";

function InteractWithProfileBar({ data }) {
  const [hover, setHover] = useState(false);
  const [friend, setFriend] = useState(data.followedByCurrentLoggedInUser);
  const [disabled, setdisabled] = useState(false);
  const id = data.user.id;

  const unfollow = async () => {
    setFriend((prev) => !prev);
    setdisabled(true);
    const response = await fetch(
      `http://localhost:8080/user/friend-request/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      setdisabled(false);
    }
    if (!response.ok) {
      setFriend(data.followedByCurrentLoggedInUser);
      console.log("failed to unfollow");
    }
  };

  const follow = async () => {
    setFriend((prev) => !prev);
    setdisabled(true);
    const response = await fetch(
      `http://localhost:8080/user/friend-request/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      setdisabled(false);
    }
    if (!response.ok) {
      setFriend(data.followedByCurrentLoggedInUser);
      setdisabled(false);
      console.log("failed to follow");
    }
  };

  if (!friend)
    return (
      <div className="mt-16 flex justify-end gap-2 p-2 md:mt-4">
        <CgMore color="white" size={30} className="rounded-2xl border p-1" />
        <BiMessage color="white" size={30} className="rounded-2xl border p-1" />
        <button
          className="rounded-2xl border bg-white px-4 py-1 font-bold text-black disabled:opacity-45"
          disabled={disabled}
          onClick={follow}
        >
          Follow
        </button>
      </div>
    );
  return (
    <div className="mt-16 flex justify-end gap-2 p-2 md:mt-4">
      <CgMore color="white" size={30} className="rounded-2xl border p-1" />
      <BiMessage color="white" size={30} className="rounded-2xl border p-1" />
      <BiBell color="white" size={30} className="rounded-2xl border p-1" />
      <button
        onClick={() => unfollow()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="hover: w-28 rounded-2xl border py-1 font-semibold text-white hover:border-[#F4212E] hover:bg-[#67070f4f] hover:text-[#F4212E] disabled:bg-red-600"
        disabled={disabled}
      >
        {hover ? "Unfollow" : "Following"}
      </button>
    </div>
  );
}

export default InteractWithProfileBar;
