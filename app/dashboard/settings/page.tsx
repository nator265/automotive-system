"use client";

import React from "react";
import SecurityIcon from "@mui/icons-material/Security";
import BellIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { useSideNav } from "@/app/context/SideNavContext";

const SettingsContent = () => {
  const { isExpanded } = useSideNav();

  return (
    <>
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account and application settings
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 space-y-2 sticky top-24">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium flex items-center gap-3">
              <PersonIcon fontSize="small" /> Account
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium flex items-center gap-3">
              <SecurityIcon fontSize="small" /> Security
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium flex items-center gap-3">
              <BellIcon fontSize="small" /> Notifications
            </button>
          </div>
        </div>

        {/* Main Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <PersonIcon /> Account Settings
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Section */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    AU
                  </div>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                    Change Photo
                  </button>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@automalawi.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+265 1 234 567"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <SecurityIcon /> Security
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Two-Factor Authentication
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Add an extra layer of security to your account
                </p>
                <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-red-200">
              <h2 className="text-xl font-bold text-red-800">Danger Zone</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                This action cannot be undone. Please proceed with caution.
              </p>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsContent;
