"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import { useSideNav } from "@/app/context/SideNavContext";
import { useRouter } from "next/navigation";
import { PostAddSharp } from "@mui/icons-material";
import path from "path";

const SideNav = () => {
  const pathname = usePathname();
  const { isExpanded, toggleSideNav } = useSideNav();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    setMobileOpen(false);
    router.push("/");
  };

  const navItems = [
    { name: "General", icon: <DashboardIcon />, path: "/dashboard" },
    { name: "Reports", icon: <BarChartIcon />, path: "/dashboard/reports" },
    { name: "Clients", icon: <PeopleIcon />, path: "/dashboard/clients" },
    {
      name: "Manage Fleet",
      icon: <DirectionsCarIcon />,
      path: "/dashboard/manage-fleet",
    },
    { name: "Hires", icon: <DirectionsCarFilledIcon />, path: "/dashboard/hires" },
    {name:"Blog Posts", icon: <PostAddSharp/>, path: "/dashboard/blog"},
    { name: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
  ];

  return (
    <>
      {/* Mobile topbar (fixed) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <button onClick={openMobile} className="p-2 rounded-md">
            <MenuIcon />
          </button>
          <div className="text-lg font-semibold">AutoMalawi</div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/dashboard/settings"
            aria-label="Account settings"
            className="inline-block"
          >
            <AvatarPlaceholder />
          </a>
        </div>
      </div>

      {/* Desktop / large screen sidebar (fixed left) */}
      <div
        className={`hidden md:fixed md:inset-y-0 md:left-0 z-30 md:flex flex-col justify-between bg-linear-to-b from-amber-50 to-stone-50 text-gray-800 transition-all duration-300 ease-in-out ${
          isExpanded ? "p-6 w-64" : "p-4 w-24 items-center"
        }`}
      >
        {/* Header with Toggle */}
        <div className="items-center justify-between mb-10">
          <div className="mb-">
            {isExpanded && (
              <div className="flex items-center gap-2">
                <div>
                  <h1 className="text-2xl font-bold tracking-wide text-gray-800">
                    AutoMalawi
                  </h1>
                </div>
              </div>
            )}
            <div className="text-center">
              {!isExpanded && (
                <DirectionsCarFilledIcon sx={{ fontSize: 28, color: "#1e40af" }} />
              )}
            </div>
          </div>

          <div className="">
            <button
              onClick={toggleSideNav}
              className="p-2 hover:bg-amber-100 rounded-lg transition text-gray-600"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav
          className={`space-y-3 flex-1 ${
            isExpanded ? "w-full" : "w-full flex flex-col items-center"
          }`}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} passHref>
                <span
                  className={`flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-amber-100"
                  } ${isExpanded ? "w-full" : "w-12 h-12 p-0"}`}
                  title={!isExpanded ? item.name : undefined}
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  {isExpanded && (
                    <span className="font-medium text-sm">{item.name}</span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="pt-6 border-t border-gray-200 w-full">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-lg hover:shadow-lg transition font-medium text-sm ${
              isExpanded ? "w-full" : "w-12 h-12 p-0"
            }`}
            title={!isExpanded ? "Logout" : undefined}
          >
            <LogoutIcon fontSize="small" />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile overlay drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 pt-14 flex">
          <div className="absolute inset-0 bg-black/40" onClick={closeMobile} />
          <div className="relative w-72 bg-white h-[calc(100%-56px)] p-4 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <DirectionsCarFilledIcon
                  sx={{ fontSize: 28, color: "#1e40af" }}
                />
                <div>
                  <h2 className="text-xl font-bold">AutoMalawi</h2>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
              <button onClick={closeMobile} className="p-2 rounded-md">
                <CloseIcon />
              </button>
            </div>

            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                >
                  <div
                    className={`flex items-center gap-3 px-3 py-2 rounded ${
                      pathname === item.path
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              ))}

              {/* Mobile Logout */}
              <div className="mt-6 border-t border-gray-100 pt-4">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded text-gray-700 hover:bg-gray-100"
                >
                  <LogoutIcon />
                  <span className="font-medium">Logout</span>
                </button>
              </div>

              {/* Removed public Buy/Hire links per UX update */}
            </nav>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will be redirected to the
              home page.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const AvatarPlaceholder = () => (
  <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white">
    A
  </div>
);

export default SideNav;
