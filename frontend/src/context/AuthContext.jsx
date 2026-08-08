import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User ko first render me hi localStorage se load karo
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Token ko bhi first render me hi load karo
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  // Loading ki zarurat nahi hai kyunki data sync me mil raha hai
  const [loading] = useState(false);

  // Login
  const login = (userData, token) => {
    setUser(userData);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken("");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
