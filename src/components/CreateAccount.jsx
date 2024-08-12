import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState();
  const navigate = useNavigate();

  const formData = {
    username,
    email,
    password,
    displayname,
    avatar: "www.pic.com",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status == 200) {
        setLoading(false);
        setError(false);
        navigate("/verify-email");
      }
      if (response.status == 409) {
        setLoading(false);
        setError("Email or username already exist");
      }
      if (response.status == 400) {
        setLoading(false);
        setPasswordError(
          "Password must include at leat one capital letter and one number"
        );
      }
      if (response.status == 500) {
        setError("Internal Server Error");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong, please try again later");
    }
  };

  return (
    <form
      className="flex justify-center align-middle items-center h-lvh w-full"
      onSubmit={handleSubmit}
    >
      <div className="size-[520px] rounded-lg border-gray-500 border flex flex-col gap-4 p-10 overflow-y-auto">
        <h1 className="text-gray-200 text-4xl font-semibold">Create Account</h1>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            className="w-full p-4 bg-transparent border border-gray-800 focus:border-blue-600 transition-colors outline-none text-white"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            value={username}
          />
          <input
            type="text"
            className="w-full p-4 bg-transparent border border-gray-800 focus:border-blue-600 transition-colors outline-none text-white"
            placeholder="Display Name"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            id="displayname"
            value={displayname}
          />
          <input
            type="email"
            className="w-full p-4 bg-transparent border border-gray-800 focus:border-blue-600 transition-colors outline-none  text-white"
            placeholder="Email"
            required
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            className="w-full p-4 bg-transparent border border-gray-800 focus:border-blue-600 transition-colors outline-none  text-white"
            placeholder="Password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError ? (
            <span className="text-red-400">{passwordError}</span>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-200 mt-5 text-1xl font-semibold">
            Date of Birth
          </h2>
          <p className="text-gray-600 text leading-4">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </p>
          <div>
            <input
              type="date"
              className="bg-transparent w-full text-white outline-none border border-gray-800 p-4 "
              required
              name="date"
              id="date"
            />
          </div>
        </div>
        <button
          className="w-full bg-white text-black p-3 rounded-2xl font-semibold text-xl disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        {error && <span className="text-red-600">{error}</span>}
      </div>
    </form>
  );
}

export default CreateAccount;
