

import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CreateRepo() {
  // Logged-in user (owner)
  const userId = localStorage.getItem("userId");

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("README");
  const [visibility, setVisibility] = useState("public");

  const navigate = useNavigate()

  // Submit handler
  const CreateRepoHandller = async (e) => {
    e.preventDefault();
    console.log("here is backend",BACKEND_URL );
    

    try {
      const response = await axios.post(`${BACKEND_URL}/repo/create`, {
        name,
        owner: userId,
        content,
        description,
        visibility,
        
      });

      console.log("Repository created successfully:", response);
      if (response.status === 200) {
        navigate("/");
      }

    } catch (error) {
      console.error(
        "Error creating repository:",
        error.response?.data || error
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex justify-center px-4 py-10">
      <form
        onSubmit={CreateRepoHandller}
        className="w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-lg p-6"
      >
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">
          Create a new repository
        </h1>

        {/* Repository Name */}
        <div className="mb-5">
          <label className="block text-sm mb-1 text-gray-300">
            Repository name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="my-awesome-project"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm mb-1 text-gray-300">
            Description (optional)
          </label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of your repository"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 resize-none"
          />
        </div>

        {/* Initial Content */}
        <div className="mb-5">
          <label className="block text-sm mb-1 text-gray-300">
            Initial content
          </label>
          <select
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2"
          >
            <option value="README">Add README.md</option>
            <option value="EMPTY">Empty repository</option>
            <option value="GITIGNORE">Add .gitignore</option>
          </select>
        </div>

        {/* Visibility (Radio Buttons) */}
        <div className="mb-6">
          <p className="block text-sm mb-2 text-gray-300">Visibility</p>

          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === "public"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <span>Public</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={visibility === "private"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            <span>Private</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
        >
          Create repository
        </button>
      </form>
    </div>
  );
}

export default CreateRepo;
