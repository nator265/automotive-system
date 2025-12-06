"use client";

import React, { createContext, useContext, useState } from "react";

interface SideNavContextType {
  isExpanded: boolean;
  toggleSideNav: () => void;
}

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export const SideNavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSideNav = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <SideNavContext.Provider value={{ isExpanded, toggleSideNav }}>
      {children}
    </SideNavContext.Provider>
  );
};

export const useSideNav = () => {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error("useSideNav must be used within a SideNavProvider");
  }
  return context;
};
