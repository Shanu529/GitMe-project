// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function PushFile() {
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//   const { repoId } = useParams();
//   const navigate = useNavigate();

//   // Logged-in user (example: stored after login)
//   const currentUser = JSON.parse(localStorage.getItem("user"));

//   const [files, setFiles] = useState([]);
//   const [commitMessage, setCommitMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // handle file selection
//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   // submit push
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!files.length) {
//       alert("Please select at least one file");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       // 🔥 AUTO-GENERATED COMMIT ID (SYSTEM)
//       const commitId = `commit_${Date.now()}`;

//       formData.append("repoId", repoId);
//       formData.append("userId", currentUser.id);
//       formData.append("commitId", commitId);

//       for (let file of files) {
//         formData.append("files", file);
//       }

//       await axios.post(`${BACKEND_URL}/repo/push`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       alert("Files pushed successfully 🚀");

//       navigate(`/repo/${repoId}`);
//     } catch (error) {
//       console.error(error);
//       alert("Push failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] px-6 py-6">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <h1 className="text-xl font-semibold mb-4">Upload files</h1>

//         {/* Upload box */}
//         <form
//           onSubmit={handleSubmit}
//           className="border border-[#30363d] rounded-md p-6 bg-[#161b22]"
//         >
//           {/* File input */}
//           <div className="mb-4">
//             <label className="block mb-2 text-sm">Choose files</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               className="block w-full text-sm text-[#c9d1d9]"
//             />
//           </div>

//           {/* Commit message */}
//           <div className="mb-4">
//             <label className="block mb-2 text-sm">Commit message</label>
//             <input
//               type="text"
//               placeholder="Add files via GitMe"
//               value={commitMessage}
//               onChange={(e) => setCommitMessage(e.target.value)}
//               className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-[#c9d1d9]"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 border border-[#30363d] rounded-md hover:bg-[#21262d]"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md"
//             >
//               {loading ? "Pushing..." : "Commit changes"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PushFile;
import React, { useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function PushFile() {
  const [files, setFiles] = useState([]);

  const { repoId } = useParams();
  const navigate = useNavigate();
  // const userId = JSON.parse(localStorage.getItem("user")).id;
  const userId = localStorage.getItem("userId")
  console.log("user id ", userId);
  

  // handle file select
  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  // drag events
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();

  // remove file
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formHandlerSubmit = async () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const formData = new FormData();

      // backend requires data commitId, userId, repoId with files
      formData.append("repoId", repoId);
      formData.append("userId", userId);
      formData.append("commitId", `commit_${Date.now()}`);

      // appen fils

      for (let file of files) {
        formData.append("files", file);
      }

      // backend call

      const res = await axios.post(`${BACKEND_URL}/repo/push`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // alert("Push successful ");
      // navigate(`/repo/${repoId}`);
      // navigate profile page
      navigate("/");
    } catch (error) {
      console.log("sometiing went wrong in push file controller", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-xl">
        {/* Header */}
        <h2 className="text-lg font-semibold text-[#c9d1d9] text-center mb-1">
          Upload files
        </h2>
        <p className="text-sm text-[#8b949e] text-center mb-4">
          Upload documents you want to push
        </p>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-[#30363d] rounded-lg p-6 text-center hover:border-[#58a6ff] transition"
        >
          <UploadCloud className="mx-auto mb-2 text-[#8b949e]" size={32} />
          <p className="text-sm text-[#c9d1d9]">Drag & drop your files here</p>
          <p className="text-xs text-[#8b949e] my-2">or</p>

          <label className="inline-block cursor-pointer bg-[#238636] hover:bg-[#2ea043] text-white text-sm px-4 py-1.5 rounded-md">
            Browse files
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <FileText className="text-[#58a6ff]" size={18} />
                  <div>
                    <p className="text-sm text-[#c9d1d9]">{file.name}</p>
                    <p className="text-xs text-[#8b949e]">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFile(index)}
                  className="text-[#8b949e] hover:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <button
        onClick={formHandlerSubmit}
          disabled={!files.length}
          className={`mt-5 w-full py-2 rounded-md text-sm font-medium 
            ${
              files.length
                ? "bg-[#238636] hover:bg-[#2ea043] text-white"
                : "bg-[#21262d] text-[#8b949e] cursor-not-allowed"
            }`}
        >
          Commit changes
        </button>
      </div>
    </div>
  );
}

export default PushFile;
