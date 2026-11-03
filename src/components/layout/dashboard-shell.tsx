"use client";
import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
export function DashboardShell({ children }: { children: ReactNode }) {
 const [collapsed, setCollapsed] = useState(false); const [mobileOpen, setMobileOpen] = useState(false);
 return <div className="min-h-screen md:flex"><Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} /><div className="min-h-screen min-w-0 flex-1"><Topbar collapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)} onOpenMobile={() => setMobileOpen(true)} /><main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9">{children}</main></div></div>;
}
