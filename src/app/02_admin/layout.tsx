// src/app/02_admin/layout.tsx
"use client";

import Create_Edit from "./components/Conference_Speaker_Option";
import { AdminProvider } from "./context";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  
  return (
    <AdminProvider>
      <div className="conf_page_con">
        {children}
      </div>
    </AdminProvider>
  );
}
