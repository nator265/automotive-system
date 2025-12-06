"use client";
import Link from "next/link";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Buy a Car", href: "/buy" },
  { name: "Hire a Car", href: "/hire" },
  { name: "Contact Us", href: "/contact" },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/60 backdrop-blur-md border-b shadow-md">
      <div className="flex justify-between items-center h-15 px-6 w-full">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-200">
          Automotive System
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-9 justify-end">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="
                relative text-gray-200
                transition-all duration-300 ease-in-out
                hover:text-blue-600
                before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
                before:bg-blue-600 before:transition-all before:duration-300 hover:before:w-full
              "
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/dashboard"
            className="ml-6 px-4 py-2 bg-orange-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium text-lg hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-orange-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
