

import React from 'react'

import githubLogo from "../assets/github-mark-white.png";

import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepository, setsuggestedRepository] = useState([]);

  const [searchResult, setSearchResult] = useState([]);

  const [publicRepos, setPublicRepos] = useState([]);
  const [publicSearch, setPublicSearch] = useState("");

  const navigate = useNavigate();

  //  1st useEffect – Fetch data
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("userId in dashboard" , userId)
    const fetchRepositories = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/repo/user/${userId}`
        );
        console.log("here is repo" , res)
        setRepositories(res.data.repositories);

      } catch (error) {
        console.error(error);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const publicRes = await axios.get(`${BACKEND_URL}/repo/all`);
        // setsuggestedRepository(res.data.repositories);
        setPublicRepos(publicRes.data.repositories);
        console.log("here is seggested repo" , publicRes)
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  // 2nd useEffect – Search logic (SEPARATE)
  useEffect(() => {
    if (!searchQuery) {
      setSearchResult(repositories);
    } else {
      const filtered = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(filtered);
    }
  }, [searchQuery, repositories]);


  const filteredPublicRepos = publicRepos.filter((repo) =>
    repo.name.toLowerCase().includes(publicSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-white rounded-full" />
          <span className="font-semibold">Dashboard</span>
        </div>

        <div className="mb-4">
          <button className="w-full bg-green-600 hover:bg-green-500 text-sm py-2 rounded">
            New
          </button>
        </div>

        <input
          value={searchQuery}
          onChange={((e)=> setSearchQuery(e.target.value))}
          type="text"
          placeholder="Find a repository..."
          className="w-full bg-[#010409] border border-gray-800 rounded px-3 py-2 text-sm mb-4"
        />

        <ul className="space-y-3 text-sm text-gray-300">
          {searchResult.map((repo)=>{
            return(
              <div key={repo._id}>
                <li className="text-white hover:text-blue-500">{repo.name}</li>
                <li className="hover:text-white text-[0.8rem]">{repo.description}</li>
              </div>
            )
            
          })}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Home</h1>

          <input
             value={publicSearch}
            onChange={(e) => setPublicSearch(e.target.value)}
            type="text"
            placeholder="Type / to search"
            className="bg-[#010409] border border-gray-800 rounded px-4 py-2 text-sm w-64"
          />
        </div>

        {/* Ask Box */}
        <div className="bg-[#010409] border border-gray-800 rounded p-4 mb-6">
          <input
            type="text"
            placeholder="Ask anything"
            className="w-full bg-transparent outline-none text-gray-300"
          />

          <div className="flex gap-3 mt-4 text-sm">
            <button className="border border-gray-700 px-3 py-1 rounded">
              Task
            </button>
            <button className="border border-gray-700 px-3 py-1 rounded">
              Create issue
            </button>
            <button className="border border-gray-700 px-3 py-1 rounded">
              Write code
            </button>
            <button className="border border-gray-700 px-3 py-1 rounded">
              Pull requests
            </button>
          </div>
        </div>

        {/* Feed */}
          <section className="space-y-4">
          {filteredPublicRepos.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No repositories found
            </p>
          ) : (
            filteredPublicRepos.map((repo) => (
              <div
                key={repo._id}
                className="bg-[#010409] border border-gray-800 rounded-lg p-5"
              >
                <h3 className="text-blue-400 font-semibold">
                  {repo.name}
                </h3>

                <p className="text-gray-300 text-sm mt-1">
                  {repo.description || "No description"}
                </p>

                <div className="flex gap-6 mt-3 text-xs text-gray-400">
                  <span>📁 {repo.content?.length || 0} files</span>
                  <span>🐞 {repo.issues?.length || 0} issues</span>
                </div>
              </div>
            ))
          )}
        </section>
       
      </main>

      {/* Right Panel */}
      <aside className="w-80 border-l border-gray-800 p-4 hidden lg:block">
        <h3 className="font-semibold mb-4">Latest from our changelog</h3>

        <ul className="space-y-4 text-sm text-gray-400">
          <li>
            <span className="block text-gray-300">
              Reduced pricing for GitHub-hosted runners
            </span>
            <span className="text-xs">4 days ago</span>
          </li>
          <li>
            <span className="block text-gray-300">
              Improved performance for Actions workflows
            </span>
            <span className="text-xs">2 weeks ago</span>
          </li>
          <li>
            <span className="block text-gray-300">
              Require reviews before closing Dependabot
            </span>
            <span className="text-xs">2 weeks ago</span>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Dashboard;
  