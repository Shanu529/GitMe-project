import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRoutes, Navigate } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import Profile from "./user/Profile";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import CreateRepo from "./userForms/createRepo";

const ProjectRoutes = () => {
  const { currentUser,loading } = useAuth();
if (loading) {
    return <div>Loading...</div>;
  }

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
  ]);
  return routes;
};

export default ProjectRoutes;
