// src/app/02_admin/AdminContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  buttonClicked: string;
  setButtonClicked: (val: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [buttonClicked, setButtonClicked] = useState("Conference");
  return (
    <AdminContext.Provider value={{ buttonClicked, setButtonClicked }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used inside AdminProvider");
  return context;
};