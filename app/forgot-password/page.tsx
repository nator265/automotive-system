"use client";

import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import { Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setAlertMessage(data.error || "Failed to send reset link");
        setAlertSeverity("error");
        setAlertOpen(true);
      } else {
        setAlertMessage("Reset link sent! Check your email.");
        setAlertSeverity("success");
        setAlertOpen(true);
      }
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
      <div className="absolute top-8 left-8 flex gap-5">
        <ArrowBackIcon
          className="text-gray-700 hover:text-gray-900 cursor-pointer"
          onClick={() => router.back()}
        />
        <div className="text-gray-700 font-semibold">Automotive</div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <h3 className="text-2xl font-bold mb-6">Forgot Password</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col space-y-2">
              <label>Email</label>
              <div className="relative">
                <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 p-2 pl-10 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Reset Link"}
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
