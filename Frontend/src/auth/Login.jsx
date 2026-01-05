import React from "react";
import githubLogo from "../assets/github-mark-white.png";

import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const navigate = useNavigate();
  const formHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // username, email, password
      // http://localhost:3000/login
      const res = await axios.post(`${BACKEND_URL}/login`, {
        email: email,
        password: password,
      });

      const token = res.data.token;
      // const userId = res.data.userId;
      const userId = res.data.user.id;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setCurrentUser(res.data.userId);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("here is error ", error);
      alert("Login failed! try again");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-gray-200">
      {/* GitHub Logo */}
      <div className="mb-6">
        <img src={githubLogo} alt="GitHub Logo" className="w-12 h-12" />
      </div>

      {/* Signup Card */}
      <div className="bg-[#161b22] w-85 p-6 rounded-md shadow-lg">
        <h1 className="text-center text-xl font-light mb-4">
          Create your account
        </h1>

        <form onSubmit={formHandle} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>
      </div>

      {/* Login Redirect */}
      <div className="mt-4 w-85 border border-gray-700 rounded-md p-4 text-center text-sm">
        Already have an account?
        <button
          onClick={() => navigate("/signup")}
          className="text-blue-500 hover:underline ml-1"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
