import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Apple from "../components/Apple";
import LogoX from "../components/LogoX";
import userAuthStore from "../zustand/authStore";
import Google from "../components/Google";
function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = userAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fetchUser = async (token) => {
    const response = await fetch("http://localhost:8080/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status == 403) {
        const data = await response.json();
        setError(data.message);
        setLoading(false);
        return;
      }
      if (response.status == 200) {
        const data = await response.json();
        const token = data.jwttoken;
        setToken(token);

        const user = await fetchUser(token);
        setUser(user);
        navigate("/home");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-lvh w-full justify-center align-middle sm:items-center">
      <div className="flex flex-col gap-4 p-10 sm:size-[520px] sm:rounded-lg sm:border sm:border-gray-500 sm:px-24 sm:py-10">
        <h1 className="flex items-center gap-2 text-4xl font-semibold text-gray-200">
          <span>Sign in to</span>
          <span className="size-8">
            <LogoX />
          </span>
        </h1>
        <div className="flex flex-col gap-4">
          <Google />
          <Apple />
        </div>
        <div className="flex w-full items-center gap-2 text-white">
          <hr className="flex-1" />
          <div>or</div>
          <hr className="flex-1" />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <input
              type="text"
              className="w-full border border-gray-800 bg-transparent p-4 text-white outline-none transition-colors focus:border-blue-600"
              placeholder="Username"
              required
              id="username"
              onChange={handleChange}
              value={formData.username}
            />
            <input
              type="password"
              className="w-full border border-gray-800 bg-transparent p-4 text-white outline-none transition-colors focus:border-blue-600"
              placeholder="Password"
              required
              id="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button
            className="w-full rounded-2xl bg-white p-3 text-xl font-semibold text-black disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "signing you in" : "Login"}
          </button>
          {error && (
            <span className="text-center font-semibold text-[#d80000d0]">
              {error}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signin;
