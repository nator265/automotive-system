"use client";

import React from "react";
import { SideNavProvider, useSideNav } from "@/app/context/SideNavContext";
import SideNav from "@/app/components/SideNav";

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const { isExpanded } = useSideNav();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />

      <main
        className={`w-full transition-all duration-300 pt-16 md:pt-5 p-4 md:p-6 ${
          isExpanded ? "md:ml-72" : "md:ml-32"
        }`}
      >
        {children}
      </main>
      {/* Floating Messages Button */}
      <a
        href="/dashboard/messages"
        className="fixed right-5 bottom-6 z-50 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-2xl transition flex items-center gap-2"
        title="Messages"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.84L3 20l1.05-2.63A7.988 7.988 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="hidden md:inline-block font-medium">Messages</span>
      </a>
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideNavProvider>
      <DashboardShell>{children}</DashboardShell>
    </SideNavProvider>
  );
}
