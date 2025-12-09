"use client";

import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          open: true,
          message: data.error || "Login failed",
          severity: "error",
        });
        setLoading(false);
        return;
      }

      setAlert({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      // Redirect by role
      if (data.role === "admin") router.push("/dashboard");
      else router.push("/client-dashboard");
    } catch (err) {
      setAlert({ open: true, message: "Server error", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute top-8 left-8 flex gap-5 items-center">
        <ArrowBackIcon className="text-gray-700 cursor-pointer" />
        <span className="text-gray-700 font-semibold">Automotive</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6">Welcome back!</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 pl-10 rounded"
              required
            />
          </div>
          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 pl-10 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Sign Up
          </Link>
        </p>
        <p className="mt-2 text-center">
          Forgot password?{" "}
          <Link href="/forgot-password" className="text-blue-500">
            Reset
          </Link>
        </p>
      </div>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
