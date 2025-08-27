// src/app/02_admin/layout.tsx
"use client";

import { AdminProvider } from "./context";

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
