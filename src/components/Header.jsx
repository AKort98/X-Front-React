import React from "react";
import { BsGearFill } from "react-icons/bs";
import LogoX from "../components/LogoX";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <header className="flex items-center justify-between p-4 sm:hidden sm:p-0">
      <img
        alt=""
        src={
          user.avatar ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        className="size-8 rounded-full sm:hidden"
      />
      <LogoX size={8} />
      <BsGearFill className="size-4 text-white sm:hidden" />
    </header>
  );
}

export default Header;
