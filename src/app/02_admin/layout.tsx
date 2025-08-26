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
      <div className="admin_layout">

        <Create_Edit />

        <div className="admin_page_content">{children}</div>

        <Link className={'create_button_con'} href="/02_admin/conference_create">

        <div className="create_button_con" >Create</div>
        </Link>
        
      </div>
    </AdminProvider>
  );
}
