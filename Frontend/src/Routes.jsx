// import { useEffect } from "react";
// import { useAuth } from "./AuthContext"
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useRoutes } from "react-router-dom";

// import Dashboard from "./dashboard/Dashboard";
// import Profile from "./user/Profile";
// import Login from "./auth/Login";
// import Signup from "./auth/Signup";

// const ProjectRoutes = () => {
//   const { currentUser, setCurrentUser } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userIdFromStorage = localStorage.getItem("userId");
//     if (userIdFromStorage && !currentUser) {
//       setCurrentUser(userIdFromStorage);
//     }
//     if (!userIdFromStorage && !["/auth", "signup"]) {
//       navigate("/auth");
//     }
//     if (userIdFromStorage && window.location.pathname == "/auth") {
//       navigate("/");
//     }
//   }, [currentUser, setCurrentUser, navigate]);

//   let elements = useRoutes([
//     {
//       path: "/",
//       element: <Dashboard />,
//     },
//     {
//       path: "/auth",
//       element: <Login />,
//     },
//     {
//       path: "/signup",
//       element: <Signup />,
//     },
//     {
//       path: "/profle",
//       element: <Profile />,
//     },
//   ]);

//   return elements;
// };

// export default ProjectRoutes;

import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRoutes, Navigate } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import Profile from "./user/Profile";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();

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

  return routes;
};

export default ProjectRoutes;
