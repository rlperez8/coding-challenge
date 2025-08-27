"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface AdminContextType {
  buttonClicked: string;
  setButtonClicked: (val: string) => void;
  pathname: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [buttonClicked, setButtonClicked] = useState("Conference");
  const pathname = usePathname(); // get current path

  return (
    <AdminContext.Provider value={{ buttonClicked, setButtonClicked, pathname }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used inside AdminProvider");
  return context;
};
