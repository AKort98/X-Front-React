import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
const MainLayout = () => (
  <div className="flex h-dvh justify-between">
    {/* Sidebar */}
    <div className="left-0 z-20 h-dvh">
      <Sidebar />
    </div>

    {/* Main content */}
    <div className="w-full overflow-scroll md:w-[750px]">
      <Outlet />
    </div>

    {/* SearchBar */}
    <div className="hidden md:inline-block md:w-[300px]">
      <SearchBar />
    </div>
  </div>
);

export default MainLayout;
