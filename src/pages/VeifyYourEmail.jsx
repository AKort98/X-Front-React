import React from "react";
import LogoX from "../components/LogoX";

function VeifyYourEmail() {
  return (
    <div className="flex flex-col items-center p-12">
      <LogoX size={12} />
      <h1 className="text-4xl font-bold text-gray-100">
        Verify your email address
      </h1>
      <p className="mt-4 text-sm text-gray-200 font-bold">
        A verification link has been sent to your email address. Please check
        your inbox and click the link to verify your account.
      </p>
    </div>
  );
}

export default VeifyYourEmail;
