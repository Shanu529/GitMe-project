
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RepoFileData() {
  // backend: /repo/:repoId/file/:fileName
  // frontend: /repo/:repoId/file/:fileName

  const { repoId, fileName, commitId } = useParams();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileContent = async () => {
        // /repo/69707351872ed7d45b240c34/file/onefile123/one.css
      try {
        const res = await axios(
          `${BACKEND_URL}/repo/${repoId}/file/${commitId}/${fileName}`,
        );
        console.log("here is response from file reading endpoint", res);
        
        setContent(res.data.content);
      } catch (error) {
        console.error("Failed to load file content", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileContent();
  }, [repoId, commitId, fileName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex items-center justify-center">
        Loading file...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] px-6 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-[#8b949e] mb-4">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate(-1)}
          >
            ← Back
          </span>
          <span className="mx-2">/</span>
          <span className="text-[#58a6ff]">{fileName}</span>
        </div>

        {/* File container */}
        <div className="border border-[#30363d] rounded-md overflow-hidden">
          {/* File header */}
          <div className="flex items-center justify-between bg-[#161b22] px-4 py-2 border-b border-[#30363d]">
            <div className="font-medium text-sm">📄 {fileName}</div>

            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-[#30363d] rounded-md hover:bg-[#21262d]">
                Raw
              </button>
              <button className="px-3 py-1 text-sm border border-[#30363d] rounded-md hover:bg-[#21262d]">
                Download
              </button>
            </div>
          </div>

          {/* Code viewer */}
          <pre className="bg-[#0d1117] text-sm p-4 overflow-x-auto leading-6 font-mono">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default RepoFileData;
