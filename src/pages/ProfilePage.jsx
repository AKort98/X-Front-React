import React from "react";

import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import ProfileBackNav from "../components/Profile/ProfileBackNav";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileDetails from "../components/Profile/ProfileDetails";
import NavigationBar from "../components/Profile/NavigationBar";

function ProfilePage() {
  const token = localStorage.getItem("token");
  const { username } = useParams();
  const fetchUserDetails = async () => {
    const response = await fetch(
      `http://localhost:8080/user/userDetails?username=${username}`,
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

  const { data, isLoading } = useQuery({
    queryFn: fetchUserDetails,
    queryKey: ["username", username],
  });

  if (isLoading)
    return (
      <div className="mt-20 flex justify-center">
        <ReactLoading type="spinningBubbles" color="#1D9BF0" width={30} />
      </div>
    );

  console.log(data);

  return (
    <div className="flex h-auto flex-col md:border-l-[1px] md:border-r-[1px] md:border-gray-700">
      <ProfileBackNav data={data} />
      <div className="md:mt-[78px]">
        <ProfileHeader data={data} />
        <ProfileDetails data={data} />
        <NavigationBar />
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
