"use client";

import React from "react";
import { Avatar, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  kpis,
  monthlyRevenue,
  recentBookings,
  upcomingMaintenance,
  topModels,
} from "../../data/dashboard";
import Link from "next/link";

const Sparkline = ({ data }: { data: number[] }) => {
  if (!data || data.length === 0) return null;
  const w = 260;
  const h = 48;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mx-auto">
      <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={points} />
    </svg>
  );
};

const KPIBox = ({
  title,
  value,
  change,
}: {
  title: string;
  value: any;
  change: number;
}) => (
  <div className="bg-white rounded-md shadow p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
      <div
        className={`text-sm font-medium ${
          change >= 0 ? "text-green-600" : "text-red-500"
        }`}
      >
        {change >= 0 ? `+${change}%` : `${change}%`}
      </div>
    </div>
  </div>
);

const DashboardContent = () => {
  return (
    <>
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome
          </h1>
          <h2>Mr. Andrew Salima</h2>
          <p className="text-gray-500 text-sm mt-1">
            Overview of fleet, bookings and revenue
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Badge color="secondary" badgeContent={21} max={99}>
              <NotificationsIcon className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600 transition" />
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <a href="/dashboard/settings" title="Account settings">
              <Avatar
                alt="Admin"
                src="profilephototo/profilephoto.jpg"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#3b82f6",
                  cursor: "pointer",
                }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <KPIBox
            key={k.title}
            title={k.title}
            value={k.value}
            change={k.change}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-md shadow p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Revenue (Last 12 months)
            </h3>
            <div className="text-sm text-gray-500">
              Total: $
              {monthlyRevenue.reduce((s, n) => s + n, 0).toLocaleString()}
            </div>
          </div>
          <Sparkline data={monthlyRevenue} />
        </div>

        <div className="bg-white rounded-md shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Quick Actions
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/add-car"
            className="bg-blue-600 text-white py-2 px-3 rounded text-center">
              Add New Car
            </Link>
            <button className="border border-gray-300 py-2 px-3 rounded">
              Approve Pending Booking
            </button>
            <button className="border border-gray-300 py-2 px-3 rounded">
              Export Reports
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-md shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Bookings
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500">
                  <th className="py-2">ID</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="py-3 text-sm text-gray-700">{b.id}</td>
                    <td className="py-3 text-sm text-gray-700">{b.customer}</td>
                    <td className="py-3 text-sm text-gray-700">{b.car}</td>
                    <td className="py-3 text-sm text-gray-700">{b.date}</td>
                    <td className="py-3 text-sm text-gray-700">${b.amount}</td>
                    <td className="py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          b.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : b.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-md shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Maintenance Due
          </h3>
          <ul className="space-y-3">
            {upcomingMaintenance.map((m) => (
              <li key={m.carId} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{m.model}</p>
                  <p className="text-xs text-gray-500">
                    Due: {m.dueDate} · {m.miles.toLocaleString()} miles
                  </p>
                </div>
                <button className="text-sm text-blue-600">Schedule</button>
              </li>
            ))}
          </ul>

          <h4 className="text-md font-semibold text-gray-700 mt-6 mb-2">
            Top Models
          </h4>
          <ul className="space-y-2">
            {topModels.map((t) => (
              <li
                key={t.model}
                className="flex items-center justify-between text-sm"
              >
                <span>{t.model}</span>
                <span className="text-gray-500">
                  Sold: {t.sold} · Hired: {t.hired}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
