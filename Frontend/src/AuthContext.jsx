// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// const navigate = useNavigate();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     if (userId) {
//       setCurrentUser(userId);
//     }
//     setLoading(false); // auth ready
//   }, []);

//     const logout = () => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       setCurrentUser(null);
//     };

//   return (
//     <AuthContext.Provider
//       value={{ logout, currentUser, setCurrentUser, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUser(userId);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ setCurrentUser, currentUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

