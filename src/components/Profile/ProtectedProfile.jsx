import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedProfile() {
  const { username } = useParams();
  const token = localStorage.getItem("token");

  const doesUserExist = async () => {
    const response = await fetch(
      `http://localhost:8080/user/exists?username=${username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      return true; // User exists
    }
    if (response.status === 400) {
      return false; // User does not exist
    }
    throw new Error("Error checking user existence");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["userExists"],
    queryFn: doesUserExist,
    retry: false,
  });

  if (isLoading) return "";

  return data ? <Outlet /> : <Navigate to="/home" />;
}

export default ProtectedProfile;
