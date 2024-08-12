import React from "react";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  return (
    <div className="mt-2 px-2">
      <div className="relative">
        <span className="absolute right-2 top-1/2 translate-y-[-50%] text-white">
          <BiSearch />
        </span>
        <input
          type="text"
          className="box-border w-full rounded-2xl bg-[#2d3236] p-2 text-[#ffffff93] focus:outline-none focus:outline-blue-800"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default SearchBar;
