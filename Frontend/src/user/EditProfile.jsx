import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    profession: "",
    city: "",
    country: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `${BACKEND_URL}/profile/${localStorage.getItem("userId")}`,
      formData,
    );
    navigate("/")
    console.log("Profile updated:", res.data);
  };

  return (
    <div
      className="
        min-h-screen 
        bg-[#0b0f14] 
        text-gray-200 
        flex 
        items-start 
        lg:items-center 
        justify-center 
        px-4 
        py-6
      "
    >
      <div
        className="
          w-full 
          max-w-6xl 
          p-4 
          sm:p-6 
          lg:p-10 
          grid 
          grid-cols-1 
          lg:grid-cols-2 
          gap-10
        "
      >
        {/* LEFT SIDE – HERO / VISUAL */}
        <div
          className="
            hidden 
            lg:flex 
            flex-col 
            justify-around 
            rounded-2xl 
            bg-gradient-to-br 
            from-[#0d1117] 
            to-[#02040a] 
            p-10 
            border 
            border-gray-800 
            relative 
            overflow-hidden
          "
        >
          {/* Glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />

          {/* Content */}
          <div className="relative z-10">
            <span className="text-sm text-gray-400">Edit your identity</span>

            <h1 className="text-4xl font-semibold mt-3 leading-tight">
              Shape how the <br /> world sees you
            </h1>

            <p className="text-gray-400 mt-4 max-w-md">
              Your public profile appears across GitMe. Keep it clean,
              professional, and up to date.
            </p>
          </div>

          {/* Stats */}
          <div className="relative z-10 grid gap-4 mt-10">
            <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-semibold">120+</p>
              <p className="text-xs text-gray-400">Commits</p>
            </div>
            <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-semibold">18</p>
              <p className="text-xs text-gray-400">Repositories</p>
            </div>
            <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-semibold">5</p>
              <p className="text-xs text-gray-400">Followers</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – FORM CARD */}
        <div
          className="
            bg-[#161b22] 
            border 
            border-gray-800 
            rounded-2xl 
            shadow-xl 
            w-full
          "
        >
          {/* Header */}
          <div className="border-b border-gray-800 px-6 py-5">
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <p className="text-sm text-gray-400">
              Update your personal information
            </p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-5">
            {/* Username */}
            <div>
              <label className="text-sm mb-1 block">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm mb-1 block">Bio</label>
              <textarea
                rows="3"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Profession</label>
                <input
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm mb-1 block">City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="text-sm mb-1 block">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm mb-1 block">
                New password <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-6 py-2 rounded-lg"
              >
                Save changes
              </button>
              <button
                type="button"
                className="w-full sm:w-auto text-sm text-gray-400 hover:text-red-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
