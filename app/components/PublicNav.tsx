"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const PublicNav = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/buy" },
    { name: "Hire", path: "/hire" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white shadow-sm sticky top-0 z-30 h-16 items-center px-6 md:px-12">
        <div className="flex items-center gap-2 mr-auto">
          <DirectionsCarFilledIcon sx={{ fontSize: 28, color: "#1e40af" }} />
          <h1 className="text-xl font-bold text-gray-800">AutoMalawi</h1>
        </div>

        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-4"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <Link
          href="/dashboard"
          className="ml-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          Dashboard
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <DirectionsCarFilledIcon sx={{ fontSize: 24, color: "#1e40af" }} />
          <h1 className="text-lg font-bold text-gray-800">AutoMalawi</h1>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 pt-14 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={closeMobile} />
          <div className="relative w-64 bg-white h-[calc(100%-56px)] overflow-auto">
            <nav className="flex flex-col p-4 space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={closeMobile}
                    className={`px-4 py-3 rounded-lg font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <Link
                href="/dashboard"
                onClick={closeMobile}
                className="px-4 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition mt-6"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicNav;
