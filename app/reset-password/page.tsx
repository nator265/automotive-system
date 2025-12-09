"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LockIcon from "@mui/icons-material/Lock";
import { Snackbar, Alert } from "@mui/material";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAlertMessage(data.message || "Reset failed");
        setAlertSeverity("error");
      } else {
        setAlertMessage("Password reset successful!");
        setAlertSeverity("success");
        setTimeout(() => router.push("/login"), 1000);
      }
      setAlertOpen(true);
    } catch {
      setAlertMessage("Server error");
      setAlertSeverity("error");
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-white">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <h3 className="text-2xl font-bold mb-6">Reset Password</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col space-y-2">
              <label>New Password</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 p-2 pl-10 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-all duration-300"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={alertSeverity}
          onClose={() => setAlertOpen(false)}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
