"use client";

import React, { createContext, useState, useContext } from "react";

// 1. Create Context
const LoadingContext = createContext();

// 2. Create Provider
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// 3. Custom Hook for easy use
export const useLoading = () => {
  return useContext(LoadingContext);
};
