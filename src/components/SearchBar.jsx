import React from "react";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [text, setText] = useState("");
  const [data, setData] = useState();

  const searchUsers = async (e) => {
    const searchTerm = e.target.value.trim();
    setText(searchTerm);
    if (!searchTerm) {
      setData(); // Clear the data or handle it accordingly when the input is empty
      return;
    }
    setText(e.target.value);
    const response = await fetch(
      `http://localhost:8080/user/searchUsers?username=${searchTerm}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      setData(data);
    }
  };
  return (
    <div className="mt-2 flex flex-col px-2">
      <div className="relative">
        <span className="absolute right-2 top-1/2 translate-y-[-50%] text-white">
          <BiSearch />
        </span>
        <input
          value={text}
          type="text"
          className="box-border w-full rounded-2xl bg-[#2d3236] p-2 text-[#ffffff93] focus:outline-none focus:outline-blue-800"
          placeholder="Search"
          onChange={(e) => searchUsers(e)}
          onBlur={(e) => {
            setText("");
            setData();
          }}
        />
        {data && data.length > 0 && (
          <div className="absolute mt-6 flex h-72 w-full flex-col gap-2 overflow-scroll rounded-lg border border-gray-700 bg-black p-2">
            {data.map((user) => (
              <Link
                to={`/user/${user.username}`}
                className="flex gap-2"
                onClick={() => setData()}
              >
                <img
                  key={user.id} // Add a unique key for each element
                  src={user.avatar}
                  alt=""
                  className="size-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-white">
                    {user.displayname}
                  </span>
                  <span className="font-semibold text-gray-700">
                    {"@" + user.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
