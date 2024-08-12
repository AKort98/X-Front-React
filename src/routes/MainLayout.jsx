import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
const MainLayout = () => (
  <div className="flex h-dvh md:justify-between md:gap-24">
    {/* Sidebar */}
    <div className="left-0 h-full flex-shrink-0">
      <Sidebar />
    </div>

    {/* Main content */}
    <div className="w-full flex-shrink-0 overflow-scroll md:w-[750px]">
      <Outlet />
    </div>

    {/* SearchBar */}
    <div className="hidden flex-shrink-0 md:inline-block">
      <SearchBar />
    </div>
  </div>
);

export default MainLayout;
