import React from "react";
import { BiBell, BiMessage } from "react-icons/bi";
import { CgMore } from "react-icons/cg";
import { useState } from "react";

function InteractWithProfileBar({ data }) {
  const [hover, setHover] = useState(false);
  const friend = data.followedByCurrentLoggedInUser;
  const id = data.user.id;

  const unfollow = async () => {
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
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log("unfollowd");
    }
  };

  if (!friend)
    return (
      <div className="mt-16 flex justify-end gap-2 p-2 md:mt-4">
        <CgMore color="white" size={30} className="rounded-2xl border p-1" />
        <BiMessage color="white" size={30} className="rounded-2xl border p-1" />
        <button className="rounded-2xl border bg-white px-4 py-1 font-bold text-black">
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
        className="hover: w-28 rounded-2xl border py-1 font-semibold text-white hover:border-[#F4212E] hover:bg-[#67070f4f] hover:text-[#F4212E]"
      >
        {hover ? "Unfollow" : "Following"}
      </button>
    </div>
  );
}

export default InteractWithProfileBar;
