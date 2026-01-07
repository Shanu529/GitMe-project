import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRoutes, Navigate } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import Profile from "./user/Profile";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser, loading } = useAuth();

  //  ALWAYS call hooks
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }
  }, [currentUser, setCurrentUser]);

  const routes = useRoutes([
    {
      path: "/",
      element: currentUser ? <Dashboard /> : <Navigate to="/auth" />,
    },
    {
      path: "/profile",
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
  ]);

  // handle loading AFTER hooks
  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return routes;
};

export default ProjectRoutes;
