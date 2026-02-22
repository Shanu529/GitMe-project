import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";


function RepoHome() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { repoId } = useParams();
  const navigate = useNavigate();

  const [repo, setRepo] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  
const { currentUser } = useAuth();

  useEffect(() => {
    const loadRepo = async () => {
      try {
        // load repo
        const repoRes = await axios.get(`${BACKEND_URL}/repo/${repoId}`);

        const repoData = repoRes.data.repository[0];
        console.log("here is repo details ", repoData);
        
        setRepo(repoData);
        console.log("here is repoData commit Id", repoData);

        // Only fetch files if currentCommitId exists
        if (repoData.currentCommitId) {
          console.log("calling backend to read file...");
          
          const filesRes = await axios.get(
            `${BACKEND_URL}/repo/${repoId}/commit/${repoData.currentCommitId}/files`,
          );
          console.log("files api caled");
          
          console.log("files Res:", filesRes);
          setFiles(filesRes.data.files || []);
        } else {
          // No commits yet - repository is empty
          setFiles([]);
        }
      } catch (error) {
        console.error("Repo load failed", error);
      } finally {
        setLoading(false);
      }
    };

    loadRepo();
  }, [repoId, BACKEND_URL]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] px-6 py-6">
      <div className="max-w-5xl mx-auto">
      
        <div className="flex justify-end mb-4">
  {repo.owner?._id === currentUser && (
    <button
      onClick={() => navigate(`/repo/${repoId}/push`)}
      className="bg-blue-500 text-white py-2 px-5 rounded-lg text-sm cursor-pointer"
    >
      Push File
    </button>
  )}
</div>

      
        <div className="border border-[#30363d] rounded-md">
          <table className="w-full">
            <tbody>
              {files.map((file) => (
                <tr
                  key={file}
                  className="border-t border-[#21262d] hover:bg-[#161b22]"
                >
                  <td
                    onClick={() =>
                      navigate(
                        `/repo/${repoId}/file/${repo.currentCommitId}/${file}`,
                      )
                    }
                    className="cursor-pointer px-4 py-3 hover:text-blue-400"
                  >
                    📄 {file}
                  </td>
                  <td className="px-4 py-3 text-[#8b949e]">latest commit</td>
                  <td className="px-4 py-3 text-right text-[#8b949e]">
                    just now
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RepoHome;
