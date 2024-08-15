import React from "react";
import LogoX from "./LogoX";
import { AiFillHome } from "react-icons/ai";
import { BiHome, BiNotification, BiSearch, BiShow } from "react-icons/bi";
import { CgClose, CgMail, CgOptions, CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CreatePost from "./Post/CreatePost";

function Sidebar() {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState();

  return (
    <div className="hidden flex-col md:flex md:w-[300px]">
      {open && (
        <div className="fixed flex h-full w-dvw items-center justify-center bg-[#383838de]">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="absolute left-8 top-8 rounded-full bg-[#02020293] p-2 hover:bg-[#020202cc]"
          >
            <CgClose size={24} color="white" />
          </button>
          <div className="absolute top-8 w-2/3">
            <CreatePost />
          </div>
        </div>
      )}
      <div className="mt-4 px-10">
        <LogoX size={8} />
      </div>
      <ul className="mt-4 flex flex-col gap-4 px-8 text-2xl text-slate-200">
        <Link
          to={`/home`}
          className="flex cursor-pointer items-center gap-4 rounded-2xl p-2 hover:bg-slate-800"
        >
          {location.pathname === "/home" ? <AiFillHome /> : <BiHome />}
          <li className="">Home</li>
        </Link>
        <div className="flex cursor-pointer items-center gap-4 rounded-2xl p-2 hover:bg-slate-800">
          <BiSearch />
          <li className="">Explore</li>
        </div>
        <div className="flex cursor-pointer items-center gap-4 rounded-2xl p-2 hover:bg-slate-800">
          <BiNotification />
          <li className="">Notifications</li>
        </div>
        <div className="flex cursor-pointer items-center gap-4 rounded-2xl p-2 hover:bg-slate-800">
          <CgMail />
          <li className="">Messages</li>
        </div>
        <div className="flex cursor-pointer items-center gap-4 rounded-2xl p-2 hover:bg-slate-800">
          <CgProfile />
          <li className="">Profile</li>
        </div>
      </ul>
      <div className="mt-4 px-8">
        <button
          value="Post"
          className="w-full rounded-2xl bg-blue-800 p-2 text-xl text-white"
          onClick={() => setOpen((prev) => !prev)}
        >
          Post
        </button>
      </div>
      <div className="mt-4 flex w-full gap-2 px-8 capitalize">
        <img
          src={currentUser.avatar}
          alt="user avatar"
          className="size-12 rounded-full"
        />
        <div className="flex flex-1 flex-col">
          <span className="font-semibold text-slate-200">
            {currentUser.username}
          </span>
          <small className="font-semibold text-slate-500">
            {"@" + currentUser.username}
          </small>
        </div>
        <button className="text-slate-100">
          <CgOptions size={20} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
