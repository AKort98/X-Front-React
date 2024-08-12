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
    avatar:
      "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg",
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
          "Password must include at leat one capital letter and one number",
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
      className="flex h-lvh w-full items-center justify-center align-middle"
      onSubmit={handleSubmit}
    >
      <div className="flex size-[520px] flex-col gap-4 overflow-y-auto rounded-lg border border-gray-500 p-10">
        <h1 className="text-4xl font-semibold text-gray-200">Create Account</h1>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            className="w-full border border-gray-800 bg-transparent p-4 text-white outline-none transition-colors focus:border-blue-600"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            value={username}
          />
          <input
            type="text"
            className="w-full border border-gray-800 bg-transparent p-4 text-white outline-none transition-colors focus:border-blue-600"
            placeholder="Display Name"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            id="displayname"
            value={displayname}
          />
          <input
            type="email"
            className="w-full border border-gray-800 bg-transparent p-4 text-white outline-none transition-colors focus:border-blue-600"
            placeholder="Email"
            required
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            className="w-full border border-gray-800 bg-transparent p-4 text-white outline-none transition-colors focus:border-blue-600"
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
          <h2 className="text-1xl mt-5 font-semibold text-gray-200">
            Date of Birth
          </h2>
          <p className="text leading-4 text-gray-600">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </p>
          <div>
            <input
              type="date"
              className="w-full border border-gray-800 bg-transparent p-4 text-white outline-none"
              required
              name="date"
              id="date"
            />
          </div>
        </div>
        <button
          className="w-full rounded-2xl bg-white p-3 text-xl font-semibold text-black disabled:opacity-60"
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
