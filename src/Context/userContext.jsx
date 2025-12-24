import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  // Initialize user data from localStorage if available
  const [formData, setFormData] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Whenever formData changes, save it in localStorage
  useEffect(() => {
    if (formData) {
      localStorage.setItem("user", JSON.stringify(formData));
    } else {
      localStorage.removeItem("user");
    }
  }, [formData]);

  // Logout function
  const logout = () => {
    setFormData(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ formData, setFormData, logout }}>
      {children}
    </UserContext.Provider>
  );
};
