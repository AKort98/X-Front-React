import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Apple from "../components/Apple";
import LogoX from "../components/LogoX";
import userAuthStore from "../zustand/authStore";
import Google from "../components/Google";

export default function Home() {
  return (
    <main className="flex flex-col p-10 sm:mx-auto sm:mt-10 sm:flex sm:flex-row sm:items-center sm:justify-evenly sm:gap-28">
      <div className="flex size-12 flex-1 items-center justify-center align-middle sm:size-80">
        <LogoX />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <p className="mt-5 text-5xl font-extrabold text-gray-100 sm:text-7xl">
          Happening Now
        </p>
        <p className="mt-5 text-3xl font-extrabold text-gray-100">
          Join today.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:w-1/2">
          <Apple />
          <Google />
          <div className="flex w-full items-center gap-2 text-white">
            <hr className="flex-1" />
            <div>or</div>
            <hr className="flex-1" />
          </div>
          <div className="flex flex-col gap-1">
            <Link to="/sign-up">
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1D9BF0] p-2 font-semibold text-white hover:opacity-90">
                Create Account
              </button>
            </Link>

            <small className="text-[11px] text-slate-500">
              By signing up, you agree to the{" "}
              <span className="text-[#1D9BF0]">Terms of Service </span>
              <span className="text-[#1D9BF0]">Privacy Policy, </span>
              including
              <span className="text-[#1D9BF0]"> Cookie Use.</span>
            </small>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <div className="text-xl font-bold text-white">
            Already Have an Account?
          </div>
          <Link to="/sign-in">
            <button className="w-full rounded-2xl border border-gray-500 p-2 text-[#1D9BF0] hover:bg-[#1d9cf028] sm:w-1/2">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
