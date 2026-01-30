import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRoutes, Navigate } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import Profile from "./user/Profile";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
// import CreateRepo from "./userForms/createRepo";
import CreateRepo from "./userForms/CreateRepo";
import EditProfile from "./user/EditProfile";
import RepoHome from "./repo/RepoHome";
import RepoFileData from "./repo/RepoFileData";

const ProjectRoutes = () => {
  const { currentUser,loading } = useAuth();

  const routes = useRoutes([
    {
      path: "/",
      element: currentUser ? <Dashboard /> : <Navigate to="/auth" />,
    },
    {
      path: "/profile/:userId",
      element: currentUser ? <Profile /> : <Navigate to="/auth" />,
    },
    {
      path: "/auth",
      element: currentUser ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: currentUser ? <Navigate to="/" /> : <Signup />,
    },
    {
      path: "/createRepo",
      element: currentUser ? <CreateRepo /> : <Navigate to="/auth" />
    },
    {
      path:"/editprofile", element: currentUser ? < EditProfile/>: <Navigate to="/auth" />
    },
    {
      path:"/repo/:repoId", element: currentUser ? < RepoHome/>: <Navigate to="/auth" />
    },
    
    {
      path:"/repo/:repoId/file/:commitId/:fileName", element: currentUser ? < RepoFileData/>: <Navigate to="/auth" />
    }
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return routes;
};

export default ProjectRoutes;
