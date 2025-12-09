"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success",
  });

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setAlert({
            open: true,
            message: data.error || "Verification failed",
            severity: "error",
          });
        } else {
          setAlert({ open: true, message: data.message, severity: "success" });
          setTimeout(() => router.push("/login"), 2000);
        }
      } catch (err) {
        setAlert({ open: true, message: "Server error", severity: "error" });
      }
    }

    if (token) verify();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
