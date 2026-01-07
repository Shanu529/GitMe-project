

import React, { use, useEffect, useState } from "react";
import ContributionCount from "../user/ContributionCount.jsx";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Profile() {

  const [userData, setUserData] = useState([]);
  const [repoData, setRepoData] = useState([]);
  useEffect(()=>{
    const userId = localStorage.getItem("userId");
     try {
      const getUserProfile = async () =>{
        const res = await axios.get(`${BACKEND_URL}/profile/${userId}`);
        setUserData(res.data.getOneUser);
        console.log("here is response", res);
        
      }
      getUserProfile();
     } catch (error) {
      console.log("something went wrong", error);
    }

  },[])

  // fatched user Repositories
  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    try {
      const getCurrentUserRepo = async () =>{
        const res = await axios.get(`${BACKEND_URL}/repo/user/${userId}`)
        setRepoData(res.data.repositories);
        console.log("here is user repo" , res)
      }
      getCurrentUserRepo();
    } catch (error) {
      console.log("something went wrong", error);

    }
  },[])
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

        {/*  LEFT PROFILE COLUMN */}
        <aside className="w-72">
          {/* Avatar */}
          <img
            src="https://thepicturesdp.in/wp-content/uploads/2025/08/anime-boy-face-dp.jpg"
            alt="profile"
            className="rounded-full w-64 h-64 border border-gray-800"
          />

          {/* Name */}
          <h1 className="text-2xl font-semibold mt-4">
            {userData.username}
          </h1>
          <p className="text-gray-400 text-lg">
            {userData.profession || "GitMe User"}
          </p>

          {/* Follow Button */}
          <button className="w-full mt-4 bg-[#21262d] hover:bg-[#30363d] border border-gray-700 rounded py-1.5 text-sm">
            Follow
          </button>

          {/* Bio */}
          <p className="text-sm text-gray-300 mt-4 leading-relaxed">
            {userData.bio || "This user has not added a bio yet."}
          </p>

          {/* Stats */}
          <div className="flex gap-4 mt-4 text-sm text-gray-400">
            <span>
              <strong className="text-white">{userData.
              followedUsers?.length}</strong> followers
            </span>
            <span>
              <strong className="text-white">4</strong> following
            </span>
          </div>

          <div className="mt-4 text-sm text-gray-400 space-y-2">
            <p> {userData.email}</p>
            <p> {userData.city || "Earth"} {userData.country}</p>
          </div>
        </aside>
        <main className="flex-1">

          {/* Popular repositories */}
          <h2 className="text-xl font-semibold mb-4">
            Popular repositories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
           { repoData.map((repo, idx) => (
              <div
                key={idx}
                className="border border-gray-800 rounded-lg p-4 bg-[#010409]"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-blue-400 font-semibold hover:underline cursor-pointer">
                    {repo.name}
                  </h3>
                  <span className="text-xs border border-gray-700 rounded-full px-2 py-0.5">
                    {repo.visibility? "Public": "Private"}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mt-2">
                  {repo.description}
                </p>

                <div className="flex gap-4 mt-4 text-xs text-gray-400">
                  <span>🟡 {repo.lang}</span>
                  <span>⭐ {repo.stars}</span>
                  <span>🍴 {repo.forks}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Contribution Graph */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              137 contributions in the last year
            </h2>

            <ContributionCount />
          </div>

          {/* Contribution Activity */}
          <h2 className="text-xl font-semibold mt-8">
            Contribution activity
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            No recent contribution activity
          </p>
        </main>
      </div>
    </div>
  );
}

export default Profile;
