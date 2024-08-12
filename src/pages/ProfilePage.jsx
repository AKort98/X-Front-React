import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileDetails from "../components/ProfileDetails";
import NavigationBar from "../components/NavigationBar";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import ProfileBackNav from "../components/ProfileBackNav";

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
    queryKey: [username],
  });

  if (isLoading)
    return (
      <div className="mt-20 flex justify-center">
        <ReactLoading type="spinningBubbles" color="#1D9BF0" width={30} />;
      </div>
    );

  return (
    <div className="flex h-auto min-w-[500px] flex-col border-l-[1px] border-r-[1px] border-gray-700">
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
